"use client"

import React, { useState } from "react"
import type { TabType } from "@/app/page"
import { cn } from "@/lib/utils"
import Image from "next/image"

import { 
  PiSquaresFourFill, 
  PiTrendUpFill, 
  PiGasPumpFill, 
  PiTruckFill, 
  PiReceiptFill, 
  PiGearFill, 
  PiUserFill 
} from "react-icons/pi"

interface SidebarProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const mainMenuItems: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: "resumen", label: "Resumen", icon: PiSquaresFourFill},
  { id: "rentabilidad", label: "Rentabilidad", icon: PiTrendUpFill},
  { id: "combustible", label: "Combustible", icon: PiGasPumpFill },
  { id: "flota", label: "Flota", icon: PiTruckFill },
  { id: "cobranzas", label: "Cobranzas", icon: PiReceiptFill },
]

const bottomMenuItems: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: "configuracion", label: "Configuración", icon: PiGearFill },
  { id: "cuenta", label: "Mi Cuenta", icon: PiUserFill },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={cn(
        // 👇 Fondo BLANCO para la barra lateral, margen de 4, bordes curvos y sombra
        "bg-white flex flex-col h-[calc(100vh-2rem)] m-4 rounded-[2rem] shadow-xl sticky top-4 transition-all duration-300 ease-in-out overflow-hidden z-20",
        isExpanded ? "w-64" : "w-20"
      )}
    >
      {/* Logo */}
      <div className={cn("p-6 pb-2 transition-all duration-300", !isExpanded && "px-0 flex justify-center")}>
        <div className="flex items-center gap-3">
          <Image
            src="/evolutia-io.png"
            alt="Evolutia"
            width={32}
            height={32}
            className="w-8 h-8 flex-shrink-0 object-contain"
          />
          <span
            className={cn(
              "font-bold text-[33px] text-slate-900 font-[family-name:var(--font-logo)] whitespace-nowrap transition-opacity duration-200",
              isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"
            )}
          >
            evolutia
          </span>
        </div>
      </div>

      <div className="mx-6 border-t border-slate-100 mt-4" />

      {/* Main Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-3 px-3">
          {mainMenuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id} className="w-full flex justify-center">
                <button
                  onClick={() => onTabChange(item.id)}
                  type="button"
                  className={cn(
                    "flex items-center transition-all duration-200 overflow-hidden",
                    isExpanded 
                      ? "w-full gap-3 py-3 px-4 rounded-xl justify-start" 
                      : "w-11 h-11 justify-center p-0 rounded-xl",
                    activeTab === item.id
                      ? "bg-[#1c1c1e] font-medium text-white shadow-md"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <Icon 
                    size={24}
                    className={cn(
                      "flex-shrink-0 transition-colors",
                      activeTab === item.id ? "text-white" : "text-slate-400"
                    )} 
                  />
                  <span
                    className={cn(
                      "whitespace-nowrap transition-all duration-300",
                      isExpanded ? "opacity-100 w-auto ml-1" : "opacity-0 w-0 ml-0 hidden"
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mx-6 border-t border-slate-100" />

      {/* Bottom Navigation */}
      <div className="py-6">
        <ul className="space-y-3 px-3">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id} className="w-full flex justify-center">
                <button
                  onClick={() => onTabChange(item.id)}
                  type="button"
                  className={cn(
                    "flex items-center transition-all duration-200 overflow-hidden",
                    isExpanded 
                      ? "w-full gap-3 py-3 px-4 rounded-xl justify-start" 
                      : "w-11 h-11 justify-center p-0 rounded-xl",
                    activeTab === item.id
                      ? "bg-[#1c1c1e] font-medium text-white shadow-md"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <Icon 
                    size={24}
                    className={cn(
                      "flex-shrink-0 transition-colors",
                      activeTab === item.id ? "text-white" : "text-slate-400"
                    )} 
                  />
                  <span
                    className={cn(
                      "whitespace-nowrap transition-all duration-300",
                      isExpanded ? "opacity-100 w-auto ml-1" : "opacity-0 w-0 ml-0 hidden"
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}