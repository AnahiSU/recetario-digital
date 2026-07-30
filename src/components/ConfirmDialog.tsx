interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmDialog({
    isOpen,
    title,
    message,
    confirmLabel = "Si, continuar",
    cancelLabel = "Volver",
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-xl w-72 p-6 text-center font-poppins">
                <h3 className="text-lg font-medium text-slate-800 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 mb-6">{message}</p>
                <div className="flex justify-center gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-sm"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-md bg-terracotta text-white hover:opacity-90 transition-opacity text-sm"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ConfirmDialog;