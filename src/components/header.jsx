import { useWallet } from "../context/WalletProvider";

const Header = () => {
  const { wallet, connectToWallet } = useWallet();
  return (
    <header>
      <nav>
        {wallet.address ? (
          <>
            <p>{wallet.address}</p>
            <p>{wallet.balance} ETH</p>
          </>
        ) : (
          <button onClick={connectToWallet}>Connect Wallet</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
