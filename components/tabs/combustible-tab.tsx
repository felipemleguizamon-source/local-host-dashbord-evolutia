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
        <h1 className="text-xl font-semibold text-foreground">Combustible</h1>
        <p className="text-sm text-muted-foreground">{empresaMock.periodo}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-3">
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
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="font-medium">Unidad</TableHead>
              <TableHead className="font-medium">Patente</TableHead>
              <TableHead className="text-right font-medium">Km Mes</TableHead>
              <TableHead className="text-right font-medium">Litros</TableHead>
              <TableHead className="text-right font-medium">L/100km</TableHead>
              <TableHead className="text-right font-medium">Esperado</TableHead>
              <TableHead className="text-right font-medium">Desvío</TableHead>
              <TableHead className="text-center font-medium">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unidadesConConsumo.map((unidad) => {
              const desvio = ((unidad.consumo - unidad.esperado) / unidad.esperado) * 100
              const getDesvioConfig = () => {
                if (Math.abs(desvio) < 5) return { label: "Normal", color: "text-emerald-700", bg: "bg-emerald-100" }
                if (Math.abs(desvio) < 10) return { label: "Atención", color: "text-amber-700", bg: "bg-amber-100" }
                return { label: "Alerta", color: "text-red-700", bg: "bg-red-100" }
              }
              const desvioConfig = getDesvioConfig()
              const desvioStatus = desvioConfig.label;
              
              return (
                <TableRow key={unidad.id}>
                  <TableCell className="font-medium">Unidad {String(unidad.id).padStart(2, "0")}</TableCell>
                  <TableCell className="text-muted-foreground">{unidad.patente}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{unidad.kmMes.toLocaleString("es-AR")}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{unidad.litros.toLocaleString("es-AR")}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{unidad.consumo.toFixed(1)}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{unidad.esperado.toFixed(1)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {desvio > 0 ? "+" : ""}{desvio.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${desvioConfig.bg} ${desvioConfig.color}`}>
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
      <div className="flex items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-300" />
          <span className="text-muted-foreground">{'Normal: Desvío < 5%'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-100 border border-amber-300" />
          <span className="text-muted-foreground">{'Atención: Desvío 5-10%'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-100 border border-red-300" />
          <span className="text-muted-foreground">{'Alerta: Desvío > 10%'}</span>
        </div>
      </div>
    </div>
  )
}
