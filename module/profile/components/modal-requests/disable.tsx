"use client"

import { useUser } from "@/module/auth/context/useUser"
import { useState } from "react"
import { FiPauseCircle, FiX, FiInfo, FiCalendar, FiMoon } from "react-icons/fi"
import { disableAccount } from "../../actions/save-user-config"

type Props = {
    isOpen: boolean
    onClose: () => void
    username?: string
}

const DEACTIVATION_REASONS = [
    { value: "break", label: "Necesito un descanso" },
    { value: "busy", label: "Estoy muy ocupado/a" },
    { value: "privacy", label: "Razones de privacidad" },
    { value: "other", label: "Otra razon" },
]

const DEACTIVATION_DURATIONS = [
    { value: "7", label: "1 semana" },
    { value: "30", label: "1 mes" },
    { value: "90", label: "3 meses" },
    { value: "indefinite", label: "Indefinido" },
]

export const DeactivateAccountModal = ({ isOpen, onClose }: Props) => {

    const { userConfig, user, updateUserConfig } = useUser()
    const [reason, setReason] = useState("")
    const [duration, setDuration] = useState("")
    const [otherReason, setOtherReason] = useState("")
    const [isDeactivating, setIsDeactivating] = useState(false)

    const canDeactivate = reason && duration && (reason !== "other" || otherReason.trim())

    const handleDeactivate = async () => {
        if (!canDeactivate) return
        setIsDeactivating(true)
        try {
            // const finalReason = reason === "other" ? otherReason : reason
            const user = await disableAccount({ reason, otherReason, duration })
            if (user.data) updateUserConfig(user.data)
            onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setIsDeactivating(false)
        }
    }

    const handleClose = () => {
        if (isDeactivating) return
        setReason("")
        setDuration("")
        setOtherReason("")
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-base-100 rounded-2xl shadow-2xl border border-warning/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-warning/10 border-b border-warning/20 p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center shrink-0">
                            <FiPauseCircle className="w-6 h-6 text-warning" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-warning">Desactivar cuenta</h3>
                            <p className="text-sm text-base-content/70 mt-1">Tu cuenta sera pausada temporalmente</p>
                        </div>
                        <button
                            onClick={handleClose}
                            disabled={isDeactivating}
                            className="btn btn-ghost btn-sm btn-circle shrink-0"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-5">
                    {/* Info */}
                    <div className="bg-info/5 border border-info/20 rounded-xl p-4">
                        <div className="flex gap-3">
                            <FiInfo className="w-5 h-5 text-info shrink-0 mt-0.5" />
                            <div className="text-sm text-base-content/80">
                                <p className="font-medium text-info mb-1">Al desactivar tu cuenta:</p>
                                <ul className="space-y-1 list-disc list-inside text-base-content/70">
                                    <li>Tu perfil no sera visible para otros usuarios</li>
                                    <li>Tus publicaciones quedaran ocultas</li>
                                    <li>No recibiras notificaciones</li>
                                    <li>Podras reactivar tu cuenta en cualquier momento</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Razon */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-base-content/80 flex items-center gap-2">
                            <FiMoon className="w-4 h-4" />
                            Por que deseas desactivar tu cuenta?
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {DEACTIVATION_REASONS.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setReason(option.value)}
                                    className={`btn btn-sm justify-start ${reason === option.value ? "btn-warning btn-outline border-2" : "btn-ghost bg-base-200/50"
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>

                        {reason === "other" && (
                            <textarea
                                value={otherReason}
                                onChange={(e) => setOtherReason(e.target.value)}
                                placeholder="Cuentanos tu razon..."
                                rows={2}
                                className="textarea textarea-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors resize-none"
                            />
                        )}
                    </div>

                    {/* Duracion */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-base-content/80 flex items-center gap-2">
                            <FiCalendar className="w-4 h-4" />
                            Por cuanto tiempo?
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {DEACTIVATION_DURATIONS.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setDuration(option.value)}
                                    className={`btn btn-sm justify-start ${duration === option.value ? "btn-warning btn-outline border-2" : "btn-ghost bg-base-200/50"
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Preview de desactivacion */}
                    {canDeactivate && (
                        <div className="bg-base-200/50 rounded-xl p-4 space-y-2">
                            <p className="text-sm font-medium text-base-content/80">Resumen:</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center">
                                    <span className="text-lg font-bold text-base-content/40">{(userConfig?.username || user?.email)?.charAt(0).toUpperCase()}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-base-content/60 line-through">@{userConfig?.username || user?.email}</p>
                                    <p className="text-xs text-warning">
                                        Cuenta pausada por {DEACTIVATION_DURATIONS.find((d) => d.value === duration)?.label}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-base-300 p-4 flex gap-3 bg-base-200/30">
                    <button onClick={handleClose} disabled={isDeactivating} className="btn btn-ghost flex-1">
                        Cancelar
                    </button>
                    <button
                        onClick={handleDeactivate}
                        disabled={!canDeactivate || isDeactivating}
                        className="btn btn-warning flex-1 gap-2"
                    >
                        {isDeactivating ? (
                            <>
                                <span className="loading loading-spinner loading-sm" />
                                Desactivando...
                            </>
                        ) : (
                            <>
                                <FiPauseCircle className="w-4 h-4" />
                                Desactivar cuenta
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
