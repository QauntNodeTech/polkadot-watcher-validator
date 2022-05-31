import { SessionIndex, ValidatorId } from '@polkadot/types/interfaces';
import { Vec } from '@polkadot/types/codec';

export interface MatrixbotConfig {
    endpoint: string;
}

export interface Subscribable {
    name: string;
    address: string;
    controllerAddress?: string;
    expected?: {
      commission?: number;
      payee?: string;  
    }
}

export interface InputConfig {
    logLevel: string;
    port: number;
    endpoint: string;
    validators: Array<Subscribable>;
}

export interface PromClient {
    increaseBlocksProducedReports(name: string, address: string): void;
    increaseOfflineReports(name: string, address: string): void;
    setStatusOfflineRisk(name: string): void;
    resetStatusOfflineRisk(name: string): void;
    isOfflineRiskStatusFiring(name: string): boolean;
    setStatusOutOfActiveSet(name: string): void;
    resetStatusOutOfActiveSet(name: string): void;
    increasePayeeChangedReports(name: string, address: string): void;
    increaseCommissionChangedReports(name: string, address: string): void;
    setStatusValidatorPayeeUnexpected(name: string, address: string): void;
    resetStatusValidatorPayeeUnexpected(name: string, address: string): void;
    setStatusValidatorCommissionUnexpected(name: string, address: string): void;
    resetStatusValidatorCommissionUnexpected(name: string, address: string): void;
}

interface LabelMap {
    alertname: string;
    severity: string;
}

interface Annotation {
    description: string;
}

interface Alert {
    status: string;
    labels: LabelMap;
    annotations: Annotation;
}

export interface MatrixbotMsg {
    receiver: string;
    status: string;
    alerts: Array<Alert>;
    version: string;
}

export interface ValidatorImOnlineParameters {
  isHeartbeatExpected: boolean;
  sessionIndex: SessionIndex;
  eraIndex: number;
  validatorActiveSet: Vec<ValidatorId>;
}
