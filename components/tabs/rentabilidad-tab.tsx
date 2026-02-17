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

  const handleViewTypeChange = (type: ViewType) => {
    setViewType(type)
    setSelectedFilter("all")
  }

  // Función auxiliar para pintar el margen de verde o rojo
  const getMargenColor = (margen: number) => {
    if (margen > 0) return "text-emerald-600 font-semibold"
    if (margen < 0) return "text-rose-600 font-semibold"
    return "text-slate-600"
  }

  return (
    <div className="space-y-8">
      {/* Header with Filters */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">Rentabilidad</h1>
          <p className="text-sm text-slate-500 mt-1">{empresaMock.periodo}</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-[200px] h-10 bg-white border-0 shadow-sm rounded-full font-medium text-slate-700">
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
          
          <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white shadow-sm h-10">
            {(["ruta", "cliente", "unidad"] as ViewType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleViewTypeChange(type)}
                className={cn(
                  "px-4 text-sm font-medium transition-colors border-r border-slate-200 last:border-0 h-full flex items-center justify-center",
                  viewType === type
                    ? "bg-[#1c1c1e] text-white"
                    : "bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                Por {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
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
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            {/* 👇 Encabezado: Fondo oscuro, textos blancos */}
            <TableRow className="bg-[#1c1c1e] hover:bg-[#1c1c1e] border-none">
              {headers.map((header, index) => (
                <TableHead 
                  key={header} 
                  className={cn(
                    "font-semibold text-white h-14",
                    header !== headers[0] && header !== "Modelo" && "text-right",
                    index === 0 && "pl-6", // Padding extra a la primera columna
                    index === headers.length - 1 && "pr-6" // Padding extra a la última
                  )}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* VISTA 1: RUTAS */}
            {viewType === "ruta" && (filteredData as typeof rutas).map((item) => {
              const margenAbsoluto = item.ingreso - item.costo
              return (
                <TableRow key={item.nombre} className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-bold text-slate-900 border-r border-slate-100 pl-6">{item.nombre}</TableCell>
                  <TableCell className="text-right text-slate-600 font-medium border-r border-slate-100">{item.viajes}</TableCell>
                  <TableCell className="text-right text-slate-500 border-r border-slate-100">{item.km.toLocaleString("es-AR")}</TableCell>
                  <TableCell className="text-right text-slate-600 border-r border-slate-100">{formatCurrency(item.ingreso)}</TableCell>
                  <TableCell className="text-right text-slate-600 border-r border-slate-100">{formatCurrency(item.costo)}</TableCell>
                  <TableCell className="text-right font-medium text-slate-900 border-r border-slate-100">{formatCurrency(margenAbsoluto)}</TableCell>
                  <TableCell className={`text-right pr-6 ${getMargenColor(item.margen)}`}>
                      {item.margen > 0 ? "+" : ""}{item.margen}%
                  </TableCell>
                </TableRow>
              )
            })}

            {/* VISTA 2: CLIENTES */}
            {viewType === "cliente" && (filteredData as typeof rentabilidadPorCliente).map((item) => {
              const margenAbsoluto = item.ingreso - item.costo
              return (
                <TableRow key={item.nombre} className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-bold text-slate-900 border-r border-slate-100 pl-6">{item.nombre}</TableCell>
                  <TableCell className="text-right text-slate-600 font-medium border-r border-slate-100">{item.viajes}</TableCell>
                  <TableCell className="text-right text-slate-500 border-r border-slate-100">{item.km.toLocaleString("es-AR")}</TableCell>
                  <TableCell className="text-right text-slate-600 border-r border-slate-100">{formatCurrency(item.ingreso)}</TableCell>
                  <TableCell className="text-right text-slate-600 border-r border-slate-100">{formatCurrency(item.costo)}</TableCell>
                  <TableCell className="text-right font-medium text-slate-900 border-r border-slate-100">{formatCurrency(margenAbsoluto)}</TableCell>
                  <TableCell className={`text-right pr-6 ${getMargenColor(item.margen)}`}>
                      {item.margen > 0 ? "+" : ""}{item.margen}%
                  </TableCell>
                </TableRow>
              )
            })}

            {/* VISTA 3: UNIDADES */}
            {viewType === "unidad" && (filteredData as typeof rentabilidadPorUnidad).map((item) => (
              <TableRow key={item.patente} className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-bold text-slate-900 border-r border-slate-100 pl-6">{item.patente}</TableCell>
                <TableCell className="text-slate-600 border-r border-slate-100">{item.modelo}</TableCell>
                <TableCell className="text-right text-slate-600 font-medium border-r border-slate-100">{item.viajes}</TableCell>
                <TableCell className="text-right text-slate-500 border-r border-slate-100">{item.km.toLocaleString("es-AR")}</TableCell>
                <TableCell className="text-right text-slate-600 border-r border-slate-100">{formatCurrency(item.ingreso)}</TableCell>
                <TableCell className="text-right text-slate-600 border-r border-slate-100">{formatCurrency(item.costo)}</TableCell>
                <TableCell className={`text-right pr-6 ${getMargenColor(item.margen)}`}>
                    {item.margen > 0 ? "+" : ""}{item.margen}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}