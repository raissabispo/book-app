import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 10, 
    backgroundColor: '#e2ccee' 
  },
  card: { 
    marginBottom: 10 
  },
  image: { 
    height: 200, 
    width: '100%', 
    marginTop: 5 
  },
  input: { 
    marginBottom: 10 
  },
  fab: {
    position: 'absolute', 
    bottom: 20, 
    right: 20, 
    backgroundColor: '#4CAF50',
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  fabText: { 
    fontSize: 24, 
    color: '#fff' 
  },
  mapButton: {
    position: 'absolute', 
    bottom: 20, 
    left: 20, 
    backgroundColor: '#2196F3',
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  // Novos estilos para título e descrição do header
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4B0082',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
});
