import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '~/lib/supabase';
import { View, Text } from 'react-native';
import { Accordion } from '~/components/ui/accordion';
import DivisionsAccordion from '~/lib/tournamentEdit/DivisionsAccordion';
import StagesAccordion from '~/lib/tournamentEdit/stagesAccordion';

export default function TournamentEditPage() {
  const { tournament } = useLocalSearchParams();
  const [tournamentName, setTournamentName] = useState<string | null>(null);
  const [tournamentId, setTournamentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournament = async () => {
      if (!tournament) return;

      const { data, error } = await supabase
        .from('tournaments')
        .select('id, name')
        .eq('url', tournament)
        .single();

      if (error || !data) {
        setTournamentName(null);
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
      <Accordion type="multiple" collapsible defaultValue={['item-1']}>
        <DivisionsAccordion tournamentId={tournamentId} />
        <StagesAccordion tournamentId={tournamentId} />
      </Accordion>
    </View>
  );
}
