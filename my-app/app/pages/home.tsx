import FormsAcompanhamento from '@/components/FormsAcompanhamento';
import Acompanhamento from '@/components/Acompanhamento';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';

type Item = {
  nome: string;
  glicemia: string;
  peso: string;
  exercicios: string;
  pressao: string;
};

const Home: React.FC = () => {
  const [itens, setItens] = useState<Item[]>([]);

  const adicionarItem = (novoItem: Item) => {
    if (
      novoItem.nome.trim() !== '' &&
      novoItem.glicemia.trim() !== '' &&
      novoItem.peso.trim() !== '' &&
      novoItem.exercicios.trim() !== '' &&
      novoItem.pressao.trim() !== ''
    ) {
      setItens([...itens, novoItem]);
    }
  };

  const removerItem = (index: number) => {
    setItens(itens.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8F5E9" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.header}>Acompanhamento de Saúde</Text>
          <FormsAcompanhamento adicionarItem={adicionarItem} />
          <View style={styles.divider} />
          <Acompanhamento itens={itens} removerItem={removerItem} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 20,
    alignSelf: 'center',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#A5D6A7',
    marginVertical: 18,
    borderRadius: 2,
  },
});

export default Home;