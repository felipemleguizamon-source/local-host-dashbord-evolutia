import { KPICard } from "@/components/kpi-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { clientes, cobranzasKPIs, proyeccion, formatCurrency, empresaMock } from "@/lib/mock-data"

export function CobranzasTab() {
  const getStatusConfig = (estado: string) => {
    const config: Record<string, { label: string; color: string; bg: string }> = {
      ok: { label: "Al día", color: "text-emerald-700", bg: "bg-emerald-100" },
      warning: { label: "Atención", color: "text-amber-700", bg: "bg-amber-100" },
      critico: { label: "Crítico", color: "text-red-700", bg: "bg-red-100" }
    }
    return config[estado] || { label: estado, color: "text-muted-foreground", bg: "bg-muted" }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Cobranzas</h1>
        <p className="text-sm text-muted-foreground">{empresaMock.periodo}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-3">
        <KPICard
          value={formatCurrency(cobranzasKPIs.porCobrar)}
          label="Por Cobrar"
          sublabel="pendiente"
        />
        <KPICard
          value={cobranzasKPIs.diasPromedio}
          label="Días Promedio"
          sublabel="de cobranza"
        />
        <KPICard
          value={formatCurrency(cobranzasKPIs.vencido)}
          label="Vencido"
          sublabel="más de 30 días"
        />
        <KPICard
          value={formatCurrency(cobranzasKPIs.cobradoMes)}
          label="Cobrado este Mes"
        />
      </div>

      {/* Data Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="font-medium">Cliente</TableHead>
              <TableHead className="text-center font-medium">Facturas</TableHead>
              <TableHead className="text-right font-medium">Monto Total</TableHead>
              <TableHead className="text-center font-medium">Días Prom.</TableHead>
              <TableHead className="text-right font-medium">Vencido</TableHead>
              <TableHead className="text-center font-medium">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.nombre}>
                <TableCell className="font-medium">{cliente.nombre}</TableCell>
                <TableCell className="text-center text-muted-foreground">{cliente.facturas}</TableCell>
                <TableCell className="text-right text-muted-foreground">{formatCurrency(cliente.monto)}</TableCell>
                <TableCell className="text-center text-muted-foreground">
                  {cliente.diasProm}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {cliente.vencido > 0 ? formatCurrency(cliente.vencido) : "$0"}
                </TableCell>
                <TableCell className="text-center">
                  {(() => {
                    const status = getStatusConfig(cliente.estado)
                    return (
                      <span className={`text-xs px-2 py-1 rounded-full ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    )
                  })()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Projection Card */}
      <div className="border border-border rounded-lg p-5 bg-background">
        <h3 className="text-sm font-medium text-foreground mb-4">Proyección próximos 30 días</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Ingresos esperados</span>
            <span className="text-sm text-foreground">{formatCurrency(proyeccion.ingresosEsperados)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Egresos comprometidos</span>
            <span className="text-sm text-foreground">{formatCurrency(proyeccion.egresosComprometidos)}</span>
          </div>
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Gap proyectado</span>
              <span className="text-sm font-medium text-foreground">{formatCurrency(proyeccion.gap)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
