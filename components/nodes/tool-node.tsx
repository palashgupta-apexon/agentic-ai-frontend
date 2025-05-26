"use client";

import { useState } from "react";
import { Handle, Position, useReactFlow, type NodeProps } from "reactflow"
import { Wrench, ChevronDown, ChevronUp, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import React from "react";

export function ToolNode({ id, data, selected }: NodeProps) {

  const [isOpen, setIsOpen] = useState(false);
  const [toolName, setToolName] = useState(data?.agent_name || "New Tool");
  const { setNodes } = useReactFlow()

  const [nodeData, setNodeData] = useState({
    tool_name: data?.tool_name || "",
  })

  React.useEffect(() => {
    if (data) {
      setNodeData({
        tool_name: data.tool_name || nodeData.tool_name,
      })
    }
  }, [data]);

  const slugToText = (slug: string) => {
    let string = slug.replace(/^./, c => c.toUpperCase());
    return string = string.replace('-', ' ');
  }

  const handleChange = (e: any) => {
    if(e.target) {
      const { name, value } = e.target;
      setToolName(slugToText(value));

      const updatedData = { ...nodeData, [name]: value }
      
      setNodeData(updatedData);
      
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === id) {
            // Create a custom event with all the node data
            const event = new CustomEvent("tool-node-updated", {
              detail: {
                id,
                data: updatedData,
                position: {
                  x: node.position.x,
                  y: node.position.y
                }
              },
            })

            // Dispatch the event
            document.dispatchEvent(event)

            return {
              ...node,
              data: {
                ...node.data,
                ...updatedData,
              },
            }
          }
          return node
        }),
      )
    }
  }

  return (
    <Card className={`w-80 shadow-md tool-node tool-type-agent`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-orange-500/10 text-orange-500">
            <Wrench className="h-5 w-5" />
          </div>
          <CardTitle className="text-base font-medium">{toolName}</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <Badge
            variant="outline"
            className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
          >
            Tool
          </Badge>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="rounded-md p-1 hover:bg-accent">
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </CardHeader>

      <Collapsible open={isOpen}>
        <CollapsibleContent>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              
              <div className="grid gap-1">
                <Select
                  defaultValue=""
                  name="tool"
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "tool_name", value } })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Tool" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tool-1">Tool 1</SelectItem>
                    <SelectItem value="tool-2">Tool 2</SelectItem>
                    <SelectItem value="tool-3">Tool 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size='icon'><Copy /></Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>

      <Handle type="target" position={Position.Left} className="w-3 h-3 border-2" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 border-2" />
    </Card>
  );
}
