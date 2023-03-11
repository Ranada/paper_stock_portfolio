import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const callAPI = async () => {
  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo`
    );
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Welcome! ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getStockInfo: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const mockData = {
        ticker: "MSFT",
        company: "Microsoft",
        marketcap: "1.5T",
      };

      const result = await callAPI();

      // console.log(result["Monthly Time Series"]['2011-10-31']);
      const sampleTimeData = result["Monthly Time Series"]["2011-10-31"]['4. close'];
      console.log(sampleTimeData)
      return {
        ticker: mockData.ticker, 
        company: mockData.company, 
        marketcap: mockData.marketcap, 
        closingPrice: sampleTimeData
      };
    }),
});
