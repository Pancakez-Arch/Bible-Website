// pages/bible/[bookId]/[chapterId].tsx
import { useRouter } from 'next/router';
import React from 'react';

// Sample chapter data (replace with real data or fetch from an API)
type ChapterData = {
    id: number;
    text: string;
  };
  
  type BibleChapters = {
    genesis: ChapterData[];
    exodus: ChapterData[];
    // Add other books here
  };
  
  const chapters: BibleChapters = {
    genesis: [
      { id: 1, text: 'In the beginning, God created the heavens and the earth.' },
      { id: 2, text: 'Now the earth was formless and empty.' },
    ],
    exodus: [
      { id: 1, text: 'These are the names of the sons of Israel.' },
    ],
    // Other books
  };
  

const ChapterPage = () => {
  const router = useRouter();
  const { bookId, chapterId } = router.query;

  const book = chapters[bookId as keyof BibleChapters];

  const chapter = book[parseInt(chapterId as string) - 1]; // Adjust for chapterId (starting from 1)

  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  return (
    <div>
      <h1>{bookId} - Chapter {chapterId}</h1>
      <p>{chapter.text}</p>
      {/* Add links to next/previous chapters */}
      <ul>
        <li>
          <a href={`/bible/${bookId}/${parseInt(chapterId as string) - 1}`}>
            Previous Chapter
          </a>
        </li>
        <li>
          <a href={`/bible/${bookId}/${parseInt(chapterId as string) + 1}`}>
            Next Chapter
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ChapterPage;
