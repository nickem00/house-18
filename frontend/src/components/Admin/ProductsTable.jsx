import React from 'react';

export default function ProductsTable({ products, onDelete, onUpdate }) {
  return (
    <table className="products-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>{p.price} kr</td>
            <td>{p.stock}</td>
            <td>
              <button
                className="link-button"
                onClick={() => onUpdate(p.id)}
              >
                Update
              </button>
            </td>
            <td>
              <button
                className="link-button"
                onClick={() => onDelete(p.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
