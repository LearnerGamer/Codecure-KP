import { z } from "zod";
import { insertPatientSchema, insertDoctorSchema } from "./schema";

export const patientSchema = insertPatientSchema.extend({
  id: z.number(),
  age: z.number().optional(),
  heartRate: z.number().optional(),
  bloodPressureSystolic: z.number().optional(),
  bloodPressureDiastolic: z.number().optional(),
  oxygenSaturation: z.number().optional(),
  respiratoryRate: z.number().optional(),
});

export const doctorSchema = insertDoctorSchema.extend({
  id: z.number(),
});

export const api = {
  patients: {
    list: {
      path: "/api/patients",
      responses: {
        200: z.array(patientSchema),
      },
    },
    create: {
      path: "/api/patients",
      responses: {
        201: patientSchema,
      },
    },
    update: {
      path: "/api/patients/:id",
      responses: {
        200: patientSchema,
      },
    },
    delete: {
      path: "/api/patients/:id",
      responses: {
        204: z.any(),
      },
    },
  },
  doctors: {
    list: {
      path: "/api/doctors",
      responses: {
        200: z.array(doctorSchema),
      },
    },
    create: {
      path: "/api/doctors",
      responses: {
        201: doctorSchema,
      },
    },
  },
  ai: {
    predict: {
      path: "/api/ai/predict",
      input: z.any(),
      responses: {
        200: z.any(),
      },
    },
  },
};

export function buildUrl(path: string, params: Record<string, any>) {
  let url = path;
  for (const key of Object.keys(params)) {
    const value = params[key];
    url = url.replace(`:${key}`, String(value));
  }
  return url;
}

export type InsertPatient = z.infer<typeof patientSchema>;
export type InsertDoctor = z.infer<typeof insertDoctorSchema>;
