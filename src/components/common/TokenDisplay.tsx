"use client";
import useWalletTokenBalance from "@/hooks/useWalletTokenBalance";
import { useEffect } from "react";
import { useAccount, useReadContracts } from "wagmi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { erc20Abi, formatUnits } from "viem";
import { Button } from "../ui/button";
import Link from "next/link";
type RenderRowProps = {
  tokenAdr: string;
  tokenBalance: any | null;
};
const TokenDisplay = () => {
  const { address, isConnected } = useAccount();
  const { balances, loading, error } = useWalletTokenBalance(address as any);
  useEffect(() => {
    if (!loading) {
      console.log("Balances", balances);
      console.log(error);
    }
  }, [isConnected, loading]);
  const RenderRow = ({ tokenAdr, tokenBalance }: RenderRowProps) => {
    const { data, isLoading } = useReadContracts({
      allowFailure: false,
      contracts: [
        {
          address: tokenAdr as any,
          abi: erc20Abi,
          functionName: "decimals"
        },
        {
          address: tokenAdr as any,
          abi: erc20Abi,
          functionName: "name"
        },
        {
          address: tokenAdr as any,
          abi: erc20Abi,
          functionName: "symbol"
        },
        {
          address: tokenAdr as any,
          abi: erc20Abi,
          functionName: "totalSupply"
        }
      ]
    });
    useEffect(() => {}, [isLoading]);
    return (
      <TableRow>
        <TableCell className="font-medium">{data ? data[1] : "-"}</TableCell>
        <TableCell>{data ? data[2] : "-"}</TableCell>
        <TableCell>{data ? formatUnits(data[3], data[0]) : "-"} </TableCell>
        <TableCell>{data ? data[0] : "-"}</TableCell>
        <TableCell>
          {data ? formatUnits(BigInt(tokenBalance), data[0]) : 0}
        </TableCell>
        <TableCell>
          <div className="flex gap-3">
            <Button
              variant={"secondary"}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open(`https://etherscan.io/address/${tokenAdr}`);
                }
              }}
            >
              View{" "}
            </Button>
            <Button variant={"destructive"}>
              <Link href={`/send/${tokenAdr}`}>Transfert</Link>
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  };
  return (
    <div className="w-full p-5 bg-[#141414] rounded-md shadow-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Token Name</TableHead>
            <TableHead>Token Symbol</TableHead>
            <TableHead>Total Supply</TableHead>
            <TableHead>Decimals</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {balances?.tokenBalances.map((elm) => (
            <RenderRow
              tokenAdr={elm.contractAddress}
              tokenBalance={elm.tokenBalance}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TokenDisplay;
