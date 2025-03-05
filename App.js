import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Task Component
function Task({ task, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: task.image }} style={styles.taskImage} />
      <Text style={styles.taskTitle}>{task.title}</Text>
      <Text>{task.description}</Text>
    </TouchableOpacity>
  );
}

// Task Details Screen
function TaskDetails({ route }) {
  const { task } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{task.title}</Text>
      <Image source={{ uri: task.image }} style={styles.taskImageLarge} />
      <Text style={styles.taskDescription}>{task.description}</Text>
      <Text style={styles.taskStatus}>{task.completed ? 'Task Completed' : 'Task Pending'}</Text>
    </View>
  );
}

// Home Screen
function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Complete Homework',
      description: 'Complete the React Native assignment.',
      image: 'https://via.placeholder.com/150',
      completed: false,
    },
    {
      id: '2',
      title: 'Buy Groceries',
      description: 'Pick up groceries from the store.',
      image: 'https://via.placeholder.com/150',
      completed: false,
    },
    {
      id: '3',
      title: 'Clean the House',
      description: 'Clean the living room and kitchen.',
      image: 'https://via.placeholder.com/150',
      completed: false,
    },
  ]);

  const handleTaskPress = (task) => {
    navigation.navigate('TaskDetails', { task });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Task Manager</Text>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onPress={() => handleTaskPress(task)} />
      ))}
    </ScrollView>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TaskDetails" component={TaskDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskImageLarge: {
    width: 200,
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  taskDescription: {
    fontSize: 16,
    marginBottom: 15,
  },
  taskStatus: {
    fontSize: 18,
    color: 'green',
  },
});
