"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FlowerIcon as FlowIcon,
  Plus,
  Search,
  Calendar,
  Users,
  FileText,
  ShieldCheck,
  BarChart,
  Database,
  Trash2,
  ChartNetwork,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthProvider'
import RequireAuth from "@/components/RequireAuth"

// Sample workflow data
const sampleWorkflows = [
  {
    id: "app-security-analysis",
    name: "App Security Analysis",
    description: "Analyze application security vulnerabilities and best practices",
    icon: ChartNetwork,
    color: "bg-crew/10 text-crew",
    lastEdited: "2 days ago",
    agents: 2,
    tasks: 4,
    status: 'success'
  },
  {
    id: "market-research",
    name: "Market Research",
    description: "Conduct comprehensive market research for new products",
    icon: ChartNetwork,
    color: "bg-crew/10 text-crew",
    lastEdited: "1 week ago",
    agents: 3,
    tasks: 5,
    status: 'success'
  },
  {
    id: "content-creation",
    name: "Content Creation",
    description: "Generate blog posts, social media content, and marketing materials",
    icon: ChartNetwork,
    color: "bg-crew/10 text-crew",
    lastEdited: "3 days ago",
    agents: 2,
    tasks: 3,
    status: 'error'
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    description: "Analyze and visualize complex datasets",
    icon: ChartNetwork,
    color: "bg-crew/10 text-crew",
    lastEdited: "5 days ago",
    agents: 2,
    tasks: 6,
    status: 'in_progress'
  },
]

export default function WorkflowsPage() {
  const { isAuthenticated, accessToken, logout } = useAuth()

  const [searchQuery, setSearchQuery] = useState("")

  const filteredWorkflows = sampleWorkflows.filter(
    (workflow) =>
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const showStatus = (status: string) => {
    console.log(status);
    let html: any = '';
    switch(status) {
      case 'success':
        html = <span className="flex w-3 h-3 bg-green-500 rounded-full"></span>
        break;
      case 'error':
        html = <span className="flex w-3 h-3 bg-red-500 rounded-full"></span>
        break;
      case 'in_progress':
        html = <span className="flex w-3 h-3 bg-yellow-500 rounded-full"></span>
      break;
    }
    return html;
  }

  // if (!isAuthenticated) return <p>Loading...</p>

  return (
    <RequireAuth>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search workflows..."
                className="w-64 pl-8 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkflows.map((workflow) => (
            <Link href={`/workflows/${workflow.id}`} key={workflow.id}>
              <Card className="h-full cursor-pointer hover:border-crew hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-md ${workflow.color}`}>
                      <workflow.icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {workflow.lastEdited}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{workflow.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{workflow.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {showStatus(workflow.status)}
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{workflow.agents} Agents</span>
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <FlowIcon className="h-3 w-3" />
                        <span>{workflow.tasks} Tasks</span>
                      </Badge>
                    </div>
                    <Trash2 size={16} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </RequireAuth>
  )
}
