import { useEffect } from "react";
import { FiCheckCircle, FiInfo } from "react-icons/fi";

interface ToastProps {
    message: string;
    type?: "success" | "info";
    onDone: () => void;
    duration?: number;
    variant?: "overlay" | "floating";
}
function Toast({ message, type = "success", onDone, duration = 1300, variant = "overlay" }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onDone, duration);
        return () => clearTimeout(timer);
    }, [duration, onDone]);

    const isSuccess = type === "success";
    const pill = (
        <div
            className={`flex items-center gap-2 px-5 py-3 rounded-full shadow-lg text-sm text-white font-poppins ${
                isSuccess ? "bg-sage-green" : "bg-slate-blue"
            }`}
        >
            {isSuccess ? <FiCheckCircle size={18} /> : <FiInfo size={18} />}
            {message}
        </div>
    );
    if (variant === "floating") {
        return (
            <div className="fixed inset-x-0 bottom-8 z-50 flex justify-center pointer-events-none">
                {pill}
            </div>
        );
    }
    return (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/70 rounded-2xl">
            {pill}
        </div>
    );
}
export default Toast;