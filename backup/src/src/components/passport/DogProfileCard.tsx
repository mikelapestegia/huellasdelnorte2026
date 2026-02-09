import { Dog, Shield, Syringe, GraduationCap, Edit, MoreHorizontal } from "lucide-react";

export interface DogProfileData {
    id: string;
    name: string;
    breed: string;
    birthDate: string;
    weight: number;
    microchipId: string;
    photoUrl?: string;
    insuranceStatus: "active" | "expired" | "pending" | "expiring";
    vaccinesUpToDate: boolean;
    courseCompleted: boolean;
}

interface DogProfileCardProps {
    dog: DogProfileData;
    isSelected?: boolean;
    onSelect?: () => void;
    onEdit?: () => void;
}

export default function DogProfileCard({ dog, isSelected, onSelect, onEdit }: DogProfileCardProps) {
    const age = calculateAge(dog.birthDate);

    return (
        <div
            className={`relative rounded-2xl border-2 bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer ${isSelected ? "border-primary ring-2 ring-primary/20" : "border-border"
                }`}
            onClick={onSelect}
        >
            {/* Header with photo */}
            <div className="relative h-32 bg-gradient-to-br from-primary/20 to-accent/20">
                {dog.photoUrl ? (
                    <img src={dog.photoUrl} alt={dog.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <Dog className="h-16 w-16 text-primary/40" />
                    </div>
                )}

                {/* Edit button */}
                {onEdit && (
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onEdit(); }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                    >
                        <Edit className="h-4 w-4 text-foreground/70" />
                    </button>
                )}

                {/* Avatar badge */}
                <div className="absolute -bottom-8 left-4 h-16 w-16 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center">
                    {dog.photoUrl ? (
                        <img src={dog.photoUrl} alt="" className="h-full w-full rounded-full object-cover" />
                    ) : (
                        <Dog className="h-8 w-8 text-primary" />
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="pt-10 pb-4 px-4">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="font-serif text-xl font-bold text-foreground">{dog.name}</h3>
                        <p className="text-sm text-foreground/60">{dog.breed} · {age}</p>
                    </div>
                    <button
                        type="button"
                        className="p-1 rounded hover:bg-secondary/50 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MoreHorizontal className="h-5 w-5 text-foreground/50" />
                    </button>
                </div>

                {/* Microchip */}
                <div className="mb-4 px-3 py-2 rounded-lg bg-secondary/30">
                    <p className="text-xs text-foreground/60 mb-0.5">Microchip RIAC</p>
                    <p className="font-mono text-sm font-medium text-foreground">{dog.microchipId}</p>
                </div>

                {/* Status indicators */}
                <div className="flex flex-wrap gap-2">
                    <StatusBadge
                        icon={<Shield className="h-3.5 w-3.5" />}
                        label="Seguro"
                        status={dog.insuranceStatus}
                    />
                    <StatusBadge
                        icon={<Syringe className="h-3.5 w-3.5" />}
                        label="Vacunas"
                        status={dog.vaccinesUpToDate ? "active" : "expired"}
                    />
                    <StatusBadge
                        icon={<GraduationCap className="h-3.5 w-3.5" />}
                        label="Curso"
                        status={dog.courseCompleted ? "active" : "pending"}
                    />
                </div>
            </div>
        </div>
    );
}

function StatusBadge({
    icon,
    label,
    status
}: {
    icon: React.ReactNode;
    label: string;
    status: "active" | "expired" | "pending" | "expiring"
}) {
    const colors = {
        active: "bg-green-100 text-green-700 border-green-200",
        expired: "bg-red-100 text-red-700 border-red-200",
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        expiring: "bg-amber-100 text-amber-700 border-amber-200",
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
            {icon}
            {label}
        </span>
    );
}

function calculateAge(birthDate: string): string {
    const birth = new Date(birthDate);
    const now = new Date();
    const years = now.getFullYear() - birth.getFullYear();
    const months = now.getMonth() - birth.getMonth();

    if (years < 1) {
        return `${months + 12} meses`;
    }
    if (years === 1) {
        return "1 año";
    }
    return `${years} años`;
}
