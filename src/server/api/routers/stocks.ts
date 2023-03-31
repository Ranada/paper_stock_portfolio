import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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

export const stocksRouter = createTRPCRouter({
  getStockInfo: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const ticker = input.text;

      const apiDataValidator = z.object({
        Symbol: z.string(),
        AssetType: z.string().optional(),
        Name: z.string().optional(),
        Description: z.string().optional(),
        MarketCapitalization: z.string(),
      });

      type apiDataType = z.infer<typeof apiDataValidator>;

      const companyAPIData: apiDataType = (await getCompanyOverview(
        ticker
      )) as apiDataType;

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
});
