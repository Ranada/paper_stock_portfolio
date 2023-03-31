export {}
// // import { useState } from 'react';
// // import { z } from 'zod';
// import { api, type RouterOutputs } from "~/utils/api";
// import type { Dispatch, SetStateAction } from 'react';

// /*
//   This example requires some changes to your config:
  
//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */

// // const apiDataValidator = z.object({
// //   Symbol: z.string(),
// //   AssetType: z.string().optional(),
// //   Name: z.string().optional(),
// //   Description: z.string().optional(),
// //   MarketCapitalization: z.string(),
// // });

// // type apiDataType = z.infer<typeof apiDataValidator>;

// type StocksOutput = RouterOutputs["stocks"]["getStockInfo"]

// interface Props {
//   setTickerInput: Dispatch<SetStateAction<string>>;
//   setStockInfo: Dispatch<SetStateAction<StocksOutput>>;
// }

// function GetData(tickerInput) {
//   let data = api.stocks.getStockInfo.useQuery({ text: tickerInput });
//   return data ;
// }


// export default function Form(props: Props) {
//   console.log("PROPS: ", typeof props, props)
//   const { setTickerInput, setStockInfo  } = props;
//   // const [ticker, setTicker] = useState("");
//   // const [stockInfo, setStockInfo] = useState({});

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     const target = event.target as typeof event.target & {
//       ticker: { value: string };
//     };
//     const tickerInput = target.ticker.value;

//     console.log("Clicked!", tickerInput, event);
//     setTickerInput(tickerInput);
    
//     const stockInfo = GetData(tickerInput)
//     console.log("TEST!!!!!!", stockInfo.data);

//     setStockInfo(stockInfo);
//     // setStockInfo(api.stocks.getStockInfo.useQuery({ text: ticker }));
//   };

//   return (
//     <>
//       <form action="#" method="POST" onSubmit={handleSubmit}>
//         <div className="overflow-hidden">
//           <div className="mb-8 flex flex-wrap items-end space-x-4">
//             <div className="w-1/3">
//               <label
//                 htmlFor="ticker"
//                 className="block text-sm font-medium leading-6 text-white"
//               >
//                 Search ticker
//               </label>
//               <input
//                 type="text"
//                 name="ticker"
//                 id="ticker"
//                 autoComplete="off"
//                 placeholder="Enter ticker symbol"
//                 // value=""
//                 // onChange={({ target }) => setTicker(target?.value)}
//                 className="mt-2 block w-full rounded-md border-0 bg-white/[.10] py-1.5 pl-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//             <div className="w-1/6">
//               <button
//                 type="submit"
//                 className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// }
