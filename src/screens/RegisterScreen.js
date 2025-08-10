import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Join The Glow!</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <Icon
            name="mail-outline"
            size={20}
            color="#999"
            style={styles.inputIcon}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPass}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <MaterialIcon
            name={showPass ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#999"
            style={styles.inputIcon}
            onPress={() => setShowPass(!showPass)}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={!showConfirmPass}
            value={confirmPass}
            onChangeText={setConfirmPass}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <MaterialIcon
            name={showConfirmPass ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#999"
            style={styles.inputIcon}
            onPress={() => setShowConfirmPass(!showConfirmPass)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.createBtn}>
        <Text style={styles.createText}>Create Account</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        Already a Member?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          Log In
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFEDE9' },
  top: {
    backgroundColor: '#F1B0B0',
    paddingTop: 90,
    paddingBottom: 80,
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    width: '100%',
    alignSelf: 'stretch',
    paddingHorizontal: 30,
  },
  title: { fontSize: 22, fontWeight: '700', color: '#8C1D21' },

  inputContainer: { marginTop: 50, paddingHorizontal: 20 },
  inputWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  input: { flex: 1, height: 50, fontSize: 14, color: '#333' },
  inputIcon: { marginLeft: 8 },

  createBtn: {
    backgroundColor: '#B04E53',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 2,
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  createText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  bottomText: { textAlign: 'center', color: '#555', marginTop: 50 },
  loginLink: { color: '#B04E53', fontWeight: '600' },
});
