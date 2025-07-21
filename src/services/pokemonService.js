const API_URL = import.meta.env.VITE_API_URL_POKEMON;

// get all pokemon list
export const getPokemonList = async (limit = 1302) => {
  try{
    const response = await fetch(`${API_URL}/?limit=${limit}`);

    if(!response.ok){
      throw new Error('failed to fetch Data');
    }

    const data = await response.json();
    return data;
    
  }catch(err){
    console.log('error',err);
    throw err;
  }
};