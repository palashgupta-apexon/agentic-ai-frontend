import { create } from "zustand"
import { getWorkflow } from "@/services/WorkflowServices"

type Workflow = {
  id: string
  workflow_name: string
  workflow_description: string
  nodes: any[]
  created_at: string
  updated_at: string
  [key: string]: any
}

type WorkflowStore = {
  workflows: Workflow[]
  loading: boolean
  error: string | null
  fetchWorkflows: () => Promise<void>
}

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  workflows: [],
  loading: false,
  error: null,
  fetchWorkflows: async () => {
    if (get().workflows.length > 0) return // Prevent re-fetching if already loaded

    set({ loading: true, error: null })
    try {
      const resp = await getWorkflow()
      const workflows = resp.data.map((item: any) => ({
        ...item,
        agents: item.nodes?.filter((n: any) => n.id?.startsWith("agent-")).length || 0,
        tasks: item.nodes?.filter((n: any) => n.id?.startsWith("task-")).length || 0,
        createdAt: formatDate(item.created_at),
        editedAt: formatDate(item.updated_at),
        color: generateRandomColor(),
        icon: require("lucide-react").Workflow, // use dynamic icon loading
      }))
      set({ workflows, loading: false })
    } catch (err: any) {
      set({ error: err.message || "Error loading workflows", loading: false })
    }
  },
}))

const generateRandomColor = () => {
  const colorArr = ['orange', 'amber', 'green', 'cyan', 'blue', 'indigo']
  const randomIndex = Math.floor(Math.random() * colorArr.length)
  const color = colorArr[randomIndex]
  return `bg-${color}-500/10 text-${color}-500`
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getFullYear().toString().slice(-2)}`
}
