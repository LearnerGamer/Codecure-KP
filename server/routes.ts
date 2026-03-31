
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Doctors API
  app.get(api.doctors.list.path, async (req, res) => {
    const doctors = await storage.getDoctors();
    res.json(doctors);
  });

  app.get(api.doctors.get.path, async (req, res) => {
    const doctor = await storage.getDoctor(Number(req.params.id));
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  });

  app.post(api.doctors.create.path, async (req, res) => {
    try {
      const input = api.doctors.create.input.parse(req.body);
      const doctor = await storage.createDoctor(input);
      res.status(201).json(doctor);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // Patients API
  app.get(api.patients.list.path, async (req, res) => {
    const patients = await storage.getPatients();
    res.json(patients);
  });

  app.post(api.patients.create.path, async (req, res) => {
    try {
      const input = api.patients.create.input.parse(req.body);
      
      // Calculate prediction if possible, or leave it to frontend to pass it? 
      // The schema allows passing predictedDisease. 
      // Ideally we would run the logic here too for consistency, but for this prototype, 
      // we'll accept what the frontend sends or just save the data.
      
      const patient = await storage.createPatient(input);
      res.status(201).json(patient);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.put(api.patients.update.path, async (req, res) => {
    try {
      const input = api.patients.update.input.parse(req.body);
      const patient = await storage.updatePatient(Number(req.params.id), input);
      if (!patient) return res.status(404).json({ message: "Patient not found" });
      res.json(patient);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.delete(api.patients.delete.path, async (req, res) => {
    await storage.deletePatient(Number(req.params.id));
    res.sendStatus(204);
  });

  // AI Prediction Endpoint (Server-side implementation of the logic)
  app.post(api.ai.predict.path, (req, res) => {
    try {
      const { symptoms, vitals } = api.ai.predict.input.parse(req.body);
      
      // Implement the logic here as well for API consumers
      const symptomsLower = symptoms.toLowerCase();
      
      let result = {
        disease: "General Consultation Required",
        department: "General Medicine",
        icon: "👨‍⚕️",
        urgency: "LOW",
        recommendations: "Routine checkup, monitoring"
      };

      if ((vitals.oxygenSaturation < 90 || symptomsLower.includes("chest pain") || symptomsLower.includes("chest pressure")) && vitals.heartRate > 100) {
        result = { 
          disease: "Acute Myocardial Infarction (Heart Attack)", 
          department: "Cardiology",
          icon: "❤️",
          urgency: "CRITICAL",
          recommendations: "Immediate ECG, Troponin levels, Aspirin administration"
        };
      } else if (symptomsLower.includes("paralysis") || symptomsLower.includes("numbness") || 
          symptomsLower.includes("slurred speech") || symptomsLower.includes("vision") ||
          symptomsLower.includes("face drooping")) {
        result = { 
          disease: "Acute Cerebrovascular Accident (Stroke)", 
          department: "Neurology",
          icon: "🧠",
          urgency: "CRITICAL",
          recommendations: "CT scan immediately, tPA consideration, time is brain"
        };
      } else if (vitals.oxygenSaturation < 88 || (vitals.respiratoryRate > 30 && vitals.oxygenSaturation < 92)) {
        result = { 
          disease: "Acute Respiratory Distress Syndrome", 
          department: "Pulmonology",
          icon: "🫁",
          urgency: "CRITICAL",
          recommendations: "Oxygen therapy, ABG analysis, chest X-ray"
        };
      } else if (vitals.temperature > 101.3 && vitals.heartRate > 90 && vitals.respiratoryRate > 20) {
        result = { 
          disease: "Sepsis / Severe Systemic Infection", 
          department: "Emergency Medicine",
          icon: "🌡️",
          urgency: "HIGH",
          recommendations: "Blood cultures, IV antibiotics, lactate levels"
        };
      } else if (vitals.temperature > 100.4 && (symptomsLower.includes("cough") || symptomsLower.includes("breathing difficulty"))) {
        result = { 
          disease: "Community-Acquired Pneumonia", 
          department: "Pulmonology",
          icon: "🫁",
          urgency: "HIGH",
          recommendations: "Chest X-ray, sputum culture, antibiotic therapy"
        };
      } else if (vitals.bloodPressureSystolic > 180) {
        result = { 
          disease: "Hypertensive Emergency", 
          department: "Cardiology",
          icon: "❤️",
          urgency: "HIGH",
          recommendations: "IV antihypertensives, end-organ damage assessment"
        };
      } else if (symptomsLower.includes("bleeding") || symptomsLower.includes("fracture") || 
          symptomsLower.includes("injury") || symptomsLower.includes("accident")) {
        result = { 
          disease: "Acute Trauma / Physical Injury", 
          department: "Emergency Medicine",
          icon: "🚑",
          urgency: "HIGH",
          recommendations: "Stabilization, imaging, surgical consultation"
        };
      }

      res.json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // Seed Data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const doctorsList = await storage.getDoctors();
  if (doctorsList.length === 0) {
    const defaultDoctors = [
      { name: 'Dr. Sarah Johnson', department: 'Cardiology', available: true, schedule: ['09:00 AM', '11:00 AM', '02:00 PM'] },
      { name: 'Dr. Michael Chen', department: 'Emergency Medicine', available: true, schedule: ['08:00 AM', '12:00 PM'] },
      { name: 'Dr. Emily Roberts', department: 'Neurology', available: true, schedule: ['10:00 AM', '04:00 PM'] },
      { name: 'Dr. James Wilson', department: 'General Medicine', available: true, schedule: ['09:00 AM', '01:00 PM'] },
      { name: 'Dr. Maria Garcia', department: 'Pulmonology', available: true, schedule: ['11:00 AM', '03:00 PM'] },
    ];
    
    for (const doc of defaultDoctors) {
      await storage.createDoctor(doc);
    }
  }
}
