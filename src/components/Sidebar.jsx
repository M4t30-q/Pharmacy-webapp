import {
  Home,
  Boxes,
  Users,
  HelpCircle,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  ShoppingCart,
  Settings,
  PackageSearch,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar({ role, onNavigate, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        h-screen sticky top-0
        flex flex-col
        backdrop-blur-xl bg-white/5
        border-r border-white/10
        shadow-xl
        transition-all duration-300
        ${collapsed ? "w-16" : "w-60"}
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        {!collapsed && (
          <h3 className="text-lg font-semibold tracking-tight text-white/90">
            Panel
          </h3>
        )}

        <button
          onClick={() => setCollapsed(c => !c)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          {collapsed ? (
            <PanelLeft className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-3 space-y-2">

        <SidebarItem
          collapsed={collapsed}
          icon={<Home className="w-5 h-5" />}
          label="Dashboard"
          onClick={() => onNavigate("dashboard")}
        />

        <SidebarItem
          collapsed={collapsed}
          icon={<PackageSearch className="w-5 h-5" />}
          label="Productos"
          onClick={() => onNavigate("productos")}
        />

        <SidebarItem
          collapsed={collapsed}
          icon={<Boxes className="w-5 h-5" />}
          label="Inventario"
          onClick={() => onNavigate("inventario")}
        />

        <SidebarItem
          collapsed={collapsed}
          icon={<ShoppingCart className="w-5 h-5" />}
          label="Ventas"
          onClick={() => onNavigate("ventas")}
        />

        {role === "admin" && (
          <SidebarItem
            collapsed={collapsed}
            icon={<Users className="w-5 h-5" />}
            label="Usuarios"
            onClick={() => onNavigate("usuarios")}
          />
        )}

        <SidebarItem
          collapsed={collapsed}
          icon={<HelpCircle className="w-5 h-5" />}
          label="Ayuda"
          onClick={() => onNavigate("ayuda")}
        />

        <SidebarItem
          collapsed={collapsed}
          icon={<Settings className="w-5 h-5" />}
          label="Configuración"
          onClick={() => onNavigate("configuracion")}
        />

      </nav>

      {/* LOGOUT */}
      <button
        className="
          flex items-center gap-3 p-4 m-3
          rounded-xl text-white/80
          bg-white/5 border border-white/10
          hover:bg-red-500/20 hover:text-white transition
        "
        onClick={onLogout}
      >
        <LogOut className="w-5 h-5" />
        {!collapsed && "Logout"}
      </button>
    </aside>
  );
}

function SidebarItem({ collapsed, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-full flex items-center gap-3 px-4 py-3
        rounded-xl text-white/80
        bg-white/0
        hover:bg-white/10 transition
      "
    >
      {icon}
      {!collapsed && <span className="text-sm">{label}</span>}
    </button>
  );
}
