import { useEffect, useState } from "react";
import { AddressForm } from "../components/address-form/address-form";
import { Addresses } from "../components/addresses/addresses";
import { GetBranchButton } from "../components/get-branch-button/get-branch-button";
import { IGetBranchResponse } from "../components/get-branch-button/contracts/IGetBranchResponse";
import { ITransactionData, IAddressPair } from "../common/contracts";
import { BranchData } from "../components/branch-data/branch-data";
import { DateUtils } from "../common/utils/DateUtils";
import { IAddressOption } from "../components/address-form/contracts/interfaces/IAddressOptions";

export function HomePage() {
  const [investigationAddress, setInvestigationAddress] = useState<IAddressOption>({ name: ''});
  const [addressPair, setAddressPair] = useState<IAddressPair>({ fromAddresses: [], toAddresses: [] });
  const [leftSelectedAddress, setLeftSelectedAddress] = useState<string>('');
  const [rightSelectedAddress, setRightSelectedAddress] = useState<string>('');
  const [firstBranchData, setFirstBranchData] = useState<ITransactionData[]>({} as ITransactionData[]);
  const [secondBranchData, setSecondBranchData] = useState<ITransactionData[]>({} as ITransactionData[]);
  const [leftSelectedAddressCopy, setLeftSelectedAddressCopy] = useState<string>('');
  const [rightSelectedAddressCopy, setRightSelectedAddressCopy] = useState<string>('');

  const onChooseLeft = (address: string) => {
    setLeftSelectedAddress(address);
  }

  const onChooseRight = (address: string) => {
    setRightSelectedAddress(address);
  }

  const setFirstBranchResponse = (branchResponse: IGetBranchResponse) => {
    if (branchResponse.error) {
      console.error(branchResponse.error);
      return;
    }
    branchResponse.branchData?.forEach((branchData) => {
      branchData.date = DateUtils.unixToDateString(branchData.timestamp);
    });

    setFirstBranchData(branchResponse.branchData!);
  }

  const setSecondBranchResponse = (branchResponse: IGetBranchResponse) => {
    if (branchResponse.error) {
      console.error(branchResponse.error);
      return;
    }
    branchResponse.branchData?.forEach((branchData) => {
      branchData.date = DateUtils.unixToDateString(branchData.timestamp);
    });

    setSecondBranchData(branchResponse.branchData!);
  }

  const handleGetBranchButton = () => {
    setLeftSelectedAddressCopy(leftSelectedAddress);
    setRightSelectedAddressCopy(rightSelectedAddress);
  }

  return (
    <div className="home-page">
      <div className="choose-address-container">
        <h1 className="insert-address-h1">Insert address to investigate</h1>
        <AddressForm
          investigationAddress = { investigationAddress }
          setAddressPair = { setAddressPair }
          setInvestigationAddress = { setInvestigationAddress }
        />
      </div>

      <GetBranchButton
        className="get-branch-button"
        handleGetBranchButton = { handleGetBranchButton }
        setFirstResponse = { setFirstBranchResponse }
        setSecondResponse = { setSecondBranchResponse }
        fromAddress = { leftSelectedAddress }
        toAddress = { rightSelectedAddress }
      />

      <div className="addresses-container">
        { !!addressPair?.fromAddresses &&
        <Addresses
          className="from-addresses"
          addresses = { addressPair.fromAddresses }
          investigationAddress = { investigationAddress }
          title = "Addresses the address has received transactions from:"
          onChoose = { onChooseLeft }
          setAddressPair = { setAddressPair }
          setInvestigationAddress = { setInvestigationAddress }
        /> }

        { !!addressPair?.toAddresses &&
        <Addresses
          className="to-addresses"
          addresses = { addressPair.toAddresses }
          investigationAddress = { investigationAddress }
          title = "Addresses the address has sent transactions to:"
          onChoose = { onChooseRight }
          setAddressPair = { setAddressPair }
          setInvestigationAddress = { setInvestigationAddress }
        /> }

        { firstBranchData?.length > 0 && 
        <BranchData
          title={`From ${leftSelectedAddressCopy} to ${rightSelectedAddressCopy}:`}
          branchDataArr = { firstBranchData } 
        /> }

        { secondBranchData?.length > 0 && 
        <BranchData
          title={`From ${rightSelectedAddressCopy} to ${leftSelectedAddressCopy}:`}
          branchDataArr = { secondBranchData } 
        /> }

      </div>

    </div>
  );
}