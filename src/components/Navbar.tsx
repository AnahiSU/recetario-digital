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
        <p className="text-black text-2xl font-bold tracking-wide">
          Munay
        </p>
      </div>

      <div className="w-10 h-10 rounded-full border-2 border-cream bg-slate-blue overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
        <img 
          src="/ruta-a-tu-foto.png" 
          alt="foto-usuario" 
          className="w-full h-full object-cover"
        />
      </div>

    </nav>
  );
}

export default Navbar;