import { z } from "zod";

export const businessTypes = [
  "Restaurant",
  "Hotel",
  "Spa & wellness",
  "Tours & experiences",
  "Salon",
  "Other",
] as const;

export const demoWindows = ["Morning", "Afternoon"] as const;

export const webPresences = [
  "Website I'm happy with",
  "Website that needs work",
  "Google Business Profile only",
  "Starting from scratch",
] as const;

/** Shared by the client form and the API route handler. */
export const demoRequestSchema = z.object({
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
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .or(z.literal("")),
  preferredWindow: z.enum(demoWindows).optional().or(z.literal("")),
  webPresence: z.enum(webPresences).optional().or(z.literal("")),
  message: z.string().max(2000, "Please keep it under 2000 characters").optional(),
  pageSource: z.string().max(200).optional(),
  /** Honeypot — humans never fill this; bots that do get a fake success. */
  website: z.string().max(500).optional(),
});

export type DemoRequest = z.infer<typeof demoRequestSchema>;
