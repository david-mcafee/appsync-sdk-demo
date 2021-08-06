import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

const initialState = { name: "", description: "" };

const Todos = () => {
  const [formState, setFormState] = useState(initialState);

  const LIST_TODOS = gql`
    query listTodos {
      listTodos {
        items {
          id
          name
          description
        }
      }
    }
  `;

  const CREATE_TODO = gql`
    mutation createTodo($input: CreateTodoInput!) {
      createTodo(input: $input) {
        id
        name
        description
      }
    }
  `;

  const { loading, data, error } = useQuery(LIST_TODOS);

  const todos = data?.listTodos?.items || [];

  const [addTodoMutateFunction, { createData, createLoading, createError }] =
    useMutation(CREATE_TODO, { refetchQueries: [LIST_TODOS, "listTodos"] });

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;
      const todoId = uuidv4();
      const todo = { id: todoId, ...formState };
      setFormState(initialState);
      addTodoMutateFunction({ variables: { input: { ...todo } } });
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <div>
      <input
        onChange={(event) => setInput("name", event.target.value)}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={(event) => setInput("description", event.target.value)}
        value={formState.description}
        placeholder="Description"
      />
      <button onClick={addTodo}>Add Todo</button>

      {!!createLoading ?? <h2>"Submitting..."</h2>}
      {!!createError ?? <h2>"Submission error!"</h2>}
      {!!createData ?? <h2>"Todo created!"</h2>}
      {!!loading ?? <h2>"Loading todos..."</h2>}
      {!!error ?? <h2>"Error loading todos!"</h2>}

      {todos.map((todo, index) => (
        // Update key in README to not use index
        <div key={todo.id ? todo.id : index}>
          <h2>{todo.name}</h2>
          <h3>{todo.description}</h3>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Todos 🚀</h1>
      <Todos />
    </div>
  );
};

export default App;
