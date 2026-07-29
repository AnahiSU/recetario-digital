import { useState } from 'react';
import { FiMenu, FiSearch, FiPlusCircle, FiShoppingCart } from 'react-icons/fi';

function Sidebar() {
  const [activeTab, setActiveTab] = useState('menu');

  const menuItems = [
    { id: 'menu', icon: FiMenu },
    { id: 'search', icon: FiSearch },
    { id: 'add', icon: FiPlusCircle },
    { id: 'cart', icon: FiShoppingCart },
  ];

  return (
    <aside className="w-20 h-screen bg-sage-green/20 flex flex-col items-center py-6">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <div
            key={item.id}
            onClick={() => setActiveTab(item.id)}
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
          </div>
        );
      })}
    </aside>
  );
}

export default Sidebar;