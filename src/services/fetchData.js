import axios from 'axios';

export async function fetchData(endpoint) {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_URL}${endpoint}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}
