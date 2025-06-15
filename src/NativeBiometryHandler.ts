import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type SupportedBiometricsKeys =
  | 'STRONG'
  | 'WEAK'
  | 'DEVICE_CREDENTIAL'
  | 'NONE';

export const SupportedBiometrics = {
  STRONG: 3,
  WEAK: 2,
  DEVICE_CREDENTIAL: 1,
  NONE: 0,
} as const satisfies Record<SupportedBiometricsKeys, number>;

type AuthenticateResult =
  | {
      isSuccess: true;
      code?: never;
      reason?: never;
    }
  | {
      isSuccess: false;
      code?: number | null;
      reason?: string | null;
    };

export interface Spec extends TurboModule {
  isAvailable(): SupportedBiometricsKeys;

  authenticate(): Promise<AuthenticateResult>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('BiometryHandler');
