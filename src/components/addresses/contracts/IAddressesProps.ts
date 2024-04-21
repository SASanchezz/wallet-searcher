import { IAddressPair } from "../../../common/contracts";
import { IAddressOption } from "../../address-form/contracts/interfaces/IAddressOptions";
import { TAddressesResponse } from "../../address-form/contracts/types/TAddressesResponse";

export interface IAddressesProps extends React.HTMLAttributes<HTMLDivElement> { 
  title: string;
  addresses: TAddressesResponse;
  investigationAddress: IAddressOption;
  onChoose: (address: string) => void;
  setAddressPair: (addressPair: IAddressPair) => void;
  setInvestigationAddress: (address: IAddressOption) => void;
}
