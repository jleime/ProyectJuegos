import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function WelcomeScreen({ navigation }: any) {
  const [email, setemail] = useState('');
  const [contrasenia, setcontrasenia] = useState('');

  const login = () => {
    signInWithEmailAndPassword(auth, email, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("UID:", user.uid);
        navigation.navigate("Puntajes", { userId: user.uid });
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido - INICIAR SESIÓN</Text>

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setemail}
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        value={contrasenia}
        onChangeText={setcontrasenia}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Acceso" onPress={login} color="#6200EE" />
      <View style={{ marginTop: 10 }}>
        <Button title="Crear cuenta" onPress={() => navigation.navigate("Register")} color="#03A9F4" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  }
});
