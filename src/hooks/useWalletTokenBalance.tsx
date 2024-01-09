import { useState, useEffect } from "react";
import { Alchemy, Network, TokenBalancesResponseErc20 } from "alchemy-sdk";

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
};

const alchemy = new Alchemy(config);

const useWalletTokenBalance = (address: string) => {
  const [balances, setBalances] = useState<TokenBalancesResponseErc20 | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!address) return;

      setLoading(true);
      try {
        const fetchedBalances = await alchemy.core.getTokenBalances(address);
        setBalances(fetchedBalances);
      } catch (err) {
        setError(err);
        console.error("Error fetching token balances:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, [address]); // Re-run the effect if the address changes

  return { balances, loading, error };
};

export default useWalletTokenBalance;
