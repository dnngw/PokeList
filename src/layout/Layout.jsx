import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";


const  Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";


  return (  
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-grow overflow-y-scroll">
        {children}
      </main>
      {isHomePage ? "" : <Footer />}
    </div>
  );
}

export default Layout;