import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

function ExchangeRates() {
  const { loading, error, data } = useQuery(gql`
    {
      rates(currency: "USD") {
        currency
        rate
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}

const App = () => {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <ExchangeRates />
    </div>
  );
};

export default App;
