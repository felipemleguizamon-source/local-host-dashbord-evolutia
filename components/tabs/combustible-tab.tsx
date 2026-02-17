import { KPICard } from "@/components/kpi-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { unidades, combustibleKPIs, formatCurrency, empresaMock } from "@/lib/mock-data"

export function CombustibleTab() {
  const unidadesConConsumo = unidades.filter(u => u.estado !== "taller")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900">Combustible</h1>
        <p className="text-sm text-slate-500 mt-1">{empresaMock.periodo}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard
          value={`${combustibleKPIs.consumoPromedio}`}
          label="Consumo Promedio"
          sublabel="litros/100km"
        />
        <KPICard
          value={formatCurrency(combustibleKPIs.gastoCombustible)}
          label="Gasto Combustible"
          sublabel="del mes"
        />
        <KPICard
          value={`${combustibleKPIs.porcentajeCosto}%`}
          label="% del Costo Total"
        />
        <KPICard
          value={combustibleKPIs.unidadesAlerta}
          label="Unidades con Alerta"
          sublabel="consumo anormal"
        />
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            {/* 👇 Encabezado: Fondo oscuro, textos blancos */}
            <TableRow className="bg-[#1c1c1e] hover:bg-[#1c1c1e] border-none">
              <TableHead className="font-semibold text-white h-14 pl-6">Unidad</TableHead>
              <TableHead className="font-semibold text-white">Patente</TableHead>
              <TableHead className="text-right font-semibold text-white">Km Mes</TableHead>
              <TableHead className="text-right font-semibold text-white">Litros</TableHead>
              <TableHead className="text-right font-semibold text-white">L/100km</TableHead>
              <TableHead className="text-right font-semibold text-white">Esperado</TableHead>
              <TableHead className="text-right font-semibold text-white">Desvío</TableHead>
              <TableHead className="text-center font-semibold text-white pr-6">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unidadesConConsumo.map((unidad) => {
              const desvio = ((unidad.consumo - unidad.esperado) / unidad.esperado) * 100
              
              // 👇 Lógica de colores dinámicos para el estado
              const getDesvioConfig = () => {
                if (Math.abs(desvio) < 5) return { label: "Normal", color: "text-emerald-700", bg: "bg-emerald-100" }
                if (Math.abs(desvio) < 10) return { label: "Atención", color: "text-amber-700", bg: "bg-amber-100" }
                return { label: "Alerta", color: "text-rose-700", bg: "bg-rose-100" }
              }
              const desvioConfig = getDesvioConfig()
              
              // Para pintar el número de desvío de rojo si es malo
              const desvioColor = desvio > 10 ? "text-rose-600 font-bold" : "text-slate-600"

              return (
                <TableRow key={unidad.id} className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors">
                  {/* 👇 Aplicamos border-r border-slate-100 a las celdas para el separador vertical */}
                  <TableCell className="font-bold text-slate-900 border-r border-slate-100 pl-6">Unidad {String(unidad.id).padStart(2, "0")}</TableCell>
                  <TableCell className="text-slate-600 font-medium border-r border-slate-100">{unidad.patente}</TableCell>
                  <TableCell className="text-right text-slate-500 border-r border-slate-100">{unidad.kmMes.toLocaleString("es-AR")}</TableCell>
                  <TableCell className="text-right text-slate-500 border-r border-slate-100">{unidad.litros.toLocaleString("es-AR")}</TableCell>
                  <TableCell className="text-right text-slate-600 font-medium border-r border-slate-100">{unidad.consumo.toFixed(1)}</TableCell>
                  <TableCell className="text-right text-slate-500 border-r border-slate-100">{unidad.esperado.toFixed(1)}</TableCell>
                  <TableCell className={`text-right font-medium border-r border-slate-100 ${desvioColor}`}>
                    {desvio > 0 ? "+" : ""}{desvio.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-center pr-6">
                    <span className={`text-xs px-3 py-1 font-semibold rounded-full ${desvioConfig.bg} ${desvioConfig.color}`}>
                      {desvioConfig.label}
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-fit">
        <div className="flex items-center gap-2">
          {/* 👇 Colores sincronizados con las etiquetas */}
          <span className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="text-slate-600 font-medium">Normal: <span className="text-slate-400 font-normal">Desvío {'< 5%'}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="text-slate-600 font-medium">Atención: <span className="text-slate-400 font-normal">Desvío 5-10%</span></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500" />
          <span className="text-slate-600 font-medium">Alerta: <span className="text-slate-400 font-normal">Desvío {'> 10%'}</span></span>
        </div>
      </div>
    </div>
  )
}