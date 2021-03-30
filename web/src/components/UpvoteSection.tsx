import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostsQuery, useVoteMutation } from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostsQuery["posts"]["posts"][0];
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "upvote-loading" | "downvote-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyItems="center" alignItems="center" mr={5}>
      <IconButton
        onClick={async () => {
          setLoadingState("upvote-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        aria-label="Upvote post"
        icon={<TriangleUpIcon />}
        colorScheme="pink"
        fontSize="18px"
        variant="link"
        size="xs"
      />
      <Text fontSize="lg">{post.points}</Text>

      <IconButton
        onClick={async () => {
          setLoadingState("downvote-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        aria-label="Downvote post"
        icon={<TriangleDownIcon />}
        colorScheme="pink"
        fontSize="18px"
        variant="link"
        size="xs"
      />
    </Flex>
  );
};

export default UpvoteSection;
