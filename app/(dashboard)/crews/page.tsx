"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, ChevronDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function CrewsPage() {
  const [agents, setAgents] = useState(["Senior IT Security researcher", "Senior security analyst"])

  const [tasks, setTasks] = useState([
    "Search and collect basic information",
    "Search for vulnerabilities",
    "find security best practices",
    "find common security mistakes",
    "search for privacy issues",
    "find and analyze vulnerabilities",
    "Find information about security",
    "conduct thorough security assessment",
    "try to find if there are any backdoors",
    "Compile a very long report",
  ])

  const removeAgent = (agent: string) => {
    setAgents(agents.filter((a) => a !== agent))
  }

  const removeTask = (task: string) => {
    setTasks(tasks.filter((t) => t !== task))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Crews</h1>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="name">Name (just id, it doesn't affect anything)</Label>
            <Input
              id="name"
              placeholder="App Security Analysis"
              className="mt-1"
              defaultValue="App Security Analysis"
            />
          </div>

          <div>
            <Label htmlFor="process">Process</Label>
            <Select defaultValue="Process.sequential">
              <SelectTrigger id="process" className="mt-1">
                <SelectValue placeholder="Select process" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Process.sequential">Process.sequential</SelectItem>
                <SelectItem value="Process.hierarchical">Process.hierarchical</SelectItem>
                <SelectItem value="Process.parallel">Process.parallel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Agents</Label>
            <div className="flex items-center mt-1 mb-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agent1">Senior IT Security researcher</SelectItem>
                  <SelectItem value="agent2">Senior security analyst</SelectItem>
                  <SelectItem value="agent3">Security engineer</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="ml-2">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {agents.map((agent) => (
                <Badge key={agent} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  {agent}
                  <button
                    onClick={() => removeAgent(agent)}
                    className="ml-1 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button variant="outline" size="sm" className="h-7">
                <ChevronDown className="h-3.5 w-3.5 mr-1" />
                More
              </Button>
            </div>
          </div>

          <div>
            <Label>Tasks</Label>
            <div className="flex items-center mt-1 mb-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="task1">Search for vulnerabilities</SelectItem>
                  <SelectItem value="task2">Find security best practices</SelectItem>
                  <SelectItem value="task3">Analyze security posture</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="ml-2">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tasks.map((task) => (
                <Badge key={task} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  {task}
                  <button onClick={() => removeTask(task)} className="ml-1 text-muted-foreground hover:text-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button variant="outline" size="sm" className="h-7">
                <ChevronDown className="h-3.5 w-3.5 mr-1" />
                More
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="manager-llm">Manager LLM</Label>
            <Select defaultValue="none">
              <SelectTrigger id="manager-llm" className="mt-1">
                <SelectValue placeholder="Select LLM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="manager-agent">Manager Agent</Label>
            <Select defaultValue="none">
              <SelectTrigger id="manager-agent" className="mt-1">
                <SelectValue placeholder="Select agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="agent1">Senior IT Security researcher</SelectItem>
                <SelectItem value="agent2">Senior security analyst</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="verbose" defaultChecked />
              <Label htmlFor="verbose">Verbose</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="memory" defaultChecked />
              <Label htmlFor="memory">Memory</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="cache" defaultChecked />
              <Label htmlFor="cache">Cache</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="planning" />
              <Label htmlFor="planning">Planning</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="max-req-min">Max req/min</Label>
            <div className="flex items-center mt-1">
              <Button variant="outline" size="icon" className="rounded-r-none">
                -
              </Button>
              <Input id="max-req-min" defaultValue="1000" className="rounded-none text-center" />
              <Button variant="outline" size="icon" className="rounded-l-none">
                +
              </Button>
            </div>
          </div>

          <Button className="bg-crew hover:bg-crew-dark">Save</Button>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button className="bg-crew hover:bg-crew-dark">Create crew</Button>
      </div>
    </div>
  )
}
