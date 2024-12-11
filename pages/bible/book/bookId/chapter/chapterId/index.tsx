// pages/bible/book/[bookId]/chapter/[chapterId].tsx
import { useRouter } from 'next/router';

const ChapterPage = () => {
  const router = useRouter();
  const { bookId, chapterId } = router.query;

  if (!bookId || !chapterId) {
    return <div>Loading...</div>;
  }

  // Access the chapter data
  const book = chapters[bookId as keyof typeof chapters];

  if (!book) {
    return <div>Book not found</div>;
  }

  const chapter = book[parseInt(chapterId as string) - 1];

  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  return (
    <div>
      <h1>{bookId} - Chapter {chapterId}</h1>
      <p>{chapter.text}</p>
    </div>
  );
};

export default ChapterPage;
