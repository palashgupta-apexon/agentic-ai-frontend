"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation";
import { CrewFlowEditor } from "@/components/crew-flow-editor"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

//{ params }: { params: { id: string } }
export default function WorkflowPage() {
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast()

  // In a real app, you would fetch the workflow data based on the ID
  useEffect(() => {
    // If the ID is "new", we're creating a new workflow
    if (id === "new") {
      toast({
        title: "New Workflow",
        description: "Creating a new workflow",
      })
    } else {
      toast({
        title: "Workflow Loaded",
        description: `Loaded workflow: ${id}`,
      })
    }
  }, [id, toast])

  return (
    <>
      <CrewFlowEditor workflowId={id} showHeader={true} />
      <Toaster />
    </>
  )
}
