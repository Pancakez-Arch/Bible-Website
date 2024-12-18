// pages/api/BibleBooks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const GITHUB_API_URL = 'https://bible-api.com';

const fetchBibleData = async (book: string, chapter: number) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/${book}%20${chapter}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Bible data:', error);
    return null;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { book, chapter } = req.query;

  if (!book || !chapter) {
    res.status(400).json({ error: 'Missing book or chapter' });
    return;
  }

  const data = await fetchBibleData(book as string, parseInt(chapter as string));
  if (!data) {
    res.status(500).json({ error: 'Failed to fetch Bible data' });
    return;
  }

  res.status(200).json(data);
};
