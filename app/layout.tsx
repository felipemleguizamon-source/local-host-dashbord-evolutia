import React from "react"
import type { Metadata } from 'next'
// 👇 1. Importamos Poppins en lugar de Open Sans
import { Poppins, Chakra_Petch } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// 👇 2. Configuramos Poppins con los grosores (weights) necesarios
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
});

// 👇 3. Mantenemos tu fuente original solo para el logo
const chakraPetch = Chakra_Petch({ 
  weight: '700',
  subsets: ['latin'],
  variable: '--font-logo',
});

export const metadata: Metadata = {
  title: 'Evolutia - Gestión de Flota',
  description: 'Dashboard de gestión de flota para transportistas',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* 👇 4. Aplicamos poppins.className a toda la página */}
      <body className={`${poppins.className} antialiased bg-[#dee1e6] text-slate-900 ${chakraPetch.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}