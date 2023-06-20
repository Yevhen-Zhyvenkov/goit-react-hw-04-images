import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35952172-cdf0ca74d0005ca382f96ff4a';

const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export const fetchImages = async (searchText, page) => {
  const images = await axios.get(`${BASE_URL}?q=${searchText}&page=${page}&${searchParams}`);
  return images.data;
};