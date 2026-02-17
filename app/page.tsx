"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AISidebar } from "@/components/ai-sidebar"
import { ResumenTab } from "@/components/tabs/resumen-tab"
import { RentabilidadTab } from "@/components/tabs/rentabilidad-tab"
import { CombustibleTab } from "@/components/tabs/combustible-tab"
import { FlotaTab } from "@/components/tabs/flota-tab"
import { CobranzasTab } from "@/components/tabs/cobranzas-tab"

export type TabType = "resumen" | "rentabilidad" | "combustible" | "flota" | "cobranzas" | "configuracion" | "cuenta"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("resumen")
  const [isAISidebarOpen, setIsAISidebarOpen] = useState(false)

  const renderTab = () => {
    switch (activeTab) {
      case "resumen": return <ResumenTab />
      case "rentabilidad": return <RentabilidadTab />
      case "combustible": return <CombustibleTab />
      case "flota": return <FlotaTab />
      case "cobranzas": return <CobranzasTab />
      case "configuracion": return <PlaceholderTab title="Configuración" />
      case "cuenta": return <PlaceholderTab title="Mi Cuenta" />
      default: return <ResumenTab />
    }
  }

  return (
    // 👇 Fondo general gris. Sin paddings extraños que encierren el contenido.
    <div className="flex h-screen bg-[#dee1e6] overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* 👇 Main transparente. Las tarjetas ahora flotan directamente sobre el gris. */}
      <main className="flex-1 p-8 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300/80 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">
        {renderTab()}
      </main>
      
      <AISidebar isOpen={isAISidebarOpen} onToggle={() => setIsAISidebarOpen(!isAISidebarOpen)} />
    </div>
  )
}

function PlaceholderTab({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <p className="text-slate-500 text-lg">{title} - Próximamente</p>
    </div>
  )
}