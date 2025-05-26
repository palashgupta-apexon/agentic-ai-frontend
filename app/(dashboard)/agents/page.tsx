"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, ChevronDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

export default function AgentsPage() {
  const [tools, setTools] = useState(["ScrapeWebsiteTool", "SerperDevTool"])

  const removeTools = (tool: string) => {
    setTools(tools.filter((t) => t !== tool))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="all" className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Agents</h1>
          <TabsList>
            <TabsTrigger value="all">All Agents</TabsTrigger>
            <TabsTrigger value="unassigned">Unassigned Agents</TabsTrigger>
            <TabsTrigger value="app-security">App Security Analysis</TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Agent: Senior IT Security researcher</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" defaultValue="Senior IT Security researcher" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="backstory">Backstory</Label>
            <Textarea
              id="backstory"
              className="mt-1 min-h-24"
              defaultValue="You are a skilled security researcher focused on searching security related information on internet. For the tools which require url, write it including the https:// part."
            />
          </div>

          <div>
            <Label htmlFor="goal">Goal</Label>
            <Textarea
              id="goal"
              className="mt-1 min-h-24"
              defaultValue="Gather security-related information about the app. If you cant find some information, just say that you cant find it and don't make it up."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="allow-delegation" />
            <Label htmlFor="allow-delegation">Allow delegation</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="verbose" defaultChecked />
            <Label htmlFor="verbose">Verbose</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="cache" defaultChecked />
            <Label htmlFor="cache">Cache</Label>
          </div>

          <div>
            <Label>LLM Provider and Model</Label>
            <Select defaultValue="openai-gpt-4o-mini">
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select LLM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai-gpt-4o-mini">OpenAI: gpt-4o-mini</SelectItem>
                <SelectItem value="openai-gpt-4o">OpenAI: gpt-4o</SelectItem>
                <SelectItem value="anthropic-claude-3">Anthropic: Claude 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Temperature</Label>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-muted-foreground">0.00</span>
              <Slider defaultValue={[0.15]} max={1} step={0.01} className="flex-1" />
              <span className="text-sm text-muted-foreground">1.00</span>
            </div>
            <div className="text-center text-sm mt-1">0.15</div>
          </div>

          <div>
            <Label htmlFor="max-iterations">Max Iterations</Label>
            <div className="flex items-center mt-1">
              <Button variant="outline" size="icon" className="rounded-r-none">
                -
              </Button>
              <Input id="max-iterations" defaultValue="80" className="rounded-none text-center" />
              <Button variant="outline" size="icon" className="rounded-l-none">
                +
              </Button>
            </div>
          </div>

          <div>
            <Label>Select Tools</Label>
            <div className="flex items-center mt-1 mb-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select tools" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tool1">ScrapeWebsiteTool</SelectItem>
                  <SelectItem value="tool2">SerperDevTool</SelectItem>
                  <SelectItem value="tool3">WebBrowserTool</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="ml-2">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <Badge key={tool} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  {tool}
                  <button
                    onClick={() => removeTools(tool)}
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
            <Label>Knowledge Sources</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Choose an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="source1">Security Database</SelectItem>
                <SelectItem value="source2">Vulnerability Database</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="bg-crew hover:bg-crew-dark">Save Agent</Button>
        </CardContent>
      </Card>
    </div>
  )
}
