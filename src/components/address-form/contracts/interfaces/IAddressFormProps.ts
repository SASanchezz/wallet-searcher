import { IAddressPair } from "../../../../common/contracts";
import { IAddressOption } from "./IAddressOptions";

export interface IAddressFormProps {
  investigationAddress: IAddressOption;
  setAddressPair: (addressPair: IAddressPair) => void;
  setInvestigationAddress: (address: IAddressOption) => void;
}
