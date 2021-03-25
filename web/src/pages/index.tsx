import { ssrExchange } from "@urql/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });
  return (
    <Layout>
      <NextLink href="/create-post">
        <Link>Create post</Link>
      </NextLink>

      <br />
      {!data ? (
        <div>louding...</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
