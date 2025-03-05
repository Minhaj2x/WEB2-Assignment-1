import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Task Component
function Task({ task, onPress, onComplete }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={task.image} style={styles.taskImage} />
      <View style={styles.taskTextContainer}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskDescription}>{task.description}</Text>
        <TouchableOpacity onPress={onComplete}>
          <Text style={styles.completeText}>
            {task.completed ? "Completed" : "Mark as Completed"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// Task Details Screen
function TaskDetails({ route }) {
  const { task } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{task.title}</Text>
      <Image source={task.image} style={styles.taskImageLarge} />
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
      image: require('./assets/homework.jpg'),  // Local image for homework
      completed: false,
    },
    {
      id: '2',
      title: 'Buy Groceries',
      description: 'Pick up groceries from the store.',
      image: require('./assets/groceries.jpg'),  // Local image for groceries
      completed: false,
    },
    {
      id: '3',
      title: 'Clean the House',
      description: 'Clean the living room and kitchen.',
      image: require('./assets/cleaning.jpg'),  // Local image for cleaning
      completed: false,
    },
  ]);

  const handleTaskPress = (task) => {
    navigation.navigate('TaskDetails', { task });
  };

  const handleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Task Manager</Text>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onPress={() => handleTaskPress(task)} onComplete={() => handleComplete(task.id)} />
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
    flexWrap: 'wrap',  // Ensures wrapping
  },
  taskImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  taskTextContainer: {
    flex: 1,  // This ensures the text container takes up the remaining space
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#555',  // Lighter color for the description
    marginTop: 5,  // Added a margin for spacing
    flexWrap: 'wrap',  // Ensures the description text wraps
  },
  taskImageLarge: {
    width: 200,
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  taskStatus: {
    fontSize: 18,
    color: 'green',
  },
  completeText: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 10,
    fontWeight: 'bold',
  },
});
