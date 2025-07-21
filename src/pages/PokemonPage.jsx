import { useState, useEffect } from "react";
import { getPokemonList } from "../services/pokemonService";
import Loading from "../components/Loading";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import backgroundImg from '../assets/images/pokemon-card-bg.jpeg';
import { Search } from "lucide-react";
import fallback from '../assets/images/fallback.jpg'
import Modal from "../components/Modal";


const PokemonPage = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchPokemons, setSearchPokemons] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  // data count for pagination
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokemons = filteredPokemons.slice(startIndex, endIndex);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState(null);


  const handleCardClick = (url) => {
    setSelectedPokemonUrl(url);
    setIsOpen(true);
  };

  const handleCloseModal = () =>{
    setIsOpen(false);
    setSelectedPokemonUrl(null);
  };

  // go up when change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const mainElement = document.querySelector('main');
    if(mainElement) {
       mainElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

   // get sprite pokemon online from id pokemon
  const getPokemonSprite = (url) => {
    const id = url.split('/').filter(Boolean).pop();
    // Official artwork (lebih bagus)
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  };


   //search pokemon
  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    setSearchPokemons(search);
    const filtered = allPokemons.filter( p => p.name.includes(search));
    setFilteredPokemons(filtered);
    setCurrentPage(1);
  }

  // get data pokemon from API
  const loadPokemon = async () =>{
    setLoading(true);
    setError(null);

    try{
      const data = await getPokemonList();
      setAllPokemons(data.results);
      setFilteredPokemons(data.results);
      
    }catch(err){
      setError(err.message);
    }finally{
      setLoading(false);
    }
  };

  // trigger API
  useEffect(() => {
    loadPokemon();
  },[]);
  

  // if error
  if(error){
    return(
      <div>
        <h2>Error: {error}</h2>
        <button onClick={loadPokemon}>Try again</button>
      </div>
    );
  }

  //loading 
  if(loading){
    return(
        <div className="min-h-screen flex justify-center items-center">
          <Loading/>
        </div>
    );
  }

  return (  
    <div className="bg-no-repeat bg-cover bg-center bg-fixed min-h-screen"
      style={{ backgroundImage : `url(${backgroundImg})`}}
    > 
      {/*search*/}
      <div className=" flex ml-auto w-fit items-center mx-4 pt-2 shadow:xl">
        <Search className="w-4 h-4 mr-1"/>
        <input 
        className=" bg-stone-100 flex justify-end border-gray-400 border-2 text-sm md:text-md p-1 rounded-sm shadow:xl" 
        onChange={handleSearch} 
        type="text" 
        placeholder="Search Pokemon..."
        value={searchPokemons}
        />
      </div>
      {/*card section*/}
      <div className="grid gap-2 px-4 py-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-y-auto">
        {currentPokemons?.map((pokemon, index) => (
         <Card 
          key={index} 
          className="p-4 text-center cursor-pointer hover:shadow-md hover:-translate-y-1 hover:bg-gray-100 transition duration-300"
          onClick = {() => handleCardClick(pokemon.url)}
          >
          
            <div className="mb-3">
              <img
                src={getPokemonSprite(pokemon.url)}
                alt={pokemon.name}
                className="w-24 h-24 mx-auto object-contain"
                onError={(e) => {
                  e.target.src = fallback;
                }}
              />
            </div>
            <h3 className="font-semibold text-lg capitalize">{pokemon.name}</h3>
          </Card>
      ))}
      </div>
      {/* no resulf found*/}
      <div>
        {filteredPokemons.length === 0 && searchPokemons && (
          <div className="text-center py-30">
            <p className="font-bold">No Pokemon Found</p>
          </div>
        ) }
      </div>
      {/* Pagination*/}
      <div className="pb-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredPokemons.length}
          itemsPerPage={itemsPerPage}
          maxVisiblePages={5}
        />
      </div>
      {/*modal*/}
      {isOpen && (
        <Modal
          isOpen = {isOpen}
          onClose = {handleCloseModal}
          pokemonUrl= {selectedPokemonUrl}
        />
      )}
    </div>

  );
}

export default PokemonPage;