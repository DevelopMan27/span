// SplashScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/SpanLogo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Span App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode:"contain",
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
