import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

// function ExchangeRates() {
//   const { loading, error, data } = useQuery(gql`
//     {
//       rates(currency: "USD") {
//         currency
//         rate
//       }
//     }
//   `);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   return data.rates.map(({ currency, rate }) => (
//     <div key={currency}>
//       <p>
//         {currency}: {rate}
//       </p>
//     </div>
//   ));
// }

function Todos() {
  const LIST_TODOS = gql`
    query listTodos {
      items {
        id
        name
        description
      }
    }
  `;

  const { loading, data, error } = useQuery(LIST_TODOS);

  console.log(loading);
  console.log(data);
  console.log(error);
  // debugger;
  // const todos = data.listTodos ? data.listTodos.items : [];

  return (
    <div>
      {/* <input onChange={this.onChange} placeholder="Todo name" /> */}
      {/* <button onClick={this.addTodo}>Add Todo</button> */}
      {/* {todos.map((todo, index) => (
        // Update key on docs
        <div key={todo.id ? todo.id : index}>
          <h2>{todo.name}</h2>
          <h3>{todo.description}</h3>
        </div>
      ))} */}
    </div>
  );
}

const App = () => {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <Todos />
      {/* <ExchangeRates /> */}
    </div>
  );
};

export default App;
