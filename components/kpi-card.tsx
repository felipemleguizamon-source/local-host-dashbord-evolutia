"use client"

import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"

interface KPICardProps {
  value: string | number
  label: string
  sublabel?: string
  className?: string
  tendencia?: "up" | "down" | "neutral"
  variacionTexto?: string
  isBueno?: boolean
  invertColor?: boolean
}

export function KPICard({ 
  value, 
  label, 
  sublabel, 
  className,
  tendencia,
  variacionTexto,
  isBueno,
  invertColor 
}: KPICardProps) {
  
  // Simplificamos la lógica de colores: Si es bueno es Verde (emerald), si es malo es Rojo (rose)
  let trendColor = "text-slate-400"
  if (tendencia !== "neutral" && isBueno !== undefined) {
    trendColor = isBueno ? "text-emerald-500" : "text-rose-500"
  }

  return (
    <div className={cn(
      // 👇 Aquí está el estilo base: bordes muy curvos, sombras, y un efecto sutil al pasar el mouse
      "rounded-3xl shadow-sm p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
      
      // 👇 Separamos el estilo Oscuro (invertColor = true) del estilo Claro (invertColor = false)
      invertColor ? "bg-[#1c1c1e] text-white" : "bg-white text-slate-900",
      className
    )}>
      
      {/* Parte Superior: Valor Numérico y Porcentaje de Tendencia */}
      <div className="flex justify-between items-start mb-6">
        <div className="text-4xl font-bold tracking-tight">{value}</div>
        
        {tendencia && (
          <div className={cn("flex items-center text-sm font-semibold", trendColor)}>
            {tendencia === "up" && <ArrowUp size={16} className="mr-0.5" />}
            {tendencia === "down" && <ArrowDown size={16} className="mr-0.5" />}
            {tendencia === "neutral" && <Minus size={16} className="mr-0.5" />}
            {variacionTexto}
          </div>
        )}
      </div>
      
      {/* Parte Inferior: Títulos y Subtítulos */}
      <div>
        <p className={cn(
            "text-base font-semibold", 
            // El gris del título cambia según si la tarjeta es oscura o clara
            invertColor ? "text-zinc-300" : "text-slate-600"
        )}>
            {label}
        </p>
        
        {sublabel && (
          <p className={cn(
              "text-sm mt-1", 
              // El gris del subtítulo es más suave
              invertColor ? "text-zinc-500" : "text-slate-400"
          )}>
              {sublabel}
          </p>
        )}
      </div>
      
    </div>
  )
}