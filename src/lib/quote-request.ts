import { z } from "zod";

export const quoteRequestSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  address: z.string().trim().min(5, "Please enter the project address").max(180),
  service: z.string().trim().min(1, "Select a service").max(120),
  message: z.string().trim().max(1000).optional(),
});

export const QUOTE_SERVICES = [
  "Garden Clean Ups",
  "Garden Bed Maintenance",
  "Lawn Care",
  "Tree Pruning",
  "Landscape Design",
  "Landscape Carpentry",
  "Lawn Maintenance",
  "Garden Design",
  "Tree Trimming",
  "Outdoor Lighting",
  "Hardscaping",
  "Yard Cleanups",
  "Other",
] as const;

export type QuoteRequestData = z.infer<typeof quoteRequestSchema>;
