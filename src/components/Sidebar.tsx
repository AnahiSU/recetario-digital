import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiSearch, FiPlusCircle, FiShoppingCart, FiHeart } from 'react-icons/fi';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { id: 'receipts', icon: FiHeart, path: '/mis-recetas' },
    { id: 'menu', icon: FiMenu, path: '/menu-semanal' },
    { id: 'search', icon: FiSearch, path: '/buscar' },
    { id: 'add', icon: FiPlusCircle, path: '/agregar' },
    { id: 'cart', icon: FiShoppingCart, path: '/carrito' },
  ];

  return (
    <aside className="w-20 h-screen bg-sage-green/20 flex flex-col items-center py-6">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <Link
            to={item.path}
            key={item.id}
            className={`relative w-full h-20 flex justify-center items-center cursor-pointer transition-colors
              ${isActive ? 'bg-sage-green' : 'hover:bg-sage-green/30'}
            `}
          >
            <Icon 
              className={`text-3xl ${isActive ? 'text-black' : 'text-gray-700'}`} 
              strokeWidth={isActive ? 1.5 : 1}
            />
            {isActive && (
              <div 
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-0 h-0 
                           border-t-[16px] border-t-transparent 
                           border-b-[16px] border-b-transparent 
                           border-l-[16px] border-l-sage-green"
              ></div>
            )}
          </Link>
        );
      })}
    </aside>
  );
}

export default Sidebar;