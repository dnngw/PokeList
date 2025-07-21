
const Card = ({children, className = '', onClick}) => {
  return (  
    <div className={`bg-white shadow-2xl rounded-lg max-w-full overflow-hidden ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
 
export default Card;