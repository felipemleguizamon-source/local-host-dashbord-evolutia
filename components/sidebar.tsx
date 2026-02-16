"use client"

import React from "react"

import type { TabType } from "@/app/page"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"
import {
  LayoutDashboard,
  TrendingUp,
  Fuel,
  Truck,
  Receipt,
  Settings,
  User,
} from "lucide-react"

interface SidebarProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const mainMenuItems: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: "resumen", label: "Resumen", icon: LayoutDashboard },
  { id: "rentabilidad", label: "Rentabilidad", icon: TrendingUp },
  { id: "combustible", label: "Combustible", icon: Fuel },
  { id: "flota", label: "Flota", icon: Truck },
  { id: "cobranzas", label: "Cobranzas", icon: Receipt },
]

const bottomMenuItems: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: "configuracion", label: "Configuración", icon: Settings },
  { id: "cuenta", label: "Mi Cuenta", icon: User },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={cn(
        "bg-background border-r border-border flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out overflow-hidden",
        isExpanded ? "w-64" : "w-20"
      )}
    >
      {/* Logo */}
      <div className={cn("p-6 pb-4", !isExpanded && "flex justify-center")}>
        <div className="flex items-center gap-3">
          <div className="bg-foreground rounded-xl p-1.5 flex-shrink-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apple-icon%20-%20logo%20evolutia%20180x180-Y9I9Gwz2Vcp2fF9G2AWaEq9zdy6vZe.png"
              alt="Evolutia"
              width={32}
              height={32}
              className="w-7 h-7 invert"
            />
          </div>
          <span
            className={cn(
              "font-semibold text-lg text-foreground font-[family-name:var(--font-logo)] whitespace-nowrap transition-opacity duration-200",
              isExpanded ? "opacity-100" : "opacity-0 w-0"
            )}
          >
            evolutia.io
          </span>
        </div>
      </div>

      {/* Module and Client Name */}
      <div
        className={cn(
          "px-6 pb-6 transition-opacity duration-200",
          isExpanded ? "opacity-100" : "opacity-0 h-0 pb-0 overflow-hidden"
        )}
      >
        <p className="text-sm text-muted-foreground whitespace-nowrap">Gestión de Flota</p>
        <div className="mt-2">
          <span className="inline-block bg-foreground text-background text-sm font-medium px-4 py-1.5 rounded-md whitespace-nowrap">
            Transportes del Sur SA
          </span>
        </div>
      </div>

      {/* Separator */}
      <div className="mx-4 border-t border-border" />

      {/* Main Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {mainMenuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  type="button"
                  className={cn(
                    "w-full flex items-center gap-3 py-2.5 text-sm transition-colors",
                    isExpanded ? "px-6" : "px-0 justify-center",
                    activeTab === item.id
                      ? "bg-secondary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span
                    className={cn(
                      "whitespace-nowrap transition-opacity duration-200",
                      isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
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

      {/* Separator */}
      <div className="mx-4 border-t border-border mt-4" />

      {/* Bottom Navigation */}
      <div className="py-3">
        <ul className="space-y-0.5">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  type="button"
                  className={cn(
                    "w-full flex items-center gap-3 py-2 text-xs transition-colors",
                    isExpanded ? "px-6" : "px-0 justify-center",
                    activeTab === item.id
                      ? "bg-secondary font-medium text-foreground"
                      : "text-muted-foreground/70 hover:text-muted-foreground hover:bg-secondary/30"
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span
                    className={cn(
                      "whitespace-nowrap transition-opacity duration-200",
                      isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
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

      {/* CTA Demo */}
      <div
        className={cn(
          "px-4 pb-4 transition-opacity duration-200",
          isExpanded ? "opacity-100" : "opacity-0 h-0 pb-0 overflow-hidden"
        )}
      >
        <a
          href="#"
          className="block w-full border border-foreground/20 rounded-md py-2.5 px-4 text-center hover:bg-secondary/50 transition-colors"
        >
          <p className="text-sm font-medium text-foreground">¿Querés ver esto con TUS datos?</p>
          <p className="text-xs text-muted-foreground mt-0.5">Solicitar demo →</p>
        </a>
      </div>
    </aside>
  )
}
