import { useState, useEffect } from 'react';
import Link from 'next/link';

const BiblePage = () => {
  const [books, setBooks] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [chapters, setChapters] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the list of books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/BibleBooks'); // Update with your API route
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
      const response = await fetch(`/api/BibleBooks/${book}`); // Update with your API route
      const data = await response.json();

      // Assuming data contains an array of chapter numbers
      setChapters(data.chapters.map((chapter: number) => chapter.toString())); // Convert numbers to strings
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
      {!selectedBook && loading ? (
        <div className="text-white">Loading books...</div>
      ) : !selectedBook ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {books.map((book, index) => (
            <button
              key={index}
              onClick={() => fetchChapters(book)}
              className="bg-white text-black py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out text-xl"
            >
              {book}
            </button>
          ))}
        </div>
      ) : (
        // If a book is selected, show chapters
        <div className="mt-8 w-full max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-4">{selectedBook}</h2>
          <div className="space-y-4">
            {loading ? (
              <div className="text-white">Loading chapters...</div>
            ) : (
              chapters.map((chapter) => (
                <Link href={`/bible/${selectedBook}/${chapter}`} key={chapter}>
                  <button className="block bg-white text-black py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out text-lg w-full">
                    Chapter {chapter}
                  </button>
                </Link>
              ))
            )}
          </div>
          <button
            onClick={() => {
              setSelectedBook('');
              setChapters([]);
            }}
            className="mt-4 bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out"
          >
            Back to Books
          </button>
        </div>
      )}

      {/* Footer with navigation links */}
      <footer className="mt-12 text-sm opacity-75 text-center">
        <Link href="/" className="text-white hover:text-gray-300">
          Back to Home
        </Link>
      </footer>
    </div>
  );
};

export default BiblePage;
