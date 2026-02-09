"use client";

import { useEffect, useState } from "react";
import { FileCheck, ShieldCheck, Stethoscope, AlertTriangle } from "lucide-react";

interface LegalRequirement {
  code: string;
  title: string;
  platformModule: string;
  consequence: string;
}

interface ResponsibleCourse {
  courseName: string;
  status: "completed" | "in_progress" | "not_started";
  completedAt?: string;
  certificateUrl?: string;
}

interface InsurancePolicy {
  policyNumber: string;
  providerName: string;
  status: "active" | "expired" | "pending";
  startDate: string;
  endDate: string;
  coverage: string;
}

interface TelemedSession {
  sessionId: string;
  status: "scheduled" | "completed" | "cancelled";
  scheduledAt: string;
  veterinarian: string;
  notes?: string;
}

interface TriageSession {
  sessionId: string;
  createdAt: string;
  riskLevel: "low" | "medium" | "high";
  summary: string;
  recommendation: string;
}

const fetchJson = async (url: string) => {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
};

export default function LegalHealthPanel() {
  const [requirements, setRequirements] = useState<LegalRequirement[]>([]);
  const [courses, setCourses] = useState<ResponsibleCourse[]>([]);
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);
  const [telemed, setTelemed] = useState<TelemedSession[]>([]);
  const [triage, setTriage] = useState<TriageSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [reqData, courseData, policyData, teleData, triageData] = await Promise.all([
          fetchJson("/api/legal/requirements"),
          fetchJson("/api/legal/courses"),
          fetchJson("/api/legal/insurance"),
          fetchJson("/api/health/telemed"),
          fetchJson("/api/health/triage"),
        ]);

        setRequirements(reqData.requirements ?? []);
        setCourses(courseData.courses ?? []);
        setPolicies(policyData.policies ?? []);
        setTelemed(teleData.sessions ?? []);
        setTriage(triageData.sessions ?? []);
      } catch (err) {
        setError("No se pudieron cargar los datos legales y de salud.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
        <p className="text-sm text-foreground/70">Cargando módulos legales y salud...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h3 className="font-serif text-2xl font-bold text-foreground">
              Obligaciones legales clave
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requirements.length === 0 ? (
              <p className="text-sm text-foreground/70">Sin requisitos cargados.</p>
            ) : (
              requirements.map((item) => (
                <div key={item.code} className="rounded-xl border border-border bg-secondary/10 p-4">
                  <p className="text-xs uppercase tracking-wide text-accent font-semibold">
                    {item.code.replaceAll("_", " ")}
                  </p>
                  <h4 className="text-lg font-semibold text-foreground mt-2">{item.title}</h4>
                  <p className="text-sm text-foreground/70 mt-2">{item.platformModule}</p>
                  <p className="text-xs text-foreground/60 mt-3">{item.consequence}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <FileCheck className="h-5 w-5 text-primary" />
              <h4 className="font-semibold text-foreground">Curso de tenencia</h4>
            </div>
            {courses.length === 0 ? (
              <p className="text-sm text-foreground/70">Sin cursos registrados.</p>
            ) : (
              courses.map((course) => (
                <div key={course.courseName} className="text-sm text-foreground/70">
                  <p className="font-semibold text-foreground">{course.courseName}</p>
                  <p>Estado: {course.status}</p>
                  {course.completedAt && <p>Completado: {course.completedAt}</p>}
                </div>
              ))
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h4 className="font-semibold text-foreground">Seguro de responsabilidad</h4>
            </div>
            {policies.length === 0 ? (
              <p className="text-sm text-foreground/70">Sin pólizas cargadas.</p>
            ) : (
              policies.map((policy) => (
                <div key={policy.policyNumber} className="text-sm text-foreground/70">
                  <p className="font-semibold text-foreground">{policy.providerName}</p>
                  <p>Póliza: {policy.policyNumber}</p>
                  <p>Vigencia: {policy.startDate} → {policy.endDate}</p>
                  <p>Estado: {policy.status}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Stethoscope className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">Telemedicina</h4>
          </div>
          {telemed.length === 0 ? (
            <p className="text-sm text-foreground/70">Sin sesiones programadas.</p>
          ) : (
            telemed.map((session) => (
              <div key={session.sessionId} className="text-sm text-foreground/70">
                <p className="font-semibold text-foreground">{session.veterinarian}</p>
                <p>Estado: {session.status}</p>
                <p>Fecha: {session.scheduledAt}</p>
                {session.notes && <p>{session.notes}</p>}
              </div>
            ))
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">Triaje IA</h4>
          </div>
          {triage.length === 0 ? (
            <p className="text-sm text-foreground/70">Sin triajes recientes.</p>
          ) : (
            triage.map((session) => (
              <div key={session.sessionId} className="text-sm text-foreground/70">
                <p className="font-semibold text-foreground">Riesgo: {session.riskLevel}</p>
                <p>{session.summary}</p>
                <p>Recomendación: {session.recommendation}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
