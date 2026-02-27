import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook, getAllCategories } from '../services/api';

function EditBook() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        stock: '',
        description: '',
        isbn: '',
        category: { id: '' }
    });

    useEffect(() => {
        getBookById(id)
            .then(response => {
                const book = response.data;
                setFormData({
                    title: book.title,
                    author: book.author,
                    price: book.price,
                    stock: book.stock,
                    description: book.description,
                    isbn: book.isbn,
                    category: { id: book.category ? book.category.id : '' }
                });
            })
            .catch(error => {
                console.error('Error fetching book:', error);
            });

        getAllCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            setFormData({ ...formData, category: { id: value } });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateBook(id, formData)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error updating book:', error);
            });
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-dark text-white">
                    <h3>Edit Book</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Author</label>
                            <input
                                type="text"
                                className="form-control"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select
                                className="form-select"
                                name="category"
                                value={formData.category.id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Stock</label>
                            <input
                                type="number"
                                className="form-control"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">ISBN</label>
                            <input
                                type="text"
                                className="form-control"
                                name="isbn"
                                value={formData.isbn}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                            />
                        </div>
                        <button type="submit" className="btn btn-warning me-2">
                            Update Book
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditBook;