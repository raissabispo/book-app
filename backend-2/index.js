import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Alert, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

const API_URL = 'http://192.168.0.197:3000';

export default function App() {
  const [books, setBooks] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      } else {
        Alert.alert('Permissão de localização negada');
      }
    })();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_URL}/books`);
      const data = await res.json();
      setBooks(data);
    } catch {
      Alert.alert('Erro ao carregar livros');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão para câmera negada');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!name || !description) {
      Alert.alert('Preencha nome e descrição');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);

    if (image) {
      formData.append('photo', {
        uri: image.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
    }

    if (location) {
      formData.append('latitude', location.latitude.toString());
      formData.append('longitude', location.longitude.toString());
    }

    setLoading(true);
    try {
      await fetch(`${API_URL}/books`, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setName('');
      setDescription('');
      setImage(null);
      fetchBooks();
    } catch {
      Alert.alert('Erro ao salvar livro');
    }
    setLoading(false);
  };

  const deleteBook = async (id) => {
    try {
      await fetch(`${API_URL}/books/${id}`, { method: 'DELETE' });
      Alert.alert('Livro deletado');
      setBooks(books.filter(book => book._id !== id));
    } catch {
      Alert.alert('Erro ao deletar livro');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Text style={styles.bookName}>{item.name}</Text>
      <Text>{item.description}</Text>
      {item.photo && <Image source={{ uri: `${API_URL}/${item.photo}` }} style={styles.bookImage} />}
      <Button
        mode="contained"
        onPress={() => deleteBook(item._id)}
        style={{ marginTop: 5, backgroundColor: 'red' }}
      >
        Deletar
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        label="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        mode="outlined"
        multiline
      />
      <Button mode="outlined" onPress={pickImage} icon="camera" style={styles.input}>
        Tirar Foto
      </Button>
      {image && <Image source={{ uri: image.uri }} style={styles.previewImage} />}
      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
      >
        Salvar
      </Button>

      <FlatList
        data={books}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: { marginBottom: 10 },
  previewImage: { width: '100%', height: 200, marginBottom: 10, borderRadius: 8 },
  bookItem: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15 },
  bookName: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  bookImage: { width: '100%', height: 150, borderRadius: 8, marginTop: 5 },
});
