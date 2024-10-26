import * as React from 'react';
import { View } from 'react-native';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Text } from '~/components/ui/text';

import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '~/lib/supabase'


const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

export default function Screen() {

  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  const [progress, setProgress] = React.useState(78);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }
  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <Accordion
        type='multiple'
        collapsible
        defaultValue={['item-1']}
        className='w-full max-w-sm native:max-w-md'
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            <Text>Is it accessible?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>
            <Text>What are universal components?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              In the world of React Native, universal components are components that work on both
              web and native platforms.
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
    
  );
}
