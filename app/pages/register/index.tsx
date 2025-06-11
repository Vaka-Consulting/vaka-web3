import React from "react";
import { Layout } from "@/components/Layout";
import AuthRegister from "@/components/Auth/AuthRegister/AuthRegister";
import { AuthRegisterContextProvider } from "@/contexts/AuthRegisterContext";
import { web3AuthProvider } from "@/providers/web3auth";
import { GetServerSideProps } from "next";
import getServerSidePropsWrapper from "@/lib/wrappers/getServerSideProps";

export default function RegisterPage() {
  return (
    <Layout>
      <AuthRegisterContextProvider provider={web3AuthProvider}>
        <AuthRegister />
      </AuthRegisterContextProvider>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(
  async () => {
    return {
      props: {},
    };
  }
);
