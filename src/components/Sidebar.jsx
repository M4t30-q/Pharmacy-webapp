import { Home, Boxes, Users, HelpCircle, LogOut } from 'lucide-react';
import { useState } from "react";

export default function Sidebar({ role, onNavigate, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      <div className="sidebar-header">
        <button className="collapse-btn" onClick={() => setCollapsed(c => !c)} aria-label="Colapsar menú">
          {collapsed ? "☰" : "⮜"}
        </button>
        {!collapsed && <h3>Panel</h3>}
      </div>
      <nav>
        <button onClick={() => onNavigate("dashboard")} className="sidebar-item">
          <Home size={20}/> {!collapsed && "Dashboard"}
        </button>
        <button onClick={() => onNavigate("inventario")} className="sidebar-item">
          <Boxes size={20}/> {!collapsed && "Inventario"}
        </button>
        {role === "admin" && (
          <button onClick={() => onNavigate("usuarios")} className="sidebar-item">
            <Users size={20}/> {!collapsed && "Usuarios"}
          </button>
        )}
        <button onClick={() => onNavigate("ayuda")} className="sidebar-item">
          <HelpCircle size={20}/> {!collapsed && "Ayuda"}
        </button>
      </nav>
      <button className="sidebar-item logout" onClick={onLogout}>
        <LogOut size={20}/> {!collapsed && "Logout"}
      </button>
    </aside>
  );
}
