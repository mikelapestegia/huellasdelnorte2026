export interface ResponsibleCourse {
  courseName: string;
  status: "completed" | "in_progress" | "not_started";
  completedAt?: string;
  certificateUrl?: string;
}

export const responsibleCourses: ResponsibleCourse[] = [
  {
    courseName: "Curso oficial de tenencia responsable",
    status: "completed",
    completedAt: "2025-09-12",
    certificateUrl: "https://example.com/certificados/tenencia-responsable",
  },
];
