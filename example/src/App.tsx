import { useEffect, useState } from 'react';
import {
  Alert,
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  authenticate,
  isAvailable,
  type SupportedBiometricsKeys,
} from 'react-native-biometry-handler';

const status: Record<SupportedBiometricsKeys, String> = {
  STRONG: 'A autenticação por biometria é do tipo "Forte"',
  WEAK: 'A autenticação por biometria é do tipo "Fraca"',
  DEVICE_CREDENTIAL:
    'A autenticação por biometria é do tipo "Credenciais do Dispositivo"',
  NONE: 'A autenticação por biometria não está disponível',
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [biometricStatus, setBiometricStatus] =
    useState<SupportedBiometricsKeys | null>(null);

  const handleAuthenticate = async () => {
    const { isSuccess, reason } = await authenticate();

    if (!isSuccess) {
      return Alert.alert(reason ?? 'UNKNOWN');
    }

    setIsAuthenticated(true);
  };

  const handleSignOut = async () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setBiometricStatus(isAvailable());
    InteractionManager.runAfterInteractions(() => handleAuthenticate());
  }, []);

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <>
          <Text style={styles.mainText}>Autenticado com sucesso!</Text>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {biometricStatus ? (
            <Text style={styles.mainText}>{status[biometricStatus]}!</Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={handleAuthenticate}>
            <Text style={styles.buttonText}>Usar senha do celular</Text>
          </TouchableOpacity>
        </>
      )}
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
  mainText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
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
