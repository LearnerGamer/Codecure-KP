import { Link } from "wouter";
import { Activity, ArrowRight, Lock, Bot, Siren, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      
      {/* Brand */}
      <div className="mb-12 text-center space-y-4">
        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 mx-auto rotate-3 hover:rotate-6 transition-transform">
          <Activity className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-display font-bold text-slate-900 tracking-tight">VITAL-SYNC</h1>
        <p className="text-xl text-slate-500 font-medium">Next-Gen Intelligent Hospital Management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        
        {/* Public Access Card */}
        <div className="md:col-span-2 group relative overflow-hidden bg-white rounded-3xl shadow-xl border border-slate-100 p-8 hover:shadow-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-primary/10"></div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-bold mb-2">
                <Bot className="w-4 h-4" />
                Public Feature
              </div>
              <h2 className="text-3xl font-bold text-slate-900">AI Doctor Assistant</h2>
              <p className="text-slate-500 max-w-md">
                Experience the future of triage. Enter your symptoms and vitals to get an instant AI-powered health assessment.
              </p>
            </div>
            <Link href="/ai-doctor">
              <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-lg shadow-primary/25 bg-primary hover:bg-primary/90">
                Try AI Doctor Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Login Cards */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-red-100 text-red-600 rounded-xl"><Siren className="w-6 h-6" /></div>
            <div>
               <h3 className="font-bold text-lg">Ambulance Portal</h3>
               <p className="text-sm text-slate-500">For Paramedics</p>
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded text-xs text-slate-500 font-mono border">
             User: nurse@demo<br/>Pass: nurse123
          </div>
          <Link href="/ambulance">
            <Button variant="outline" className="w-full border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200">
              Login to Ambulance <Lock className="w-3 h-3 ml-2 opacity-50" />
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Stethoscope className="w-6 h-6" /></div>
            <div>
               <h3 className="font-bold text-lg">Medical Staff</h3>
               <p className="text-sm text-slate-500">Doctors & Admin</p>
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded text-xs text-slate-500 font-mono border">
             User: doctor@demo<br/>Pass: doc123
          </div>
          <div className="grid grid-cols-2 gap-3">
             <Link href="/doctor">
                <Button variant="outline" className="w-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
                  Doctor Login
                </Button>
             </Link>
             <Link href="/admin">
                <Button variant="outline" className="w-full hover:bg-slate-100">
                  Admin Login
                </Button>
             </Link>
          </div>
        </div>

      </div>
      
      <p className="mt-8 text-sm text-slate-400">
        © 2025 VITAL-SYNC Health Systems. Demo Version.
      </p>
    </div>
  );
}
