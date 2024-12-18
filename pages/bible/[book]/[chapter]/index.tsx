// pages/bible/[book]/[chapter]/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const BibleChapter = ({ book, chapter }: { book: string; chapter: string }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/BibleBooks?book=${book}&chapter=${chapter}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Bible data:", error);
      }
    };

    fetchData();
  }, [book, chapter]);

  // Ensure that data.verses exists before trying to map over it
  if (!data || !data.verses) {
    return <div>Loading or no verses found...</div>;
  }

  return (
    <div>
      <h1>{`${book} Chapter ${chapter}`}</h1>
      {data.verses.map((verse: any) => (
        <p key={`${verse.chapter}:${verse.verse}`}>
          <strong>{`${verse.chapter}:${verse.verse}`}</strong> {verse.text}
        </p>
      ))}
    </div>
  );
};

export default BibleChapter;
