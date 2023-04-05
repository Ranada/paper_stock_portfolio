type Props = {
  setTickerInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function Form ({setTickerInput}: Props) {
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      const target = event.target as typeof event.target & {
        ticker: { value: string };
      };
      const tickerInput = target.ticker.value;

      console.log("Submitted!", tickerInput, event);
      setTickerInput(tickerInput);
      target.ticker.value = "";
    };

    return (
        <form action="#" method="POST" onSubmit={handleSubmit}>
                <div className="overflow-hidden">
                  <div className="mb-8 flex flex-wrap items-end space-x-4">
                    <div className="w-1/3">
                      <label
                        htmlFor="ticker"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Search ticker
                      </label>
                      <input
                        type="text"
                        name="ticker"
                        id="ticker"
                        autoComplete="off"
                        placeholder="Enter ticker symbol"
                        className="mt-2 block w-full rounded-md border-0 bg-white/[.10] py-1.5 pl-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="w-1/6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </form>
    )
}