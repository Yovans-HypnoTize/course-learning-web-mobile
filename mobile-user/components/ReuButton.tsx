import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';

interface ReuButtonProps {
  onPress: () => void;
  label: string;
  buttonStyle?: ViewStyle;
}

const ReuButton: React.FC<ReuButtonProps> = ({ onPress, label, buttonStyle }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReuButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
