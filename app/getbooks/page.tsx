"use client"
import React from 'react';
import {useEffect } from 'react';
import { Book } from '../page'; 
interface BookPageProps {
	setBooks: (books:Book[]) => void
	books: Book[]
}
const BookPage =  ({setBooks, books}:BookPageProps) => {

		const fetchBooks = () => {
			fetch("http://127.0.0.1:8000/books")
				.then((response) => response.json())
			   .then((data) => {
				console.log(data)
				  setBooks(data);
			   })
			   .catch((err) => {
				  console.log(err.message);
			   });
		}

		const deleteBook = (id:number) => {
			
			console.log(id);
			// delete book
			fetch(`http://127.0.0.1:8000/books/${id}`, {
				method: 'DELETE',
				
			})
			.then((response) => fetchBooks())
			.catch((err) => {
				console.log(err.message);
			});
			
		}


		useEffect(() => {
			fetchBooks();
		 }, []);	

	return (
		<>
			<h1>Books List</h1>
			<ul>
				{books.map(book =><li key={book.id}>{book.title} Status {book.status} <button onClick={()=>{deleteBook(book.id)}}>Delete</button></li>)}
			</ul>
		</>
	)
}
export default BookPage;

