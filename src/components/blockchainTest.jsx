// Används inte i projektet
// Detta var en test för att se om jag kunde ansluta till metamask

import { useEffect, useState } from "react";
import { abi } from "../contract/config";
import { ethers } from "ethers";

import { useWallet } from "../context/WalletProvider";

const Blockchaintest = () => {
  const { wallet, hasBrowserExtension } = useWallet();

  return (
    <div>
      {hasBrowserExtension ? (
        <div>
          <h2>Wallet Address: {wallet.address}</h2>
          <h2>Balance: {wallet.balance} ETH</h2>
        </div>
      ) : (
        <h1>Please install MetaMask! 🦊 </h1>
      )}
    </div>
  );
};

export default Blockchaintest;
