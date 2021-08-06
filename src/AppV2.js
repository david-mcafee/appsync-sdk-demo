// // docs miss React import
// import React from "react";
// import gql from "graphql-tag";
// import { graphql, compose } from "react-apollo";
// import { graphqlMutation } from "aws-appsync-react";

// // include description in docs to match default setup
// const CreateTodo = gql`
//   mutation createTodo($name: String!, $description: String!) {
//     createTodo(input: { name: $name, description: $description }) {
//       name
//       description
//     }
//   }
// `;

// // include description in docs to match default setup
// const listTodos = gql`
//   query listTodo {
//     listTodos {
//       items {
//         id
//         name
//         description
//       }
//     }
//   }
// `;

// class App extends React.Component {
//   // Consider update this to use React hooks instead
//   state = { name: "", description: "" };
//   // TODO: example didn't include description, which was part of the default setup.
//   onChange = (e) => {
//     this.setState({ name: e.target.value, value: e.target.value });
//   };

//   addTodo = () =>
//     this.props.createTodo({
//       name: this.state.name,
//       description: this.state.description,
//     });

//   render() {
//     return (
//       <div>
//         <input onChange={this.onChange} placeholder="Todo name" />
//         <button onClick={this.addTodo}>Add Todo</button>
//         {this.props.todos.map((todo, index) => (
//           // Update key on docs
//           <div key={todo.id ? todo.id : index}>
//             <h2>{todo.name}</h2>
//             <h3>{todo.description}</h3>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

// export default compose(
//   graphql(listTodos, {
//     options: {
//       fetchPolicy: "cache-and-network",
//     },
//     props: (props) => ({
//       todos: props.data.listTodos ? props.data.listTodos.items : [],
//     }),
//   })
//   //   graphqlMutation(CreateTodo, listTodos, "Todo")
// )(App);
