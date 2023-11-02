'use client'
import { useState } from 'react';
import BookPage from "./getbooks/page"
import AddBook from './postbooks/page';

export interface  Book {
  id: number;
  title: string;
  status:string;
}
export default function Home() {

  const [books, setBooks] = useState<Book[]>([]);
  return (
    <div>
      
       <AddBook setBooks={setBooks} books={books}/>
       <BookPage setBooks={setBooks} books={books}/>
     </div>
  )
}
      