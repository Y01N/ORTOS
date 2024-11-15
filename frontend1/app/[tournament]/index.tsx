import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { supabase } from '~/lib/supabase';

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

  return (
    <View>
      {tournamentName ? (
        <Text>Tournament page for: {tournamentName}</Text>
      ) : (
        <Text style={{ fontSize: 24, textAlign: 'center', color: 'red' }}>
          404 - Tournament not found
        </Text>
      )}
    </View>
  );
}