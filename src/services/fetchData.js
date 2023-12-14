import axios from 'axios';

export async function fetchData(endpoint) {
  try {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${endpoint}`,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
