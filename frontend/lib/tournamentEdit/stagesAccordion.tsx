import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { supabase } from '~/lib/supabase';

export default function StagesAccordion({ tournamentId }: { tournamentId: number | null }) {
  const [divisionName, setDivisionName] = useState('');
  const [stageName, setStageName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [seed, setSeed] = useState('');
  const [stage, setStage] = useState('');



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

  const manualSeed = async () => {
    if (stage.trim() === '' || teamName.trim() === '' || seed.trim() === '') {
      Alert.alert('Please enter all fields.');
      return;
    }

    try {
      const { error } = await supabase
        .from('stageseeds')
        .upsert({ stage_id: stage, team_id: teamName, seed: seed });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Seed added or updated successfully!');
        setStage('');
        setTeamName('');
        setSeed('');
      }
    } catch (error) {
      Alert.alert('Unexpected Error', (error as Error).message);
    }
  };
  

  const randomSeed = async () => {
    if (stage.trim() === '') {
      Alert.alert('Please enter a stage ID.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('stageseeds')
        .select('*')
        .eq('stage_id', stage);

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        const teams = data.map((seed: { team_id: string }) => seed.team_id);
        const shuffledTeams = teams.sort(() => Math.random() - 0.5);
        const seeds = shuffledTeams.map((team, index) => ({ stage_id: stage, team_id: team, seed: index + 1 }));
        await supabase.from('stageseeds').upsert(seeds);
        Alert.alert('Success', 'Seeds randomized successfully!');
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
        <Text>Manual Seed:</Text>
        <Input
          placeholder="stage"
          value={stage}
          onChangeText={setStage}
        />
        <Input
          placeholder="team1"
          value={teamName}
          onChangeText={setTeamName}
        />
        <Input
          placeholder="seed"
          value={seed}
          onChangeText={setSeed}
        />
        <Button onPress={manualSeed}>Add seed manually</Button>
        <Button onPress={randomSeed}>Randomize seeds for given stage</Button>

      </AccordionContent>
    </AccordionItem>
  );
}
