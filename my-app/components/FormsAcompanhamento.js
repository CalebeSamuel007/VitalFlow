import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

type Item = {
  nome: string;
  glicemia: string;
  peso: string;
  exercicios: string;
  pressao: string;
};

type FormsAcompanhamentoProps = {
  adicionarItem: (item: Item) => void;
};

const FormsAcompanhamento: React.FC<FormsAcompanhamentoProps> = ({ adicionarItem }) => {
  const [nome, setNome] = useState('');
  const [glicemia, setGlicemia] = useState('');
  const [peso, setPeso] = useState('');
  const [exercicios, setExercicios] = useState('');
  const [pressao, setPressao] = useState('');

  // Permite apenas números e vírgula/ponto para decimal para glicemia
  const handleGlicemiaChange = (text: string) => {
    let sanitized = text.replace(/,/g, '.').replace(/[^0-9.]/g, '');
    const parts = sanitized.split('.');
    if (parts.length > 2) {
      sanitized = parts[0] + '.' + parts.slice(1).join('');
    }
    if (sanitized.includes('.')) {
      const [intPart, decPart] = sanitized.split('.');
      sanitized = intPart + '.' + (decPart ? decPart.slice(0, 2) : '');
    }
    setGlicemia(sanitized);
  };

  // Permite apenas números e vírgula/ponto para decimal para peso
  const handlePesoChange = (text: string) => {
    let sanitized = text.replace(/,/g, '.').replace(/[^0-9.]/g, '');
    const parts = sanitized.split('.');
    if (parts.length > 2) {
      sanitized = parts[0] + '.' + parts.slice(1).join('');
    }
    if (sanitized.includes('.')) {
      const [intPart, decPart] = sanitized.split('.');
      sanitized = intPart + '.' + (decPart ? decPart.slice(0, 2) : '');
    }
    setPeso(sanitized);
  };

const handleExerciciosChange = (text: string) => {
  // Permite letras, números, acentos e espaços
  let sanitized = text.replace(/[^a-zA-ZÀ-ÿ0-9\s]/g, '');
  setExercicios(sanitized);
};


  const handleAdicionar = () => {
  if (
    nome.trim() !== '' &&
    glicemia.trim() !== '' &&
    peso.trim() !== '' &&
    /^[0-9]+(\.[0-9]{1,2})?$/.test(glicemia) &&
    /^[0-9]+(\.[0-9]{1,2})?$/.test(peso)
  ) {
    adicionarItem({
      nome,
      glicemia: Number(glicemia).toFixed(2),
      peso: Number(peso).toFixed(2),
      exercicios,
      pressao
    });
    setNome('');
    setGlicemia('');
    setPeso('');
    setExercicios('');
    setPressao('')
  } else {
    Alert.alert('Erro', 'Preencha todos os campos corretamente. Glicemia e Peso devem ser numéricos com até duas casas decimais.');
  }
};

const handlePressaoChange = (text) => {
  let sanitized = text.replace(/[^0-9/ ]/g, '');
  setPressao(sanitized);
};

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Registrar Dados de Saúde</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        placeholderTextColor="#90A4AE"
      />
      <TextInput
      style={styles.input}
      placeholder="Pressão Arterial (ex: 120/80)"
      value={pressao}
      onChangeText={handlePressaoChange}
      maxLength={10}
      placeholderTextColor="#90A4AE"
      />
      <TextInput
        style={styles.input}
        placeholder="Glicemia (mg/dL)"
        value={glicemia}
        onChangeText={handleGlicemiaChange}
        keyboardType="numeric"
        maxLength={10}
        placeholderTextColor="#90A4AE"
      />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        value={peso}
        onChangeText={handlePesoChange}
        keyboardType="numeric"
        maxLength={10}
        placeholderTextColor="#90A4AE"
      />
      <TextInput
        style={styles.input}
        placeholder="Exercícios"
        value={exercicios}
        onChangeText={handleExerciciosChange}
        placeholderTextColor="#90A4AE"
      />
      <Button title="Adicionar" onPress={handleAdicionar} color="#1976D2" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1976D2',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0BEC5',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    color: '#263238',
  },
});

export default FormsAcompanhamento;