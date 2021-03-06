import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box ml="auto">
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          ml="auto"
          aria-label="Edit post"
          color="green.500"
          icon={<EditIcon />}
          fontSize="20px"
        />
      </NextLink>

      <IconButton
        ml="auto"
        aria-label="Delete post"
        color="red.500"
        icon={<DeleteIcon />}
        fontSize="20px"
        onClick={() => {
          deletePost({ id: id });
        }}
      />
    </Box>
  );
};

export default EditDeletePostButtons;
