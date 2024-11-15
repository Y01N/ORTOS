import { useLocalSearchParams } from 'expo-router';
import { supabase } from '~/lib/supabase';
import * as React from 'react';
import { Alert, View, Text } from 'react-native';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Input } from '~/components/ui/input';
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { Button } from "~/components/ui/button"

export default function Page() {
  const { tournament } = useLocalSearchParams();
  const [tournamentName, setTournamentName] = useState<string | null>(null);
  const [tournamentId, setTournamentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const [divName, setName] = React.useState('');
  const [divSize, setSize] = React.useState('');
  const [divisionName, setDivisionName] = useState('');
  const [stageName, setStageName] = useState('');

  const onDivisionNameChange = (text: string) => {
    setDivisionName(text);
  }

  const onStageNameChange = (text: string) => {
    setStageName(text);
  }
  
  const onNameChange = (text: string) => {
    setName(text);
  };

  const onSizeChange = (text: string) => {
    setSize(text);
  };


  const editDiv = async () => {
    if (divName.trim() === '' || divSize.trim() === '') {
      Alert.alert('Please enter both a division name and size.');
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from('divisions')
        .upsert({ tournamentid: tournamentId, name: divName, size: divSize });
  
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Division added or updated successfully!');
        setName('');  // Clear the division name input
        setSize('');  // Clear the division size input
      }
    } catch (error) {
      Alert.alert('Unexpected Error', (error as Error).message);
    }
  };

  const upsertStage = async () => {
    if (divisionName.trim() === '' || stageName.trim() === '') {
      Alert.alert('Please enter both a division name and stage name.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('stages')
        .upsert({ tournamentid: tournamentId, division_name: divisionName, name: stageName });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Stage added or updated successfully!');
        setDivisionName('');  // Clear the division name input
        setStageName('');     // Clear the stage name input
      }
    } catch (error) {
      Alert.alert('Unexpected Error', (error as Error).message);
    }
  };


  useEffect(() => {
    const fetchTournament = async () => {
      if (!tournament) return;

      const { data, error } = await supabase
        .from('tournaments')
        .select('id, name')
        .eq('url', tournament)
        .single();

      if (error || !data) {
        setTournamentName(null);  // Not found, will display 404
        setTournamentId(null);
      } else {
        setTournamentName(data.name);
        setTournamentId(data.id);
      }
      setLoading(false);
    };

    fetchTournament();
  }, [tournament]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  
  
  

  return (
    <View>
      {tournamentName ? (
        <Text>Tournament edit page for: {tournamentName}</Text>
      ) : (
        <Text style={{ fontSize: 24, textAlign: 'center', color: 'red' }}>
          404 - Tournament not found
        </Text>
      )}

<Accordion
        type='multiple'
        collapsible
        defaultValue={['item-1']}
        className='w-full max-w-lg native:max-w-lg'
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            <Text>Divisions</Text>
          </AccordionTrigger>
          <AccordionContent>
          <Text>Division Name:</Text>
            <Input
              placeholder='Premier 5.0'
              value={divName}
              onChangeText={onNameChange}
              aria-labelledby='inputLabel'
              aria-errormessage='inputError'
            />
            <Text>Division Size:</Text>
            <Input
              placeholder='64'
              value={divSize}
              onChangeText={onSizeChange}
              aria-labelledby='inputLabel'
              aria-errormessage='inputError'
            />
            <Button onPress={editDiv}>Submit</Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>
            <Text>Stages</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              Insert stage division
            </Text>
            <Input
              placeholder='Premier 5.0'
              value={divisionName}
              onChangeText={onDivisionNameChange}
              aria-labelledby='inputLabel'
              aria-errormessage='inputError'
            />
            <Text>Stage name:</Text>
            <Input
              placeholder='bracket'
              value={stageName}
              onChangeText={onStageNameChange}
              aria-labelledby='inputLabel'
              aria-errormessage='inputError'
            />
            <Button onPress={upsertStage}>Create Stage</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}

/*





export default function Page() {
  const { tournament } = useLocalSearchParams();
  const [tournamentName, setTournamentName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournament = async () => {
      if (!tournament) return;

      const { data, error } = await supabase
        .from('tournaments')
        .select('name')
        .eq('url', tournament)
        .single();

      if (error || !data) {
        setTournamentName(null);  // Not found, will display 404
      } else {
        setTournamentName(data.name);
      }
      setLoading(false);
    };

    fetchTournament();
  }, [tournament]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

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
    <View>
      {tournamentName ? (
        <Text>Tournament edit page for: {tournamentName}</Text>
      ) : (
        <Text style={{ fontSize: 24, textAlign: 'center', color: 'red' }}>
          404 - Tournament not found
        </Text>
      )}
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
            <Text>Registration</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              Insert registration and division info here
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}
  */