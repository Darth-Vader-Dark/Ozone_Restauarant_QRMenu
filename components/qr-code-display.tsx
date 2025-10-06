"use client"

import { useEffect, useRef } from "react"
import QRCode from "qrcode"

export function QRCodeDisplay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const menuUrl = `${window.location.origin}/menu`

      QRCode.toCanvas(
        canvasRef.current,
        menuUrl,
        {
          width: 300,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        },
        (error) => {
          if (error) console.error(error)
        },
      )
    }
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow-inner">
      <canvas ref={canvasRef} />
    </div>
  )
}
