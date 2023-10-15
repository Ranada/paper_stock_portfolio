import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Link from "next/link";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({
    text: "Track stocks and your target percentage holdings.",
  });
  const { data } = api.stocks.getAll.useQuery();

  console.log("DB DATA:", typeof data, data);

  return (
    <>
      <Head>
        <title>Paper Stock Portfolio</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start bg-neutral-900">
        <div className="container flex w-2/3 flex-col items-start justify-start gap-12 px-4 py-16 ">
          <h1 className="text-left text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Paper Stock Portfolio
          </h1>
          <div>
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
          </div>
          <div className="flex justify-end">
            <Link href="/stocksearch" className="text-white">
              <button className="inline-flex justify-start rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Search Stocks
              </button>
            </Link>
          </div>
          <div className="w-full rounded-xl bg-white/10 p-4">
            <table className="w-full table-fixed text-white">
              <thead>
                <tr className="text-left">
                  <th>Ticker</th>
                  <th>Company</th>
                  <th>Market Cap</th>
                  <th>Percent holdings</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((investment) => (
                  <tr
                    key={investment.id}
                    className="text-white hover:bg-white/20"
                  >
                    <td>{investment.ticker}</td>
                    <td>{investment.company}</td>
                    <td>{investment.marketCap}</td>
                    <td>{investment.percentHoldings} %</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex w-full flex-col justify-start gap-2">
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined,
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-base text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-md bg-white/10 px-10 py-2 text-sm font-semibold font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
