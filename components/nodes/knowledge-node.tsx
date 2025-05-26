"use client"

import { useState } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { BookOpen, ChevronDown, ChevronUp, Trash2, Copy, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function KnowledgeNode({ data, selected }: NodeProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className={`w-80 shadow-md node-type-knowledge`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-purple-500/10 text-purple-500">
            <BookOpen className="h-5 w-5" />
          </div>
          <CardTitle className="text-base font-medium">{data.label || "Knowledge Source"}</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">
            Knowledge
          </Badge>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="rounded-md p-1 hover:bg-accent">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </CardHeader>

      <Collapsible open={isOpen}>
        <CollapsibleContent>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              <div className="grid gap-1">
                <label className="text-xs font-medium text-muted-foreground">Source Type</label>
                <div className="rounded-md border p-2 text-sm">{data.sourceType || "CSV File"}</div>
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-medium text-muted-foreground">Path</label>
                <div className="rounded-md border p-2 text-sm">{data.path || "/data/security_vulnerabilities.csv"}</div>
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-medium text-muted-foreground">Metadata</label>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline">Chunk Size: 4000</Badge>
                  <Badge variant="outline">Overlap: 200</Badge>
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

      <Handle type="target" position={Position.Left} className="w-3 h-3 border-2" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 border-2" />
    </Card>
  )
}
