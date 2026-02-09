export interface InsurancePolicy {
  policyNumber: string;
  providerName: string;
  status: "active" | "expired" | "pending";
  startDate: string;
  endDate: string;
  coverage: string;
}

export const insurancePolicies: InsurancePolicy[] = [
  {
    policyNumber: "HN-2026-0001",
    providerName: "Seguro Canino Norte",
    status: "active",
    startDate: "2025-10-01",
    endDate: "2026-10-01",
    coverage: "Responsabilidad civil a terceros",
  },
];
