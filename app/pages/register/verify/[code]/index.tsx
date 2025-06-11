import { Layout } from "@/components/Layout";
import { web3AuthProvider } from "@/providers/web3auth";
import { AuthRegisterContextProvider } from "@/contexts/AuthRegisterContext";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import AuthVerification from "@/components/Auth/AuthVerification";
import { GetServerSidePropsContext } from "next";

export default function Register({ code }: { code: string }) {
  console.log("code", code);

  if (!code) {
    return (
      <Layout>
        <div className="w-full max-w-2xl mx-auto p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-blue-100 p-3">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Getting registration code...
              </h1>
              <p className="text-muted-foreground">
                Please wait while we retrieve your verification details.
              </p>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full max-w-2xl mx-auto p-4">
        <AuthRegisterContextProvider provider={web3AuthProvider}>
          <AuthVerification code={code} />
        </AuthRegisterContextProvider>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const code = context.query.code as string;

  return {
    props: { code },
  };
};
