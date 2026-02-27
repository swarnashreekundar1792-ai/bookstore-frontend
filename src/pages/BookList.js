import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBooks, deleteBook, searchBooks } from '../services/api';

function BookList() {
    const [books, setBooks] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        setLoading(true);
        getAllBooks()
            .then(response => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            deleteBook(id)
                .then(() => {
                    fetchBooks();
                })
                .catch(error => {
                    console.error('Error deleting book:', error);
                });
        }
    };

    const handleSearch = () => {
        if (keyword.trim() === '') {
            fetchBooks();
            return;
        }
        setLoading(true);
        searchBooks(keyword)
            .then(response => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error searching books:', error);
                setLoading(false);
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">All Books</h2>

            {/* Search Bar */}
            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title or author..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                </button>
                <button className="btn btn-secondary" onClick={fetchBooks}>
                    Clear
                </button>
            </div>

            {/* Loading State */}
            {loading && <p>Loading books...</p>}

            {/* Books Table */}
            {!loading && (
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.category ? book.category.name : 'N/A'}</td>
                                <td>${book.price}</td>
                                <td>{book.stock}</td>
                                <td>
                                    <Link
                                        to={`/books/${book.id}`}
                                        className="btn btn-info btn-sm me-2"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to={`/edit-book/${book.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(book.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* No books found */}
            {!loading && books.length === 0 && (
                <p className="text-center">No books found.</p>
            )}
        </div>
    );
}

export default BookList;