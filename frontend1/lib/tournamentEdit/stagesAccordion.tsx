import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { supabase } from '~/lib/supabase';

export default function StagesAccordion({ tournamentId }: { tournamentId: number | null }) {
  const [divisionName, setDivisionName] = useState('');
  const [stageName, setStageName] = useState('');

  const upsertStage = async () => {
    if (divisionName.trim() === '' || stageName.trim() === '') {
      Alert.alert('Please enter both a division name and stage name.');
      return;
    }

    try {
      const { error } = await supabase
        .from('stages')
        .upsert({ tournamentid: tournamentId, division_name: divisionName, name: stageName });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Stage added or updated successfully!');
        setDivisionName('');
        setStageName('');
      }
    } catch (error) {
      Alert.alert('Unexpected Error', (error as Error).message);
    }
  };

  return (
    <AccordionItem value="item-2">
      <AccordionTrigger>
        <Text>Stages</Text>
      </AccordionTrigger>
      <AccordionContent>
        <Text>Insert stage division:</Text>
        <Input
          placeholder="Premier 5.0"
          value={divisionName}
          onChangeText={setDivisionName}
        />
        <Text>Stage name:</Text>
        <Input
          placeholder="Bracket"
          value={stageName}
          onChangeText={setStageName}
        />
        <Button onPress={upsertStage}>Create Stage</Button>
      </AccordionContent>
    </AccordionItem>
  );
}
