import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiUser, FiEdit2, FiMail, FiAtSign } from "react-icons/fi";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import profileData from "../mocks/profile.json" with { type: "json" };

interface ProfileData {
    photoUrl: string | null;
    username: string;
    correo: string;
}

const INITIAL_PROFILE: ProfileData = profileData;

function Profile() {
    const [savedProfile, setSavedProfile] = useState<ProfileData>(INITIAL_PROFILE);
    const [draft, setDraft] = useState<ProfileData>(INITIAL_PROFILE);
    const [usernameEditable, setUsernameEditable] = useState(false);
    const [correoEditable, setCorreoEditable] = useState(false);
    const [errors, setErrors] = useState<{ username?: string; correo?: string }>({});
    const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(
        null
    );
    const fileInputRef = useRef<HTMLInputElement>(null);
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const correoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (draft.photoUrl) URL.revokeObjectURL(draft.photoUrl);
        };
    }, [draft.photoUrl]);
    function handleUploadClick() {
        fileInputRef.current?.click();
    }
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const objectUrl = URL.createObjectURL(file);
        setDraft((prev) => ({ ...prev, photoUrl: objectUrl }));
        e.target.value = "";
    }
    function handleRemovePhoto() {
        setDraft((prev) => ({ ...prev, photoUrl: null }));
    }
    function enableUsernameEdit() {
        setUsernameEditable(true);
        setTimeout(() => usernameInputRef.current?.focus(), 0);
    }
    function enableCorreoEdit() {
        setCorreoEditable(true);
        setTimeout(() => correoInputRef.current?.focus(), 0);
    }
    function validate(): boolean {
        const nextErrors: { username?: string; correo?: string } = {};
        if (!draft.username.trim()) nextErrors.username = "Este campo es obligatorio";
        if (!draft.correo.trim()) nextErrors.correo = "Este campo es obligatorio";
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }
    function handleGuardar() {
        if (!validate()) return;
        setSavedProfile(draft);
        setUsernameEditable(false);
        setCorreoEditable(false);
        setToast({ message: "Guardado con exito", type: "success" });
    }
    function requestCancelar() {
        setConfirmCancelOpen(true);
    }
    function confirmCancelar() {
        setConfirmCancelOpen(false);
        setDraft(savedProfile);
        setUsernameEditable(false);
        setCorreoEditable(false);
        setErrors({});
        setToast({ message: "Cambios cancelados", type: "info" });
    }
    return (
        <div className="p-8 w-full max-w-2xl font-poppins">
            <div className="mb-1">
                <Link
                    to="/perfil"
                    className="inline-flex items-center gap-2 text-2xl font-medium text-slate-800 hover:text-sage-green transition-colors w-fit"
                >
                    <FiChevronLeft className="text-3xl" />
                    Perfil
                </Link>
            </div>
            <p className="text-slate-500 text-sm mb-8 ml-1">
                Administra tu información personal y tu foto de perfil.
            </p>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center gap-6 p-8 bg-gradient-to-r from-cream to-cream/40 border-b border-slate-200">
                    <div className="w-28 h-28 rounded-full bg-slate-100 ring-4 ring-white shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
                        {draft.photoUrl ? (
                            <img
                                src={draft.photoUrl}
                                alt="Foto de perfil"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <FiUser size={40} className="text-slate-400" />
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={handleUploadClick}
                                className="px-5 py-2 rounded-full bg-slate-blue text-white text-sm shadow-sm hover:opacity-90 transition-opacity"
                            >
                                Subir foto
                            </button>
                            <button
                                onClick={handleRemovePhoto}
                                disabled={!draft.photoUrl}
                                className="px-5 py-2 rounded-full border border-slate-300 bg-white text-slate-700 text-sm hover:border-terracotta hover:text-terracotta transition-colors disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:text-slate-700 disabled:cursor-not-allowed"
                            >
                                Eliminar foto
                            </button>
                        </div>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                <div className="flex flex-col gap-6 p-8">
                    <div>
                        <label className="block text-slate-800 text-sm font-medium mb-2">
                            Username <span className="text-terracotta">*</span>
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <FiAtSign
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={16}
                                />
                                <input
                                    ref={usernameInputRef}
                                    type="text"
                                    value={draft.username}
                                    disabled={!usernameEditable}
                                    onChange={(e) =>
                                        setDraft((prev) => ({ ...prev, username: e.target.value }))
                                    }
                                    placeholder="Tu username"
                                    className={`w-full rounded-lg border pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors ${
                                        usernameEditable
                                            ? "bg-white border-slate-blue"
                                            : "bg-slate-50 border-slate-200"
                                    } ${errors.username ? "border-terracotta" : ""}`}
                                />
                            </div>
                            <button
                                onClick={enableUsernameEdit}
                                aria-label="Editar username"
                                className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-slate-blue hover:text-slate-blue transition-colors"
                            >
                                <FiEdit2 size={16} />
                            </button>
                        </div>
                        {errors.username && (
                            <p className="text-xs text-terracotta mt-1">{errors.username}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-slate-800 text-sm font-medium mb-2">
                            Correo <span className="text-terracotta">*</span>
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <FiMail
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={16}
                                />
                                <input
                                    ref={correoInputRef}
                                    type="email"
                                    value={draft.correo}
                                    disabled={!correoEditable}
                                    onChange={(e) =>
                                        setDraft((prev) => ({ ...prev, correo: e.target.value }))
                                    }
                                    placeholder="tucorreo@ejemplo.com"
                                    className={`w-full rounded-lg border pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors ${
                                        correoEditable
                                            ? "bg-white border-slate-blue"
                                            : "bg-slate-50 border-slate-200"
                                    } ${errors.correo ? "border-terracotta" : ""}`}
                                />
                            </div>
                            <button
                                onClick={enableCorreoEdit}
                                aria-label="Editar correo"
                                className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-slate-blue hover:text-slate-blue transition-colors"
                            >
                                <FiEdit2 size={16} />
                            </button>
                        </div>
                        {errors.correo && (
                            <p className="text-xs text-terracotta mt-1">{errors.correo}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 px-8 py-5 border-t border-slate-200 bg-slate-50/60">
                    <button
                        onClick={requestCancelar}
                        className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-white transition-colors text-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleGuardar}
                        className="px-6 py-2 rounded-lg bg-slate-blue text-white text-sm shadow-sm hover:opacity-90 transition-opacity"
                    >
                        Guardar
                    </button>
                </div>
            </div>
            {confirmCancelOpen && (
                <div className="fixed inset-0 z-50">
                    <ConfirmDialog
                        title="¿Seguro que quieres cancelar?"
                        message="Vas a perder los cambios que no has guardado."
                        confirmLabel="Si, cancelar"
                        cancelLabel="Seguir editando"
                        onConfirm={confirmCancelar}
                        onCancel={() => setConfirmCancelOpen(false)}
                    />
                </div>
            )}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    variant="floating"
                    onDone={() => setToast(null)}
                />
            )}
        </div>
    );
}

export default Profile;