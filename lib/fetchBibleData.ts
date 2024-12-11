// lib/fetchBibleData.ts
import axios from 'axios';

const GITHUB_API_URL = 'https://raw.githubusercontent.com/wldeh/bible-api/main/bibles/en-kjv';

export const fetchBibleData = async (book: string) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/${book}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Bible data:', error);
    return null;
  }
};
