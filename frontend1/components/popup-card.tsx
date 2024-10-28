import { useRef, useState } from "react"
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
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const [isOpen, setIsOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const togglePopup = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Button onPress={togglePopup}>Account Login</Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
          <div ref={cardRef}>
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
        </div>
      )}
    </div>
  )
}

