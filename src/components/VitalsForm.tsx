import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { insertPatientSchema } from "@shared/schema";
import { useCreatePatient } from "@/hooks/use-patients";
import { predictDiseaseLocal } from "@/hooks/use-ai";
import { useState } from "react";

// Extend schema for form validation
const formSchema = insertPatientSchema.extend({
  age: z.coerce.number().min(0, "Age is required"),
  heartRate: z.coerce.number().min(0),
  bloodPressureSystolic: z.coerce.number().min(0),
  bloodPressureDiastolic: z.coerce.number().min(0),
  oxygenSaturation: z.coerce.number().min(0).max(100),
  respiratoryRate: z.coerce.number().min(0),
});

type VitalsFormValues = z.infer<typeof formSchema>;

export default function VitalsForm({ onSuccess }: { onSuccess?: () => void }) {
  const { mutate, isPending } = useCreatePatient();
  const [prediction, setPrediction] = useState<any>(null);

  const form = useForm<VitalsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: "Male",
      medicalHistory: "",
      symptoms: "",
      allergies: "None",
      temperature: "98.6",
      consciousness: "Alert",
      // Numeric defaults handled by coercion
    },
  });

  function onSubmit(data: VitalsFormValues) {
    // Run local prediction before saving
    const result = predictDiseaseLocal(data);
    setPrediction(result);

    // Save to DB
    mutate({
      ...data,
      predictedDisease: result.disease,
      urgencyScore: result.urgency,
      status: "waiting",
    }, {
      onSuccess: () => {
        form.reset();
        if (onSuccess) onSuccess();
      }
    });
  }

  // Monitor values for live prediction feedback (optional)
  const watchAllFields = form.watch();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-slate-800 border-b pb-2">Patient Details</h3>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Vitals */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-slate-800 border-b pb-2">Vitals & Signs</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="heartRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heart Rate (BPM)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temperature (°F)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bloodPressureSystolic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BP Systolic</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="120" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bloodPressureDiastolic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BP Diastolic</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="80" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="oxygenSaturation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>O2 Saturation (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="respiratoryRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resp. Rate</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-slate-800 border-b pb-2">Clinical Assessment</h3>
            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symptoms (comma separated)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g. chest pain, shortness of breath, dizziness" className="h-20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="medicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical History</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Previous conditions..." className="h-20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full h-12 text-lg font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing Admission...
            </>
          ) : (
            "Admit Patient & Run AI Analysis"
          )}
        </Button>
      </form>
    </Form>
  );
}
