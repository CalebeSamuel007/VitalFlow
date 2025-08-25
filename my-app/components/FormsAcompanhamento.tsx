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
      setPressao('');
    } else {
      Alert.alert('Erro', 'Preencha todos os campos corretamente. Glicemia e Peso devem ser numéricos com até duas casas decimais.');
    }
  };

  const handlePressaoChange = (text: string) => {
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
        placeholderTextColor="#66bb6a"
      />
      <TextInput
        style={styles.input}
        placeholder="Pressão Arterial (ex: 120/80)"
        value={pressao}
        onChangeText={handlePressaoChange}
        maxLength={10}
        placeholderTextColor="#66bb6a"
      />
      <TextInput
        style={styles.input}
        placeholder="Glicemia (mg/dL)"
        value={glicemia}
        onChangeText={handleGlicemiaChange}
        keyboardType="numeric"
        maxLength={10}
        placeholderTextColor="#66bb6a"
      />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        value={peso}
        onChangeText={handlePesoChange}
        keyboardType="numeric"
        maxLength={10}
        placeholderTextColor="#66bb6a"
      />
      <TextInput
        style={styles.input}
        placeholder="Exercícios"
        value={exercicios}
        onChangeText={handleExerciciosChange}
        placeholderTextColor="#66bb6a"
      />
      <View style={styles.buttonContainer}>
        <Button title="Adicionar" onPress={handleAdicionar} color="#388E3C" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E8F5E9', // verde claro
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#388E3C',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#2E7D32', // verde escuro
    alignSelf: 'center',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A5D6A7', // verde médio
    padding: 14,
    marginBottom: 14,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#F1F8E9', // verde muito claro
    color: '#1B5E20', // verde bem escuro
  },
  buttonContainer: {
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default FormsAcompanhamento;