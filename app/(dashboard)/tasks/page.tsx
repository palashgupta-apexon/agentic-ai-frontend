"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"

export default function TasksPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="all" className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="unassigned">Unassigned Tasks</TabsTrigger>
            <TabsTrigger value="app-security">App Security Analysis</TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-xl">App Security Analysis</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="task-1">
              <AccordionTrigger className="py-3 hover:no-underline">
                <div className="flex items-center text-left">
                  <span className="font-medium">
                    (Senior IT Security researcher) - Search and collect basic information about [app]. Include
                    information about deployment type of the application (installed on client computer, onpremise server
                    instalation, cloud, mix of those, more options etc) Note: [note]
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1">
                <div className="space-y-4">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="task-2">
              <AccordionTrigger className="py-3 hover:no-underline">
                <div className="flex items-center text-left">
                  <span className="font-medium">
                    (Senior IT Security researcher) - Search for vulnerabilities (medium-critical) of app ([app]) and
                    analyze them. If you dont find any, just say it. Note: [note]
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1">
                <div className="space-y-4">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="task-3">
              <AccordionTrigger className="py-3 hover:no-underline">
                <div className="flex items-center text-left">
                  <span className="font-medium">
                    (Senior IT Security researcher) - find security best practices for using the app ([app]) in safe
                    manner. Note: [note]
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1">
                <div className="space-y-4">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="task-4">
              <AccordionTrigger className="py-3 hover:no-underline">
                <div className="flex items-center text-left">
                  <span className="font-medium">
                    (Senior IT Security researcher) - find common security mistakes/bad practices that negatively affect
                    security when deploying or using app ([app]). Note: [note]
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Description:</h4>
                    <p className="text-sm">
                      find common security mistakes/bad practices that negatively affect security when deploying or
                      using app ([app]). Note: [note]
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Expected output:</h4>
                    <p className="text-sm">
                      A comprehensive bulletpoint structured long report on security bad practices and common mistakes
                      related to the app ([app])
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Agent:</h4>
                    <p className="text-sm">Senior IT Security researcher</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Async execution:</h4>
                    <p className="text-sm">True</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Context from async tasks:</h4>
                    <p className="text-sm">None</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Context from sync tasks:</h4>
                    <p className="text-sm">None</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
