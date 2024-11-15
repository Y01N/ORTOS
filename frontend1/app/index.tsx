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
  const [player1, setP1] = React.useState('');
  const [player2, setP2] = React.useState('');
  const [teamName, setTeamName] = React.useState('');

  const onNameChange = (text: string) => {
    setName(text);
  };

  const onUrlChange = (text: string) => {
    setUrl(text);
  };

  const onP1Change = (text: string) => {
    setP1(text);
  };

  const onP2Change = (text: string) => {
    setP2(text);
  };
  const onTeamNameChange = (text: string) => {
    setTeamName(text);
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

  const createTeam = async () => {
    if (player1.trim() === '' || player2.trim() === '' || teamName.trim() === '') {
      Alert.alert('Please enter both team members and a name.');
      return;
    }
  
    const { data, error } = await supabase
      .from('teams')
      .insert([{ name: teamName }])
      .select();
  
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Team created successfully!');
      setTeamName('');  // Clear the team name input
      setP1('');        // Clear player 1 input
      setP2('');        // Clear player 2 input
  
      const teamId = data[0].id;
      console.log(`Team ${teamName} created with ID ${teamId}`);
  
      await addPlayer(player1, teamId);
      await addPlayer(player2, teamId);
    }
  };

  const addPlayer = async (playerName: string, teamId: number) => {
    const { data, error } = await supabase
      .from('teamplayers')
      .insert([{ player_id: playerName, team_id: teamId }]);
  
    if (error) {
      Alert.alert('Error', `Error adding player ${playerName}: ${error.message}`);
    } else {
      console.log(`Player ${playerName} added successfully with team ID ${teamId}`);
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
            <Text>Create team</Text>
          </AccordionTrigger>
          <AccordionContent>
          <Input
              placeholder='cool team name'
              value={teamName}
              onChangeText={onTeamNameChange}
              aria-labelledby='inputLabel'
              aria-errormessage='inputError'
            />
          <Input
              placeholder='player1'
              value={player1}
              onChangeText={onP1Change}
              aria-labelledby='inputLabel'
              aria-errormessage='inputError'
            />
            <Input
              placeholder='player2'
              value={player2}
              onChangeText={onP2Change}
              aria-labelledby='inputLabel'
              aria-errormessage='inputError'
            />
            <Button onPress={createTeam}>Create Team!</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
    
  );
}
