import BiometryHandler from './NativeBiometryHandler';

export const { authenticate, isAvailable } = BiometryHandler;

export {
  SupportedBiometrics,
  type SupportedBiometricsKeys,
} from './NativeBiometryHandler';
