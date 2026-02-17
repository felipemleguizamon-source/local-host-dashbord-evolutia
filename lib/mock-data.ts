export const empresaMock = {
  nombre: "EVOLUTIA",
  flota: 15,
  periodo: "Enero 2026"
}

export const resumenKPIs = {
  margenOperativo: {
    valor: 4.2,
    unidad: "%",
    estado: "warning" as const,
    variacion: -0.8,
    variacionTexto: "0.8pp",
    tendencia: "down" as const
  },
  costoKm: {
    valor: 2847,
    unidad: "$/km",
    estado: "ok" as const,
    variacion: 3.2,
    variacionTexto: "3.2%",
    tendencia: "up" as const
  },
  otif: {
    valor: 87,
    unidad: "%",
    estado: "ok" as const,
    variacion: 2,
    variacionTexto: "2pp",
    tendencia: "up" as const
  },
  diasCobranza: {
    valor: 38,
    unidad: "días",
    estado: "critical" as const,
    variacion: 5,
    variacionTexto: "5 días",
    tendencia: "up" as const
  },
  flotaDisponible: {
    valor: 93,
    unidad: "%",
    estado: "ok" as const,
    variacion: 0,
    variacionTexto: "sin cambio",
    tendencia: "neutral" as const
  }
}

export const rutas = [
  { nombre: "Rosario - CABA", viajes: 42, km: 12600, ingreso: 15800000, costo: 14800000, margen: 6.1 },
  { nombre: "Rosario - Mendoza", viajes: 28, km: 19600, ingreso: 12400000, costo: 12000000, margen: 3.2 },
  { nombre: "Rosario - Tucumán", viajes: 18, km: 11250, ingreso: 7100000, costo: 6900000, margen: 2.8 },
  { nombre: "Rosario - Bahía Blanca", viajes: 15, km: 8250, ingreso: 5800000, costo: 5740000, margen: 1.1 },
  { nombre: "Rosario - Córdoba", viajes: 31, km: 10850, ingreso: 8200000, costo: 8300000, margen: -1.4 },
  { nombre: "Distribución Local", viajes: 11, km: 1980, ingreso: 4700000, costo: 4200000, margen: 10.2 }
]

export const unidades = [
  { id: 1, patente: "AB123CD", modelo: "Scania R450", año: 2021, kmTotal: 245000, kmMes: 8421, litros: 3115, consumo: 37.0, esperado: 38.0, estado: "operativa" as const, proxService: 12000 },
  { id: 2, patente: "CD456EF", modelo: "Volvo FH", año: 2020, kmTotal: 312000, kmMes: 7890, litros: 2998, consumo: 38.0, esperado: 38.0, estado: "operativa" as const, proxService: 8500 },
  { id: 3, patente: "EF234GH", modelo: "Mercedes Actros", año: 2021, kmTotal: 198000, kmMes: 7200, litros: 2736, consumo: 38.0, esperado: 38.0, estado: "operativa" as const, proxService: 15000 },
  { id: 4, patente: "IJ567KL", modelo: "Scania R450", año: 2020, kmTotal: 278000, kmMes: 6800, litros: 2584, consumo: 38.0, esperado: 38.0, estado: "operativa" as const, proxService: 9200 },
  { id: 5, patente: "MN890OP", modelo: "Volvo FH", año: 2022, kmTotal: 145000, kmMes: 7500, litros: 2850, consumo: 38.0, esperado: 38.0, estado: "operativa" as const, proxService: 11000 },
  { id: 6, patente: "QR123ST", modelo: "Scania R450", año: 2021, kmTotal: 220000, kmMes: 6900, litros: 2622, consumo: 38.0, esperado: 38.0, estado: "operativa" as const, proxService: 7800 },
  { id: 7, patente: "GH789IJ", modelo: "Scania R450", año: 2020, kmTotal: 287000, kmMes: 6230, litros: 2805, consumo: 45.0, esperado: 38.0, estado: "alerta" as const, proxService: 5000 },
  { id: 8, patente: "UV456WX", modelo: "Mercedes Actros", año: 2020, kmTotal: 310000, kmMes: 6400, litros: 2432, consumo: 38.0, esperado: 38.0, estado: "operativa" as const, proxService: 4500 },
  { id: 9, patente: "OP345QR", modelo: "Mercedes Actros", año: 2019, kmTotal: 398000, kmMes: 0, litros: 0, consumo: 0, esperado: 38.0, estado: "taller" as const, proxService: null },
  { id: 10, patente: "YZ789AB", modelo: "Volvo FH", año: 2021, kmTotal: 189000, kmMes: 7100, litros: 2698, consumo: 38.0, esperado: 38.0, estado: "operativa" as const, proxService: 13500 },
  { id: 11, patente: "CD012EF", modelo: "Scania R450", año: 2022, kmTotal: 110000, kmMes: 6600, litros: 2508, consumo: 38.0, esperado: 38.0, estado: "operativa" as const, proxService: 18000 },
  { id: 12, patente: "KL012MN", modelo: "Scania R450", año: 2022, kmTotal: 128000, kmMes: 5100, litros: 2091, consumo: 41.0, esperado: 38.0, estado: "service_pronto" as const, proxService: 1200 },
  { id: 13, patente: "GH345IJ", modelo: "Volvo FH", año: 2020, kmTotal: 295000, kmMes: 6300, litros: 2394, consumo: 38.0, esperado: 38.0, estado: "operativa" as const, proxService: 6200 },
  { id: 14, patente: "KL678MN", modelo: "Mercedes Actros", año: 2021, kmTotal: 175000, kmMes: 7000, litros: 2660, consumo: 38.0, esperado: 38.0, estado: "operativa" as const, proxService: 10500 },
  { id: 15, patente: "OP901QR", modelo: "Scania R450", año: 2022, kmTotal: 98000, kmMes: 6500, litros: 2470, consumo: 38.0, esperado: 38.0, estado: "operativa" as const, proxService: 20000 }
]

export const clientes = [
  { nombre: "Distribuidora Norte", facturas: 4, monto: 8200000, diasProm: 45, vencido: 5100000, estado: "critico" as const },
  { nombre: "Logística Central", facturas: 3, monto: 6400000, diasProm: 28, vencido: 0, estado: "ok" as const },
  { nombre: "Comercial Sur", facturas: 5, monto: 7100000, diasProm: 35, vencido: 2100000, estado: "warning" as const },
  { nombre: "Mayorista Oeste", facturas: 2, monto: 4800000, diasProm: 22, vencido: 0, estado: "ok" as const },
  { nombre: "Alimentos Express", facturas: 3, monto: 5900000, diasProm: 41, vencido: 1500000, estado: "critico" as const }
]

export const alertas = [
  {
    tipo: "warning" as const,
    titulo: "Unidad 07 — Consumo 18% sobre esperado.",
    accion: "revisar inyectores (último service hace 45.000 km)"
  },
  {
    tipo: "critical" as const,
    titulo: "Distribuidora Norte — 45 días sin pago ($5.1M).",
    accion: "escalar a gerencia comercial y pausar nuevos despachos"
  },
  {
    tipo: "info" as const,
    titulo: "Unidad 12 — Service programado en 3 días.",
    accion: "coordinar con taller y asignar Unidad 04 como reemplazo"
  }
]

export const rentabilidadKPIs = {
  viajesMes: 127,
  ingresoTotal: 48200000,
  costoTotal: 46100000,
  margenBruto: 2100000,
  margenPorcentaje: 4.2
}

export const rentabilidadPorCliente = [
  { nombre: "Distribuidora Norte", viajes: 35, km: 14200, ingreso: 12800000, costo: 11900000, margen: 7.0 },
  { nombre: "Logística Central", viajes: 28, km: 11500, ingreso: 9400000, costo: 9100000, margen: 3.2 },
  { nombre: "Comercial Sur", viajes: 22, km: 9800, ingreso: 8200000, costo: 8050000, margen: 1.8 },
  { nombre: "Mayorista Oeste", viajes: 25, km: 10200, ingreso: 10600000, costo: 10200000, margen: 3.8 },
  { nombre: "Alimentos Express", viajes: 17, km: 10580, ingreso: 7200000, costo: 6850000, margen: 4.9 }
]

export const rentabilidadPorUnidad = [
  { patente: "AB123CD", modelo: "Scania R450", viajes: 12, km: 8420, ingreso: 4200000, costo: 3850000, margen: 8.3 },
  { patente: "CD456EF", modelo: "Volvo FH", viajes: 11, km: 7890, ingreso: 3950000, costo: 3780000, margen: 4.3 },
  { patente: "EF234GH", modelo: "Mercedes Actros", viajes: 10, km: 7200, ingreso: 3600000, costo: 3420000, margen: 5.0 },
  { patente: "IJ567KL", modelo: "Scania R450", viajes: 9, km: 6800, ingreso: 3400000, costo: 3350000, margen: 1.5 },
  { patente: "MN890OP", modelo: "Volvo FH", viajes: 10, km: 7500, ingreso: 3750000, costo: 3600000, margen: 4.0 },
  { patente: "QR123ST", modelo: "Scania R450", viajes: 9, km: 6900, ingreso: 3450000, costo: 3280000, margen: 4.9 },
  { patente: "GH789IJ", modelo: "Scania R450", viajes: 8, km: 6230, ingreso: 3115000, costo: 3200000, margen: -2.7 },
  { patente: "UV456WX", modelo: "Mercedes Actros", viajes: 9, km: 6400, ingreso: 3200000, costo: 3050000, margen: 4.7 },
  { patente: "YZ789AB", modelo: "Volvo FH", viajes: 10, km: 7100, ingreso: 3550000, costo: 3400000, margen: 4.2 },
  { patente: "CD012EF", modelo: "Scania R450", viajes: 9, km: 6600, ingreso: 3300000, costo: 3150000, margen: 4.5 },
  { patente: "KL012MN", modelo: "Scania R450", viajes: 7, km: 5100, ingreso: 2550000, costo: 2480000, margen: 2.7 },
  { patente: "GH345IJ", modelo: "Volvo FH", viajes: 8, km: 6300, ingreso: 3150000, costo: 3020000, margen: 4.1 },
  { patente: "KL678MN", modelo: "Mercedes Actros", viajes: 10, km: 7000, ingreso: 3500000, costo: 3350000, margen: 4.3 },
  { patente: "OP901QR", modelo: "Scania R450", viajes: 9, km: 6500, ingreso: 3250000, costo: 3100000, margen: 4.6 }
]

export const combustibleKPIs = {
  consumoPromedio: 38.2,
  gastoCombustible: 18400000,
  porcentajeCosto: 37,
  unidadesAlerta: 2
}

export const flotaKPIs = {
  totalUnidades: 15,
  disponibles: 14,
  enMantenimiento: 1,
  kmTotalesMes: 94780
}

export const cobranzasKPIs = {
  porCobrar: 32400000,
  diasPromedio: 38,
  vencido: 8700000,
  cobradoMes: 41200000
}

export const proyeccion = {
  ingresosEsperados: 28500000,
  egresosComprometidos: 31200000,
  gap: -2700000
}

export const chatMessages = [
  {
    role: "user" as const,
    content: "¿Cuál fue la ruta más rentable del mes?"
  },
  {
    role: "assistant" as const,
    content: "La ruta Rosario - CABA fue la más rentable con un margen del 6.1% ($1.0M) sobre 42 viajes.\n\nEn comparación, la ruta Rosario - Córdoba tuvo margen negativo de -1.4%. Recomendación: revisar estructura de costos o renegociar tarifa con clientes de esa ruta."
  },
  {
    role: "user" as const,
    content: "¿Por qué la Unidad 07 consume tanto?"
  },
  {
    role: "assistant" as const,
    content: "La Unidad 07 muestra un consumo de 45 L/100km, un 18.4% por encima del esperado (38 L/100km).\n\nPosibles causas detectadas:\n• Rutas con mayor pendiente (Rosario-Tucumán)\n• 3 eventos de ralentí prolongado esta semana\n• Último service hace 45.000 km\n\nAcción sugerida: Programar revisión de inyectores."
  }
]

// Helper function to format currency
export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`
  }
  return `$${value.toLocaleString("es-AR")}`
}

// Helper function to format numbers
export function formatNumber(value: number): string {
  return value.toLocaleString("es-AR")
}
