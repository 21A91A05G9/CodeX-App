import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text } from 'react-native';
import axios from 'axios';

const ChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: "text-davinci-003",
        prompt: `User: ${userInput}\nAI: `,
        max_tokens: 150,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,
        }
      });

      const aiResponse = response.data.choices[0].text.trim();
      setChatHistory(prevChat => [...prevChat, { user: userInput, ai: aiResponse }]);
      setUserInput('');
    } catch (error) {
      console.error('Error:', error);
      // Display an error message to the user
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer} ref={(ref) => { this.scrollView = ref }}>
        {chatHistory.map((chat, index) => (
          <View key={index} style={styles.chatItem}>
            <Text style={styles.userMessage}>{chat.user}</Text>
            <Text style={styles.aiMessage}>{chat.ai}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message here"
          value={userInput}
          onChangeText={setUserInput}
        />
        <Button title="Send" onPress={handleUserInput} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatContainer: {
    flexGrow: 1,
  },
  chatItem: {
    marginBottom: 10,
  },
  userMessage: {
    marginBottom: 5,
  },
  aiMessage: {
    marginLeft: 10,
    marginBottom: 5,
    color: 'blue',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});

export default ChatBot;
