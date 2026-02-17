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
        "flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out overflow-hidden z-30",
        "bg-white/30 backdrop-blur-xl border-l border-white/60 shadow-[-15px_0_30px_-15px_rgba(0,0,0,0.05)]",
        isOpen ? "w-96" : "w-20"
      )}
    >
      {/* Header */}
      <div className={cn(
        "p-4 flex items-center transition-colors duration-300",
        isOpen ? "justify-between border-b border-white/40 bg-white/20" : "justify-center"
      )}>
        {isOpen ? (
          <>
            <div className="flex items-center gap-2">
              <Image
                src="/evolutia-io.png"
                alt="Evolutia"
                width={32}
                height={32}
                className="w-8 h-8 flex-shrink-0 object-contain"
              />
              <div>
                <h2 className="text-sm font-bold text-slate-900">Asistente IA</h2>
                <p className="text-xs text-slate-600 font-medium">Preguntá sobre tu operación</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              type="button"
              className="p-1.5 rounded-lg hover:bg-white/50 transition-colors text-slate-500 hover:text-slate-900"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <button
            onClick={onToggle}
            type="button"
            className="group flex items-center justify-center p-2.5 bg-white rounded-2xl shadow-sm border border-white transition-all duration-300 ease-out hover:scale-110 hover:shadow-md hover:-translate-y-1"
          >
            <Bot size={28} className="text-slate-800 transition-transform duration-300 ease-out group-hover:rotate-12" />
          </button>
        )}
      </div>

      {/* Chat Content - Only visible when open */}
      {isOpen && (
        <>
          {/* Messages Area */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
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
                    "max-w-[85%] rounded-2xl px-4 py-2.5 whitespace-pre-line shadow-sm",
                    message.role === "user"
                      ? "bg-slate-900 text-white rounded-br-sm" 
                      : "bg-white/80 backdrop-blur-sm border border-white/60 text-slate-800 rounded-bl-sm" 
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-1.5 mb-2">
                      {/* 👇 AQUÍ ESTÁ EL CAMBIO: El logo limpio, más grande y sin la caja negra */}
                      <Image
                        src="/evolutia-io.png"
                        alt="Evolutia"
                        width={32}
                        height={32}
                        className="w-8 h-8 flex-shrink-0 object-contain"
                      />
                      <span className="text-xs font-bold text-slate-500">Evolutia</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed font-medium">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/40 bg-white/20 backdrop-blur-md">
            <div className="relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Preguntá sobre tu operación..."
                className="pr-10 h-11 text-sm bg-white border-white/60 shadow-sm rounded-xl focus-visible:ring-slate-400 font-medium placeholder:text-slate-400"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-slate-900 rounded-lg text-white hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </>
      )}

      {!isOpen && (
        <div className="flex-1 flex flex-col items-center py-4">
        </div>
      )}
    </aside>
  )
}