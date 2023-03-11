import { type NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

// Components
import Table from "./components/Table";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "Checkout and rate other paper stock portfolios." });
  const stockInfo = api.example.getStockInfo.useQuery({text: 'msft'});

  return (
    <>
      <Head>
        <title>Paper Stock Portfolio</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex w-2/3 flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-left text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Paper <span className="text-[hsl(280,100%,70%)]">Stock</span>{" "}
            Portfolio
          </h1>
          <div className="w-full rounded-xl bg-white/10 p-4">
            <Table />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              Ticker: {stockInfo.data ? stockInfo.data.ticker : "Searching for stock..."}
            </p>
            <p className="text-2xl text-white">
              Company: {stockInfo.data ? stockInfo.data.company : "Searching for stock..."}
            </p>
            <p className="text-2xl text-white">
              Market cap: {stockInfo.data ? stockInfo.data.marketcap : "Searching for stock..."}
            </p>
            <p className="text-2xl text-white">
              Closing price: {stockInfo.data ? stockInfo.data.closingPrice : "Searching for stock..."}
            </p>
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};