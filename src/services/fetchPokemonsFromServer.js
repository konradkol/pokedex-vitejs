import axios from 'axios';

export const fetchPokemonsFromServer = async (url, setPokemonsFromServer) => {
  try {
    const { data } = await axios.get(url);
    setPokemonsFromServer(data);
  } catch (err) {
    console.error(err);
  }
};
