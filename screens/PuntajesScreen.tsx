import { StyleSheet, Text, TextInput, View, Button, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ref, set, onValue } from 'firebase/database';
import { db } from '../config/Config';

export default function PuntajesScreen({ route }: any) {
  const [puntajes, setPuntajes] = useState<any[]>([]);
  const [estadisticas, setEstadisticas] = useState({ total: 0, promedio: 0, max: 0 });
  const [game, setGame] = useState('');
  const [puntaje, setPuntaje] = useState('');

  const userId = route.params?.userId || 'demo'; // demo por defecto si no viene userId

  useEffect(() => {
    const puntajesRef = ref(db, 'puntajes/' + userId);
    onValue(puntajesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const lista = Object.values(data).map((p: any) => p.score);
      setPuntajes(lista);

      if (lista.length > 0) {
        const total = lista.reduce((a, b) => a + b, 0);
        const max = Math.max(...lista);
        const promedio = total / lista.length;
        setEstadisticas({ total, max, promedio });
      } else {
        setEstadisticas({ total: 0, max: 0, promedio: 0 });
      }
    });
  }, []);

  const guardarPuntaje = () => {
    if (!game || !puntaje) {
      return Alert.alert('Completa todos los campos');
    }

    const nuevoRef = ref(db, 'puntajes/' + userId + '/' + Date.now());
    set(nuevoRef, {
      game: game,
      score: parseInt(puntaje),
      date: new Date().toISOString().split("T")[0],
    });

    setGame('');
    setPuntaje('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Puntaje</Text>

      <TextInput
        placeholder="Nombre del juego"
        value={game}
        onChangeText={setGame}
        style={styles.input}
      />

      <TextInput
        placeholder="Puntaje"
        value={puntaje}
        onChangeText={setPuntaje}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Guardar Puntaje" onPress={guardarPuntaje} color="#28a745" />

      <Text style={styles.subtitle}>Estadísticas</Text>
      <Text>Total: {estadisticas.total}</Text>
      <Text>Máximo: {estadisticas.max}</Text>
      <Text>Promedio: {estadisticas.promedio.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
});
