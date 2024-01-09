"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import React, { FC } from "react";
import { config } from "@/lib/config";
type MainContextProviderProps = {
  children: React.ReactNode;
};
const queryClient = new QueryClient();
const MainContextProvider: FC<MainContextProviderProps> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default MainContextProvider;
