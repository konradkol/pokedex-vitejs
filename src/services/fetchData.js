import axios from 'axios';

export async function fetchData(item) {
  try {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${item}`,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
