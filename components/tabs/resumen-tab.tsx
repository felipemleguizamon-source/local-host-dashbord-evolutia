import { KPICard } from "@/components/kpi-card"
import { resumenKPIs, rutas, alertas, empresaMock } from "@/lib/mock-data"
import { ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ResumenTab() {
  const topRutas = rutas.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Resumen</h1>
          <p className="text-sm text-muted-foreground">{empresaMock.nombre}</p>
        </div>
        <Select defaultValue="enero-2026">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="enero-2026">Enero 2026</SelectItem>
            <SelectItem value="diciembre-2025">Diciembre 2025</SelectItem>
            <SelectItem value="noviembre-2025">Noviembre 2025</SelectItem>
            <SelectItem value="octubre-2025">Octubre 2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-5 gap-3">
        <KPICard
          value={`${resumenKPIs.margenOperativo.valor}%`}
          label="Margen Operativo"
          sublabel="del mes"
          tendencia={resumenKPIs.margenOperativo.tendencia}
          variacionTexto={resumenKPIs.margenOperativo.variacionTexto}
          isBueno={true}
        />
        <KPICard
          value={`$${resumenKPIs.costoKm.valor.toLocaleString("es-AR")}`}
          label="Costo/Km Promedio"
          sublabel="pesos/km"
          tendencia={resumenKPIs.costoKm.tendencia}
          variacionTexto={resumenKPIs.costoKm.variacionTexto}
          isBueno={false}
        />
        <KPICard
          value={`${resumenKPIs.otif.valor}%`}
          label="OTIF"
          sublabel="entregas a tiempo"
          tendencia={resumenKPIs.otif.tendencia}
          variacionTexto={resumenKPIs.otif.variacionTexto}
          isBueno={true}
        />
        <KPICard
          value={resumenKPIs.diasCobranza.valor}
          label="Días Cobranza"
          sublabel="días promedio"
          tendencia={resumenKPIs.diasCobranza.tendencia}
          variacionTexto={resumenKPIs.diasCobranza.variacionTexto}
          isBueno={false}
        />
        <KPICard
          value={`${resumenKPIs.flotaDisponible.valor}%`}
          label="Flota Disponible"
          sublabel="14 de 15 unidades"
          tendencia={resumenKPIs.flotaDisponible.tendencia}
          variacionTexto={resumenKPIs.flotaDisponible.variacionTexto}
          isBueno={true}
        />
      </div>

      {/* Two Cards Side by Side */}
      <div className="grid grid-cols-2 gap-4">
        {/* Rentabilidad por Ruta */}
        <div className="border border-border rounded-lg p-5 bg-background">
          <h3 className="text-sm font-medium text-foreground mb-4">Rentabilidad por Ruta</h3>
          <div className="space-y-3">
            {topRutas.map((ruta) => {
              const isPositive = ruta.margen > 0
              const margenColor = ruta.margen > 4 ? "text-green-600" : ruta.margen > 0 ? "text-foreground" : "text-red-600"
              const emoji = ruta.margen > 4 ? "🟢" : ruta.margen > 0 ? "🟡" : "🔴"

              return (
                <div key={ruta.nombre} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{ruta.nombre}</span>
                    <span className="text-xs text-muted-foreground/60">· {ruta.viajes} viajes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-sm font-medium ${margenColor}`}>
                      {isPositive ? "+" : ""}{ruta.margen}%
                    </span>
                    <span className="text-sm">{emoji}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <button className="mt-4 text-sm text-foreground hover:text-foreground/80 flex items-center gap-1 transition-colors">
            Ver análisis completo
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Alertas Recientes */}
        <div className="border border-border rounded-lg p-5 bg-background">
          <h3 className="text-sm font-medium text-foreground mb-4">Alertas Recientes</h3>
          <div className="space-y-4">
            {alertas.map((alerta, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-1.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground">{alerta.titulo}</span>
                  <span className="text-sm text-muted-foreground">
                    Acción sugerida: {alerta.accion}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
