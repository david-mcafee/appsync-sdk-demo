import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

const initialState = { name: "", description: "" };

const Todos = () => {
  // Component State
  const [formState, setFormState] = useState(initialState);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  // List
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

  const {
    loading: listLoading,
    data: listData,
    error: listError,
  } = useQuery(LIST_TODOS);

  const todos = listData?.listTodos?.items || [];

  // Create
  const CREATE_TODO = gql`
    mutation createTodo($input: CreateTodoInput!) {
      createTodo(input: $input) {
        id
        name
        description
      }
    }
  `;

  // Optional: use `data`, `loading`, and `error`
  const [addTodoMutateFunction] = useMutation(CREATE_TODO, {
    refetchQueries: [LIST_TODOS, "listTodos"],
  });

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

  // Delete
  const DELETE_TODO = gql`
    mutation deleteTodo($input: DeleteTodoInput!) {
      deleteTodo(input: $input) {
        id
        name
        description
      }
    }
  `;

  // Optional: use `data`, `loading`, and `error`
  const [deleteTodoMutateFunction] = useMutation(DELETE_TODO, {
    refetchQueries: [LIST_TODOS, "listTodos"],
  });

  async function removeTodo(id) {
    try {
      deleteTodoMutateFunction({ variables: { input: { id } } });
    } catch (err) {
      console.log("error deleting todo:", err);
    }
  }

  let status = "";

  if (listLoading) {
    status = "Loading todos...";
  } else if (listError) {
    status = "Error loading todos!";
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

      <h2>{status}</h2>

      {todos.map((todo, index) => (
        // Update key in README to not use index
        <div key={todo.id ? todo.id : index}>
          <h2>{todo.name}</h2>
          <h3>{todo.description}</h3>
          <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Todos using Apollo V3 🚀</h1>
      <Todos />
    </div>
  );
};

export default App;
