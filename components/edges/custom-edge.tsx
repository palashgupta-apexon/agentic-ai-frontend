"use client"

import { BaseEdge, type EdgeProps, getSmoothStepPath } from "reactflow"

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
}: EdgeProps) {
  // Using getSmoothStepPath instead of getBezierPath for better horizontal flow
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16, // Add a nice curve to the edges
  })

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      markerEnd={markerEnd}
      style={{
        ...style,
        stroke: selected ? "hsl(var(--crew))" : "hsl(var(--muted-foreground))",
        strokeWidth: selected ? 3 : 2,
        transition: "stroke 0.2s, stroke-width 0.2s",
      }}
    />
  )
}
