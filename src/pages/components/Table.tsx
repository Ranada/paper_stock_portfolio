
export default function Table() {
    return (
      <table className="w-full table-fixed text-white">
        <thead>
          <tr className="text-left">
            <th>Ticker</th>
            <th>Company</th>
            <th>Market Cap</th>
            <th>Holdings</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-white/20">
            <td>AAPL</td>
            <td>Apple</td>
            <td>$2.0T</td>
            <td>25%</td>
          </tr>
          <tr className="hover:bg-white/20">
            <td>MSFT</td>
            <td>Microsoft</td>
            <td>$1.7T</td>
            <td>25%</td>
          </tr>
          <tr className="hover:bg-white/20">
            <td>GOOGL</td>
            <td>Alphabet</td>
            <td>$1.5T</td>
            <td>25%</td>
          </tr>
          <tr className="hover:bg-white/20">
            <td>ABNB</td>
            <td>Airbnb</td>
            <td>$88B</td>
            <td>25%</td>
          </tr>
        </tbody>
      </table>
    );
}

