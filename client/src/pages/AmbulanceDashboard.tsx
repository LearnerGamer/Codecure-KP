import { useState } from "react";
import Layout from "@/components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Siren, Clock, UserCheck } from "lucide-react";
import VitalsForm from "@/components/VitalsForm";
import { usePatients } from "@/hooks/use-patients";
import { format } from "date-fns";

export default function AmbulanceDashboard() {
  const [open, setOpen] = useState(false);
  const { data: patients, isLoading } = usePatients();

  // Filter for patients created today or active
  const recentPatients = patients?.filter(p => p.status !== 'discharged') || [];

  return (
    <Layout role="ambulance">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">Ambulance Portal</h1>
            <p className="text-muted-foreground">Paramedic Emergency Admission Interface</p>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25">
                <Siren className="mr-2 h-5 w-5 animate-pulse" />
                New Emergency Admission
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display text-slate-900">Emergency Admission Form</DialogTitle>
              </DialogHeader>
              <VitalsForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-red-50 border-red-100">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <Siren className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-600">Critical Cases</p>
                <h3 className="text-2xl font-bold text-slate-900">
                  {recentPatients.filter(p => p.urgencyScore === "CRITICAL").length}
                </h3>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-100">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-600">Waiting Room</p>
                <h3 className="text-2xl font-bold text-slate-900">
                   {recentPatients.filter(p => p.status === "waiting").length}
                </h3>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-100">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-600">Total Admitted</p>
                <h3 className="text-2xl font-bold text-slate-900">
                   {recentPatients.length}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* List */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
             <CardTitle>Recent Admissions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
               <div className="text-center py-8">Loading records...</div>
            ) : recentPatients.length === 0 ? (
               <div className="text-center py-8 text-muted-foreground">No recent admissions found.</div>
            ) : (
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                    <tr>
                      <th className="px-6 py-3">Patient</th>
                      <th className="px-6 py-3">Urgency</th>
                      <th className="px-6 py-3">Predicted Condition</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Vitals</th>
                      <th className="px-6 py-3">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPatients.map((patient) => (
                      <tr key={patient.id} className="bg-white border-b hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {patient.name} <span className="text-slate-500 font-normal">({patient.age}, {patient.gender})</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            patient.urgencyScore === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                            patient.urgencyScore === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {patient.urgencyScore}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {patient.predictedDisease || "Pending Analysis"}
                        </td>
                        <td className="px-6 py-4">
                          <span className="capitalize px-2 py-1 bg-slate-100 rounded text-slate-600">
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500">
                           HR: {patient.heartRate} | BP: {patient.bloodPressureSystolic}/{patient.bloodPressureDiastolic} | O2: {patient.oxygenSaturation}%
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          {patient.createdAt ? format(new Date(patient.createdAt), 'HH:mm') : 'Now'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
