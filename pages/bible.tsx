// pages/bible.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';

const BiblePage = () => {
  const [books, setBooks] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [chapters, setChapters] = useState<string[]>([]); // Chapters will be fetched later
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the list of books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/BibleBooks');
        const data = await response.json();
        if (data.books) {
          setBooks(data.books); // Set the list of books
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Fetch chapters for the selected book
  const fetchChapters = async (book: string) => {
  setSelectedBook(book);
  setLoading(true);
  try {
    const response = await fetch(`/api/Bible?passage=${book}.1`);
    const data = await response.json();
    
    // Assuming data contains an array of chapters
    // Convert chapter numbers to strings
    const chapters = Array.from({ length: 5 }, (_, i) => (i + 1).toString()); // Example: ["1", "2", "3", "4", "5"]

    setChapters(chapters); // Set chapters as strings
  } catch (error) {
    console.error('Error fetching chapters:', error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <header className="mb-12 text-center text-white">
        <h1 className="text-4xl font-bold">Bible</h1>
        <p className="mt-2 text-lg opacity-80">Select a Book</p>
      </header>

      {/* List of Books */}
      {loading ? (
        <div>Loading books...</div>
      ) : (
        <div className="space-y-4">
          {books.map((book, index) => (
            <button
              key={index}
              onClick={() => fetchChapters(book)}
              className="bg-white text-black py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              {book}
            </button>
          ))}
        </div>
      )}

      {/* Display chapters once a book is selected */}
      {selectedBook && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white">{selectedBook}</h2>
          <div className="space-y-4 mt-4">
            {loading ? (
              <div>Loading chapters...</div>
            ) : (
              chapters.map((chapter) => (
                <Link href={`/bible/${selectedBook}/${chapter}`} key={chapter}>
                  <button className="block bg-white text-black py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
                    Chapter {chapter}
                  </button>
                </Link>
              ))
            )}
          </div>
        </div>
      )}

      {/* Footer with navigation links */}
      <footer className="mt-12 text-sm opacity-75">
        <Link href="/">Back to Home</Link>
      </footer>
    </div>
  );
};

export default BiblePage;
