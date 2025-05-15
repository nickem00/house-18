// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import ProductsTable from '../components/Admin/ProductsTable';
import AddProductCard from '../components/Admin/AddProductCard';
import StatsCard from '../components/Admin/Statscard';
import '../styles/Admin.css';

import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stats state
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorStats, setErrorStats] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${URL}/api/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const formatted = data.map(product => ({
          id: product.product_id,
          name: product.name,
          description: product.description,
          price: product.price,
          color: product.color,
          category: product.category,
          variants: product.variants,
          images: product.images,
          stock: product.variants.reduce((total, v) => total + v.stock, 0),
          originalData: product
        }));
        setProducts(formatted);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [URL]);

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const token = localStorage.getItem('token');
        const res = await fetch(`${URL}/api/admin/stats`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch stats: ${res.status}`);
        }
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setErrorStats(err.message);
        console.error('Error fetching stats:', err);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [URL]);
  const toggleAddForm = () => setShowAddForm(prev => !prev);

  const handleAddProduct = async (newProduct) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      
      // Update products list with new product
      setProducts(prev => [...prev, {
        id: data.product_id,
        name: data.name,
        description: data.description,
        price: data.price,
        color: data.color,
        category: data.category,
        variants: data.variants,
        images: data.images,
        stock: data.variants.reduce((total, v) => total + v.stock, 0),
        originalData: data
      }]);
      
      // Hide add form after successful addition
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product: ' + err.message);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Remove product from state
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product: ' + err.message);
    }
  };
  
  const handleUpdate = async (updatedProduct) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/api/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedProduct)
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const data = await response.json();
      
      // Update the product in state
      setProducts(prev => prev.map(p => 
        p.id === updatedProduct.id ? {
          ...p,
          name: data.name,
          description: data.description,
          price: data.price,
          color: data.color,
          category: data.category,
          variants: data.variants,
          images: data.images,
          stock: data.variants.reduce((total, v) => total + v.stock, 0),
          originalData: data
        } : p
      ));
      
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product: ' + err.message);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  const handleEditClick = (product) => setEditingProduct(product);
  const handleCancelEdit = () => setEditingProduct(null);
  
  const handleSaveEdit = (updatedValues) => {
    // Combine product ID with updated values
    const productToUpdate = {
      id: editingProduct.id,
      ...updatedValues
    };
    
    // Call the API update function
    handleUpdate(productToUpdate);
    
    // Close the edit form
    setEditingProduct(null);
  };

  if (loading) return <div className="admin-page-container"><p>Loading products...</p></div>;
  if (error)   return <div className="admin-page-container"><p>Error: {error}</p></div>;

  // i början av Admin.jsx, ovanför return
  const formatCurrency = amount => {
    // Om du får en sträng, gör om till Number
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return num.toLocaleString('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 2
    });
  };


  return (
    <section className="admin-page-container">
      <article className="admin-article">
        <h2>Admin Dashboard</h2>
        <button className="link-button" onClick={handleLogout}>Logout</button>
      </article>

      <section className="stats-section">
        {loadingStats && <p>Loading stats…</p>}
        {errorStats   && <p>Error loading stats: {errorStats}</p>}
        {stats && Object.entries(stats).map(([key, val]) => {
          const title = key.charAt(0).toUpperCase() + key.slice(1);
          const displayValue = key === 'totalRevenue'
            ? formatCurrency(val)
            : val;
          return (
            <StatsCard
              key={key}
              title={title}
              value={displayValue}
            />
          );
        })}
      </section>

      <article className="admin-article">
          <h2>Products</h2>
        </article>

      <section className="products-section">
        <ProductsTable
          products={products}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onEditClick={handleEditClick}
        />

        <article className="admin-article" id="add-product-article">
          <button className="link-button" onClick={toggleAddForm}>
            {showAddForm ? 'Cancel' : 'Add Product'}
          </button>
        </article>

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
    </section>
  );
}