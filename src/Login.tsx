import React from "react";
import { TransitProvider, useTransit } from "@blockmatic/eosio-hooks-transit";
import { initAccessContext } from "eos-transit";
import scatter from "eos-transit-scatter-provider";
import anchor from "eos-transit-anchorlink-provider";

const LoginButtons = () => {
  const { login, logout, wallet, loading } = useTransit();

  return (
    <>
      <p>loading: {loading.toString()}</p>
      <p>Active: {wallet?.active.toString()}</p>
      <pre>Account info: {JSON.stringify(wallet?.accountInfo)}</pre>
      <button onClick={() => login({ providerIndex: 0 })}>Login Scatter</button>
      <button onClick={() => login({ providerIndex: 1 })}>Login Anchor</button>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

const accessContext = initAccessContext({
  appName: "EOSTransit",
  network: {
    host: "eos.greymass.com",
    port: 80,
    protocol: "http",
    chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
  },
  walletProviders: [scatter(), anchor("EOSTransit")],
});

export const Login = () => {
  return (
    <TransitProvider accessContext={accessContext}>
      <LoginButtons />
    </TransitProvider>
  );
};

export default Login;
