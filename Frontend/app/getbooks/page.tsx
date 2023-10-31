"use client"
import React from 'react';
import {useEffect } from 'react';
import { Book } from '../page';
import styles from './page.module.css' 
interface BookPageProps {
	setBooks: (books:Book[]) => void
	books: Book[]
}

interface BookUpdate {
	id:number
	title:string|null
	status:string|null
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

	 const updateBook = (updatedBook: BookUpdate) => {
		//update book status
		console.log(updatedBook.id);
		let updates = {}
		if (updatedBook.status != null)
			updates = {...updates, status: updatedBook.status}
		if (updatedBook.title != null)
			updates = {...updates, title: updatedBook.title}

		console.log(JSON.stringify(updates))


		fetch(`http://127.0.0.1:8000/books/${updatedBook.id}`, {
			method: 'PUT',
			body: JSON.stringify(updates),headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
		.then((data) => {
			fetchBooks();
			console.log(data)
		  })
		.catch((err) => {
			alert.$(err.message);
		});
	 }

		useEffect(() => {
			fetchBooks();
		 }, []);	

	const toReadBooks = books.filter((book) => book.status === "to-read")
	const readingBooks = books.filter((book) => book.status === "reading")
	const completdBooks = books.filter((book) => book.status === "completed")

	console.log("To Read", toReadBooks)
	console.log("Reading", readingBooks)
	console.log("Completed", completdBooks)

	return (
		<div className={styles.grid}>
			
			<div>
			<h1 className={styles.card}>To Read Books List</h1>
			<ul>
				{toReadBooks.map(book => (
					<li key={book.id}>
						{book.title} 
						<button onClick={()=>{deleteBook(book.id)}} className={styles.button}>Delete</button>
						<button onClick={()=>{updateBook({id: book.id, status:"reading"} as BookUpdate)}} className={styles.button}>Reading </button>
						<button onClick={()=>{updateBook({id: book.id, status:"completed"} as BookUpdate)}} className={styles.button}>Completed </button>
					</li>
				))}
				
			</ul>
			</div>

			<div>
			<h1 className={styles.card}>Reading Books List</h1>
			<ul>
				{readingBooks.map(book => (
					<li key={book.id}>
						{book.title} 
						<button onClick={()=>{deleteBook(book.id)}} className={styles.button}>Delete</button>
						<button onClick={()=>{updateBook({id: book.id, status:"to-read"} as BookUpdate)}} className={styles.button}>To-Reading </button>
						<button onClick={()=>{updateBook({id: book.id, status:"completed"} as BookUpdate)}} className={styles.button}>Completed </button>
					</li>
				))}
			</ul>

			</div>

			<div>
			<h1 className={styles.card}>Completed Books List</h1>
				{completdBooks.map(book => (
					<li key={book.id}>
						{book.title}
						<button onClick={()=>{deleteBook(book.id)}}className={styles.button}>Delete</button>
						<button onClick={()=>{updateBook({id: book.id, status:"to-read"} as BookUpdate)}} className={styles.button}>To-Read </button>
						<button onClick={()=>{updateBook({id: book.id, status:"reading"} as BookUpdate)}} className={styles.button}>Reading </button>

					</li>
				))}
			</div>	

		</div>
	)
}
export default BookPage;

