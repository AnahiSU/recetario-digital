import { FiClock, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface ReceiptCardProps {
    id: number | string;
    name: string;
    time: string;
    portions: string;
    urlPhoto: string;
}

function ReceiptCard({ id, name, time, portions, urlPhoto }: ReceiptCardProps) {
    return (
        <Link to={`/receta/${id}`} className="block transition-transform hover:scale-105">
            <div className="bg-sage-green/15 border-2 border-sage-green/60 p-3 w-full flex flex-col h-full">
                <div className="w-full h-32 overflow-hidden mb-3">
                    <img 
                        src={urlPhoto} 
                        alt={`Foto de ${name}`} 
                        className="w-full h-full object-cover"
                    />
                </div>
                <h3 className="text-slate-800 text-lg font-medium mb-2 font-poppins line-clamp-2">
                    {name}
                </h3>
                <div className="flex flex-col gap-1 text-sm text-gray-600 mt-auto">
                    <div className="flex items-center gap-1.5 font-inter">
                        <span>Tiempo: {time}</span>
                        <FiClock className="text-gray-700 text-base" />
                    </div>
                    <div className="flex items-center gap-1.5 font-inter">
                        <span>Porciones: {portions}</span>
                        <FiUser className="text-gray-700 text-base" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ReceiptCard;