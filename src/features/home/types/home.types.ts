export type CapabilityCard = {
  title: string;
  description: string;
  metric: string;
};

export type WorkflowStep = {
  title: string;
  description: string;
};

export type InsightPoint = {
  label: string;
  value: string;
  trend: "up" | "down";
};
