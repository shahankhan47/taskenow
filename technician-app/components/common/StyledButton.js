import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

const tailwind = (styles) => {
  const styleSheet = StyleSheet.create(styles);
  return styleSheet;
};

const StyledButton = ({ title, onPress, complete }) => {
  const styles = tailwind({
    button: {
      backgroundColor: complete ? '#4CAF50' : '#3498db',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 4,
      opacity: complete ? 0.7 : 1, // Dim the button when complete
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    checkMark: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: [{ translateX: -8 }, { translateY: -8 }], // Center the checkmark
      opacity: complete ? 1 : 0, // Hide the checkmark when not complete
    },
  });

  const checkAnimation = new Animated.Value(0);

  // Define an animation for the checkmark
  const animateCheckmark = () => {
    if (complete) {
      Animated.timing(checkAnimation, {
        toValue: 1,
        duration: 500, // Animation duration in milliseconds
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        onPress();
        animateCheckmark();
      }}
      disabled={complete}
    >
      <Text style={styles.buttonText}>{!complete ? title : 'Complete'}</Text>
      <Animated.Text
        style={[
          styles.checkMark,
          {
            transform: [
              {
                scale: checkAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          },
        ]}
      >
        ✓
      </Animated.Text>
    </TouchableOpacity>
  );
};

export default StyledButton;
