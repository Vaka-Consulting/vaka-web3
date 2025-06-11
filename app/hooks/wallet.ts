import { useContext } from "react";
import { WalletExtended, WalletExtendedContext } from "@/contexts";

export const useWalletExtended = (): WalletExtended => {
  return useContext(WalletExtendedContext);
};
