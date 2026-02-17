import { KPICard } from "@/components/kpi-card"
import { resumenKPIs, rutas, alertas } from "@/lib/mock-data"
import { ArrowRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ResumenTab() {
  const topRutas = rutas.slice(0, 5)

  return (
    <div className="space-y-6 bg-transparent">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">Bienvenido!</h1>
          <p className="text-base text-slate-500 mt-1">Este es tu resumen...</p>
        </div>
        <Select defaultValue="enero-2026">
          <SelectTrigger className="w-[180px] bg-white border-0 text-slate-700 font-medium shadow-sm rounded-full">
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

      {/* KPI Cards - Fila Superior (3 Tarjetas) */}
      <div className="grid grid-cols-3 gap-6">
        <KPICard
          value={`${resumenKPIs.margenOperativo.valor}%`}
          label="Margen Operativo"
          sublabel="del mes"
          tendencia={resumenKPIs.margenOperativo.tendencia}
          variacionTexto={resumenKPIs.margenOperativo.variacionTexto}
          isBueno={true}
          invertColor={true} // Oscuro
        />
        <KPICard
          value={`$${resumenKPIs.costoKm.valor.toLocaleString("es-AR")}`}
          label="Costo/Km Promedio"
          sublabel="pesos/km"
          tendencia={resumenKPIs.costoKm.tendencia}
          variacionTexto={resumenKPIs.costoKm.variacionTexto}
          isBueno={false}
          invertColor={false} // Blanco
        />
        <KPICard
          value={`${resumenKPIs.otif.valor}%`}
          label="OTIF"
          sublabel="entregas a tiempo"
          tendencia={resumenKPIs.otif.tendencia}
          variacionTexto={resumenKPIs.otif.variacionTexto}
          isBueno={true}
          invertColor={false} // Blanco
        />
      </div>

      {/* KPI Cards - Fila del Medio (2 Tarjetas de distinto tamaño) */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <KPICard
            value={`${resumenKPIs.flotaDisponible.valor}%`}
            label="Flota Disponible"
            sublabel="14 de 15 unidades"
            tendencia={resumenKPIs.flotaDisponible.tendencia}
            variacionTexto={resumenKPIs.flotaDisponible.variacionTexto}
            isBueno={true}
            // 👇 ¡AQUÍ ESTÁ EL CAMBIO! Pasó de true a false para que la tarjeta sea blanca
            invertColor={false} 
          />
        </div>
        <div className="col-span-1">
          <KPICard
            value={resumenKPIs.diasCobranza.valor}
            label="Días Cobranza"
            sublabel="días promedio"
            tendencia={resumenKPIs.diasCobranza.tendencia}
            variacionTexto={resumenKPIs.diasCobranza.variacionTexto}
            isBueno={false}
            invertColor={false} // Blanco (el cambio que hicimos en el paso anterior)
          />
        </div>
      </div>

      {/* Tarjetas Inferiores (Listas de datos) */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        
        {/* Rentabilidad por Ruta */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border-0">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Rentabilidad por Ruta</h3>
          <div className="space-y-4">
            {topRutas.map((ruta) => {
              const isPositive = ruta.margen > 0
              const isNegative = ruta.margen < 0
              
              let margenColor = "text-slate-900"
              if (isPositive) margenColor = "text-emerald-500"
              else if (isNegative) margenColor = "text-rose-500"

              return (
                <div key={ruta.nombre} className="flex items-center justify-between pb-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">{ruta.nombre}</span>
                    <span className="text-xs text-slate-400">· {ruta.viajes} viajes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-sm font-bold ${margenColor}`}>
                      {isPositive ? "+" : ""}{ruta.margen}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          <button className="mt-8 text-sm font-medium text-slate-900 hover:text-slate-600 flex items-center gap-2 transition-colors">
            Ver análisis completo
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Alertas Recientes */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border-0">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Alertas Recientes</h3>
          <div className="space-y-5">
            {alertas.map((alerta, index) => (
              <div key={index} className="flex items-start gap-4">
                <span className="w-2 h-2 rounded-full bg-slate-300 mt-2 shrink-0" />
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-bold text-slate-800">{alerta.titulo}</span>
                  <span className="text-sm text-slate-500">
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