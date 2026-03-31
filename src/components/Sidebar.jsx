import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, Ambulance, Stethoscope, HeartPulse, ShieldAlert, MonitorPlay, Users } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Emergency Request', path: '/', icon: <ShieldAlert size={20} /> },
    { name: 'Dispatch Center', path: '/dispatch', icon: <Ambulance size={20} /> },
    { name: 'Hospital Prep', path: '/preparation', icon: <Activity size={20} /> },
    { name: 'Live Vitals', path: '/patient/1', icon: <MonitorPlay size={20} /> },
    { name: 'Doctors & Staff', path: '/staff', icon: <Stethoscope size={20} /> },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="flex items-center gap-2 mb-6" style={{ padding: '0 24px' }}>
        <div className="live-indicator" style={{ backgroundColor: '#ef4444' }}></div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>AI<span style={{color: '#ef4444'}}>Medic</span></h2>
      </div>
      
      <div className="flex-col gap-2 flex" style={{ padding: '0 16px' }}>
        <div className="text-muted text-sm font-bold mb-2 ml-2" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Navigation</div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '8px',
              color: isActive ? '#fff' : 'var(--text-muted)',
              background: isActive ? 'var(--primary)' : 'transparent',
              fontWeight: isActive ? 600 : 500,
              transition: 'all 0.2s',
            })}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>

      <div style={{ marginTop: 'auto', padding: '24px' }}>
        <div className="card glass-panel" style={{ padding: '16px', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
          <div className="flex items-center gap-2 mb-2">
            <HeartPulse size={16} color="var(--primary)" />
            <span className="font-bold text-sm">System Status</span>
          </div>
          <div className="text-sm text-muted">All servers operational. AI severity models loaded.</div>
        </div>
      </div>
    </aside>
  );
}
