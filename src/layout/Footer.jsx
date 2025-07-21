import ball from '../assets/images/ball.png'

const Footer = () => {
  return (
    <footer className="flex justify-center min-h-10 md:min-h-11 bg-slate-600 items-center text-white">
      <p 
      className="text-base md:text-sm xl:text-md">
      {new Date().getFullYear()} 
      <img src={ball} className='w-5 h-5 inline' /> PokeList
      </p>
    </footer>
  );
}

export default Footer;