import { useState, useEffect } from "react";
import Loading from "./Loading";
import { X } from "lucide-react";
import PokemonBarChart from "./PokemonBarChart";
import ball from "../assets/images/ball.png"
import fire  from '../assets/images/fire.png'

const Modal = ({isOpen, onClose, pokemonUrl}) => {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetailPokemon = async (url) => {
    if(!url){
      return;
    }

    setLoading(true);
    setError(null);

    try{
      const response = await fetch(url);
      if(!response.ok){
        throw new Error('pokemon detail failed to fetch');
      }

      const result = await response.json();
      setPokemonDetail(result);
    }catch(err){
      setError(err);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if( isOpen && pokemonUrl){
      fetchDetailPokemon(pokemonUrl);
    }
  } ,[isOpen, pokemonUrl]);

  useEffect(() => {
    if(!isOpen){
      setPokemonDetail(null);
      setError(null);
    }
  },[isOpen]);

  if(!isOpen){
    return null;
  }

  const handleOutsideModal = (e) => {
    if(e.target === e.currentTarget){
      onClose();
    }
  };

  
  return ( 
    <div
    onClick= {handleOutsideModal} 
    className="fixed inset-0 bg-white/50 shadow-2xl flex justify-center items-center z-50">
      
      {/*modal Content*/}
      <div className="p-4 bg-white rounded-lg max-w-sm shadow-2xl overflow-y-auto">
        <div className=" flex justify-end">
          <img src={ball} alt="pokemon" className="w-auto h-10 m-auto pl-4"/>
          <button><X className="w-5 h-5" onClick={handleOutsideModal}/></button>
        </div>

        {loading && (
        <div className="flex justify-center">
          <Loading/>
        </div>
      )}

      {error && (
        <div className="">
          <p>Error: {error}</p>
          <button>Try again</button>
        </div>
      )}

      {pokemonDetail && (
        <div>
          <div>
            <img src={
            pokemonDetail.sprites?.other?.['official-artwork']?.front_default}
            className="w-auto h-24 sm:h-30 md:h-35 lg:h-40 m-auto"
             alt="img" />
          </div>
          <div className="flex justify-between text-gray-700 text-xs bg-gray-200 rounded-md p-2">
            <div className="flex flex-col gap-0.5">
              <p>Name : {pokemonDetail.name}</p>
              <p>Height : {`${pokemonDetail.height * 10}`} cm</p>
              <p>Weight : {`${pokemonDetail.weight / 10}`} kg</p>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="flex gap-0.5"><img src={fire} alt="skills" className="w-4 h-4"/>Skills</span>
              {pokemonDetail.abilities.map((a, index) => (
                <p key={index}>{a.ability.name}</p>

              )) }
            </div>
          </div>
          <div>
            <PokemonBarChart
            stats={pokemonDetail.stats}
            />
          </div>
        </div>
      )}
      </div>  
    </div>
   );
}
 
export default Modal;