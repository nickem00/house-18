import React, { useState } from 'react';

export default function AddProductCard({ onAdd }) {
  const [form, setForm]   = useState({ name: '', price: '', stock: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, price, stock } = form;
    if (!name || !price || !stock) {
      setError('Alla fält krävs.');
      return;
    }
    // Skicka vidare till Admin.jsx
    onAdd({
      name,
      price: Number(price),
      stock: Number(stock)
    });
    setForm({ name:'', price:'', stock:'' });
  };

  return (
    <form className="add-product-card" onSubmit={handleSubmit}>
      {error && <p className="error-general">{error}</p>}

      <input
        name="name"
        placeholder="Product name"
        className="input-field"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        className="input-field"
        value={form.price}
        onChange={handleChange}
      />
      <input
        name="stock"
        type="number"
        placeholder="Stock"
        className="input-field"
        value={form.stock}
        onChange={handleChange}
      />
      <button type="submit">Add Product</button>
    </form>
  );
}
