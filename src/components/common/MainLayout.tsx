import MainHeader from "@/components/common/MainHeader";
import TokenDisplay from "@/components/common/TokenDisplay";
import { cn } from "@/lib/utils";
import React, { FC } from "react";
type MainLayoutProps = {
  children: React.ReactNode;
};
const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-full w-full flex flex-col flex-1 ">
      <MainHeader />
      <main
        className={cn(
          "container mx-auto  flex flex-col justify-center  min-h-[calc(100vh-80px)] gap-12 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] "
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
