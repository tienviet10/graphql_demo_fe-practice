import React from "react";
import UserAvatar from "./UserAvatar";
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      posts {
        id
        title
      }
    }
  }
`;

const User = ({ user, selectUser }) => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: user.id },
  });

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;
  return (
    <>
      <div className="flex flex-wrap my-4">
        <button
          className="bg-gray-200 hover:bg-gray-400 text-gray-900 font-bold py-2 px-4 rounded"
          onClick={selectUser.bind(this, null)}
        >
          Back
        </button>
      </div>
      <div className="flex flex-wrap items-start mb-4">
        <div className="lg:w-1/4 w-full rounded text-center">
          <UserAvatar user={user} />
        </div>
      </div>
    </>
  );
};

export default User;