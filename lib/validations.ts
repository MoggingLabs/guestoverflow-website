import { z } from "zod";

export const businessTypes = [
  "Restaurant",
  "Hotel",
  "Spa & wellness",
  "Tours & experiences",
  "Salon",
  "Other",
] as const;

/** 30-minute demo-call windows, 9:00–17:30 local time. */
export const demoSlots: string[] = Array.from({ length: 18 }, (_, i) => {
  const hour = 9 + Math.floor(i / 2);
  return `${hour}:${i % 2 === 0 ? "00" : "30"}`;
});

export const webPresences = [
  "My own website",
  "Google Business Profile / Maps",
  "Instagram",
  "Facebook",
  "TikTok",
  "Booking platforms (TheFork, OpenTable, Booking.com…)",
  "TripAdvisor",
  "Phone / WhatsApp",
  "Walk-ins & word of mouth",
  "Nothing yet, starting from scratch",
] as const;

/** Shared by the client form and the API route handler. */
export const demoRequestSchema = z
  .object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "That name looks too long"),
  email: z.email("Please enter a valid work email").max(200),
  businessName: z
    .string()
    .trim()
    .min(2, "Please enter your business name")
    .max(150, "That name looks too long"),
  businessType: z.enum(businessTypes, "Please choose your business type"),
  /** Required when businessType is "Other" — enforced in superRefine below. */
  businessTypeOther: z
    .string()
    .trim()
    .max(150, "Please keep it under 150 characters")
    .optional(),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .or(z.literal("")),
  preferredSlots: z
    .array(z.string().regex(/^\d{1,2}:\d{2}$/))
    .max(18)
    .optional(),
  webPresence: z.array(z.enum(webPresences)).max(webPresences.length).optional(),
  message: z.string().max(2000, "Please keep it under 2000 characters").optional(),
  pageSource: z.string().max(200).optional(),
  /** Honeypot — humans never fill this; bots that do get a fake success. */
  website: z.string().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.businessType === "Other" && !data.businessTypeOther?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["businessTypeOther"],
        message: "Please tell us what kind of business it is",
      });
    }
  });

export type DemoRequest = z.infer<typeof demoRequestSchema>;
