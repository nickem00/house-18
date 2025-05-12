import React, { useState } from 'react';

export default function AddProductCard({ onAdd, initialValues = {} }) {
  const [form, setForm] = useState({ 
    name: initialValues.name || '', 
    description: initialValues.description || '', 
    price: initialValues.price || '', 
    color: initialValues.color || '', 
    category: initialValues.category || '',
    variants: initialValues.variants || [{ size: 'M', stock: '' }],
    images: initialValues.images || ['', '']
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setError('');
  };

  const handleVariantChange = (index, field, value) => {
    setForm(f => {
      const newVariants = [...f.variants];
      newVariants[index] = { ...newVariants[index], [field]: field === 'stock' ? value : value };
      return { ...f, variants: newVariants };
    });
    setError('');
  };

  const addVariant = () => {
    setForm(f => ({
      ...f,
      variants: [...f.variants, { size: '', stock: '' }]
    }));
  };

  const removeVariant = (index) => {
    if (form.variants.length > 1) {
      setForm(f => {
        const newVariants = [...f.variants];
        newVariants.splice(index, 1);
        return { ...f, variants: newVariants };
      });
    }
  };

  const handleImageChange = (index, value) => {
    setForm(f => {
      const newImages = [...f.images];
      newImages[index] = value;
      return { ...f, images: newImages };
    });
    setError('');
  };

  const addImage = () => {
    setForm(f => ({
      ...f,
      images: [...f.images, '']
    }));
  };

  const removeImage = (index) => {
    if (form.images.length > 1) {
      setForm(f => {
        const newImages = [...f.images];
        newImages.splice(index, 1);
        return { ...f, images: newImages };
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, description, price, color, category, variants, images } = form;

    // Validate required fields
    if (!name || !description || !price || !color || !category) {
      setError('Name, description, price, color, and category are required.');
      return;
    }

    // Validate variants
    if (!variants.length || variants.some(v => !v.size || !v.stock)) {
      setError('Each variant must have size and stock.');
      return;
    }

    // Validate images (at least one image required)
    if (!images[0].trim()) {
      setError('At least one image URL is required.');
      return;
    }

    // Convert numeric values
    const processedVariants = variants.map(v => ({
      size: v.size,
      stock: Number(v.stock)
    }));

    // Send data to parent component
    onAdd({
      name,
      description,
      price: Number(price),
      color,
      category,
      variants: processedVariants,
      images: images.filter(img => img.trim() !== '')
    });

    // Reset form only if adding a new product
    if (!initialValues.id) {
      setForm({ 
        name: '', 
        description: '', 
        price: '', 
        color: '', 
        category: '',
        variants: [{ size: 'M', stock: '' }],
        images: ['', '']
      });
    }
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
      <textarea
        name="description"
        placeholder="Product description"
        className="input-field"
        value={form.description}
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
        name="color"
        placeholder="Color"
        className="input-field"
        value={form.color}
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category"
        className="input-field"
        value={form.category}
        onChange={handleChange}
      />

      <h3>Variants</h3>
      {form.variants.map((variant, index) => (
        <div key={index} className="variant-row">
          <select
            value={variant.size}
            onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
            className="input-field size-select"
          >
            <option value="">Select Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          <input
            type="number"
            placeholder="Stock"
            className="input-field"
            value={variant.stock}
            onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
          />
          <button 
            type="button" 
            onClick={() => removeVariant(index)}
            className="remove-variant-btn"
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addVariant} className="add-variant-btn">
        Add Size Variant
      </button>

      <h3>Images</h3>
      {form.images.map((url, index) => (
        <div key={index} className="image-row">
          <input
            placeholder={`Image URL ${index + 1}`}
            className="input-field"
            value={url}
            onChange={(e) => handleImageChange(index, e.target.value)}
          />
          <button 
            type="button" 
            onClick={() => removeImage(index)}
            className="remove-image-btn"
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addImage} className="add-image-btn">
        Add Image URL
      </button>

      <button type="submit">
        {initialValues.id ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
}
