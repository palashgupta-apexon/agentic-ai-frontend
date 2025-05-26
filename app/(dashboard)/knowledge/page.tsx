"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"

export default function KnowledgePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Knowledge</h1>
        <Button variant="outline">Clear All Knowledge Stores</Button>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          Knowledge sources are used to provide external information to agents. You can create different types of
          knowledge sources and assign them to agents or crews.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Knowledge Source: Knowledge Source 1</h2>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Knowledge Source 1" className="mt-1" defaultValue="Knowledge Source 1" />
          </div>

          <div>
            <Label htmlFor="source-type">Source Type</Label>
            <Select defaultValue="csv">
              <SelectTrigger id="source-type" className="mt-1">
                <SelectValue placeholder="Select source type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV File</SelectItem>
                <SelectItem value="pdf">PDF File</SelectItem>
                <SelectItem value="text">Text File</SelectItem>
                <SelectItem value="url">URL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="source-path">Source Path</Label>
            <div className="mt-1">
              <Input id="source-path" placeholder="/path/to/file.csv" />
            </div>
          </div>

          <div>
            <Label>Upload CSV File</Label>
            <div className="mt-1 border-2 border-dashed rounded-md p-6 text-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drag and drop file here</p>
                <p className="text-xs text-muted-foreground">Limit 200MB per file • CSV</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Browse files
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Advanced Settings</h3>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="chunk-size">Chunk Size</Label>
                <div className="flex items-center mt-1">
                  <Button variant="outline" size="icon" className="rounded-r-none">
                    -
                  </Button>
                  <Input id="chunk-size" defaultValue="4000" className="rounded-none text-center" />
                  <Button variant="outline" size="icon" className="rounded-l-none">
                    +
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="chunk-overlap">Chunk Overlap</Label>
                <div className="flex items-center mt-1">
                  <Button variant="outline" size="icon" className="rounded-r-none">
                    -
                  </Button>
                  <Input id="chunk-overlap" defaultValue="200" className="rounded-none text-center" />
                  <Button variant="outline" size="icon" className="rounded-l-none">
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Metadata (optional)</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="key">Key</Label>
                <Input id="key" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="value">Value</Label>
                <Input id="value" className="mt-1" />
              </div>
            </div>

            <Button variant="outline" className="mt-4">
              Add Metadata
            </Button>
          </div>

          <Button className="bg-crew hover:bg-crew-dark">Save Knowledge Source</Button>
        </CardContent>
      </Card>
    </div>
  )
}
