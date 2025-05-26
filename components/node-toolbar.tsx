"use client"

import { Button } from "@/components/ui/button"
import { AlignCenter, AlignLeft, ChevronsUp, Maximize, Grid, Trash2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { useReactFlow } from "reactflow"
import { useToast } from "@/components/ui/use-toast"

export function NodeToolbar() {
  const { fitView, zoomTo, getNodes, setNodes, setEdges } = useReactFlow()
  const { toast } = useToast()

  const handleAlignHorizontally = () => {
    const selectedNodes = getNodes().filter((node) => node.selected)
    if (selectedNodes.length <= 1) {
      toast({
        title: "Cannot align",
        description: "Select at least two nodes to align",
        variant: "destructive",
      })
      return
    }

    const avgY = selectedNodes.reduce((sum, node) => sum + node.position.y, 0) / selectedNodes.length

    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.selected) {
          return {
            ...node,
            position: {
              ...node.position,
              y: avgY,
            },
          }
        }
        return node
      }),
    )

    toast({
      title: "Nodes aligned",
      description: "Selected nodes aligned horizontally",
    })
  }

  const handleAlignVertically = () => {
    const selectedNodes = getNodes().filter((node) => node.selected)
    if (selectedNodes.length <= 1) {
      toast({
        title: "Cannot align",
        description: "Select at least two nodes to align",
        variant: "destructive",
      })
      return
    }

    const avgX = selectedNodes.reduce((sum, node) => sum + node.position.x, 0) / selectedNodes.length

    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.selected) {
          return {
            ...node,
            position: {
              ...node.position,
              x: avgX,
            },
          }
        }
        return node
      }),
    )

    toast({
      title: "Nodes aligned",
      description: "Selected nodes aligned vertically",
    })
  }

  const handleDistributeHorizontally = () => {
    const selectedNodes = getNodes().filter((node) => node.selected)
    if (selectedNodes.length <= 2) {
      toast({
        title: "Cannot distribute",
        description: "Select at least three nodes to distribute",
        variant: "destructive",
      })
      return
    }

    // Sort nodes by x position
    const sortedNodes = [...selectedNodes].sort((a, b) => a.position.x - b.position.x)
    const minX = sortedNodes[0].position.x
    const maxX = sortedNodes[sortedNodes.length - 1].position.x
    const step = (maxX - minX) / (sortedNodes.length - 1)

    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.selected) {
          const index = sortedNodes.findIndex((n) => n.id === node.id)
          return {
            ...node,
            position: {
              ...node.position,
              x: minX + index * step,
            },
          }
        }
        return node
      }),
    )

    toast({
      title: "Nodes distributed",
      description: "Selected nodes distributed horizontally",
    })
  }

  const handleDistributeVertically = () => {
    const selectedNodes = getNodes().filter((node) => node.selected)
    if (selectedNodes.length <= 2) {
      toast({
        title: "Cannot distribute",
        description: "Select at least three nodes to distribute",
        variant: "destructive",
      })
      return
    }

    // Sort nodes by y position
    const sortedNodes = [...selectedNodes].sort((a, b) => a.position.y - b.position.y)
    const minY = sortedNodes[0].position.y
    const maxY = sortedNodes[sortedNodes.length - 1].position.y
    const step = (maxY - minY) / (sortedNodes.length - 1)

    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.selected) {
          const index = sortedNodes.findIndex((n) => n.id === node.id)
          return {
            ...node,
            position: {
              ...node.position,
              y: minY + index * step,
            },
          }
        }
        return node
      }),
    )

    toast({
      title: "Nodes distributed",
      description: "Selected nodes distributed vertically",
    })
  }

  const handleDeleteSelected = () => {
    const selectedNodes = getNodes().filter((node) => node.selected)
    if (selectedNodes.length === 0) {
      toast({
        title: "Nothing to delete",
        description: "Select at least one node to delete",
        variant: "destructive",
      })
      return
    }

    // Get IDs of selected nodes
    const selectedNodeIds = selectedNodes.map((node) => node.id)

    // Remove selected nodes
    setNodes((nodes) => nodes.filter((node) => !selectedNodeIds.includes(node.id)))

    // Remove edges connected to deleted nodes
    setEdges((edges) =>
      edges.filter((edge) => !selectedNodeIds.includes(edge.source) && !selectedNodeIds.includes(edge.target)),
    )

    toast({
      title: "Nodes deleted",
      description: `Deleted ${selectedNodes.length} node(s) and their connections`,
    })
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-background/80 backdrop-blur-sm border border-border rounded-md shadow-md">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={handleAlignHorizontally}>
              <AlignCenter className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Align Horizontally</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={handleAlignVertically}>
              <AlignLeft className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Align Vertically</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={handleDistributeHorizontally}>
              <ChevronsUp className="h-4 w-4 rotate-90" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Distribute Horizontally</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={handleDistributeVertically}>
              <ChevronsUp className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Distribute Vertically</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator orientation="vertical" className="h-8" />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={() => fitView({ padding: 0.2 })}>
              <Maximize className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Fit View</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={() => zoomTo(1)}>
              <Grid className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reset Zoom</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator orientation="vertical" className="h-8" />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={handleDeleteSelected}
              className="text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Selected (Delete key)</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
