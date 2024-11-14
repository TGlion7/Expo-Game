import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';

// Иконки для игры
const choices = {
  rock: require('./assets/rock.png'),
  paper: require('./assets/paper.png'),
  scissors: require('./assets/scissors.png'),
};

export default function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  const playGame = (userSelection) => {
    const computerSelection = getComputerChoice();
    setUserChoice(userSelection);
    setComputerChoice(computerSelection);
    setResult(determineWinner(userSelection, computerSelection));
  };

  const getComputerChoice = () => {
    const choicesArray = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choicesArray.length);
    return choicesArray[randomIndex];
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      return "Ничья!";
    }
    if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'scissors' && computer === 'paper') ||
      (user === 'paper' && computer === 'rock')
    ) {
      return "Вы выиграли!";
    } else {
      return "Компьютер выиграл!";
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Камень, Ножницы, Бумага</Text>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={() => playGame('rock')} style={styles.button}>
            Камень
          </Button>
          <Button mode="contained" onPress={() => playGame('paper')} style={styles.button}>
            Бумага
          </Button>
          <Button mode="contained" onPress={() => playGame('scissors')} style={styles.button}>
            Ножницы
          </Button>
        </View>
        <View style={styles.resultsContainer}>
          {userChoice && (
            <View style={styles.choiceContainer}>
              <Text style={styles.resultText}>Ваш выбор:</Text>
              <Image source={choices[userChoice]} style={styles.choiceImage} />
            </View>
          )}
          {computerChoice && (
            <View style={styles.choiceContainer}>
              <Text style={styles.resultText}>Выбор компьютера:</Text>
              <Image source={choices[computerChoice]} style={styles.choiceImage} />
            </View>
          )}
          {result && <Text style={styles.result}>{result}</Text>}
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: '#6200ee',
  },
  resultsContainer: {
    alignItems: 'center',
  },
  choiceContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  choiceImage: {
    width: 100,
    height: 100,
    marginTop: 5,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  resultText: {
    fontSize: 20,
    marginBottom: 5,
  },
});
