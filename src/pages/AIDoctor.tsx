import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Brain, HeartPulse, Stethoscope, AlertTriangle, ArrowRight, Activity, Thermometer, Wind } from "lucide-react";
import { predictDiseaseLocal } from "@/hooks/use-ai"; // Importing the local logic
import { motion, AnimatePresence } from "framer-motion";

export default function AIDoctor() {
  const [formData, setFormData] = useState({
    symptoms: "",
    heartRate: "",
    temperature: "",
    bloodPressureSystolic: "",
    oxygenSaturation: "",
    respiratoryRate: ""
  });
  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    // Simulate AI processing delay for effect
    setTimeout(() => {
      const prediction = predictDiseaseLocal(formData);
      setResult(prediction);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout role="public">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
            <Brain className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900">
            AI Diagnostic Assistant
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Powered by advanced machine learning to provide instant preliminary triage and condition assessment based on vital signs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="border-0 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary to-teal-400" />
            <CardHeader>
              <CardTitle>Patient Assessment</CardTitle>
              <CardDescription>Enter current vitals and symptoms</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePredict} className="space-y-6">
                <div className="space-y-2">
                  <Label>Symptoms</Label>
                  <Textarea 
                    name="symptoms"
                    placeholder="Describe what you are feeling (e.g., chest pain, dizziness...)" 
                    className="min-h-[100px] bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><HeartPulse className="w-4 h-4 text-red-500" /> Heart Rate</Label>
                    <Input 
                      name="heartRate"
                      type="number" 
                      placeholder="BPM" 
                      value={formData.heartRate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-orange-500" /> Temperature</Label>
                    <Input 
                      name="temperature"
                      type="number" 
                      step="0.1"
                      placeholder="°F" 
                      value={formData.temperature}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Activity className="w-4 h-4 text-blue-500" /> O2 Saturation</Label>
                    <Input 
                      name="oxygenSaturation"
                      type="number" 
                      placeholder="%" 
                      value={formData.oxygenSaturation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Wind className="w-4 h-4 text-teal-500" /> Resp. Rate</Label>
                    <Input 
                      name="respiratoryRate"
                      type="number" 
                      placeholder="/min" 
                      value={formData.respiratoryRate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                   <Label>Systolic BP</Label>
                   <Input 
                      name="bloodPressureSystolic"
                      type="number" 
                      placeholder="mmHg" 
                      value={formData.bloodPressureSystolic}
                      onChange={handleInputChange}
                      required
                    />
                </div>

                <Button 
                  type="submit" 
                  disabled={isAnalyzing}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-teal-600 hover:to-teal-700 transition-all duration-300"
                >
                  {isAnalyzing ? "Analyzing Vitals..." : "Analyze Symptoms"}
                  {!isAnalyzing && <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className={`border-2 shadow-2xl ${result.color} bg-white h-full`}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold tracking-wider uppercase bg-white/50 px-3 py-1 rounded-full border border-current">
                          {result.urgency} Priority
                        </span>
                        <span className="text-4xl">{result.icon}</span>
                      </div>
                      <CardTitle className="text-3xl font-bold mb-2">{result.disease}</CardTitle>
                      <CardDescription className="text-lg opacity-90 font-medium">
                        Recommended Department: {result.department}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-current/20">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Stethoscope className="w-5 h-5" />
                          Clinical Recommendations
                        </h4>
                        <p className="leading-relaxed">
                          {result.recommendations}
                        </p>
                      </div>

                      <div className="bg-slate-900 text-white p-4 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 shrink-0 text-yellow-400" />
                        <div className="text-sm">
                          <p className="font-bold mb-1">Disclaimer</p>
                          <p className="opacity-80">This is an AI-assisted preliminary assessment and does NOT replace professional medical advice. If this is an emergency, call emergency services immediately.</p>
                        </div>
                      </div>
                      
                      <Button variant="outline" onClick={() => setResult(null)} className="w-full border-current/30 hover:bg-current/10">
                        Reset Assessment
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50"
                >
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                    <Activity className="w-12 h-12 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-600 mb-2">Ready to Analyze</h3>
                  <p>Fill out the patient form to receive an instant AI-powered health assessment and triage recommendation.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  );
}
