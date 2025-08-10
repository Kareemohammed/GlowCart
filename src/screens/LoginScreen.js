import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Hello Again!</Text>
        <Text style={styles.subtitle}>Welcome back you’ve been missed.</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter your email Id"
            value={email}
            onChangeText={setEmail}
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

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.replace('Main')}
      >
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or Continue With</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialRow}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/google.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images//apple.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/facebook.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.registerText}>
        Not a Member?{' '}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate('Register')}
        >
          Register Now
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

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#8C1D21',
    paddingHorizontal: 20,
    fontFamily: 'Playfair Display',
  },
  subtitle: {
    fontSize: 14,
    color: '#6E6E6E',
    marginTop: 4,
    paddingHorizontal: 20,
  },

  inputContainer: { marginTop: 60, paddingHorizontal: 20 },
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

  forgotBtn: { alignSelf: 'flex-end', marginBottom: 20 },
  forgotText: {
    color: '#B04E53',
    fontSize: 12,
    textDecorationLine: 'underline',
  },

  loginBtn: {
    backgroundColor: '#B04E53',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 2,
    width: '90%',
    alignSelf: 'center',
  },
  loginText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 50,
    paddingHorizontal: 20,
  },
  line: { flex: 1, height: 1, backgroundColor: '#ccc' },
  orText: { marginHorizontal: 8, color: '#777' },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  socialIcon: { width: 40, height: 40, resizeMode: 'contain', borderRadius: 5 },

  registerText: { textAlign: 'center', color: '#555', marginTop: 20 },
  registerLink: { color: '#B04E53', fontWeight: '600' },
});
