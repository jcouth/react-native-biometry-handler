import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type SupportedBiometrics =
  | 'STRONG'
  | 'WEAK'
  | 'DEVICE_CREDENTIAL'
  | 'NONE';

export interface Spec extends TurboModule {
  isAvailable(): SupportedBiometrics;

  authenticate(): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('BiometryHandler');
