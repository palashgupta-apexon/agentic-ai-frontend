"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ToolsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="all" className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tools</h1>
          <TabsList>
            <TabsTrigger value="all">All Tools</TabsTrigger>
            <TabsTrigger value="custom">Custom Tools</TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>ScrapeWebsiteTool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="ScrapeWebsiteTool" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="mt-1 min-h-24"
              defaultValue="A tool to scrape content from websites. Provide the URL and it will return the text content of the page."
            />
          </div>

          <div>
            <Label htmlFor="schema">Schema</Label>
            <Textarea
              id="schema"
              className="mt-1 min-h-24 font-mono"
              defaultValue={`{
  "type": "object",
  "properties": {
    "url": {
      "type": "string",
      "description": "The URL of the website to scrape"
    }
  },
  "required": ["url"]
}`}
            />
          </div>

          <div>
            <Label>Tool Type</Label>
            <Select defaultValue="web-scraper">
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select tool type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-scraper">Web Scraper</SelectItem>
                <SelectItem value="search">Search</SelectItem>
                <SelectItem value="file-reader">File Reader</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="bg-crew hover:bg-crew-dark">Save Tool</Button>
        </CardContent>
      </Card>
    </div>
  )
}
