function PercentForm() {
  return (
    <div className="w-1/4">
      <input
        type="text"
        name="perent-allocation"
        id="perent-allocation"
        autoComplete="off"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
}

export default function Table() {
    return (
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
          <tr className="hover:bg-white/20">
            <td>AAPL</td>
            <td>Apple</td>
            <td>$2.0T</td>
            <td>
              <PercentForm />
            </td>
          </tr>
          <tr className="hover:bg-white/20">
            <td>MSFT</td>
            <td>Microsoft</td>
            <td>$1.7T</td>
            <td>
              <PercentForm />
            </td>
          </tr>
          <tr className="hover:bg-white/20">
            <td>GOOGL</td>
            <td>Alphabet</td>
            <td>$1.5T</td>
            <td>
              <PercentForm />
            </td>
          </tr>
          <tr className="hover:bg-white/20">
            <td>ABNB</td>
            <td>Airbnb</td>
            <td>$88B</td>
            <td>
              <PercentForm />
            </td>
          </tr>
        </tbody>
      </table>
    );
}

