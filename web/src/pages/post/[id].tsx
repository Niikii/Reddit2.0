import { Heading } from "@chakra-ui/layout";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import EditDeletePostButtons from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex alignContent="center" alignItems="center" key={data.post.id} shadow="md" borderWidth="1px" padding={10}>
        <Heading mb={4}>{data.post.title}</Heading>
        <br/>
        {data.post.text}
        <EditDeletePostButtons
          id={data.post.id}
          creatorId={data.post.creator.id}
        />
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
