import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BibleResponse {
  books: string[];
}

interface ChapterResponse {
  chapters: number[];
}

const BiblePage = () => {
  const [books, setBooks] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [chapters, setChapters] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the list of books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const response = await fetch('/api/BibleBooks');
        const data: BibleResponse = await response.json();
        if (data.books) {
          setBooks(data.books);
        } else {
          setError('Failed to load books. Please try again later.');
        }
      } catch (error) {
        setError('Error fetching books. Please try again later.');
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
    setError(null); // Clear previous errors
    try {
      const response = await fetch(`/api/BibleBooks/${book}`);
      const data: ChapterResponse = await response.json();
      if (data.chapters) {
        setChapters(data.chapters.map((chapter) => chapter.toString()));
      } else {
        setError('Failed to load chapters. Please try again later.');
      }
    } catch (error) {
      setError('Error fetching chapters. Please try again later.');
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

      {/* Error message */}
      {error && <div className="text-red-500">{error}</div>}

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
              disabled={loading}
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
