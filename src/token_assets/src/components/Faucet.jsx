import React,{useState} from "react";
import {token,canisterId,createActor} from '../../../declarations/token'
import { AuthClient } from "@dfinity/auth-client";


function Faucet(props) {


  const [isDisabled,setIsDisabled] = useState(false)
  const [buttonText,setText]=useState("tokens tokeeeens!");


  async function handleClick(event) {
    setIsDisabled(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId,{
      agentOptions:{
        identity,
      },
    })

   const result = await authenticatedCanister.payOut();
   setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free JNS tokens here! Claim 10,000 DTOKEN coins to {props.userPrincipal}</label>
      <p className="trade-buttons">
        <button disabled={isDisabled} id="btn-payout" onClick={handleClick}>
         {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
