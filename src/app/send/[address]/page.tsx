"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { erc20Abi } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
const page = () => {
  const { writeContractAsync, data } = useWriteContract();
  const params = useParams();
  const tokenAdr = params["address"];
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState("");
  const [adr, setAdr] = useState("");
  const { toast } = useToast();
  const handleTransfert = async () => {
    if (!isConnected) {
      const resp = await writeContractAsync({
        abi: erc20Abi,
        address: tokenAdr as any,
        functionName: "transfer",
        args: [adr as any, BigInt(amount)]
      });
      toast({
        title: "Transaction sent",
        description: (
          <div className="flex flex-col gap-1">
            <p>Transaction sent successfully.</p>
            <Link href={`https://etherscan.io/tx/${resp}`} target="_blank">
              View on EthScan
            </Link>
          </div>
        )
      });
    } else {
      toast({
        title: "Wallet Not Connected",
        description:"Connect your wallet in order to transfer"
      });
    }
  };
  return (
    <section className="flex flex-1  items-center flex-col my-3 gap-5">
      <div className="w-full p-5 bg-[#141414] rounded-md shadow-md gap-3 flex flex-col max-w-[700px]">
        <div className="flex flex-col bg-background p-3 gap-3 rounded-md">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            placeholder="000000"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col bg-background p-3 gap-3 rounded-md">
          <Label htmlFor="address">Address to send </Label>
          <Input
            value={adr}
            id="address"
            placeholder="0x0001a500a6b18995b03f44bb040a5ffc28e45cb0"
            onChange={(e) => {
              setAdr(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-end">
          <Button onClick={() => {}}>Transfert</Button>
        </div>
      </div>
    </section>
  );
};

export default page;
