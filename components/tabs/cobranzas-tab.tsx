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
  // 👇 Colores dinámicos para los estados de cobranza
  const getStatusConfig = (estado: string) => {
    const config: Record<string, { label: string; color: string; bg: string }> = {
      ok: { label: "Al día", color: "text-emerald-700", bg: "bg-emerald-100" },
      warning: { label: "Atención", color: "text-amber-700", bg: "bg-amber-100" },
      critico: { label: "Crítico", color: "text-rose-700", bg: "bg-rose-100" }
    }
    return config[estado] || { label: estado, color: "text-slate-500", bg: "bg-slate-100" }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900">Cobranzas</h1>
        <p className="text-sm text-slate-500 mt-1">{empresaMock.periodo}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
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
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            {/* 👇 Encabezado: Fondo oscuro, textos blancos */}
            <TableRow className="bg-[#1c1c1e] hover:bg-[#1c1c1e] border-none">
              <TableHead className="font-semibold text-white h-14 pl-6">Cliente</TableHead>
              <TableHead className="text-center font-semibold text-white">Facturas</TableHead>
              <TableHead className="text-right font-semibold text-white">Monto Total</TableHead>
              <TableHead className="text-center font-semibold text-white">Días Prom.</TableHead>
              <TableHead className="text-right font-semibold text-white">Vencido</TableHead>
              <TableHead className="text-center font-semibold text-white pr-6">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente) => {
              // Si el cliente tiene deuda vencida, pintamos el número de rojo
              const vencidoColor = cliente.vencido > 0 ? "text-rose-600 font-semibold" : "text-slate-500"

              return (
                <TableRow key={cliente.nombre} className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors">
                  {/* 👇 Aplicamos border-r border-slate-100 a las celdas para el separador vertical */}
                  <TableCell className="font-bold text-slate-900 border-r border-slate-100 pl-6">{cliente.nombre}</TableCell>
                  <TableCell className="text-center text-slate-600 font-medium border-r border-slate-100">{cliente.facturas}</TableCell>
                  <TableCell className="text-right text-slate-600 font-medium border-r border-slate-100">{formatCurrency(cliente.monto)}</TableCell>
                  <TableCell className="text-center text-slate-600 border-r border-slate-100">
                    {cliente.diasProm}
                  </TableCell>
                  <TableCell className={`text-right border-r border-slate-100 ${vencidoColor}`}>
                    {cliente.vencido > 0 ? formatCurrency(cliente.vencido) : "$0"}
                  </TableCell>
                  <TableCell className="text-center pr-6">
                    {/* 👇 Etiquetas de estado dinámicas */}
                    {(() => {
                      const status = getStatusConfig(cliente.estado)
                      return (
                        <span className={`text-xs px-3 py-1 font-semibold rounded-full ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      )
                    })()}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Projection Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm max-w-md">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Proyección próximos 30 días</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-sm font-medium text-slate-600">Ingresos esperados</span>
            <span className="text-sm font-semibold text-emerald-600">{formatCurrency(proyeccion.ingresosEsperados)}</span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-sm font-medium text-slate-600">Egresos comprometidos</span>
            <span className="text-sm font-semibold text-rose-600">{formatCurrency(proyeccion.egresosComprometidos)}</span>
          </div>
          <div className="pt-2">
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl">
              <span className="text-base font-bold text-slate-900">Gap proyectado</span>
              <span className="text-lg font-extrabold text-slate-900">{formatCurrency(proyeccion.gap)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}