import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  PostSnippetFragment,
  useVoteMutation,
} from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
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
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("upvote-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        aria-label="Upvote post"
        icon={<TriangleUpIcon />}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        fontSize="18px"
        variant="link"
        size="xs"
      />
      <Text fontSize="lg">{post.points}</Text>

      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downvote-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        aria-label="Downvote post"
        icon={<TriangleDownIcon />}
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        fontSize="18px"
        variant="link"
        size="xs"
      />
    </Flex>
  );
};

export default UpvoteSection;
