"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function KickoffPage() {
  const [isRunning, setIsRunning] = useState(false)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Kickoff!</h1>

      <Card className="mb-6">
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="select-crew">Select crew to run</Label>
            <Select defaultValue="app-security">
              <SelectTrigger id="select-crew" className="mt-1">
                <SelectValue placeholder="Select crew" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="app-security">App Security Analysis</SelectItem>
                <SelectItem value="data-analysis">Data Analysis</SelectItem>
                <SelectItem value="market-research">Market Research</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="crew-details">Crew: App Security Analysis</Label>
            <Select defaultValue="app-security-details">
              <SelectTrigger id="crew-details" className="mt-1">
                <SelectValue placeholder="Crew details" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="app-security-details">App Security Analysis Details</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Placeholders to fill in:</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="note">note</Label>
                <Input id="note" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="app">app</Label>
                <Input id="app" defaultValue="calendly" className="mt-1" />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              className={`${isRunning ? "bg-destructive hover:bg-destructive/90" : "bg-crew hover:bg-crew-dark"}`}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? "Stop crew!" : "Run crew!"}
            </Button>
            {isRunning && (
              <Button variant="outline" disabled>
                Running...
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="console-output">
          <AccordionTrigger className="py-3 px-4 bg-card rounded-md hover:no-underline">
            <span className="font-medium">Console Output</span>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="bg-card p-4 rounded-md">
              <pre className="text-sm whitespace-pre-wrap">
                <code>
                  [2023-03-13 14:35:45] Starting crew: App Security Analysis [2023-03-13 14:35:46] Initializing
                  agents... [2023-03-13 14:35:47] Agent 'Senior IT Security researcher' initialized [2023-03-13
                  14:35:48] Agent 'Senior security analyst' initialized [2023-03-13 14:35:49] Starting task execution...
                </code>
              </pre>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="final-output" className="mt-4">
          <AccordionTrigger className="py-3 px-4 bg-card rounded-md hover:no-underline">
            <span className="font-medium">Final output</span>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="bg-card p-6 rounded-md">
              <h2 className="text-3xl font-bold mb-6">Comprehensive Security Assessment Report for Calendly</h2>

              <h3 className="text-2xl font-bold mb-4">1. Executive Summary</h3>
              <p className="mb-4">
                This report provides a detailed security assessment of Calendly, an online scheduling tool. The
                assessment covers various aspects including security practices, compliance, vulnerabilities, and user
                privacy. Key findings indicate that while Calendly implements robust security measures and compliance
                certifications, there are notable vulnerabilities and security concerns raised by users and experts.
                Recommendations include enhancing user education on phishing risks and implementing stricter account
                verification processes.
              </p>

              <h3 className="text-2xl font-bold mb-4">2. Basic Information about the App</h3>
              <p className="mb-4">
                <strong>General Overview:</strong> Calendly is a scheduling platform that provides tools for trading and
                investing across various asset classes. It is available in multiple deployment options including
                web-based, mobile apps, and desktop applications.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
