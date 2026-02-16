import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface KPICardProps {
  value: string | number
  label: string
  sublabel?: string
  className?: string
  tendencia?: "up" | "down" | "neutral"
  variacionTexto?: string
  isBueno?: boolean
}

export function KPICard({ value, label, sublabel, className, tendencia, variacionTexto, isBueno }: KPICardProps) {
  const getTrendIcon = () => {
    if (!tendencia || tendencia === "neutral") {
      return <Minus className="w-3 h-3" />
    }
    if (tendencia === "up") {
      return <TrendingUp className="w-3 h-3" />
    }
    return <TrendingDown className="w-3 h-3" />
  }

  const getTrendColor = () => {
    if (!tendencia || tendencia === "neutral") {
      return "text-muted-foreground"
    }

    // Si isBueno es true, significa que subir es bueno
    // Si isBueno es false, significa que subir es malo
    if (tendencia === "up") {
      return isBueno ? "text-green-600" : "text-red-600"
    }
    // Si baja
    return isBueno ? "text-red-600" : "text-green-600"
  }

  return (
    <div className={cn("py-4 px-5 border border-border rounded-lg bg-background", className)}>
      <div className="flex flex-col gap-0.5">
        <span className="text-2xl font-semibold tracking-tight text-foreground">
          {value}
        </span>
        <span className="text-sm text-muted-foreground">{label}</span>
        {sublabel && (
          <span className="text-xs text-muted-foreground/70">{sublabel}</span>
        )}
        {variacionTexto && (
          <div className={cn("flex items-center gap-1 text-xs mt-1", getTrendColor())}>
            {getTrendIcon()}
            <span>{variacionTexto} vs dic</span>
          </div>
        )}
      </div>
    </div>
  )
}
