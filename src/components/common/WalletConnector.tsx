"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { FC } from "react";
import { useAccount, useConnect } from "wagmi";
import { Button } from "../ui/button";
type WalletConnectorProps = {};
const WalletConnector: FC<WalletConnectorProps> = () => {
  const { connectors, connect } = useConnect();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Connect Wallet </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose you wallet</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col gap-2">
          {connectors.map((connector) => (
            <Button key={connector.uid} onClick={() => connect({ connector })}>
              {connector.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnector;
