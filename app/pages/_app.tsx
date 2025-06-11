import { useMemo } from "react";
import { web3AuthProvider } from "@/providers/web3auth";
import {
  AuthContextProvider,
  WalletContextProvider,
  WalletExtendedContextProvider,
} from "@/contexts";
import type { AppProps } from "next/app";
// import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
// import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
// import theme from "../theme";
import "@/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  const projectAssetsPolicyIds = useMemo(() => [], []);

  return (
    <div>
      <CssBaseline />
      <WalletContextProvider>
        <WalletExtendedContextProvider
          projectPrefix={"storybook"}
          projectTokenPolicyId={
            "171163f05e4f30b6be3c22668c37978e7d508b84f83558e523133cdf"
          }
          projectAssetsPolicyIds={projectAssetsPolicyIds}>
          <AuthContextProvider provider={web3AuthProvider}>
            <Component {...pageProps} />
          </AuthContextProvider>
        </WalletExtendedContextProvider>
      </WalletContextProvider>
    </div>
  );
}

export default App;
