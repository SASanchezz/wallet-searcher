import { useState } from "react";
import { getShortTransactionData } from "../../common/contracts";
import { ITransactionDataBlockProps } from "./contracts/ITransactionDataBlockProps";

export function TransactionDataBlock(props: ITransactionDataBlockProps) {
  const { transactionData } = props;
  const [openned, setOpenned] = useState(false);

  const shortTransactionData = getShortTransactionData(transactionData);
  const transactionnView = Object.entries(transactionData).map(([key, value]) => {
    return (<p>{key}: {value}</p>);
  });
  const shortTransactionnView = Object.entries(shortTransactionData).map(([key, value]) => {
    return (<p>{key}: {value}</p>);
  });

  return (
    <>
      <li
        key={props.key}
        onClick={() => setOpenned(!openned)}
      >
        { openned ? transactionnView : shortTransactionnView }
      </li>
    </>
  )
}
