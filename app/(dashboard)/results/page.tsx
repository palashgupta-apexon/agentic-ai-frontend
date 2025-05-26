"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ChevronDown } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResultsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Results</h1>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Filter by Crew</h3>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1.5">
              App Security Analysis
              <button className="ml-1 text-muted-foreground hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </Badge>
            <Button variant="outline" size="icon">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Filter by Date</h3>
          <Input type="date" className="w-full" />
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="result-1" className="mb-4 border rounded-md">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <span className="font-medium">App Security Analysis - 2025-03-13 14:35:45</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <Tabs defaultValue="rendered">
              <TabsList className="mb-4">
                <TabsTrigger value="rendered">Rendered</TabsTrigger>
                <TabsTrigger value="raw">Raw</TabsTrigger>
              </TabsList>

              <TabsContent value="rendered">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-3xl font-bold mb-6">
                      Comprehensive Security Assessment Report for Saxo Trader
                    </h2>

                    <h3 className="text-2xl font-bold mb-4">1. Executive Summary</h3>
                    <p className="mb-4">
                      This report provides a detailed security assessment of the Saxo Trader application, which is
                      offered by Saxo Bank. The assessment covers various aspects, including the app's functionality,
                      security practices, privacy policy, vendor security, identified vulnerabilities, and user
                      feedback. Key findings indicate that while Saxo Trader implements strong security measures such as
                      mandatory two-factor authentication (2FA), there are areas for improvement, particularly in user
                      education regarding security practices. Recommendations include enhancing user awareness and
                      ensuring robust data encryption practices.
                    </p>

                    <h3 className="text-2xl font-bold mb-4">2. Basic Information about the App</h3>
                    <p className="mb-4">
                      <strong>General Overview:</strong> Saxo Trader is a trading platform that provides tools for
                      trading and investing across various asset classes. It is available in multiple deployment options
                      including web-based, mobile apps, and desktop applications.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="raw">
                <Card>
                  <CardContent className="p-6">
                    <pre className="whitespace-pre-wrap text-sm">
                      {`# Comprehensive Security Assessment Report for Saxo Trader

## 1. Executive Summary

This report provides a detailed security assessment of the Saxo Trader application, which is offered by Saxo Bank. The assessment covers various aspects, including the app's functionality, security practices, privacy policy, vendor security, identified vulnerabilities, and user feedback. Key findings indicate that while Saxo Trader implements strong security measures such as mandatory two-factor authentication (2FA), there are areas for improvement, particularly in user education regarding security practices. Recommendations include enhancing user awareness and ensuring robust data encryption practices.

## 2. Basic Information about the App

**General Overview:** Saxo Trader is a trading platform that provides tools for trading and investing across various asset classes. It is available in multiple deployment options including web-based, mobile apps, and desktop applications.`}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="result-2" className="mb-4 border rounded-md">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <span className="font-medium">App Security Analysis - 2025-03-10 12:23:57</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <Tabs defaultValue="rendered">
              <TabsList className="mb-4">
                <TabsTrigger value="rendered">Rendered</TabsTrigger>
                <TabsTrigger value="raw">Raw</TabsTrigger>
              </TabsList>

              <TabsContent value="rendered">
                <div className="text-center p-6">
                  <p className="text-muted-foreground">Click to expand result content</p>
                </div>
              </TabsContent>

              <TabsContent value="raw">
                <div className="text-center p-6">
                  <p className="text-muted-foreground">Click to expand result content</p>
                </div>
              </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="result-3" className="mb-4 border rounded-md">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <span className="font-medium">App Security Analysis - 2025-03-10 12:12:28</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <Tabs defaultValue="rendered">
              <TabsList className="mb-4">
                <TabsTrigger value="rendered">Rendered</TabsTrigger>
                <TabsTrigger value="raw">Raw</TabsTrigger>
              </TabsList>

              <TabsContent value="rendered">
                <div className="text-center p-6">
                  <p className="text-muted-foreground">Click to expand result content</p>
                </div>
              </TabsContent>

              <TabsContent value="raw">
                <div className="text-center p-6">
                  <p className="text-muted-foreground">Click to expand result content</p>
                </div>
              </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
