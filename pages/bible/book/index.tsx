// pages/bible/[book].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const BibleBook = () => {
  const router = useRouter();
  const { book } = router.query; // dynamic book name from URL
  const [bookData, setBookData] = useState<any>(null);

  useEffect(() => {
    if (book) {
      const getBookData = async () => {
      };
      getBookData();
    }
  }, [book]);

  if (!bookData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book}</h1>
      {bookData.chapters.map((chapter: { id: number; text: string }) => (
        <div key={chapter.id}>
          <h2>Chapter {chapter.id}</h2>
          <p>{chapter.text}</p>
        </div>
      ))}
    </div>
  );
};

export default BibleBook;
