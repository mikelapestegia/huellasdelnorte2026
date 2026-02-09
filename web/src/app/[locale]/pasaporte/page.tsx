"use client";

import { useState } from "react";
import { Plus, Dog, FileCheck, Syringe, Shield, GraduationCap, Bell } from "lucide-react";
import DogProfileCard, { DogProfileData } from "@/components/passport/DogProfileCard";
import VaccinationTracker, { Vaccination } from "@/components/passport/VaccinationTracker";
import InsuranceManager, { InsurancePolicy } from "@/components/passport/InsuranceManager";
import LegalAlerts, { LegalAlert } from "@/components/passport/LegalAlerts";

// Mock data for MVP demo
const mockDogs: DogProfileData[] = [
    {
        id: "dog-001",
        name: "Luna",
        breed: "Border Collie",
        birthDate: "2022-03-15",
        weight: 18.5,
        microchipId: "941000024567890",
        insuranceStatus: "active",
        vaccinesUpToDate: true,
        courseCompleted: true,
    },
    {
        id: "dog-002",
        name: "Max",
        breed: "Golden Retriever",
        birthDate: "2020-08-22",
        weight: 32.0,
        microchipId: "941000024567891",
        insuranceStatus: "expiring",
        vaccinesUpToDate: false,
        courseCompleted: true,
    },
];

const mockVaccinations: Vaccination[] = [
    {
        id: "vac-001",
        name: "Antirrábica",
        date: "2025-06-15",
        expiresAt: "2026-06-15",
        veterinarian: "Clínica Veterinaria San Sebastián",
        status: "valid",
    },
    {
        id: "vac-002",
        name: "Polivalente (Moquillo, Parvo, Hepatitis)",
        date: "2025-03-10",
        expiresAt: "2026-03-10",
        veterinarian: "Clínica Veterinaria San Sebastián",
        status: "expiring",
    },
    {
        id: "vac-003",
        name: "Leptospirosis",
        date: "2024-09-20",
        expiresAt: "2025-09-20",
        veterinarian: "Hospital Veterinario Bilbao",
        status: "expired",
    },
];

const mockPolicies: InsurancePolicy[] = [
    {
        id: "pol-001",
        provider: "Mapfre",
        policyNumber: "MP-2025-123456",
        coverage: "RC hasta 150.000€",
        startDate: "2025-01-01",
        endDate: "2026-02-28",
        status: "expiring",
        monthlyPremium: 8.50,
    },
];

const mockAlerts: LegalAlert[] = [
    {
        id: "alert-001",
        type: "insurance_expiry",
        title: "Seguro próximo a vencer",
        message: "Tu póliza de Mapfre expira el 28 de febrero. Renuévala para evitar sanciones.",
        severity: "warning",
        createdAt: "2026-02-08T10:00:00Z",
        actionLabel: "Renovar ahora",
        actionUrl: "/pasaporte/seguro/renovar",
    },
    {
        id: "alert-002",
        type: "vaccination_due",
        title: "Vacuna de Leptospirosis vencida",
        message: "La vacuna de Luna venció el 20 de septiembre. Pide cita con tu veterinario.",
        severity: "critical",
        createdAt: "2026-02-07T14:30:00Z",
        actionLabel: "Buscar veterinario",
        actionUrl: "/marketplace/veterinarios",
    },
    {
        id: "alert-003",
        type: "course_reminder",
        title: "Curso de tenencia responsable",
        message: "Max aún no tiene el certificado del curso obligatorio completado.",
        severity: "info",
        createdAt: "2026-02-05T09:00:00Z",
        actionLabel: "Empezar curso",
        actionUrl: "/pasaporte/formacion",
    },
];

const tabs = [
    { id: "perfil", label: "Perfil", icon: Dog },
    { id: "vacunas", label: "Vacunas", icon: Syringe },
    { id: "seguro", label: "Seguro", icon: Shield },
    { id: "formacion", label: "Formación", icon: GraduationCap },
    { id: "alertas", label: "Alertas", icon: Bell },
];

export default function PasaportePage() {
    const [selectedDogId, setSelectedDogId] = useState(mockDogs[0].id);
    const [activeTab, setActiveTab] = useState("perfil");
    const [alerts, setAlerts] = useState(mockAlerts);

    const selectedDog = mockDogs.find(d => d.id === selectedDogId) || mockDogs[0];
    const criticalAlertCount = alerts.filter(a => !a.dismissed && a.severity === "critical").length;

    const handleDismissAlert = (alertId: string) => {
        setAlerts(prev => prev.map(a =>
            a.id === alertId ? { ...a, dismissed: true } : a
        ));
    };

    return (
        <main className="min-h-screen bg-background">
            {/* Hero header */}
            <div className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <FileCheck className="h-8 w-8" />
                        <h1 className="font-serif text-3xl md:text-4xl font-bold">
                            Pasaporte Digital
                        </h1>
                    </div>
                    <p className="text-white/90 text-lg max-w-2xl">
                        Gestiona la identidad legal de tus perros, vacunas, seguros y formación obligatoria
                        según la Ley de Bienestar Animal.
                    </p>
                </div>

                {/* Decorative wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 40L60 37.5C120 35 240 30 360 27.5C480 25 600 25 720 26.25C840 27.5 960 30 1080 31.25C1200 32.5 1320 32.5 1380 32.5L1440 32.5V40H1380C1320 40 1200 40 1080 40C960 40 840 40 720 40C600 40 480 40 360 40C240 40 120 40 60 40H0Z" fill="var(--background)" />
                    </svg>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Dog selector */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-serif text-xl font-bold text-foreground">Mis Perros</h2>
                        <button
                            type="button"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground font-medium hover:bg-secondary/30 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            Añadir perro
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockDogs.map(dog => (
                            <DogProfileCard
                                key={dog.id}
                                dog={dog}
                                isSelected={dog.id === selectedDogId}
                                onSelect={() => setSelectedDogId(dog.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Tab navigation */}
                <div className="mb-8 border-b border-border">
                    <nav className="flex gap-1 overflow-x-auto pb-px">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = tab.id === activeTab;
                            const showBadge = tab.id === "alertas" && criticalAlertCount > 0;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${isActive
                                            ? "border-primary text-primary"
                                            : "border-transparent text-foreground/60 hover:text-foreground hover:border-border"
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                    {showBadge && (
                                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                                            {criticalAlertCount}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Tab content */}
                <div className="max-w-3xl">
                    {activeTab === "perfil" && (
                        <div className="space-y-6">
                            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                                <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                                    Información de {selectedDog.name}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-foreground/60 mb-0.5">Raza</p>
                                        <p className="font-medium text-foreground">{selectedDog.breed}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-foreground/60 mb-0.5">Peso</p>
                                        <p className="font-medium text-foreground">{selectedDog.weight} kg</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-foreground/60 mb-0.5">Fecha de nacimiento</p>
                                        <p className="font-medium text-foreground">{formatDate(selectedDog.birthDate)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-foreground/60 mb-0.5">Microchip RIAC</p>
                                        <p className="font-mono text-sm text-foreground">{selectedDog.microchipId}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "vacunas" && (
                        <VaccinationTracker vaccinations={mockVaccinations} />
                    )}

                    {activeTab === "seguro" && (
                        <InsuranceManager policies={mockPolicies} />
                    )}

                    {activeTab === "formacion" && (
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg font-bold text-foreground">Curso de Tenencia Responsable</h3>
                                    <p className="text-sm text-foreground/60">Obligatorio según Ley 7/2023</p>
                                </div>
                            </div>

                            {selectedDog.courseCompleted ? (
                                <div className="px-4 py-3 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3 mb-4">
                                    <GraduationCap className="h-5 w-5 text-green-600" />
                                    <p className="font-medium text-green-800">Curso completado ✓</p>
                                </div>
                            ) : (
                                <div className="px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3 mb-4">
                                    <GraduationCap className="h-5 w-5 text-amber-600" />
                                    <p className="font-medium text-amber-800">Pendiente de completar</p>
                                </div>
                            )}

                            <p className="text-sm text-foreground/70 mb-4">
                                El curso incluye módulos sobre bienestar animal, alimentación, primeros auxilios
                                y normativa vigente. Duración aproximada: 2-3 horas.
                            </p>

                            <button
                                type="button"
                                className="w-full px-4 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                            >
                                {selectedDog.courseCompleted ? "Descargar certificado" : "Empezar curso"}
                            </button>
                        </div>
                    )}

                    {activeTab === "alertas" && (
                        <LegalAlerts
                            alerts={alerts}
                            onDismiss={handleDismissAlert}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}
