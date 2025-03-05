import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Task Card Component
const TaskCard = ({ task, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: task.image }} style={styles.taskImage} />
      <Text style={styles.taskTitle}>{task.title}</Text>
      <Text style={styles.taskDescription}>{task.description}</Text>
    </TouchableOpacity>
  );
};

// Home Screen (Task List)
const HomeScreen = ({ navigation }) => {
  const tasks = [
    { id: 1, title: 'Task 1', description: 'This is task 1', image: 'https://via.placeholder.com/100' },
    { id: 2, title: 'Task 2', description: 'This is task 2', image: 'https://via.placeholder.com/100' },
    { id: 3, title: 'Task 3', description: 'This is task 3', image: 'https://via.placeholder.com/100' },
  ];

  return (
    <ScrollView>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onPress={() => navigation.navigate('TaskDetails', { taskId: task.id })} />
      ))}
    </ScrollView>
  );
};

// Task Details Screen
const TaskDetailsScreen = ({ route }) => {
  const { taskId } = route.params;

  const taskDetails = {
    1: { title: 'Task 1', description: 'Detailed description for task 1', image: 'https://via.placeholder.com/200' },
    2: { title: 'Task 2', description: 'Detailed description for task 2', image: 'https://via.placeholder.com/200' },
    3: { title: 'Task 3', description: 'Detailed description for task 3', image: 'https://via.placeholder.com/200' },
  };

  const task = taskDetails[taskId];

  return (
    <View style={styles.detailsScreen}>
      <Image source={{ uri: task.image }} style={styles.taskImage} />
      <Text style={styles.taskTitle}>{task.title}</Text>
      <Text style={styles.taskDescription}>{task.description}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

// Create Stack Navigator
const Stack = createStackNavigator();

// Main App
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  taskTitle: { fontSize: 18, fontWeight: 'bold' },
  taskDescription: { fontSize: 14, color: 'gray' },
  card: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  taskImage: { width: 100, height: 100, borderRadius: 10 },
  detailsScreen: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
