import axios from "axios";
import { IGetBranchButtonProps } from "./contracts/IGetBranchButtonProps";
import { appConfig } from "../../config/app-config";

export function GetBranchButton(props: IGetBranchButtonProps) {
  const { setFirstResponse, setSecondResponse, handleGetBranchButton, fromAddress, toAddress } = props;

  const handleClick = () => {
    axios.get(`${appConfig.apiBaseUrl}/branch`, {
      params: {
        from: fromAddress,
        to: toAddress,
      }
    })
    .then(response => setFirstResponse({ branchData: response.data }))
    .catch(error => setFirstResponse({ error: error.response.data.error }));

    axios.get(`${appConfig.apiBaseUrl}/branch`, {
      params: {
        from: toAddress,
        to: fromAddress,
      }
    })
    .then(response => setSecondResponse({ branchData: response.data }))
    .catch(error => setSecondResponse({ error: error.response.data.error }));
    handleGetBranchButton();
  };


  return (
    <div>
      <button
        className="get-branch-button"
        onClick={handleClick}
      >
        Get Branch
      </button>
    </div>
  )
}