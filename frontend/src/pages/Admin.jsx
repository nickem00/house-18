// src/pages/Admin.jsx
import React, { useState } from 'react';
import ProductsTable  from '../components/Admin/ProductsTable';
import AddProductCard from '../components/Admin/AddProductCard';
import '../styles/admin.css';
import { Navigate } from 'react-router-dom';


export default function Admin() {
  // Mockade produkter
  const [products, setProducts] = useState([
    { id: 21931, name: 'Cap House 18', price: 300, stock: 150 },
    { id: 21930, name: 'Sweatshirt White', price: 450, stock: 10 },
  ]);

  // State för att visa/gömma add-form
  const [showAddForm, setShowAddForm] = useState(false);
  const toggleAddForm = () => setShowAddForm(prev => !prev);

  // Callback från AddProductCard
  const handleAddProduct = newProd => {
    const nextId = products.length
      ? Math.max(...products.map(p => p.id)) + 1
      : 1;
    setProducts([
      ...products,
      { id: nextId, ...newProd }
    ]);
    // Dölj formuläret direkt när vi lagt till
    setShowAddForm(false);
  };

  const handleDelete = id => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('loggedIn', 'false');
    Navigate("/Login-Register");
    // ev. redirect med navigate('/login-register')
  };

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
            Logga ut
          </button>
        </div>

        <ProductsTable
          products={products}
          onDelete={handleDelete}
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

