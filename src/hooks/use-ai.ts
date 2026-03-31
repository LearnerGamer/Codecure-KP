import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

type AiPredictionInput = z.infer<typeof api.ai.predict.input>;

export function useAiPredict() {
  return useMutation({
    mutationFn: async (data: AiPredictionInput) => {
      const res = await fetch(api.ai.predict.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to get prediction");
      return api.ai.predict.responses[200].parse(await res.json());
    },
  });
}

// Client-side prediction logic for immediate feedback (matching implementation_notes)
export function predictDiseaseLocal(data: any) {
  const symptoms = (data.symptoms || "").toLowerCase();
  const vitals = {
    oxygen: parseInt(data.oxygenSaturation) || 98,
    temperature: parseFloat(data.temperature) || 98.6,
    heartRate: parseInt(data.heartRate) || 72,
    sysBP: parseInt(data.bloodPressureSystolic) || 120,
    respRate: parseInt(data.respiratoryRate) || 16
  };

  if ((vitals.oxygen < 90 || symptoms.includes("chest pain") || symptoms.includes("chest pressure")) && vitals.heartRate > 100) {
    return { 
      disease: "Acute Myocardial Infarction (Heart Attack)", 
      department: "Cardiology",
      icon: "❤️",
      urgency: "CRITICAL",
      recommendations: "Immediate ECG, Troponin levels, Aspirin administration",
      color: "text-red-600 bg-red-50 border-red-200"
    };
  }

  if (symptoms.includes("paralysis") || symptoms.includes("numbness") || 
      symptoms.includes("slurred speech") || symptoms.includes("vision") ||
      symptoms.includes("face drooping")) {
    return { 
      disease: "Acute Cerebrovascular Accident (Stroke)", 
      department: "Neurology",
      icon: "🧠",
      urgency: "CRITICAL",
      recommendations: "CT scan immediately, tPA consideration, time is brain",
      color: "text-red-600 bg-red-50 border-red-200"
    };
  }

  if (vitals.oxygen < 88 || (vitals.respRate > 30 && vitals.oxygen < 92)) {
    return { 
      disease: "Acute Respiratory Distress Syndrome", 
      department: "Pulmonology",
      icon: "🫁",
      urgency: "CRITICAL",
      recommendations: "Oxygen therapy, ABG analysis, chest X-ray",
      color: "text-red-600 bg-red-50 border-red-200"
    };
  }

  if (vitals.temperature > 101.3 && vitals.heartRate > 90 && vitals.respRate > 20) {
    return { 
      disease: "Sepsis / Severe Systemic Infection", 
      department: "Emergency Medicine",
      icon: "🌡️",
      urgency: "HIGH",
      recommendations: "Blood cultures, IV antibiotics, lactate levels",
      color: "text-orange-600 bg-orange-50 border-orange-200"
    };
  }

  if (vitals.temperature > 100.4 && (symptoms.includes("cough") || symptoms.includes("breathing difficulty"))) {
    return { 
      disease: "Community-Acquired Pneumonia", 
      department: "Pulmonology",
      icon: "🫁",
      urgency: "HIGH",
      recommendations: "Chest X-ray, sputum culture, antibiotic therapy",
      color: "text-orange-600 bg-orange-50 border-orange-200"
    };
  }

  if (vitals.sysBP > 180) {
    return { 
      disease: "Hypertensive Emergency", 
      department: "Cardiology",
      icon: "❤️",
      urgency: "HIGH",
      recommendations: "IV antihypertensives, end-organ damage assessment",
      color: "text-orange-600 bg-orange-50 border-orange-200"
    };
  }

  if (symptoms.includes("bleeding") || symptoms.includes("fracture") || 
      symptoms.includes("injury") || symptoms.includes("accident")) {
    return { 
      disease: "Acute Trauma / Physical Injury", 
      department: "Emergency Medicine",
      icon: "🚑",
      urgency: "HIGH",
      recommendations: "Stabilization, imaging, surgical consultation",
      color: "text-orange-600 bg-orange-50 border-orange-200"
    };
  }

  // Default/Low urgency fallback
  return {
      disease: "General Consultation Required",
      department: "General Medicine",
      icon: "👨‍⚕️",
      urgency: "LOW",
      recommendations: "Routine checkup, monitoring",
      color: "text-green-600 bg-green-50 border-green-200"
  };
}
