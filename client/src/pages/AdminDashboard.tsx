import Layout from "@/components/Layout";
import { usePatients } from "@/hooks/use-patients";
import { useDoctors, useCreateDoctor } from "@/hooks/use-doctors";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, Stethoscope, Activity, CalendarCheck, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertDoctorSchema, type InsertDoctor } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function AddDoctorForm({ onSuccess }: { onSuccess: () => void }) {
  const { mutate, isPending } = useCreateDoctor();
  const form = useForm<InsertDoctor>({
    resolver: zodResolver(insertDoctorSchema),
    defaultValues: {
      name: "",
      department: "",
      available: true,
      schedule: []
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(data => mutate(data, { onSuccess }))} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dr. Name</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={isPending}>{isPending ? "Adding..." : "Add Doctor"}</Button>
      </form>
    </Form>
  );
}

export default function AdminDashboard() {
  const { data: patients } = usePatients();
  const { data: doctors } = useDoctors();
  const [open, setOpen] = useState(false);

  // Stats calculation
  const totalPatients = patients?.length || 0;
  const criticalCases = patients?.filter(p => p.urgencyScore === 'CRITICAL').length || 0;
  const activeDoctors = doctors?.filter(d => d.available).length || 0;

  // Chart data
  const deptData = [
    { name: 'Cardiology', cases: patients?.filter(p => p.predictedDisease?.includes('Heart')).length || 0 },
    { name: 'Neurology', cases: patients?.filter(p => p.predictedDisease?.includes('Stroke')).length || 0 },
    { name: 'Pulmonology', cases: patients?.filter(p => p.predictedDisease?.includes('Respiratory') || p.predictedDisease?.includes('Pneumonia')).length || 0 },
    { name: 'Trauma', cases: patients?.filter(p => p.predictedDisease?.includes('Trauma')).length || 0 },
    { name: 'General', cases: patients?.filter(p => p.predictedDisease?.includes('General')).length || 0 },
  ];

  return (
    <Layout role="admin">
      <div className="space-y-8">
        <div>
           <h1 className="text-3xl font-display font-bold text-slate-900">Hospital Administration</h1>
           <p className="text-muted-foreground">Overview and Resource Management</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <Card>
             <CardContent className="p-6 flex flex-col gap-1">
               <span className="text-sm text-muted-foreground font-medium">Total Admissions</span>
               <div className="flex items-center justify-between">
                 <span className="text-3xl font-bold text-slate-900">{totalPatients}</span>
                 <Users className="text-blue-500 w-8 h-8 opacity-20" />
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-6 flex flex-col gap-1">
               <span className="text-sm text-muted-foreground font-medium">Critical Cases</span>
               <div className="flex items-center justify-between">
                 <span className="text-3xl font-bold text-red-600">{criticalCases}</span>
                 <Activity className="text-red-500 w-8 h-8 opacity-20" />
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-6 flex flex-col gap-1">
               <span className="text-sm text-muted-foreground font-medium">Active Doctors</span>
               <div className="flex items-center justify-between">
                 <span className="text-3xl font-bold text-teal-600">{activeDoctors}</span>
                 <Stethoscope className="text-teal-500 w-8 h-8 opacity-20" />
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-6 flex flex-col gap-1">
               <span className="text-sm text-muted-foreground font-medium">Avg. Wait Time</span>
               <div className="flex items-center justify-between">
                 <span className="text-3xl font-bold text-slate-900">14m</span>
                 <CalendarCheck className="text-slate-500 w-8 h-8 opacity-20" />
               </div>
             </CardContent>
           </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Charts */}
          <Card className="shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Disease Distribution</CardTitle>
              <CardDescription>Cases by Department (Live)</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f1f5f9' }}
                  />
                  <Bar dataKey="cases" radius={[4, 4, 0, 0]}>
                    {deptData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#ef4444', '#f97316', '#3b82f6', '#14b8a6', '#64748b'][index % 5]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Doctors List */}
          <Card className="shadow-lg shadow-slate-200/50 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Medical Staff</CardTitle>
                <CardDescription>Available Doctors</CardDescription>
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-2" /> Add Staff</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Register New Doctor</DialogTitle></DialogHeader>
                  <AddDoctorForm onSuccess={() => setOpen(false)} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="space-y-4">
                {doctors?.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border shadow-sm text-slate-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.department}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${doc.available ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                      {doc.available ? 'On Duty' : 'Off Duty'}
                    </span>
                  </div>
                ))}
                {doctors?.length === 0 && <p className="text-center text-muted-foreground">No doctors registered.</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
