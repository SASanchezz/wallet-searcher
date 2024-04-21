import { ITransactionData } from "../../../common/contracts/ITransactionData";

export interface IGetBranchResponse  {
  error?: string;
  branchData?: ITransactionData[];
}
