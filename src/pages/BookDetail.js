import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById } from '../services/api';

function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBookById(id)
            .then(response => {
                setBook(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching book:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="container mt-4">Loading...</p>;
    if (!book) return <p className="container mt-4">Book not found.</p>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-dark text-white">
                    <h3>{book.title}</h3>
                </div>
                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Author</th>
                                <td>{book.author}</td>
                            </tr>
                            <tr>
                                <th>Category</th>
                                <td>{book.category ? book.category.name : 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>${book.price}</td>
                            </tr>
                            <tr>
                                <th>Stock</th>
                                <td>{book.stock}</td>
                            </tr>
                            <tr>
                                <th>ISBN</th>
                                <td>{book.isbn}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{book.description}</td>
                            </tr>
                            <tr>
                                <th>Added On</th>
                                <td>{new Date(book.createdAt).toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-footer">
                    <Link to="/" className="btn btn-secondary me-2">
                        Back to List
                    </Link>
                    <Link to={`/edit-book/${book.id}`} className="btn btn-warning">
                        Edit Book
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BookDetail;