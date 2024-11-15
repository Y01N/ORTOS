import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Alert, Button, TextInput } from 'react-native';
import { supabase } from '~/lib/supabase';

export default function Page() {
  const { tournament } = useLocalSearchParams();
  const [tournamentName, setTournamentName] = useState<string | null>(null);
  const [tournamentId, setTournamentId] = useState<number | null>(null);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [divisionName, setDivisionName] = useState('');
  const [teamId, setTeamId] = useState('');

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
        fetchDivisions(data.id);  // Fetch divisions after setting tournamentId
      }
      setLoading(false);
    };

    const fetchDivisions = async (tournamentId: number) => {
      const { data, error } = await supabase
        .from('divisions')
        .select('*')
        .eq('tournamentid', tournamentId);

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setDivisions(data);
      }
    };

    fetchTournament();
  }, [tournament]);

  const registerForDivision = async () => {
    if (divisionName.trim() === '' || teamId.trim() === '') {
      Alert.alert('Please enter both a division name and team ID.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('teamtournaments')
        .insert([{ team_id: teamId, division: divisionName, tournament_id: tournamentId }]);

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Team registered successfully!');
        setDivisionName('');  // Clear the division name input
        setTeamId('');        // Clear the team ID input
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Unexpected Error', error.message);
      } else {
        Alert.alert('Unexpected Error', 'An unknown error occurred.');
      }
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Tournament Name: {tournamentName}</Text>
      <Text>Divisions:</Text>
      {divisions.map((division) => (
        <Text key={division.id}>{division.name} - {division.size}</Text>
      ))}
      <TextInput
        placeholder='Division Name'
        value={divisionName}
        onChangeText={setDivisionName}
      />
      <TextInput
        placeholder='Team ID'
        value={teamId}
        onChangeText={setTeamId}
      />
      <Button title="Register" onPress={registerForDivision} />
    </View>
  );
}