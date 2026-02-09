export interface TriageSession {
  sessionId: string;
  createdAt: string;
  riskLevel: "low" | "medium" | "high";
  summary: string;
  recommendation: string;
}

export const triageSessions: TriageSession[] = [
  {
    sessionId: "TRI-2026-0001",
    createdAt: "2026-02-08T09:20:00Z",
    riskLevel: "medium",
    summary: "Letargo y falta de apetito reportados por 24h.",
    recommendation: "Teleconsulta en las próximas 12 horas.",
  },
];
