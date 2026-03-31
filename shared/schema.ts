
import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const doctors = pgTable("doctors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  department: text("department").notNull(),
  available: boolean("available").default(true),
  schedule: jsonb("schedule").$type<string[]>().default([]),
});

export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  medicalHistory: text("medical_history"),
  
  // Vitals & Symptoms
  heartRate: integer("heart_rate"),
  bloodPressureSystolic: integer("bp_systolic"),
  bloodPressureDiastolic: integer("bp_diastolic"),
  temperature: text("temperature"), // float as text to avoid precision issues
  oxygenSaturation: integer("oxygen_saturation"),
  respiratoryRate: integer("respiratory_rate"),
  consciousness: text("consciousness"),
  symptoms: text("symptoms"),
  allergies: text("allergies"),

  // Prediction / Status
  predictedDisease: text("predicted_disease"),
  urgencyScore: text("urgency_score"), // CRITICAL, HIGH, MEDIUM, LOW
  status: text("status").default("waiting"), // waiting, assigned, treated
  
  // Assignment
  assignedDoctorId: integer("assigned_doctor_id"),
  roomNumber: text("room_number"),
  notes: text("notes"),
  
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDoctorSchema = createInsertSchema(doctors);
export const insertPatientSchema = createInsertSchema(patients).omit({ 
  id: true, 
  createdAt: true,
  status: true,
  predictedDisease: true,
  urgencyScore: true 
});

export type Doctor = typeof doctors.$inferSelect;
export type Patient = typeof patients.$inferSelect;
export type InsertDoctor = z.infer<typeof insertDoctorSchema>;
export type InsertPatient = z.infer<typeof insertPatientSchema>;
