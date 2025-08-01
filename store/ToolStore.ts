// /store/ToolStore.ts
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { getTools } from "@/services/ToolsServices"

type ToolStore = {
  tools: any[]
  loaded: boolean
  fetchTools: () => Promise<void>
}

export const useToolStore = create<ToolStore>()(
  devtools(
    (set, get) => ({
      tools: [],
      loaded: false,
      fetchTools: async () => {
        if (get().loaded) return
        const tools = await getTools()
        set({ tools, loaded: true }, false, "fetchTools")
      },
    }),
    {
      name: "ToolStore", // optional name in DevTools tab
    }
  )
)
