import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const getCompanyOverview = async (ticker: string) => {
  try {
    ticker = ticker.toUpperCase();

    const res = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=8EJHKBNM180M13R5`
    );
    const data = (await res.json()) as object;
    return data;
  } catch (err) {
    console.log(err);
  }
};

// const getMonthlyPrice = async (ticker: string) => {
//   try {
//     ticker = ticker.toUpperCase();

//     const res = await fetch(
//       `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${ticker}&apikey=8EJHKBNM180M13R5`
//     );
//     const data = await res.json() as object;
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

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
      console.log("INPUT: ", input);
      const ticker = input.text;
    
      interface APIData {
        Symbol: string,
        AssetType: string,
        Name: string,
        Description: string,
        MarketCapitalization: string
      }
      
      const companyAPIData: APIData = await getCompanyOverview(ticker) as APIData;
      // const result = await getMonthlyPrice(ticker);
      
      interface Company {
        symbol: string,
        assetType: string,
        name: string,
        description: string,
        marketCap: string
      }

      const company: Company  = {
        symbol: companyAPIData.Symbol,
        assetType: companyAPIData.AssetType,
        name: companyAPIData.Name,
        description: companyAPIData.Description,
        marketCap: ((parseFloat(companyAPIData.MarketCapitalization) / 1000000000).toFixed(1)).toString()
      }

      // console.log(result["Monthly Time Series"]['2011-10-31']);
      // const sampleTimeData = result["Monthly Time Series"]["2011-10-31"]['4. close'];
      // console.log(sampleTimeData)

      return {
        company
      };
    }),
});
