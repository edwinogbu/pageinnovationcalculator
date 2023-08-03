
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  SafeAreaView,
} from 'react-native';

// Function to convert degrees to radians
const degToRad = (degrees) => (degrees * Math.PI) / 180;

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleButtonPress = (value) => {
    if (error) {
      setError('');
    }

    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      clearInput();
    } else if (value === 'DEL') {
      deleteLastCharacter();
    } else if (value === 'π') {
      setInput((prevInput) => prevInput + Math.PI);
    } else if (value === '√' || value === '%') {
      setInput((prevInput) => prevInput + value);
      calculateResult();
    } else if (value === '(' || value === ')') {
      setInput((prevInput) => prevInput + value);
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
    setError('');
  };

  const calculateResult = () => {
    try {
      // Replace custom functions and symbols
      const expression = input
        .replace(/√/g, 'sqrt')
        .replace(/x(?=\d)/g, '*')
        .replace(/sin\(/g, 'Math.sinDeg(')
        .replace(/cos\(/g, 'Math.cosDeg(')
        .replace(/tan\(/g, 'Math.tanDeg(')
        .replace(/\^2/g, '**2')
        .replace(/factorial\(/g, 'factorial(')
        .replace(/%/g, '/100');

      // Evaluate the expression
      const evaluatedResult = eval(expression);

      // Check for special cases (Infinity, NaN)
      if (!Number.isFinite(evaluatedResult)) {
        throw new Error('Invalid result');
      }

      setResult(evaluatedResult.toString());
    } catch (error) {
      setError('Invalid expression');
      setResult('');
    }
  };

  const deleteLastCharacter = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
    setResult('');
    setError('');
  };

  // Custom trigonometric functions for sine, cosine, and tangent in degrees
  Math.sinDeg = (degrees) => Math.sin(degToRad(degrees));
  Math.cosDeg = (degrees) => Math.cos(degToRad(degrees));
  Math.tanDeg = (degrees) => Math.tan(degToRad(degrees));

  // Button configurations
  const buttonRows = [
    [
      { label: '7', value: '7' },
      { label: '8', value: '8' },
      { label: '9', value: '9' },
      { label: '/', value: '/' },
    ],
    [
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6', value: '6' },
      { label: '*', value: '*' },
    ],
    [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '-', value: '-' },
    ],
    [
      { label: '0', value: '0' },
      { label: '.', value: '.' },
      { label: '%', value: '%', textColor: 'darkgreen' }, // Set text color for % to dark green
      { label: '+', value: '+' },
    ],
    [
      { label: 'DEL', value: 'DEL', textColor: 'purple' }, // Set text color for DEL to purple
      { label: '!', value: 'factorial(' },
      { label: '±', value: '±' },
      { label: 'π', value: 'π', textColor: 'darkblue' }, // Set text color for π to dark blue
    ],
    [
      { label: 'sin', value: 'sin(', textColor: 'blue' }, // Set text color for sin to blue
      { label: 'cos', value: 'cos(', textColor: 'green' }, // Set text color for cos to green
      { label: 'tan', value: 'tan(', textColor: 'purple' }, // Set text color for tan to purple
      { label: 'log', value: 'log(', textColor: 'orange' }, // Set text color for log to orange
    ],
    [
      { label: 'x^2', value: 'x^2', textColor: 'darkorange' }, // Set text color for x^2 to dark orange
      { label: '√', value: 'sqrt(', textColor: 'darkblue' }, // Set text color for √ to dark blue
      { label: '(', value: '(', textColor: 'black' }, // Set text color for ( to black
      { label: ')', value: ')', textColor: 'black' }, // Set text color for ) to black
    ],
    [
      { label: 'C', value: 'C', wide: true, textColor: 'white' }, // "C" button with width of "=" button and white text
      { label: '=', value: '=', wide: true, backgroundColor: '#00FF00', textColor: 'white' }, // "=" button with green background and width of "C" button and white text
    ],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Page Innovations Technologies</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>{input}</Text>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <Text style={styles.inputResultText}>{result}</Text>
          )}
        </View>
        <View style={styles.buttonsContainer}>
          {buttonRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.buttonRow}>
              {row.map((button, index) => (
                <TouchableOpacity
                  key={button.label}
                  style={[
                    styles.button,
                    button.wide && styles.buttonWide,
                    button.backgroundColor && { backgroundColor: button.backgroundColor },
                    index === row.length - 1 && rowIndex === buttonRows.length - 1 && styles.buttonEqual,
                    button.label === 'C' && styles.buttonRed,
                  ]}
                  onPress={() => handleButtonPress(button.value)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      index === row.length - 1 && rowIndex === buttonRows.length - 1 && styles.buttonEqualText,
                      button.textColor && { color: button.textColor },
                    ]}
                  >
                    {button.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00083C',
  },
  header: {
    backgroundColor: '#00083C',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 1,
    alignItems: 'flex-end',
    marginTop: 25,
    paddingTop: 10,
    backgroundColor: '#EFEFEF',
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 25,
    marginBottom:5,
  },
  inputText: {
    fontSize: 20,
    textAlign: 'right',
    color: '#333333',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputResultText: {
    fontSize: 40,
    textAlign: 'right',
    color: '#333333',
    marginBottom: 10,
  },
  buttonsContainer: {
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width / 5.5,
    height: 50,
    backgroundColor: '#EFEFEF',
    borderRadius: 30,
    elevation: 5,
  },
  buttonWide: {
    width: Dimensions.get('window').width / 3.5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    color: '#333333',
  },
  buttonEqual: {
    backgroundColor: '#00FF00', // Green color for the "=" button
    width: Dimensions.get('window').width / 2.0,
    borderRadius: 10,
  },
  buttonEqualText: {
    color: '#FFFFFF', // White text color for the "=" button
  },
  buttonRed: {
    backgroundColor: 'red', // Red color for the "C" button
    width: Dimensions.get('window').width / 3.1,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 20,
    textAlign: 'right',
    color: 'red',
    marginBottom: 10,
  },
});


export default App;
