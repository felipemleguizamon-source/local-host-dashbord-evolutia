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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  rutas, 
  rentabilidadKPIs, 
  rentabilidadPorCliente, 
  rentabilidadPorUnidad,
  formatCurrency, 
  empresaMock 
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type ViewType = "ruta" | "cliente" | "unidad"

export function RentabilidadTab() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [viewType, setViewType] = useState<ViewType>("ruta")

  const getFilteredData = () => {
    switch (viewType) {
      case "ruta":
        return selectedFilter === "all" 
          ? rutas 
          : rutas.filter(r => r.nombre === selectedFilter)
      case "cliente":
        return selectedFilter === "all"
          ? rentabilidadPorCliente
          : rentabilidadPorCliente.filter(c => c.nombre === selectedFilter)
      case "unidad":
        return selectedFilter === "all"
          ? rentabilidadPorUnidad
          : rentabilidadPorUnidad.filter(u => u.patente === selectedFilter)
      default:
        return rutas
    }
  }

  const getFilterOptions = () => {
    switch (viewType) {
      case "ruta":
        return rutas.map(r => ({ value: r.nombre, label: r.nombre }))
      case "cliente":
        return rentabilidadPorCliente.map(c => ({ value: c.nombre, label: c.nombre }))
      case "unidad":
        return rentabilidadPorUnidad.map(u => ({ value: u.patente, label: `${u.patente} - ${u.modelo}` }))
      default:
        return []
    }
  }

  const getFilterPlaceholder = () => {
    switch (viewType) {
      case "ruta": return "Todas las rutas"
      case "cliente": return "Todos los clientes"
      case "unidad": return "Todas las unidades"
      default: return "Todos"
    }
  }

  const getTableHeaders = () => {
    switch (viewType) {
      case "ruta":
        return ["Ruta", "Viajes", "Km Totales", "Ingreso", "Costo", "Margen", "Margen %"]
      case "cliente":
        return ["Cliente", "Viajes", "Km Totales", "Ingreso", "Costo", "Margen", "Margen %"]
      case "unidad":
        return ["Unidad", "Modelo", "Viajes", "Km", "Ingreso", "Costo", "Margen %"]
      default:
        return []
    }
  }

  const filteredData = getFilteredData()
  const filterOptions = getFilterOptions()
  const headers = getTableHeaders()

  // Reset filter when view type changes
  const handleViewTypeChange = (type: ViewType) => {
    setViewType(type)
    setSelectedFilter("all")
  }

  return (
    <div className="space-y-8">
      {/* Header with Filters */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Rentabilidad</h1>
          <p className="text-sm text-muted-foreground">{empresaMock.periodo}</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-[200px] h-9 text-sm">
              <SelectValue placeholder={getFilterPlaceholder()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{getFilterPlaceholder()}</SelectItem>
              {filterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex rounded-md border border-border overflow-hidden">
            {(["ruta", "cliente", "unidad"] as ViewType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleViewTypeChange(type)}
                className={cn(
                  "px-3 py-1.5 text-sm transition-colors",
                  viewType === type
                    ? "bg-foreground text-background"
                    : "bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                Por {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-3">
        <KPICard
          value={rentabilidadKPIs.viajesMes}
          label="Viajes del Mes"
          sublabel="completados"
        />
        <KPICard
          value={formatCurrency(rentabilidadKPIs.ingresoTotal)}
          label="Ingreso Total"
          sublabel="facturado"
        />
        <KPICard
          value={formatCurrency(rentabilidadKPIs.costoTotal)}
          label="Costo Total"
          sublabel="operativo"
        />
        <KPICard
          value={formatCurrency(rentabilidadKPIs.margenBruto)}
          label="Margen Bruto"
          sublabel={`${rentabilidadKPIs.margenPorcentaje}% del ingreso`}
        />
      </div>

      {/* Data Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              {headers.map((header) => (
                <TableHead 
                  key={header} 
                  className={cn(
                    "font-medium",
                    header !== headers[0] && header !== "Modelo" && "text-right"
                  )}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {viewType === "ruta" && (filteredData as typeof rutas).map((item) => {
              const margenAbsoluto = item.ingreso - item.costo
              return (
                <TableRow key={item.nombre}>
                  <TableCell className="font-medium">{item.nombre}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{item.viajes}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{item.km.toLocaleString("es-AR")}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{formatCurrency(item.ingreso)}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{formatCurrency(item.costo)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(margenAbsoluto)}</TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm text-muted-foreground">
                      {item.margen > 0 ? "+" : ""}{item.margen}%
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
            {viewType === "cliente" && (filteredData as typeof rentabilidadPorCliente).map((item) => {
              const margenAbsoluto = item.ingreso - item.costo
              return (
                <TableRow key={item.nombre}>
                  <TableCell className="font-medium">{item.nombre}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{item.viajes}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{item.km.toLocaleString("es-AR")}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{formatCurrency(item.ingreso)}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{formatCurrency(item.costo)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(margenAbsoluto)}</TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm text-muted-foreground">
                      {item.margen > 0 ? "+" : ""}{item.margen}%
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
            {viewType === "unidad" && (filteredData as typeof rentabilidadPorUnidad).map((item) => (
              <TableRow key={item.patente}>
                <TableCell className="font-medium">{item.patente}</TableCell>
                <TableCell className="text-muted-foreground">{item.modelo}</TableCell>
                <TableCell className="text-right text-muted-foreground">{item.viajes}</TableCell>
                <TableCell className="text-right text-muted-foreground">{item.km.toLocaleString("es-AR")}</TableCell>
                <TableCell className="text-right text-muted-foreground">{formatCurrency(item.ingreso)}</TableCell>
                <TableCell className="text-right text-muted-foreground">{formatCurrency(item.costo)}</TableCell>
                <TableCell className="text-right">
                  <span className="text-sm text-muted-foreground">
                    {item.margen > 0 ? "+" : ""}{item.margen}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
