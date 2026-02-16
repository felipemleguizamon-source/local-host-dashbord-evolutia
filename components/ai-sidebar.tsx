"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Send, Bot, X } from "lucide-react"
import Image from "next/image"

interface AISidebarProps {
  isOpen: boolean
  onToggle: () => void
}

interface Message {
  role: "user" | "assistant"
  content: string
}

const RESPUESTAS_PREDEFINIDAS = [
  {
    keywords: [["ruta", "rentable"], ["ruta", "mejor"], ["rentable", "mes"]],
    respuesta: `La ruta Rosario - CABA fue la más rentable con un margen del 6.1% ($1.0M) sobre 42 viajes.

En comparación, la ruta Rosario - Córdoba tuvo margen negativo de -1.4%.

📋 Recomendación: revisar estructura de costos o renegociar tarifa con clientes de esa ruta.`
  },
  {
    keywords: [["unidad 07"], ["unidad 7"], ["consumo", "07"], ["consume tanto"]],
    respuesta: `La Unidad 07 muestra un consumo de 45 L/100km, un 18.4% por encima del esperado (38 L/100km).

Posibles causas detectadas:
• Rutas con mayor pendiente (Rosario-Tucumán)
• 3 eventos de ralentí prolongado esta semana
• Último service hace 45.000 km

🔧 Acción sugerida: Programar revisión de inyectores.`
  }
]

const RESPUESTA_DEFAULT = `Estoy analizando tu consulta. En la versión completa de Evolutia, puedo responder sobre rentabilidad, combustible, flota, cobranzas y más, cruzando datos en tiempo real de tu operación.

¿Querés que analice alguna de estas áreas?
• Rentabilidad por ruta
• Consumo de combustible por unidad
• Estado de cobranzas`

const MENSAJE_BIENVENIDA: Message = {
  role: "assistant",
  content: `Hola! Soy el asistente IA de Evolutia. Podés preguntarme sobre la operación de tu flota.`
}

function findRespuesta(mensaje: string): string {
  const msg = mensaje.toLowerCase()

  for (const item of RESPUESTAS_PREDEFINIDAS) {
    for (const keyGroup of item.keywords) {
      if (keyGroup.every(k => msg.includes(k))) {
        return item.respuesta
      }
    }
  }

  return RESPUESTA_DEFAULT
}

export function AISidebar({ isOpen, onToggle }: AISidebarProps) {
  const [messages, setMessages] = useState<Message[]>([MENSAJE_BIENVENIDA])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return

    const userMessage: Message = {
      role: "user",
      content: inputValue
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simular "pensando" con delay
    setTimeout(() => {
      const respuesta = findRespuesta(inputValue)
      const assistantMessage: Message = {
        role: "assistant",
        content: respuesta
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <aside
      className={cn(
        "bg-background border-l border-border flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "w-96" : "w-16"
      )}
    >
      {/* Header */}
      <div className={cn(
        "p-4 border-b border-border flex items-center bg-muted/20",
        isOpen ? "justify-between" : "justify-center"
      )}>
        {isOpen ? (
          <>
            <div className="flex items-center gap-2">
              <div className="bg-foreground rounded-lg p-1.5 flex-shrink-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apple-icon%20-%20logo%20evolutia%20180x180-Y9I9Gwz2Vcp2fF9G2AWaEq9zdy6vZe.png"
                  alt="Evolutia"
                  width={20}
                  height={20}
                  className="w-5 h-5 invert"
                />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Asistente IA</h2>
                <p className="text-xs text-muted-foreground">Preguntá sobre tu operación</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              type="button"
              className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button
            onClick={onToggle}
            type="button"
            className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <Bot className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Chat Content - Only visible when open */}
      {isOpen && (
        <>
          {/* Messages Area */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-muted/10">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 whitespace-pre-line",
                    message.role === "user"
                      ? "bg-foreground text-background"
                      : "bg-background border border-border"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-4 h-4 rounded bg-foreground flex items-center justify-center">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apple-icon%20-%20logo%20evolutia%20180x180-Y9I9Gwz2Vcp2fF9G2AWaEq9zdy6vZe.png"
                          alt="Evolutia"
                          width={12}
                          height={12}
                          className="w-3 h-3 invert"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">Evolutia</span>
                    </div>
                  )}
                  <p className={cn(
                    "text-sm leading-relaxed",
                    message.role === "user" ? "text-background" : "text-foreground"
                  )}>
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Indicador de "pensando" */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-background border border-border rounded-lg px-4 py-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-background">
            <div className="relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Preguntá sobre tu operación..."
                className="pr-10 h-10 text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Collapsed state - show icon only */}
      {!isOpen && (
        <div className="flex-1 flex flex-col items-center py-4">
          {/* Empty space when collapsed */}
        </div>
      )}
    </aside>
  )
}
