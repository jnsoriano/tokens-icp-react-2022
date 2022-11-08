import React,{useState} from "react";
import { Principal } from '@dfinity/principal';
import {token} from '../../../declarations/token'
function Balance() {
  const [inputValue,setInputValue] = useState("");
  const [balanceResult, setBalanceResult] = useState("");
  const [cryptoSymbol, setCryptoSymbol] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  async function handleClick() {
    // console.log(inputValue);
    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);
    setBalanceResult(balance.toLocaleString());
    setCryptoSymbol(await token.getSymbol());
    setIsHidden(false);
  }




  return (
    <div className="window white">
      <label>Check account coin balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e)=>setInputValue(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} {cryptoSymbol}.</p>
    </div>
  );
}

export default Balance;
