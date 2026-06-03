import type {
  CapabilityCard,
  InsightPoint,
  WorkflowStep,
} from "@/src/features/home/types/home.types";

export const capabilityCards: CapabilityCard[] = [
  {
    title: "Akıllı Kategorilendirme",
    description:
      "Aylık ekstre satırlarını otomatik siniflandırır, yinelenen işlemleri tanır.",
    metric: "%94+ doğruluk",
  },
  {
    title: "Anomali Tespiti",
    description:
      "Normal harcama davranışından sapmaları erken tespit ederek riskleri azaltır.",
    metric: "Saatlik tarama",
  },
  {
    title: "Harcama Tahmini",
    description:
      "Geçmiş hareketlerini kullanıp ay sonu nakit çıkışını öngörür, limit uyarıları verir.",
    metric: "30 gün projeksiyon",
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    title: "1. Ekstreyi Ekle",
    description: "Dosya yükle veya satırları manuel gir. Sistem veriyi işlesin.",
  },
  {
    title: "2. AI Analizini Baslat",
    description: "Kategori, profil, anomali ve tahmin modelleri otomatik çalışsın.",
  },
  {
    title: "3. Sohbetle Sorgula",
    description: "Bota sor: Bu ay market neden artı? Birikim hedefim ne durumda?",
  },
];

export const insightPoints: InsightPoint[] = [
  { label: "Sabit Gider Payı", value: "%39", trend: "up" },
  { label: "Ani Harcama Alarmı", value: "4 olay", trend: "up" },
  { label: "Aylık Tasarruf Potansiyeli", value: "3.450 TL", trend: "down" },
];
