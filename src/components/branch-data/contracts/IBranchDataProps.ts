import { ITransactionData } from "../../../common/contracts/ITransactionData";

export interface IBranchDataProps extends React.HTMLAttributes<HTMLDivElement> {
  branchDataArr: ITransactionData[];
  title: string;
}
