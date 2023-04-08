import React from "react";
import UserAvatar from "./UserAvatar";
import { gql, useQuery } from "@apollo/client";

export const GET_USERS = gql`
  {
    users {
      id
      name
      email
      postsCount
    }
  }
`;

const Users = ({ selectUser }) => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
    <div className="flex flex-wrap items-center pb-16">
      {data.users.map((user) => (
        <div
          key={user.id}
          className="lg:w-1/3 w-full p-4 text-center inline cursor-pointer"
          onClick={() => selectUser(user)}
        >
          <UserAvatar user={user} />
        </div>
      ))}
    </div>
  );
};

export default Users;
