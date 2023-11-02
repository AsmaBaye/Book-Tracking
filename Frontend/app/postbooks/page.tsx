"use client";
import { useState } from "react";
import { Book } from "../page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AddBookProps {
  setBooks: (books: Book[]) => void;
  books: Book[];
}
const AddBook = ({ setBooks, books }: AddBookProps) => {
  const [bookTitle, setBookTitle] = useState("");

  const addNewBook = (title: string) => {
    fetch("http://127.0.0.1:8000/books", {
      method: "POST",
      body: JSON.stringify({
        title: title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks([...books, data]);
        console.log(data);
      });
  };

  return (
    <>
      <div className="my-3 mx-3 flex items-center justify-center text-3xl font-bold">
        <h1 className=" my-3 mx-3 flex items-center justify-center text-3xl font-bold ">
          Book Tracker App
        </h1>
      </div>
      <div className=" my-3 mx-auto flex items-center justify-center text-3xl font-bold w-full">
        <Input
          className="  flex items-center justify-center mr-2 w-1/3"
          placeholder="Add Books"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <Button
          onClick={(e) => {
            addNewBook(bookTitle);
          }}
        >
          Add
        </Button>
      </div>
    </>
  );
};
export default AddBook;
