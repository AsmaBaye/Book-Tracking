"use client"
import React from 'react';
import {useEffect } from 'react';
import { Book } from '../page';
import styles from './page.module.css' 
import { Button } from "@/components/ui/button"


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
				alert(err.message);
			});
			
		}

	 const updateBook = (updatedBook: BookUpdate) => {
		//update book status
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
		  })
		.catch((err) => {
			alert(err.message);
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
			
			<div className='border-solid border-red-50'>
			<h1 className={styles.card}>To Read Books List</h1>
			<ul>
				{toReadBooks.map(book => (
					<li key={book.id}>
						<h1 className='mt-2  flex items-center justify-center '>{book.title} </h1>
						<div className='flex items-center justify-center'>
						<Button onClick={()=>{deleteBook(book.id)}} className="mx-2">Delete</Button>
						<Button onClick={()=>{updateBook({id: book.id, status:"reading"} as BookUpdate)}} className="my-2 mx-2">Reading </Button>
						<Button onClick={()=>{updateBook({id: book.id, status:"completed"} as BookUpdate)}} className="my-2 mx-2 ">Completed </Button>
						</div>
					</li>
				))}
				
			</ul>
			</div>

			<div>
			<div className='border-solid border-red-50'>
			<h1 className={styles.card}>Reading Books List</h1>
			<ul>
				{readingBooks.map(book => (
					<li key={book.id}>
						<h1 className='mt-2  flex items-center justify-center '>{book.title} </h1>
						<div className='flex items-center justify-center'>
						<Button onClick={()=>{deleteBook(book.id)}}className="mx-2">Delete</Button>
						<Button onClick={()=>{updateBook({id: book.id, status:"to-read"} as BookUpdate)}} className="my-2 mx-2">To-Reading </Button>
						<Button onClick={()=>{updateBook({id: book.id, status:"completed"} as BookUpdate)}} className="my-2 mx-2 ">Completed </Button>
						</div>
					</li>

				))}
			</ul>
			</div>			
			</div>

			<div>
			<h1 className={styles.card}>Completed Books List</h1>
			<ul>
				{completdBooks.map(book => (
					<li key={book.id}>
						<h1 className='mt-2  flex items-center justify-center '>{book.title} </h1>
						<div className='flex items-center justify-center'>
						<Button onClick={()=>{deleteBook(book.id)}}className="mx-2">Delete</Button>
						<Button onClick={()=>{updateBook({id: book.id, status:"to-read"} as BookUpdate)}} className="my-2 mx-2">To-Read </Button>
						<Button onClick={()=>{updateBook({id: book.id, status:"reading"} as BookUpdate)}} className="my-2 mx-2 ">Reading </Button>
						</div>
					</li>
				))}
			</ul>
			</div>	

		</div>
	)
}
export default BookPage;

