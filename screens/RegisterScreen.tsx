import { Alert, Button, StyleSheet, TextInput, Text, View } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  function validarEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const registrar = () => {
    if (!validarEmail(email)) {
      return Alert.alert('Email inválido');
    }
    if (contrasenia.length < 6) {
      return Alert.alert('La contraseña debe tener al menos 6 caracteres');
    }

    createUserWithEmailAndPassword(auth, email, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Registro exitoso');
        console.log(user.uid);
        navigation.navigate('Welcome');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        value={contrasenia}
        onChangeText={setContrasenia}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Registrar" onPress={registrar} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 30,
      backgroundColor: '#F4F4F4',
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 25,
      color: '#333',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fff',
      padding: 12,
      marginBottom: 15,
      borderRadius: 10,
      fontSize: 16,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
    },
    button: {
      marginVertical: 8,
      borderRadius: 10,
      overflow: 'hidden',
    },
    buttonText: {
      textAlign: 'center',
      padding: 12,
      fontWeight: 'bold',
      color: '#fff',
      fontSize: 16,
    },
    acceso: {
      backgroundColor: '#6200EE',
    },
    crearCuenta: {
      backgroundColor: '#03A9F4',
    }
  });
  