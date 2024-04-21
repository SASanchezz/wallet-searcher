import { ITransactionData } from "../../../common/contracts";

export interface ITransactionDataBlockProps extends React.HTMLAttributes<HTMLDivElement>   {
  key: number,
  transactionData: ITransactionData
}
