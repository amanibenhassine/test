"use client";
import Image from "next/image";
import WalletConnector from "./WalletConnector";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "../ui/button";
import { abbreviate } from "@/lib/abbreviate";
const MainHeader = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <header className="flex justify-between items-center p-3   border-b ">
      <Image
        src={"/images/eth-logo.svg"}
        alt="Eth"
        height={50}
        width={50}
        className="rounded-md"
      />
      {!isConnected ? (
        <WalletConnector />
      ) : (
        <Button onClick={() => disconnect()}> {abbreviate(address, 4)} </Button>
      )}
    </header>
  );
};

export default MainHeader;
