"use client"

import { useState } from "react"
import { KPICard } from "@/components/kpi-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { unidades, flotaKPIs, formatNumber, empresaMock } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type FilterType = "todas" | "operativas" | "taller"

export function FlotaTab() {
  const [filter, setFilter] = useState<FilterType>("todas")

  const filteredUnidades = unidades.filter(u => {
    if (filter === "todas") return true
    if (filter === "operativas") return u.estado === "operativa" || u.estado === "service_pronto" || u.estado === "alerta"
    if (filter === "taller") return u.estado === "taller"
    return true
  })

  const getStatusConfig = (estado: string) => {
    const config: Record<string, { label: string; color: string; bg: string }> = {
      operativa: { label: "Operativa", color: "text-emerald-700", bg: "bg-emerald-100" },
      service_pronto: { label: "Service pronto", color: "text-amber-700", bg: "bg-amber-100" },
      alerta: { label: "Alerta", color: "text-rose-700", bg: "bg-rose-100" },
      taller: { label: "En taller", color: "text-slate-700", bg: "bg-slate-200" }
    }
    return config[estado] || { label: estado, color: "text-slate-500", bg: "bg-slate-100" }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">Flota</h1>
          <p className="text-sm text-slate-500 mt-1">{empresaMock.periodo}</p>
        </div>
        
        <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white shadow-sm">
          {(["todas", "operativas", "taller"] as FilterType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors border-r border-slate-200 last:border-0",
                filter === type
                  ? "bg-[#1c1c1e] text-white"
                  : "bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {type === "taller" ? "En taller" : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard value={flotaKPIs.totalUnidades} label="Total Unidades" sublabel="camiones" />
        <KPICard value={flotaKPIs.disponibles} label="Disponibles" sublabel="operativas" />
        <KPICard value={flotaKPIs.enMantenimiento} label="En Mantenimiento" sublabel="Unidad 09" />
        <KPICard value={formatNumber(flotaKPIs.kmTotalesMes)} label="Km Totales Mes" sublabel="kilómetros" />
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            {/* 👇 AQUÍ ESTÁ EL ENCABEZADO: Fondo negro profundo, sin borde inferior */}
            <TableRow className="bg-[#1c1c1e] hover:bg-[#1c1c1e] border-none">
              <TableHead className="font-semibold text-white h-14 pl-6">Unidad</TableHead>
              <TableHead className="font-semibold text-white">Patente</TableHead>
              <TableHead className="font-semibold text-white">Modelo</TableHead>
              <TableHead className="text-center font-semibold text-white">Año</TableHead>
              <TableHead className="text-right font-semibold text-white">Km Totales</TableHead>
              <TableHead className="text-center font-semibold text-white">Estado</TableHead>
              <TableHead className="text-right font-semibold text-white pr-6">Próx. Service</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUnidades.map((unidad) => (
              <TableRow key={unidad.id} className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors">
                {/* 👇 A cada celda de abajo le agregamos "border-r border-slate-100" para marcar la columna */}
                <TableCell className="font-bold text-slate-900 border-r border-slate-100 pl-6">Unidad {String(unidad.id).padStart(2, "0")}</TableCell>
                <TableCell className="text-slate-600 font-medium border-r border-slate-100">{unidad.patente}</TableCell>
                <TableCell className="text-slate-500 border-r border-slate-100">{unidad.modelo}</TableCell>
                <TableCell className="text-center text-slate-500 border-r border-slate-100">{unidad.año}</TableCell>
                <TableCell className="text-right text-slate-600 font-medium border-r border-slate-100">{formatNumber(unidad.kmTotal)}</TableCell>
                <TableCell className="text-center border-r border-slate-100">
                  {(() => {
                    const status = getStatusConfig(unidad.estado)
                    return (
                      <span className={`text-xs px-3 py-1 font-semibold rounded-full ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    )
                  })()}
                </TableCell>
                {/* La última celda no lleva línea a la derecha */}
                <TableCell className="text-right text-slate-500 pr-6">
                  {unidad.proxService ? `${formatNumber(unidad.proxService)} km` : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}