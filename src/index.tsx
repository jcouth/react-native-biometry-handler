import BiometryHandler from './NativeBiometryHandler';

export const { authenticate, isAvailable } = BiometryHandler;

export type { SupportedBiometrics } from './NativeBiometryHandler';
