
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';

const CalculatorApp = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
  
    const handleButtonPress = (value) => {
      if (value === '=') {
        calculateResult();
      } else if (value === 'C') {
        clearInput();
      } else if (value === 'DEL') {
        deleteLastCharacter();
      } else if (value === 'π') {
        setInput((prevInput) => prevInput + Math.PI);
      } else if (value === 'sin(' || value === 'cos(' || value === 'tan(' || value === 'log(') {
        setInput((prevInput) => prevInput + value);
      } else if (value === 'x^2') {
        setInput((prevInput) => prevInput + '^2');
      } else if (value === '√' || value === 'factorial(' || value === '%') {
        setInput((prevInput) => prevInput + value);
        calculateResult();
      } else {
        setInput((prevInput) => prevInput + value);
      }
    };
  
    const clearInput = () => {
      setInput('');
      setResult('');
    };
  
    const calculateResult = () => {
      try {
        let evaluated = input.replace(/√/g, 'sqrt').replace(/x(?=\d)/g, '*').replace(/(sin|cos|tan|log|sqrt|factorial)/g, 'Math.$1');
        evaluated = eval(evaluated);
        if (evaluated === Infinity || isNaN(evaluated)) {
          setResult('Error');
        } else {
          setResult(evaluated.toString());
        }
      } catch (error) {
        setResult('Error');
      }
    };
  
    const deleteLastCharacter = () => {
      setInput((prevInput) => prevInput.slice(0, -1));
    };
  
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Built @Page Innovations Tech</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>{input}</Text>
            <Text style={styles.inputText}>{result}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            {buttonRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.buttonRow}>
                {row.map((button, index) => (
                  <TouchableOpacity
                    key={button.value}
                    style={[
                      styles.button,
                      button.wide && styles.buttonWide,
                      button.backgroundColor && { backgroundColor: button.backgroundColor },
                      index === row.length - 1 && rowIndex === buttonRows.length - 1 && styles.buttonEqual,
                      button.label === 'C' && styles.buttonRed,
                    ]}
                    onPress={() => handleButtonPress(button.value)}
                  >
                    <Text style={[styles.buttonText, index === row.length - 1 && rowIndex === buttonRows.length - 1 && styles.buttonEqualText, button.textColor && { color: button.textColor }]}>{button.label}</Text>
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
      backgroundColor: '#F8F8F8',
    },
    header: {
      backgroundColor: '#00CCFF',
      paddingVertical: 15,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333333',
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
      paddingTop: 20,
      backgroundColor: '#00CCFF',
      borderWidth: 2,
      borderColor: '#FFF',
      borderRadius: 25,
    },
    inputText: {
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
      width: Dimensions.get('window').width / 2.2,
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 24,
      color: '#333333',
    },
    buttonEqual: {
      backgroundColor: '#00FF00', // Green color for the "=" button
      width: Dimensions.get('window').width / 2.2,
      borderRadius: 10,
    },
    buttonEqualText: {
      color: '#FFFFFF', // White text color for the "=" button
    },
    buttonRed: {
      backgroundColor: 'red', // Red color for the "C" button
      width: Dimensions.get('window').width / 2.2,
      borderRadius: 10,
    },
  });
  
  
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
      { label: 'DEL', value: 'DEL', textColor: 'purple' }, // Set text color for DEL to blue
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
  
export default CalculatorApp;