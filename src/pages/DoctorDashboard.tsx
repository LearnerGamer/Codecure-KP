import Layout from "@/components/Layout";
import { usePatients, useUpdatePatient } from "@/hooks/use-patients";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, ClipboardCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function DoctorDashboard() {
  const { data: patients } = usePatients();
  const { mutate: updatePatient } = useUpdatePatient();
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [notes, setNotes] = useState("");

  const waitingPatients = patients?.filter(p => p.status === 'waiting') || [];
  const myPatients = patients?.filter(p => p.status === 'assigned' || p.status === 'treated') || [];

  const handleAssign = (id: number) => {
    updatePatient({ id, status: 'assigned', assignedDoctorId: 1 }); // Mocking doctor ID 1
  };

  const handleTreat = () => {
    if (!selectedPatient) return;
    updatePatient({ id: selectedPatient.id, status: 'treated', notes: notes });
    setSelectedPatient(null);
    setNotes("");
  };

  return (
    <Layout role="doctor">
       <div className="space-y-8">
        <div>
           <h1 className="text-3xl font-display font-bold text-slate-900">Doctor Portal</h1>
           <p className="text-muted-foreground">Patient Management & Treatment</p>
        </div>

        <Tabs defaultValue="waiting" className="space-y-6">
          <TabsList className="bg-white p-1 shadow-sm border border-slate-200 rounded-xl">
            <TabsTrigger value="waiting" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg px-6">Emergency Queue ({waitingPatients.length})</TabsTrigger>
            <TabsTrigger value="assigned" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg px-6">My Patients ({myPatients.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="waiting" className="animate-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {waitingPatients.map((patient) => (
                <Card key={patient.id} className="border-l-4 border-l-primary shadow-md hover:shadow-lg transition-all">
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle>{patient.name}</CardTitle>
                        <span className={`text-xs px-2 py-0.5 rounded font-bold ${patient.urgencyScore === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                          {patient.urgencyScore}
                        </span>
                      </div>
                      <CardDescription>{patient.age} yrs • {patient.gender}</CardDescription>
                    </div>
                    <Button size="sm" onClick={() => handleAssign(patient.id)}>
                      Assign to Me <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700 border border-slate-100">
                      <strong>AI Prediction:</strong> {patient.predictedDisease}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm text-center">
                       <div className="bg-white border rounded p-2">
                         <div className="text-xs text-muted-foreground">Heart Rate</div>
                         <div className="font-semibold">{patient.heartRate}</div>
                       </div>
                       <div className="bg-white border rounded p-2">
                         <div className="text-xs text-muted-foreground">O2 Sat</div>
                         <div className="font-semibold">{patient.oxygenSaturation}%</div>
                       </div>
                       <div className="bg-white border rounded p-2">
                         <div className="text-xs text-muted-foreground">BP</div>
                         <div className="font-semibold">{patient.bloodPressureSystolic}/{patient.bloodPressureDiastolic}</div>
                       </div>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Symptoms</span>
                      <p className="text-sm text-slate-700 mt-1">{patient.symptoms}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {waitingPatients.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-400 bg-white rounded-xl border border-dashed">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No patients in waiting queue.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="assigned" className="animate-in">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myPatients.map((patient) => (
                  <Card key={patient.id} className={`shadow-sm ${patient.status === 'treated' ? 'opacity-75 bg-slate-50' : 'bg-white'}`}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                         {patient.name}
                         {patient.status === 'treated' && <CheckCircle2 className="text-green-500 w-5 h-5" />}
                      </CardTitle>
                      <CardDescription>{patient.predictedDisease}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {patient.status === 'treated' ? (
                        <div className="text-sm bg-green-50 text-green-800 p-3 rounded border border-green-100">
                          <strong>Treatment Notes:</strong><br/>
                          {patient.notes}
                        </div>
                      ) : (
                        <Dialog>
                          <DialogTrigger asChild>
                             <Button className="w-full" onClick={() => setSelectedPatient(patient)}>
                               <ClipboardCheck className="w-4 h-4 mr-2" />
                               Record Treatment
                             </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Treatment Record: {patient.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Diagnosis & Notes</label>
                                <Textarea 
                                  value={notes} 
                                  onChange={(e) => setNotes(e.target.value)} 
                                  placeholder="Enter final diagnosis and prescribed treatment..."
                                  className="h-32" 
                                />
                              </div>
                              <Button className="w-full" onClick={handleTreat}>Save & Discharge</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </CardContent>
                  </Card>
                ))}
             </div>
          </TabsContent>
        </Tabs>
       </div>
    </Layout>
  );
}
