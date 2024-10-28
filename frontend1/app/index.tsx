import * as React from 'react';
import { Alert, View } from 'react-native';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '~/lib/supabase'
import { Button } from "~/components/ui/button"



export default function Screen() {

  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [progress, setProgress] = React.useState(78);

  const onNameChange = (text: string) => {
    setName(text);
  };

  const onUrlChange = (text: string) => {
    setUrl(text);
  };


  const createTournament = async () => {
    if (name.trim() === '' || url.trim() === '') {
      Alert.alert('Please enter both a tournament name and URL.');
      return;
    }

    const { error } = await supabase
      .from('tournaments')
      .insert([{ name, url }]);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Tournament created successfully!');
      setName('');  // Clear the name input
      setUrl('');   // Clear the URL input
    }
  };


  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <Accordion
        type='multiple'
        collapsible
        defaultValue={['item-1']}
        className='w-full max-w-lg native:max-w-lg'
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            <Text>General Info</Text>
          </AccordionTrigger>
          <AccordionContent>
          <Text>Tournament Name:</Text>
            <Input
              placeholder='Rensselaer Roundent World Cup'
              value={name}
              onChangeText={onNameChange}
              aria-labelledby='inputLabel'
              aria-errormessage='inputError'
            />
            <Text>Tournament URL extension:</Text>
            <Input
              placeholder='RRWC2024'
              value={url}
              onChangeText={onUrlChange}
              aria-labelledby='inputLabel'
              aria-errormessage='inputError'
            />
            <Button onPress={createTournament}>Submit</Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>
            <Text>Tournament Format</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              Insert tournament type, etx.
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
    
  );
}
