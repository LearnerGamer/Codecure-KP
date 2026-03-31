import { z } from "zod";

export const insertPatientSchema = z.object({
  name: z.string(),
  gender: z.string(),
  medicalHistory: z.string().optional(),
  symptoms: z.string(),
  allergies: z.string().optional(),
  temperature: z.string().optional(),
  consciousness: z.string().optional(),
  predictedDisease: z.string().optional(),
  urgencyScore: z.string().optional(),
  status: z.string().optional(),
  assignedDoctorId: z.number().optional(),
});

export const insertDoctorSchema = z.object({
  name: z.string(),
  department: z.string(),
  available: z.boolean(),
  schedule: z.array(z.string()).optional()
});

export type InsertDoctor = z.infer<typeof insertDoctorSchema>;
export type InsertPatientBase = z.infer<typeof insertPatientSchema>;
