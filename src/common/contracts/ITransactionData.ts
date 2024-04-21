import { IShortTransactionData } from "./IShortTransactionData";

export interface ITransactionData extends IShortTransactionData {
  hash: string;
  gas: number;
  gasPrice: number;
  maxFeePerGas: number;
  maxPriorityFeePerGas: number;
  value: number;
  timestamp: number;
  date?: string;
  nonce: number;
}

export function getShortTransactionData(transactionData: ITransactionData): IShortTransactionData {
  const { hash, value, date } = transactionData;
  return { hash, value, date };
}
