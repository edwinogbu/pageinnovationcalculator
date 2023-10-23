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
      calculateResult();
    } else if (value === '√') {
      setInput((prevInput) => {
        const result = Math.sqrt(eval(prevInput));
        return result.toString();
      });
    } else if (value === '%') {
      setInput((prevInput) => {
        const result = eval(prevInput + '/100');
        return result.toString();
      });
    } else if (value === '!') {
      setInput((prevInput) => {
        const factorialExpression = `${prevInput}!`;
        const result = calculateFactorial(parseInt(prevInput));
        setResult(`${factorialExpression} = ${result}`);
        return `${factorialExpression} = ${result}`;
      });
    } else if (value === '(' || value === ')') {
      setInput((prevInput) => prevInput + value);
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const calculateFactorial = (n) => {
    if (n === 0 || n === 1) {
      return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const clearInput = () => {
    setInput('');
    setResult('');
    setError('');
  };

  const calculateResult = () => {
    try {
      const expression = input
        .replace(/x(?=\d)/g, '*')
        .replace(/sin\(/g, 'Math.sinDeg(')
        .replace(/cos\(/g, 'Math.cosDeg(')
        .replace(/tan\(/g, 'Math.tanDeg(')
        .replace(/\^/g, '**')
        .replace(/%/g, '/100');

      const evaluatedResult = eval(expression);

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

  Math.sinDeg = (degrees) => Math.sin(degToRad(degrees));
  Math.cosDeg = (degrees) => Math.cos(degToRad(degrees));
  Math.tanDeg = (degrees) => Math.tan(degToRad(degrees));

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
      { label: '%', value: '%', textColor: 'darkgreen' },
      { label: '+', value: '+' },
    ],
    [
      { label: '√', value: '√', textColor: 'darkblue' },
      { label: '!', value: '!', textColor: 'purple' },
      { label: '±', value: '±' },
      { label: 'π', value: 'π', textColor: 'darkblue' },
    ],
    [
      { label: 'sin', value: 'sin(', textColor: 'blue' },
      { label: 'cos', value: 'cos(', textColor: 'green' },
      { label: 'tan', value: 'tan(', textColor: 'purple' },
      { label: '^', value: '^', textColor: 'darkorange' },
    ],
    [
      { label: 'DEL', value: 'DEL', wide:true, textColor: 'purple' },
      { label: '(', value: '(', textColor: 'black' },
      { label: ')', value: ')', textColor: 'black' },
    ],
    [
      { label: 'C', value: 'C', wide: true, textColor: 'white' },
      { label: '=', value: '=', wide: true, backgroundColor: '#00FF00', textColor: 'white' },
    ],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Scientific Calculator</Text>
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
        <Text style={styles.copyrightText}>© Eddy@pageInnovation</Text>
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 16,
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
    marginBottom: 5,
    margin: 20,
    marginHorizontal: 30,
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
    backgroundColor: '#00FF00',
    width: Dimensions.get('window').width / 2.0,
    borderRadius: 10,
  },
  buttonEqualText: {
    color: '#FFFFFF',
  },
  buttonRed: {
    backgroundColor: 'red',
    width: Dimensions.get('window').width / 3.1,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 20,
    textAlign: 'right',
    color: 'red',
    marginBottom: 10,
  },

  copyrightText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
  },

});

export default App;

