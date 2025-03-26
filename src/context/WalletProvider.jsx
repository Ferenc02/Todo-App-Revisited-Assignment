import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  connectToBlockchain,
  getBalance,
  getTodosFromContract,
  writeToContract,
  removeTodoFromContract,
  toggleTodoFromContract,
} from "../services/blockchainService";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [hasBrowserExtension, setBrowserExtension] = useState(false);

  const [wallet, setWallet] = useState({
    address: undefined,
    balance: "",
  });

  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();

  const [readContract, setReadContract] = useState();
  const [writeContract, setWriteContract] = useState();

  const connectToWallet = async () => {
    if (!provider) return;

    const { signer, readContract, writeContract } = await connectToBlockchain(
      provider
    );

    setSigner(signer);
    setReadContract(readContract);
    setWriteContract(writeContract);

    const address = await signer.getAddress();
    const balance = await getBalance(provider, address);
    setWallet({ address, balance });
  };

  useEffect(() => {
    if (window.ethereum) {
      const newProvider = new ethers.BrowserProvider(window.ethereum, 31337);
      setProvider(newProvider);
      setBrowserExtension(true);
    }
  }, []);

  useEffect(() => {
    if (provider) {
      connectToWallet();
    }
  }, [provider]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        hasBrowserExtension,
        connectToWallet,
        writeToContract,
        getTodosFromContract,
        readContract,
        writeContract,
        removeTodoFromContract,
        toggleTodoFromContract,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
