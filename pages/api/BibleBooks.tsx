// pages/bible/BibleBooks.tsx
import { useEffect, useState } from 'react';
import { fetchBibleData } from '../../lib/fetchBibleData';

const BibleBooks = () => {
  const [bookData, setBookData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBookData = async () => {
      const data = await fetchBibleData('genesis'); // Fetching Genesis data
      if (data) {
        setBookData(data);
      } else {
        setError('Failed to load data');
      }
    };

    getBookData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!bookData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Genesis</h1>
      {bookData.chapters.map((chapter: { id: number; text: string }) => (
        <div key={chapter.id}>
          <h2>Chapter {chapter.id}</h2>
          <p>{chapter.text}</p>
        </div>
      ))}
    </div>
  );
};

export default BibleBooks;
