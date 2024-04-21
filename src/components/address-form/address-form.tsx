import axios from "axios";
import React, { useEffect, useState } from "react";
import { appConfig } from "../../config/app-config";
import { IAddressFormErrors } from "./contracts/interfaces/IAddressFormErrors";
import { validateAddress } from "./validator";
import { IAddressFormProps } from "./contracts/interfaces/IAddressFormProps";
import { IAddressOption } from "./contracts/interfaces/IAddressOptions";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

export function AddressForm(props: IAddressFormProps) {
  const { investigationAddress, setAddressPair, setInvestigationAddress } = props; 

  const [errors, setErrors] = useState<IAddressFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [options, setOptions] = useState<IAddressOption[]>([]);

  useEffect(() => {
    axios.get(`${appConfig.apiBaseUrl}/addresses`)
      .then(response => setOptions(response.data.map((address: string) => ({ name: address }))))
      .catch(error => console.error(error));
      console.log(options);
  }, []);

  useEffect(() => {
    const finishSubmit = () => {
      axios.get(`${appConfig.apiBaseUrl}/interrelated`, { params: { address: investigationAddress.name } })
        .then(response => setAddressPair({
          fromAddresses: response.data.from,
          toAddresses: response.data.to,
        }))
        .catch(error => setErrors({ ...errors, address: error.response.data.error }));

    };

    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }

  }, [errors]);
  

  const onAddressChange = (event: DropdownChangeEvent) => {
    setInvestigationAddress(event.value);
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrors(validateAddress(investigationAddress));
  }

  return (
    <>
      <form 
      className="address-form"
      onSubmit={onSubmit}>
        <Dropdown
          className="w-full md:w-14rem"
          value={ investigationAddress }
          onChange={onAddressChange}
          placeholder="Address"
          filter
          options={options}
          optionLabel="name"
        />

        <button
          className="investigate-button"
          type="submit"
        >
          Investigate
        </button>

          {Object.keys(errors).length !== 0 &&
            <div className="errors">
              {
                Object.entries(errors).map(([key, value]) => {
                  return <p>{value}</p>
                })
              }
            </div>
          }
      </form>
    </>
  );
}