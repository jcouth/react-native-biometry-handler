import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
  isAvailable,
  type SupportedBiometrics,
} from 'react-native-biometry-handler';

const status: Record<SupportedBiometrics, String> = {
  STRONG: 'é do tipo "Forte"',
  WEAK: 'é do tipo "Fraca"',
  DEVICE_CREDENTIAL: 'é do tipo "Credenciais do Dispositivo"',
  NONE: 'não está disponível',
};

export default function App() {
  const [biometricStatus, setBiometricStatus] =
    useState<SupportedBiometrics | null>(null);

  const handleDevicePassword = () => {
    Alert.alert('to do');
  };

  useEffect(() => {
    setBiometricStatus(isAvailable());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>react-native-biometry-handler</Text>
      {biometricStatus ? (
        <Text style={styles.feedback}>
          A autenticação por biometria {status[biometricStatus]}!
        </Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleDevicePassword}>
        <Text style={styles.buttonText}>Usar senha do celular</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#9400d3',
  },
  logo: {
    fontSize: 18,
    color: 'white',
  },
  feedback: {
    fontSize: 14,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    padding: 16,
    width: '100%',
    borderRadius: 32,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
