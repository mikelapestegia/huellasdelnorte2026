export interface TelemedSession {
  sessionId: string;
  status: "scheduled" | "completed" | "cancelled";
  scheduledAt: string;
  veterinarian: string;
  notes?: string;
}

export const telemedSessions: TelemedSession[] = [
  {
    sessionId: "TEL-2026-0001",
    status: "scheduled",
    scheduledAt: "2026-02-15T10:30:00Z",
    veterinarian: "Dra. Laura Martínez",
    notes: "Consulta preventiva y revisión general.",
  },
];
