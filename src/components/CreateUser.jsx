import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { GET_USERS } from "./Users";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(input: { name: $name, email: $email }) {
      user {
        id
        name
        email
        postsCount
      }
      errors
    }
  }
`;

const CreateUser = () => {
  const [state, setState] = useState({ name: "", email: "" });
  const [createUser] = useMutation(CREATE_USER, {
    variables: state,
    refetchQueries: [{ query: GET_USERS }],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    createUser();
    setState({ name: "", email: "" });
  };

  return (
    <div className="lg:fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
      <form className="lg:px-8 pt-2 pb-2" onSubmit={(e) => onSubmit(e)}>
        <div className="lg:flex flex-wrap flex-between items-center justify-center lg:p-0 p-6">
          <h4 className="font-bold lg:pr-4">Create new user</h4>
          <div className="lg:pr-4">
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              value={state.name}
              placeholder="Name"
              onChange={(e) =>
                setState((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="lg:pr-4">
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              value={state.email}
              placeholder="Email"
              onChange={(e) =>
                setState((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
