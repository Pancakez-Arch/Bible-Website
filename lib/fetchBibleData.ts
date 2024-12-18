// lib/fetchBibleData.ts
import axios from 'axios';

const BIBLE_API_URL = 'https://bible-api.com/';

export const fetchBibleData = async (bookAndChapter: string) => {
  try {
    // Make a GET request to the Bible API with the specified book and chapter
    const response = await axios.get(`${BIBLE_API_URL}/${bookAndChapter}`);
    return response.data; // Return the API's response data
  } catch (error) {
    console.error('Error fetching Bible data:', error);
    return null; // Return null if there's an error
  }
};