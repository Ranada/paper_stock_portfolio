import { resolve } from "path";
console.log(resolve);
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

const apiDataValidator = z.object({
  Symbol: z.string(),
  AssetType: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  MarketCapitalization: z.string(),
});

type apiDataType = z.infer<typeof apiDataValidator>;

const getCompanyOverview = async (ticker: string) => {
  try {
    ticker = ticker.toUpperCase();
    const res = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=8EJHKBNM180M13R5`
    );
    const data = apiDataValidator.parse(await res.json());

    return data;
  } catch (err) {
    console.log("Error:", err);
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

export const stocksRouter = createTRPCRouter({
  getStockInfo: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const ticker = input.text;

      const companyAPIData = await getCompanyOverview(ticker);

      if (!companyAPIData) throw new Error("Unable to find stock data.")

      const company: apiDataType = {
        Symbol: companyAPIData.Symbol,
        AssetType: companyAPIData.AssetType,
        Name: companyAPIData.Name,
        Description: companyAPIData.Description,
        MarketCapitalization: (
          parseFloat(companyAPIData.MarketCapitalization) / 1000000000
        )
          .toFixed(1)
          .toString(),
      };

      // console.log(result["Monthly Time Series"]['2011-10-31']);
      // const sampleTimeData = result["Monthly Time Series"]["2011-10-31"]['4. close'];
      // console.log(sampleTimeData)

      return {
        company,
      };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const investments = await ctx.prisma.investments.findMany({
      take: 100,
    });
    return investments;
  }),

  postInvestment: protectedProcedure
    .input(
      z.object({
        Symbol: z.string(),
        AssetType: z.string(),
        Name: z.string(),
        Description: z.string(),
        MarketCapitalization: z.string(),
      })
    )
    .mutation( async ({ ctx, input }) => {
        console.log("FROM POSTINVESMENT PROCEDURE", ctx.session, input);
        return await ctx.prisma.investments.create({
            data: {
                company: input.Name,
                ticker: input.Symbol,
                marketCap: input.MarketCapitalization,
                percentHoldings: "0"
            }
        })
    }),
});
