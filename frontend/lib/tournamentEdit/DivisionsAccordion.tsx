import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { supabase } from '~/lib/supabase';

export default function DivisionsAccordion({ tournamentId }: { tournamentId: number | null }) {
  const [divName, setDivName] = useState('');
  const [divSize, setDivSize] = useState('');

  const editDiv = async () => {
    if (divName.trim() === '' || divSize.trim() === '') {
      Alert.alert('Please enter both a division name and size.');
      return;
    }

    try {
      const { error } = await supabase
        .from('divisions')
        .upsert({ tournamentid: tournamentId, name: divName, size: divSize });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Division added or updated successfully!');
        setDivName('');
        setDivSize('');
      }
    } catch (error) {
      Alert.alert('Unexpected Error', (error as Error).message);
    }
  };

  return (
    <AccordionItem value="item-1">
      <AccordionTrigger>
        <Text>Divisions</Text>
      </AccordionTrigger>
      <AccordionContent>
        <Text>Division Name:</Text>
        <Input
          placeholder="Premier 5.0"
          value={divName}
          onChangeText={setDivName}
        />
        <Text>Division Size:</Text>
        <Input
          placeholder="64"
          value={divSize}
          onChangeText={setDivSize}
        />
        <Button onPress={editDiv}>Submit</Button>
      </AccordionContent>
    </AccordionItem>
  );
}
