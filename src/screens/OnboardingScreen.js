import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/onboardingImg.png')}
        style={styles.centerImage}
        resizeMode="contain"
      />

      <View style={styles.bottomSection}>
        <Text style={styles.title}>Viorra</Text>
        <Text style={styles.subtitle}>Your Beauty, Delivered.</Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.paginationTrack}>
          <View style={styles.paginationFill} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9A7A2',
    justifyContent: 'space-between',
  },

  centerImage: {
    width: '120%',
    height: '70%',
    alignSelf: 'center',
    marginTop: 10,
  },

  bottomSection: {
    alignItems: 'center',
    paddingBottom: 70,
    marginBottom: 30,
  },

  title: {
    fontSize: 36,
    color: '#ffff',
    fontFamily: 'Italiana',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#B84953',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  paginationLine: {
    marginTop: 20,
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#B04E53',
  },
  paginationTrack: {
    width: 160,
    height: 10,
    borderRadius: 8,
    backgroundColor: '#cab1ab',
    overflow: 'hidden',
    marginTop: 20,
  },
  paginationFill: {
    height: '100%',
    width: '45%',
    borderRadius: 8,
    backgroundColor: '#f6ded7',
  },
});
