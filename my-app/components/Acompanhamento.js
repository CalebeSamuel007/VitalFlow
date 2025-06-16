import React from 'react';
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

const Acompanhamento: React.FC<AcompanhamentoProps> = ({ itens, removerItem }) => (
  <FlatList
    data={itens}
    keyExtractor={(_, index) => index.toString()}
    renderItem={({ item, index }) => (
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.itemTitle}>{item.nome}</Text>
          <Text style={styles.valorText}>Glicemia: <Text style={styles.valorNumber}>{item.glicemia} mg/dL</Text></Text>
          <Text style={styles.valorText}>Peso: <Text style={styles.valorNumber}>{item.peso} kg</Text></Text>
          <Text style={styles.valorText}>Exercícios: <Text style={styles.valorString}>{item.exercicios}</Text></Text>
          <Text style={styles.valorText}>Pressão: <Text style={styles.valorNumber}>{item.pressao}</Text></Text>
        </View>
        <TouchableOpacity onPress={() => removerItem(index)}>
          <Text style={styles.removeButton}>Remover</Text>
        </TouchableOpacity>
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  itemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, backgroundColor: '#fff', borderRadius: 8, padding: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#1976D2' },
  valorText: { fontSize: 15, color: '#333', marginTop: 2 },
  valorNumber: { fontWeight: 'bold', color: '#388E3C' },
  removeButton: { color: '#D32F2F', marginTop: 8, fontWeight: 'bold' },
});

export default Acompanhamento;