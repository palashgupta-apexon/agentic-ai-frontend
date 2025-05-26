"use client"

import { useState } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { Users, ChevronDown, ChevronUp, Trash2, Copy, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function CrewNode({ data, selected }: NodeProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className={`w-80 shadow-md ${selected ? "border-crew" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-crew/10 text-crew">
            <Users className="h-5 w-5" />
          </div>
          <CardTitle className="text-base font-medium">{data.label || "App Security Analysis"}</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="bg-crew/10 text-crew hover:bg-crew/20">
            Crew
          </Badge>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="rounded-md p-1 hover:bg-accent">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  <div className="grid gap-1">
                    <label className="text-xs font-medium text-muted-foreground">Process</label>
                    <div className="rounded-md border p-2 text-sm">{data.process || "Process.sequential"}</div>
                  </div>
                  <div className="grid gap-1">
                    <label className="text-xs font-medium text-muted-foreground">Agents</label>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline">Senior IT Security researcher</Badge>
                      <Badge variant="outline">Senior security analyst</Badge>
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <label className="text-xs font-medium text-muted-foreground">Tasks</label>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline">Search for vulnerabilities</Badge>
                      <Badge variant="outline">Find security best practices</Badge>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardHeader>

      <Handle type="target" position={Position.Top} className="w-3 h-3 border-2" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 border-2" />
    </Card>
  )
}
