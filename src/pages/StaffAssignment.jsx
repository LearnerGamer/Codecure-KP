import React, { useState } from 'react';
import { Stethoscope, UserCheck, UserX, UserMinus, PlusCircle, Activity } from 'lucide-react';

export default function StaffAssignment() {
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Sarah Jenkins', spec: 'Trauma Surgeon', status: 'Available', workload: 2 },
    { id: 2, name: 'Dr. Mark Lee', spec: 'Cardiologist', status: 'In Surgery', workload: 5 },
    { id: 3, name: 'Dr. Emily Chen', spec: 'ER Physician', status: 'Busy', workload: 4 },
    { id: 4, name: 'Dr. Alan Turing', spec: 'Neurologist', status: 'Available', workload: 0 },
    { id: 5, name: 'Nurse Jackie', spec: 'Head Nurse', status: 'Available', workload: 1 }
  ]);

  const [assigned, setAssigned] = useState({
    doc: { id: 1, name: 'Dr. Sarah Jenkins', spec: 'Trauma Surgeon' },
    nurse: { id: 5, name: 'Nurse Jackie', spec: 'Head Nurse' }
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Available': return <UserCheck size={16} color="var(--success)" />;
      case 'In Surgery': return <UserX size={16} color="var(--danger)" />;
      case 'Busy': return <UserMinus size={16} color="var(--warning)" />;
      default: return null;
    }
  };

  const getBadgeStyle = (status) => {
    switch(status) {
      case 'Available': return 'badge-success';
      case 'In Surgery': return 'badge-danger';
      case 'Busy': return 'badge-warning';
      default: return 'badge-primary';
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Resource Allocation</h1>
          <p className="text-muted mt-2">Intelligent Staff & Bed Management</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="card glass-panel flex" style={{ borderLeft: '4px solid var(--primary)', background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(0,0,0,0.5))' }}>
          <div className="flex-1">
             <h3 className="card-title text-primary"><Stethoscope size={20} /> Assigned Lead Doctor</h3>
             <div className="mt-4 text-2xl font-bold">{assigned.doc.name}</div>
             <div className="text-sm text-muted mt-1">{assigned.doc.spec}</div>
          </div>
          <div className="flex flex-col items-end justify-center">
             <div className="badge badge-primary mb-2">AUTO-ASSIGNED</div>
             <div className="text-xs text-muted">Based on availability & specialty</div>
          </div>
        </div>
        <div className="card glass-panel flex" style={{ borderLeft: '4px solid var(--secondary)', background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(0,0,0,0.5))' }}>
          <div className="flex-1">
             <h3 className="card-title text-secondary"><Activity size={20} /> Assigned Primary Nurse</h3>
             <div className="mt-4 text-2xl font-bold">{assigned.nurse.name}</div>
             <div className="text-sm text-muted mt-1">{assigned.nurse.spec}</div>
          </div>
          <div className="flex flex-col items-end justify-center">
             <div className="badge badge-secondary mb-2" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--secondary)', border: '1px solid rgba(139,92,246,0.3)' }}>AUTO-ASSIGNED</div>
             <div className="text-xs text-muted">Optimal workload distribution</div>
          </div>
        </div>
      </div>

      <div className="card glass-panel">
         <div className="card-header border-b pb-4 mb-4" style={{ borderColor: 'var(--panel-border)' }}>
            <h3 className="card-title"><UserCheck size={20} /> Staff Directory & Live Workload</h3>
         </div>
         <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--panel-border)' }}>
                     <th className="p-4 font-bold text-muted text-sm uppercase">Name</th>
                     <th className="p-4 font-bold text-muted text-sm uppercase">Specialization</th>
                     <th className="p-4 font-bold text-muted text-sm uppercase">Status</th>
                     <th className="p-4 font-bold text-muted text-sm uppercase">Workload</th>
                     <th className="p-4 font-bold text-muted text-sm uppercase text-right">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {doctors.map(doc => (
                     <tr key={doc.id} className="border-b hover:bg-white hover:bg-opacity-5 transition-colors" style={{ borderColor: 'var(--panel-border)' }}>
                        <td className="p-4 font-bold">{doc.name}</td>
                        <td className="p-4 text-muted">{doc.spec}</td>
                        <td className="p-4">
                           <span className={`badge ${getBadgeStyle(doc.status)}`}>
                              {getStatusIcon(doc.status)}
                              {doc.status}
                           </span>
                        </td>
                        <td className="p-4">
                           <div className="flex items-center gap-2">
                             <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden w-24">
                                <div style={{ width: `${(doc.workload / 8) * 100}%`, background: doc.workload > 4 ? 'var(--danger)' : doc.workload > 2 ? 'var(--warning)' : 'var(--success)', height: '100%' }}></div>
                             </div>
                             <span className="text-xs font-bold">{doc.workload} / 8</span>
                           </div>
                        </td>
                        <td className="p-4 text-right">
                           {doc.status !== 'In Surgery' ? (
                             <button className="btn btn-outline text-xs p-2">Assign</button>
                           ) : (
                             <button className="btn btn-danger text-xs p-2 bg-opacity-20" style={{ opacity: 0.5, cursor: 'not-allowed' }} disabled>Emergency Override</button>
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="mt-6 p-4 rounded-lg flex items-start gap-4" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59,130,246,0.3)' }}>
            <div className="mt-1"><PlusCircle size={20} color="var(--primary)" /></div>
            <div>
               <h4 className="font-bold text-primary mb-1">AI Emergency Slot Generation</h4>
               <p className="text-sm text-muted">
                 In case of zero availability, the system auto-pauses elective procedures and pagers the secondary trauma team from off-site. The intelligent queue drops lowest-risk patients down the list.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
