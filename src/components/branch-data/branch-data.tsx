import { useEffect, useState } from "react";
import { IBranchDataProps } from "./contracts/IBranchDataProps";
import { TransactionDataBlock } from "../transaction-data-block/transaction-data-block";

export function BranchData(props: IBranchDataProps) {
  const { branchDataArr, title } = props;
  const [list, setList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newList: JSX.Element[] = [];
    branchDataArr.forEach((transactionData, index) => {
      newList.push(<TransactionDataBlock
        key={index}
        transactionData={transactionData}
      />);
      newList.push(<br />);
    });
    setList(newList);

    console.log(list);
  }, [branchDataArr]);

  return (
    <div className="branch-data">
      <h2>{title}</h2>
      <ul className="transaction-data-list"> {list} </ul>
    </div>
  )
}
