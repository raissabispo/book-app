import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { FAB, Card, Title, Paragraph, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';

const API_URL = 'http://192.168.0.197:3000';

export default function HomeScreen() {
  const [books, setBooks] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    const res = await fetch(`${API_URL}/books`);
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderHeader = () => (
    <View style={{ padding: 20 }}>
      <Text style={styles.title}>Book App</Text>
      <Text style={styles.description}>
        Bem-vindo ao Book App! Esta aplicação permite que você registre livros , visualize informações no mapa e organize suas anotações de maneira prática.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={renderHeader}  
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>{item.description}</Paragraph>
            </Card.Content>
            {item.photo && (
              <Card.Cover source={{ uri: `${API_URL}/${item.photo}` }} style={styles.image} />
            )}
          </Card>
        )}
      />
      <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate('Add Livro')} />
      <FAB icon="map" style={styles.mapButton} onPress={() => navigation.navigate('Mapa')} />
    </View>
  );
}
