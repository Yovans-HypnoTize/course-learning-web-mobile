import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface ReuGradientButtonProps {
  onPress: () => void;
  label: string;
  gradientColors: string[];
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  btnStyles?: ViewStyle
}

const ReuGradientButton: React.FC<ReuGradientButtonProps> = ({
  onPress,
  label,
  gradientColors,
  startIcon,
  endIcon,
  btnStyles
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradientWrapper, btnStyles]}
      >
        <View style={styles.container}>
          {startIcon && <View style={styles.iconWrapper}>{startIcon}</View>}
          <Text style={styles.buttonText}>{label}</Text>
          {endIcon && <View style={styles.iconWrapper}>{endIcon}</View>}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ReuGradientButton;

const styles = StyleSheet.create({
  gradientWrapper: {
    borderRadius: 15,
    overflow: 'hidden',
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconWrapper: {
    marginHorizontal: 10,
  },
});
