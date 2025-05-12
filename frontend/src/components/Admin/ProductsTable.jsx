import React, { useState } from 'react';

export default function ProductsTable({ products, onDelete, onUpdate, onEditClick }) {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRowExpansion = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <table className="products-table">
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Total Stock</th>
          <th colSpan="2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <React.Fragment key={p.id}>
            <tr>
              <td>
                <button
                  className="expand-button"
                  onClick={() => toggleRowExpansion(p.id)}
                >
                  {expandedRows[p.id] ? '▼' : '►'}
                </button>
              </td>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price} kr</td>
              <td>{p.stock}</td>              <td>
                <button
                  className="link-button"
                  onClick={() => onEditClick(p)}
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
            {expandedRows[p.id] && p.originalData && p.originalData.variants && (
              <tr className="variant-row">
                <td colSpan="7">
                  <div className="variants-container">
                    <h4>Variants</h4>
                    <table className="variants-table">
                      <thead>
                        <tr>
                          <th>Size</th>
                          <th>Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {p.originalData.variants.map((variant, index) => (
                          <tr key={index}>
                            <td>{variant.size}</td>
                            <td>{variant.stock}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
