
import { z } from 'zod';
import { insertDoctorSchema, insertPatientSchema, doctors, patients } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  doctors: {
    list: {
      method: 'GET' as const,
      path: '/api/doctors',
      responses: {
        200: z.array(z.custom<typeof doctors.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/doctors/:id',
      responses: {
        200: z.custom<typeof doctors.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/doctors',
      input: insertDoctorSchema,
      responses: {
        201: z.custom<typeof doctors.$inferSelect>(),
      },
    },
  },
  patients: {
    list: {
      method: 'GET' as const,
      path: '/api/patients',
      responses: {
        200: z.array(z.custom<typeof patients.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/patients',
      input: insertPatientSchema,
      responses: {
        201: z.custom<typeof patients.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/patients/:id',
      input: insertPatientSchema.partial().extend({
        assignedDoctorId: z.number().optional(),
        roomNumber: z.string().optional(),
        status: z.string().optional(),
      }),
      responses: {
        200: z.custom<typeof patients.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/patients/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  ai: {
    predict: {
      method: 'POST' as const,
      path: '/api/ai/predict',
      input: z.object({
        symptoms: z.string(),
        vitals: z.object({
          heartRate: z.number(),
          bloodPressureSystolic: z.number(),
          bloodPressureDiastolic: z.number(),
          temperature: z.number(),
          oxygenSaturation: z.number(),
          respiratoryRate: z.number(),
          consciousness: z.string().optional(),
        }),
      }),
      responses: {
        200: z.object({
          disease: z.string(),
          department: z.string(),
          icon: z.string(),
          urgency: z.string(),
          recommendations: z.string(),
        }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
