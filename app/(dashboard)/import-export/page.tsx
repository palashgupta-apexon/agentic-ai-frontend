"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Upload, FileJson } from "lucide-react"

export default function ImportExportPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Import/Export</h1>

      <Tabs defaultValue="export" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="export">Export</TabsTrigger>
          <TabsTrigger value="import">Import</TabsTrigger>
        </TabsList>

        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Export Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6 flex flex-col items-center justify-center text-center">
                  <FileJson className="h-16 w-16 mb-4 text-crew" />
                  <h3 className="text-lg font-medium mb-2">Export Crews</h3>
                  <p className="text-sm text-muted-foreground mb-4">Export all your crews as JSON files</p>
                  <Button className="bg-crew hover:bg-crew-dark">
                    <Download className="h-4 w-4 mr-2" />
                    Export Crews
                  </Button>
                </Card>

                <Card className="p-6 flex flex-col items-center justify-center text-center">
                  <FileJson className="h-16 w-16 mb-4 text-blue-500" />
                  <h3 className="text-lg font-medium mb-2">Export Agents</h3>
                  <p className="text-sm text-muted-foreground mb-4">Export all your agents as JSON files</p>
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export Agents
                  </Button>
                </Card>

                <Card className="p-6 flex flex-col items-center justify-center text-center">
                  <FileJson className="h-16 w-16 mb-4 text-green-500" />
                  <h3 className="text-lg font-medium mb-2">Export Tasks</h3>
                  <p className="text-sm text-muted-foreground mb-4">Export all your tasks as JSON files</p>
                  <Button className="bg-green-500 hover:bg-green-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export Tasks
                  </Button>
                </Card>

                <Card className="p-6 flex flex-col items-center justify-center text-center">
                  <FileJson className="h-16 w-16 mb-4 text-purple-500" />
                  <h3 className="text-lg font-medium mb-2">Export Knowledge</h3>
                  <p className="text-sm text-muted-foreground mb-4">Export all your knowledge sources as JSON files</p>
                  <Button className="bg-purple-500 hover:bg-purple-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export Knowledge
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle>Import Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6 flex flex-col items-center justify-center text-center">
                  <FileJson className="h-16 w-16 mb-4 text-crew" />
                  <h3 className="text-lg font-medium mb-2">Import Crews</h3>
                  <p className="text-sm text-muted-foreground mb-4">Import crews from JSON files</p>
                  <Button className="bg-crew hover:bg-crew-dark">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Crews
                  </Button>
                </Card>

                <Card className="p-6 flex flex-col items-center justify-center text-center">
                  <FileJson className="h-16 w-16 mb-4 text-blue-500" />
                  <h3 className="text-lg font-medium mb-2">Import Agents</h3>
                  <p className="text-sm text-muted-foreground mb-4">Import agents from JSON files</p>
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Agents
                  </Button>
                </Card>

                <Card className="p-6 flex flex-col items-center justify-center text-center">
                  <FileJson className="h-16 w-16 mb-4 text-green-500" />
                  <h3 className="text-lg font-medium mb-2">Import Tasks</h3>
                  <p className="text-sm text-muted-foreground mb-4">Import tasks from JSON files</p>
                  <Button className="bg-green-500 hover:bg-green-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Tasks
                  </Button>
                </Card>

                <Card className="p-6 flex flex-col items-center justify-center text-center">
                  <FileJson className="h-16 w-16 mb-4 text-purple-500" />
                  <h3 className="text-lg font-medium mb-2">Import Knowledge</h3>
                  <p className="text-sm text-muted-foreground mb-4">Import knowledge sources from JSON files</p>
                  <Button className="bg-purple-500 hover:bg-purple-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Knowledge
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
