"use client"
import { useState } from 'react';
import { Book } from '../page';
 


interface AddBookProps {
	setBooks: (books:Book[]) => void
	books: Book[]
}
const AddBook = ({setBooks, books}:AddBookProps) =>{
	const [bookTitle, setBookTitle] = useState('')

	const addNewBook = (title:string) => {
	   fetch('http://127.0.0.1:8000/books', {
		 method: 'POST',
		 body: JSON.stringify({
			title: title,
			 
		 }),
		  headers: {
			 'Content-type': 'application/json; charset=UTF-8',
		 },
	   })
	   .then((response) => response.json())
	   .then((data) => {
		 setBooks([...books,data])
		 console.log(data)
	   })
	 };
   
	   
	   return(
		   <div>
		   <h1>Add Books</h1>
		   <input type='text'   placeholder='Add Books' value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} />
		   <button onClick={(e)=>{addNewBook(bookTitle)}}>Add </button>
		   </div>
	   )
   }
   export default AddBook