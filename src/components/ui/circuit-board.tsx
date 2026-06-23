"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface CircuitNode {
  id: string
  x: number
  y: number
  label?: string
  icon?: React.ReactNode
  status?: "active" | "inactive" | "processing" | "error"
  size?: "sm" | "md" | "lg"
}

interface CircuitConnection {
  from: string
  to: string
  animated?: boolean
  bidirectional?: boolean
  color?: string
  pulseColor?: string
}

interface CircuitBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: CircuitNode[]
  connections: CircuitConnection[]
  width?: number
  height?: number
  gridSize?: number
  showGrid?: boolean
  gridColor?: string
  traceColor?: string
  pulseColor?: string
  nodeColor?: string
  pulseSpeed?: number
  traceWidth?: number
  variant?: "light" | "dark" | "auto"
}

function CircuitBoard({
  nodes,
  connections,
  width = 600,
  height = 400,
  gridSize = 20,
  showGrid = true,
  gridColor,
  traceColor,
  pulseColor,
  nodeColor,
  pulseSpeed = 2,
  traceWidth = 2,
  variant = "dark", // Enforcing dark for Decide AI theme
  className,
  ...props
}: CircuitBoardProps) {
  const isDark = true; // Hardcoded to dark for the new theme

  // Decide AI Colors
  const computedGridColor = gridColor || "rgba(229, 231, 235, 0.05)" // Silver haze faint
  const computedTraceColor = traceColor || "rgba(229, 231, 235, 0.2)" // Silver haze dim
  const computedPulseColor = pulseColor || "#73ffb9" // Mint signal
  const computedNodeColor = nodeColor || "rgba(255, 255, 255, 0.1)" // Frost faint

  const nodeMap = React.useMemo(() => {
    return new Map(nodes.map((node) => [node.id, node]))
  }, [nodes])

  const getNodeSize = React.useCallback((size?: CircuitNode["size"]) => {
    switch (size) {
      case "sm":
        return 24
      case "lg":
        return 64
      default:
        return 48
    }
  }, [])

  const calculatePath = React.useCallback(
    (from: CircuitNode, to: CircuitNode): string => {
      const fromSize = getNodeSize(from.size) / 2 + 4
      const toSize = getNodeSize(to.size) / 2 + 4

      const dx = to.x - from.x
      const dy = to.y - from.y

      let startX = from.x
      let startY = from.y
      let endX = to.x
      let endY = to.y

      if (Math.abs(dx) > Math.abs(dy)) {
        startX = from.x + (dx > 0 ? fromSize : -fromSize)
        endX = to.x + (dx > 0 ? -toSize : toSize)
        const midX = from.x + dx / 2
        return `M ${startX} ${startY} H ${midX} V ${endY} H ${endX}`
      } else {
        startY = from.y + (dy > 0 ? fromSize : -fromSize)
        endY = to.y + (dy > 0 ? -toSize : toSize)
        const midY = from.y + dy / 2
        return `M ${startX} ${startY} V ${midY} H ${endX} V ${endY}`
      }
    },
    [getNodeSize]
  )

  const getStatusColor = (status?: CircuitNode["status"]) => {
    switch (status) {
      case "active":
        return "#ffffff" // Frost
      case "processing":
        return "#73ffb9" // Mint signal
      case "error":
        return "rgba(180, 83, 83, 0.7)"
      default:
        return "rgba(229, 231, 235, 0.3)" // Silver haze faint
    }
  }

  return (
    <div
      className={cn("relative overflow-visible", className)}
      style={{ width: '100%', height: '100%', minHeight: height }}
      {...props}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {showGrid && (
            <pattern
              id="circuitGrid"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <circle cx={gridSize / 2} cy={gridSize / 2} r="1" fill={computedGridColor} />
            </pattern>
          )}
        </defs>

        {showGrid && (
          <rect width="100%" height="100%" fill="url(#circuitGrid)" />
        )}

        {connections.map((conn, i) => {
          const fromNode = nodeMap.get(conn.from)
          const toNode = nodeMap.get(conn.to)
          if (!fromNode || !toNode) return null

          const path = calculatePath(fromNode, toNode)
          const pathLength = 500

          return (
            <g key={`connection-${i}`}>
              <motion.path
                d={path}
                fill="none"
                stroke={conn.color || computedTraceColor}
                strokeWidth={traceWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.2 }}
              />

              {conn.animated !== false && (
                <motion.path
                  d={path}
                  fill="none"
                  stroke={conn.pulseColor || computedPulseColor}
                  strokeWidth={traceWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  strokeDasharray={`${pathLength * 0.1} ${pathLength * 0.9}`}
                  initial={{ strokeDashoffset: pathLength }}
                  animate={{ strokeDashoffset: -pathLength }}
                  transition={{
                    duration: pulseSpeed,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3,
                  }}
                />
              )}

              {conn.bidirectional && (
                <motion.path
                  d={path}
                  fill="none"
                  stroke={conn.pulseColor || computedPulseColor}
                  strokeWidth={traceWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  strokeDasharray={`${pathLength * 0.1} ${pathLength * 0.9}`}
                  initial={{ strokeDashoffset: -pathLength }}
                  animate={{ strokeDashoffset: pathLength }}
                  transition={{
                    duration: pulseSpeed,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3 + pulseSpeed / 2,
                  }}
                />
              )}
            </g>
          )
        })}
      </svg>

      {/* Nodes mapping but rendered absolutely within container relative to viewBox scale */}
      <div className="absolute inset-0 pointer-events-none" style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'visible' }}>
        {/* We use percentage positions if possible or keep them absolute and rely on CSS scaling */}
        <div style={{ position: 'relative', width: width, height: height, transformOrigin: 'top left', transform: 'scale(var(--scale-factor, 1))', overflow: 'visible' }} className="circuit-nodes-container">
          {nodes.map((node, i) => {
            const size = getNodeSize(node.size)
            const statusColor = getStatusColor(node.status)

            return (
              <motion.div
                key={node.id}
                className="absolute flex items-center justify-center rounded-none bg-[#030303] border pointer-events-auto"
                style={{
                  left: node.x - size / 2,
                  top: node.y - size / 2,
                  width: size,
                  height: size,
                  borderColor: statusColor,
                  boxShadow: node.status === 'processing' ? `0 0 15px ${statusColor}40` : 'none'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.5, type: "spring" }}
              >
                {node.status === "processing" && (
                  <motion.div
                    className="absolute inset-0 rounded-none border border-current"
                    style={{ color: statusColor }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                <div className="relative z-10 flex flex-col items-center justify-center">
                  {node.icon && (
                    <div style={{ color: statusColor }}>{node.icon}</div>
                  )}
                </div>

                {node.label && (
                  <div
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium tracking-wide uppercase"
                    style={{ color: statusColor }}
                  >
                    {node.label}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { CircuitBoard }
