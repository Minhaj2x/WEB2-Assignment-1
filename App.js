import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

// Header Component
const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>User Profile</Text>
    </View>
  );
};

// Profile Component
const Profile = ({ name }) => {
  return (
    <View style={styles.profile}>
      <Image
        style={styles.profilePic}
        source={{ uri: 'https://placekitten.com/200/200' }} // Replace with a real image URL
      />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

// Main App Component
const App = () => {
  const [greeting, setGreeting] = useState('');

  const toggleGreeting = () => {
    if (greeting) {
      setGreeting('');
    } else {
      setGreeting('Hello! Welcome to React Native');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Profile name="John Doe" />
      <Text style={styles.greeting}>{greeting}</Text>
      <Button title="Toggle Greeting" onPress={toggleGreeting} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200ea',
    width: '100%',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  profile: {
    alignItems: 'center',
    margin: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    marginTop: 10,
  },
  greeting: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default App;
