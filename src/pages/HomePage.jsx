import backgroundImg from '../assets/images/pokemon-removebg.png'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom';


function HomePage() {
  return (
    <div>
      <section 
      className="h-[80vh] flex w-full bg-no-repeat bg-center bg-contain my-4"
      style={{backgroundImage: `url(${backgroundImg})`}}
      >
        <div className='flex flex-col m-auto gap-10 items-center text-black'>
          <div>
          <h1 className='text-xl md:text-2xl font-extrabold text-slate-400 text-center'
          style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)' }}
          >
             <span className="text-amber-500">Discover</span> and <span className="text-blue-500">explore</span> a complete<br />
              collection of <span className="text-red-500 font-extrabold">Pokémon</span> from across generations. 
            </h1>
          </div>
          <div>
            <Link to="/Pokemon">
              <button 
              className='flex items-center cursor-pointer font-bold text-sm md:text-md rounded-xl bg-amber-500 p-2' 
              type='submit'>
              Explore 
              <ArrowRight className='w-5 h-5'/>
              </button>
            </Link>
            
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;