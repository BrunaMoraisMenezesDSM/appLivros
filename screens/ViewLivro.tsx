import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import axios from 'axios';

export default function ViewLivro({ route }) {
  const { id } = route.params;
  const [livro, setLivro] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = new Animated.Value(0);

  useEffect(() => {
    fetchLivro(id);
  }, [id]);

  const fetchLivro = async (newId: any) => {
    try {
      const response = await axios.get(`https://bibliotecaetecmaua.azurewebsites.net/api/LivrosSedeApi/${newId}`);
      const livroData = response.data;
      livroData.imagem = `https://bibliotecaetecmaua.azurewebsites.net/Content/Images/${livroData.imagem}`;
      setLivro(livroData);
    } catch (error) {
      console.error("Erro ao buscar livro:", error);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const rotateStyle = {
    transform: [
      { perspective: 1000 },
      { rotateY: flipAnimation.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] }) },
    ],
  };

  return (
    <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
      {livro && (
        <TouchableOpacity onPress={handleFlip}>
          <Animated.View style={[styles.card, rotateStyle]}>
            {!isFlipped ? (
              <View style={styles.front}>
                <Image source={{ uri: livro.imagem }} style={styles.image} resizeMode="contain" />
                <Text style={styles.titulo}>{livro.titulo}</Text>
                <Text style={styles.clickText}>Clique para ver mais informações</Text>
              </View>
            ) : (
              <View style={styles.back}>
                <Text style={styles.titles}>ID: </Text>
                <Text style={styles.info}>{livro.id}</Text>
                <Text style={styles.titles}>Autor Principal: </Text>
                <Text style={styles.info}>{livro.autorPrincipal}</Text>
                <Text style={styles.titles}>Autores: </Text>
                <Text style={styles.info}>{livro.autores}</Text>
                <Text style={styles.titles}>Ano: </Text>
                <Text style={styles.info}>{livro.ano}</Text>
                <Text style={styles.titles}>Edição: </Text>
                <Text style={styles.info}>{livro.edicao}</Text>
                <Text style={styles.titles}>Editora: </Text>
                <Text style={styles.info}>{livro.editora}</Text>
                <Text style={styles.titles}>Idioma: </Text>
                <Text style={styles.info}>{livro.idioma}</Text>
                <Text style={styles.titles}>ISBN/ISSN: </Text>
                <Text style={styles.info}>{livro.isbnIssn}</Text>
                <Text style={styles.titles}>Material: </Text>
                <Text style={styles.info}>{livro.material}</Text>
                <Text style={styles.titles}>Obra: </Text>
                <Text style={styles.info}>{livro.obra}</Text>
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8DC',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: 400,
    height: 603,
    backgroundColor: '#FFFFF0',
    borderRadius: 10,
  },
  front: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  back: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backfaceVisibility: 'hidden',
    paddingHorizontal: 20,
  },
  image: {
    marginTop: 10,
    width: '80%',
    height: '80%',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black'
  },
  clickText: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 20,
  },
  titles: {
    marginBottom: 2,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  info: {
    fontSize: 15,
    marginBottom: 14,
    marginRight: 20,
    color: '#4F4F4F',
  },
});