import { IGetBranchResponse } from "./IGetBranchResponse";

export interface IGetBranchButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  fromAddress: string;
  toAddress: string;
  setFirstResponse: (branch: IGetBranchResponse) => void;
  setSecondResponse: (branch: IGetBranchResponse) => void;
  handleGetBranchButton: () => void;
}
