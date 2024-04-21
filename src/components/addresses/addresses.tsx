import { useState } from "react";
import { IAddressesProps } from "./contracts/IAddressesProps";
import { MenuContext } from "../menu-context/menu-context";
import axios from "axios";
import { appConfig } from "../../config/app-config";

export function Addresses(props: IAddressesProps) {
  const { title, addresses, investigationAddress, onChoose, setAddressPair, setInvestigationAddress } = props;
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleChoose = (address: string) => {
    setSelectedAddress(address);
    onChoose(address);
  };

  const handleInvestigate = (address: string) => {
    setInvestigationAddress({name: address});
    axios.get(`${appConfig.apiBaseUrl}/interrelated`, { params: { address } })
    .then(response => setAddressPair({
      fromAddresses: response.data.from,
      toAddresses: response.data.to,
    }))
    .catch(error => console.error(error));
  };

  const initilizeAddressesList = () => {
    const addressList = addresses.map((address, index) => {
      return (
        <li 
        key={index} 
        className={selectedAddress === address ? 'selected' : ''}
        onClick={() => handleChoose(address)}>
          <MenuContext address = {address} handleInvestigate = {() => handleInvestigate(address)}>
            <p>{address}</p>
          </MenuContext>

        </li>
      );
    });


    addressList.unshift(<li
      key='separator'
    >
      <p>___________________</p>
    </li>)
    addressList.unshift(<li
      key='investigation-address'
      className={selectedAddress === investigationAddress.name ? 'selected' : ''}
      onClick={() => handleChoose(investigationAddress.name)}
    >
      <p>{investigationAddress.name}</p>
    </li>)

    return (
      <ul className="addresses-list"> {addressList} </ul>
    );
  }

  return (
    <div className="addresses">
      <h2>{title}</h2>
      {initilizeAddressesList()}
    </div>
  )
}