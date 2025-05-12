// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import ProductsTable from '../components/Admin/Productstable';
import AddProductCard from '../components/Admin/AddProductCard';
import '../styles/admin.css';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  
  const URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${URL}/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        // Transform the data for the table display
        const formattedProducts = data.map(product => ({
          id: product.product_id,
          name: product.name,
          price: product.price,
          stock: product.variants.reduce((total, variant) => total + variant.stock, 0),
          // Keep the original data for potential updates
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

      const response = await fetch(`${URL}/products`, {
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

      const response = await fetch(`${URL}/products/${id}`, {
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

  const handleUpdate = () => {
    // This would open an edit form, not implemented in this update
    alert('Update functionality not implemented yet');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('loggedIn', 'false');
    navigate("/Login-Register");
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
        />

        {showAddForm && (
          <>
            <h2>Add New Product</h2>
            <AddProductCard onAdd={handleAddProduct} />
          </>
        )}
      </section>
    </div>
  );
}

