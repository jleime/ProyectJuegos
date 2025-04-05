import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { ref, set } from 'firebase/database'
import { db } from '../config/Config'

export default function Pantalla1Screen() {
  const [id, setid] = useState("")
  const [nombre, setnombre] = useState("")
  const [edad, setedad] = useState(0)
  const [producto, setproducto] = useState("")

  function guardar() {
    set(ref(db, 'usuarios/' + id +"/compras/"+ Date.now() ), {
      nombre: nombre,
      edad: edad,
      producto: producto
    });
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Guardar Usuario</Text>

      <TextInput
      placeholder='Ingresar ID'
      style={styles.input}
      onChangeText={setid}
      value={id}
      />

      <TextInput
      placeholder='Ingresar nombre'
      style={styles.input}
      onChangeText={setnombre}
      value={nombre}
      />

      <TextInput
      placeholder='Ingresar edad'
      style={styles.input}
      keyboardType='numeric'
      onChangeText={(texto) => setedad(Number(texto))}
      value={edad ? edad.toString() : ''}
      />

      <TextInput
      placeholder='Ingresar producto'
      style={styles.input}
      onChangeText={setproducto}
      value={producto}
      />

      <Button title='Guardar' onPress={guardar} />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
    borderWidth: 3,
    fontSize: 20
  }
})