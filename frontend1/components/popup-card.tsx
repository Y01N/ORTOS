"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import { useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '~/lib/supabase'
import { View } from 'react-native';
import { ScrollView } from "react-native"
import Auth from '~/components/Auth'
import Account from '~/components/Account'

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => setIsOpen(!isOpen)

  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Button onPress={togglePopup}>Account Login</Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
          <Card className="w-full max-w-md mx-4 animate-in zoom-in-95 duration-300">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Please enter your email and password</CardDescription>
            </CardHeader>
            <CardContent>
            <ScrollView className='items-center'>
            {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
            </ScrollView>
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