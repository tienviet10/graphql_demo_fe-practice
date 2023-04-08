import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useState } from "react";
import Users from "./Users";
import User from "./User";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache,
});

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <ApolloProvider client={client}>
      <div className="container mx-auto px-4">
        {selectedUser ? (
          <User user={selectedUser} selectUser={setSelectedUser} />
        ) : (
          <Users selectUser={setSelectedUser} />
        )}
      </div>
    </ApolloProvider>
  );
}

export default App;
