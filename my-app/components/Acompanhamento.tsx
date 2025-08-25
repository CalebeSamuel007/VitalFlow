import React, { useRef, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Item = {
  nome: string;
  glicemia: string;
  peso: string;
  exercicios: string;
  pressao: string;
};

type AcompanhamentoProps = {
  itens: Item[];
  removerItem: (index: number) => void;
};

const Acompanhamento: React.FC<AcompanhamentoProps> = ({ itens, removerItem }) => {
  const flatListRef = useRef<FlatList<Item>>(null);

  useEffect(() => {
    if (itens.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [itens]);

  return (
    <FlatList
      ref={flatListRef}
      data={itens}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.itemContainer}>
          <View>
            <Text style={styles.itemTitle}>{item.nome}</Text>
            <Text style={styles.valorText}>
              Glicemia: <Text style={styles.valorNumber}>{item.glicemia} mg/dL</Text>
            </Text>
            <Text style={styles.valorText}>
              Peso: <Text style={styles.valorNumber}>{item.peso} kg</Text>
            </Text>
            <Text style={styles.valorText}>
              Exercícios: <Text style={styles.valorString}>{item.exercicios}</Text>
            </Text>
            <Text style={styles.valorText}>
              Pressão: <Text style={styles.valorNumber}>{item.pressao}</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => removerItem(index)}>
            <Text style={styles.removeButton}>Remover</Text>
          </TouchableOpacity>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#388E3C',
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 2,
  },
  valorText: {
    fontSize: 15,
    color: '#388E3C',
    marginTop: 2,
  },
  valorNumber: {
    fontWeight: 'bold',
    color: '#43A047',
  },
  valorString: {
    fontWeight: 'bold',
    color: '#388E3C',
  },
  removeButton: {
    color: '#C62828',
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default Acompanhamento;