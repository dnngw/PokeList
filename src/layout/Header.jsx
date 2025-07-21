import { Link } from 'react-router-dom';
import { useState } from 'react';
import pokelist from '../assets/images/PokeList.png'
import game from '../assets/images/game.png'
import charizad from '../assets/gifs/charizad.gif'
import gaming from '../assets/images/ball.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (  
    <header>
      <div className="flex justify-between px-4 py-2 shadow-md rounded-xl bg-amber-300 relative items-center h-12 sm:h-14 md:h-16 lg:h-18 ">
        {/* logo section*/}
        <div className="flex-shrink-0 flex-grow-2">
          <img className='w-auto h-8 sm:h-10 md:h-12 lg:h-14' src={pokelist} alt="PokeList" />
        </div>

        {/*navbar*/}
        <nav className="hidden sm:block flex-shrink-0 flex-grow-1">
          <ul className='flex gap-x-10 text-base md:text-md 2xl:text-lg font-bold'>
            <li>
              <Link to="/" className='flex items-center gap-0.5'><img src={game} className='w-4 h-4 lg:w-6 lg:h-6'/> Home</Link>
            </li>
            <li>
              <Link to="/pokemon" className='flex items-center gap-0.5'><img src={gaming} className='w-4 h-4 lg:w-6 lg:h-6'/> Pokemon</Link>
            </li>
          </ul>
        </nav>

        <div className='hidden sm:block flex-shrink-0'>
          <img src={charizad} alt="chricad pokemon" className='w-auto h-12' />
        </div>

        {/*mobile button*/}
        <button
        onClick={toggleMenu} 
        className='block w-8 rounded-md shadow-md sm:hidden'>
        {isMenuOpen ? "X" : "☰"}</button>

        {/*mobile dropdown*/}
        <div className={`absolute top-full bg-slate-600 text-white w-full left-0 h-auto py-4  sm:hidden z-100
          ${isMenuOpen ? "block" : "hidden"}`}>
          <ul className='flex flex-col items-center gap-y-2 text-base md:text-lg'>
             <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}  className='hover:text-amber-300 cursor-pointer'>Home</Link>
            </li>
            <li>
              <Link to="/pokemon" onClick={() => setIsMenuOpen(false)} className='hover:text-amber-300 cursor-pointer'>Pokemon</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;