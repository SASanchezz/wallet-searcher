import { IAddressFormErrors } from "./contracts/interfaces/IAddressFormErrors";
import { IAddressOption } from "./contracts/interfaces/IAddressOptions";

export function validateAddress(address: IAddressOption) {
  let errors: IAddressFormErrors = {};
  
  if (!address.name.trim()) {
    errors.address = "address is emtpy";
  }
  return errors;
};