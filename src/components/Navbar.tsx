import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="bg-terracotta flex items-center justify-between px-6 py-3 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-cream rounded-lg flex items-center justify-center overflow-hidden">
          <img 
            src="/ruta-a-tu-logo.png" 
            alt="logo" 
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-black text-2xl font-semibold tracking-wide font-poppins">
          Munay
        </p>
      </div>

      <Link
        to="/perfil"
        aria-label="Ir a mi perfil"
        className="w-10 h-10 rounded-full border-2 border-cream bg-slate-blue overflow-hidden cursor-pointer hover:opacity-80 transition-opacity block"
      >
        <img 
          src="https://i.pinimg.com/736x/b5/65/36/b56536e4948f6f1720cdfc686ebb3364.jpg" 
          alt="foto-usuario" 
          className="w-full h-full object-cover"
        />
      </Link>

    </nav>
  );
}

export default Navbar;
