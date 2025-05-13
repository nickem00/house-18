// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import ProductsTable from '../components/Admin/ProductsTable';
import AddProductCard from '../components/Admin/AddProductCard';
import '../styles/admin.css';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();
  
  const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${URL}/api/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
          // Transform the data for the table display
        const formattedProducts = data.map(product => ({
          id: product.product_id,
          name: product.name,
          description: product.description,
          price: product.price,
          color: product.color,
          category: product.category,
          variants: product.variants,
          images: product.images,
          stock: product.variants.reduce((total, variant) => total + variant.stock, 0),
          originalData: product
        }));
        
        setProducts(formattedProducts);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [URL]);

  const toggleAddForm = () => setShowAddForm(prev => !prev);

  const handleAddProduct = async (newProduct) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to add products');
        return;
      }

      const response = await fetch(`${URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add product');
      }

      const addedProduct = await response.json();
      
      // Add the new product to the state with formatting for the table
      setProducts([
        ...products,
        {
          id: addedProduct.product_id,
          name: addedProduct.name,
          price: addedProduct.price,
          stock: addedProduct.variants.reduce((total, variant) => total + variant.stock, 0),
          originalData: addedProduct
        }
      ]);
      
      // Hide the form after adding
      setShowAddForm(false);
    } catch (err) {
      alert(err.message);
      console.error('Error adding product:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to delete products');
        return;
      }
      const confirmDelete = window.confirm('Are you sure you want to delete this product?');
      if (!confirmDelete) return;

      const response = await fetch(`${URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }

      // Remove the product from the state
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert(err.message);
      console.error('Error deleting product:', err);
    }
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to update products');
        return;
      }

      console.log('Sending updated product:', updatedProduct);
      console.log('Updated product payload:', JSON.stringify(updatedProduct, null, 2));

      const response = await fetch(`${URL}/api/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedProduct)
      });

      console.log('API response status:', response.status);
      console.log('API response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error response:', errorData);
        console.error('Full API error response:', errorData);
        throw new Error(errorData.message || 'Failed to update product');
      }

      const updatedData = await response.json();
      console.log('Updated product data from API:', updatedData);

      // Update the product in the state
      setProducts(products.map(product => 
        product.id === updatedData.product_id
          ? {
              id: updatedData.product_id,
              name: updatedData.name,
              price: updatedData.price,
              stock: updatedData.variants.reduce((total, variant) => total + variant.stock, 0),
              originalData: updatedData
            }
          : product
      ));

      alert('Product updated successfully');
    } catch (err) {
      alert(err.message);
      console.error('Error updating product:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('loggedIn', 'false');
    navigate("/Login-Register");
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };  const handleSaveEdit = (updatedValues) => {
    // Ensure we keep the id and any other necessary fields
    const updatedProduct = {
      ...updatedValues,
      id: editingProduct.id
    };
    
    // Remove empty properties to avoid overwriting with empty values
    Object.keys(updatedProduct).forEach(key => {
      if (updatedProduct[key] === "" || 
          (Array.isArray(updatedProduct[key]) && updatedProduct[key].length === 0)) {
        delete updatedProduct[key];
      }
    });
    
    // Special handling for arrays
    if (updatedProduct.variants) {
      // Filter out incomplete variants
      updatedProduct.variants = updatedProduct.variants.filter(v => v.size && v.stock);
    }
    
    if (updatedProduct.images) {
      // Filter out empty image URLs
      updatedProduct.images = updatedProduct.images.filter(img => img.trim() !== '');
    }
    
    handleUpdate(updatedProduct);
    setEditingProduct(null);
  };

  if (loading) return <div className="admin-page-container"><p>Loading products...</p></div>;
  if (error) return <div className="admin-page-container"><p>Error: {error}</p></div>;

  return (
    <div className="admin-page-container">
      <h1>Admin Dashboard</h1>

      <section className="products-section">
        <h2>Products</h2>
        <div className="admin-actions">
          <button
            className="link-button"
            onClick={toggleAddForm}
          >
            {showAddForm ? 'Cancel' : 'Add Product'}
          </button>
          <button
            className="link-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <ProductsTable
          products={products}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onEditClick={handleEditClick}
        />

        {showAddForm && (
          <>
            <h2>Add New Product</h2>
            <AddProductCard onAdd={handleAddProduct} />
          </>
        )}

        {editingProduct && (
          <div className="edit-product-form">
            <h2>Edit Product</h2>
            <AddProductCard
              onAdd={handleSaveEdit}
              initialValues={editingProduct}
            />
            <button className='link-button' onClick={handleCancelEdit}>Cancel</button>
          </div>
        )}
      </section>
    </div>
  );
}

