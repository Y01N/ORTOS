"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => setIsOpen(!isOpen)

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Button onPress={togglePopup}>Open Popup Card</Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
          <Card className="w-full max-w-md mx-4 animate-in zoom-in-95 duration-300">
            <CardHeader>
              <CardTitle>Popup Card</CardTitle>
              <CardDescription>This is a popup card with a dimmed background.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Here's some content for the popup card. You can add any information or components you need here.</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onPress={togglePopup}>Close</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}