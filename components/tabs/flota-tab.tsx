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
      alerta: { label: "Alerta", color: "text-red-700", bg: "bg-red-100" },
      taller: { label: "En taller", color: "text-neutral-700", bg: "bg-neutral-200" }
    }
    return config[estado] || { label: estado, color: "text-muted-foreground", bg: "bg-muted" }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Flota</h1>
          <p className="text-sm text-muted-foreground">{empresaMock.periodo}</p>
        </div>
        <div className="flex rounded-md border border-border overflow-hidden">
          {(["todas", "operativas", "taller"] as FilterType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              className={cn(
                "px-3 py-1.5 text-sm transition-colors",
                filter === type
                  ? "bg-foreground text-background"
                  : "bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              {type === "taller" ? "En taller" : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-3">
        <KPICard
          value={flotaKPIs.totalUnidades}
          label="Total Unidades"
          sublabel="camiones"
        />
        <KPICard
          value={flotaKPIs.disponibles}
          label="Disponibles"
          sublabel="operativas"
        />
        <KPICard
          value={flotaKPIs.enMantenimiento}
          label="En Mantenimiento"
          sublabel="Unidad 09"
        />
        <KPICard
          value={formatNumber(flotaKPIs.kmTotalesMes)}
          label="Km Totales Mes"
          sublabel="kilómetros"
        />
      </div>

      {/* Data Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="font-medium">Unidad</TableHead>
              <TableHead className="font-medium">Patente</TableHead>
              <TableHead className="font-medium">Modelo</TableHead>
              <TableHead className="text-center font-medium">Año</TableHead>
              <TableHead className="text-right font-medium">Km Totales</TableHead>
              <TableHead className="text-center font-medium">Estado</TableHead>
              <TableHead className="text-right font-medium">Próx. Service</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUnidades.map((unidad) => (
              <TableRow key={unidad.id}>
                <TableCell className="font-medium">Unidad {String(unidad.id).padStart(2, "0")}</TableCell>
                <TableCell className="text-muted-foreground">{unidad.patente}</TableCell>
                <TableCell className="text-muted-foreground">{unidad.modelo}</TableCell>
                <TableCell className="text-center text-muted-foreground">{unidad.año}</TableCell>
                <TableCell className="text-right text-muted-foreground">{formatNumber(unidad.kmTotal)}</TableCell>
                <TableCell className="text-center">
                  {(() => {
                    const status = getStatusConfig(unidad.estado)
                    return (
                      <span className={`text-xs px-2 py-1 rounded-full ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    )
                  })()}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
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
