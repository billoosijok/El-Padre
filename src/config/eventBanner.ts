export interface EventBannerConfig {
  isActive: boolean;
  expiryDate: string; // ISO-8601 string specifying when the event finishes
  textKey: string;
  ctaKey: string;
}

export const eventBannerConfig: EventBannerConfig = {
  isActive: true,
  expiryDate: "2026-06-22T00:00:00+02:00", // French local time when June 21st ends
  textKey: "banner_fathers_day_text",
  ctaKey: "banner_fathers_day_cta",
};
