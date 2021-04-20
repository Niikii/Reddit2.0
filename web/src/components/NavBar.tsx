import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { SmallAddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  let body = null;

  //data is loading
  if (fetching) {
    body = null;

    //user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );

    //user is logged in
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button
            as={Link}
            mr={4}
            variant="outline"
            rightIcon={<SmallAddIcon w={6} h={6} />}
          >
            Create Post
          </Button>
        </NextLink>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout();
            router.reload();
          }}
          variant="link"
          isLoading={logoutFetching}
        >
          logout
        </Button>
      </Flex>
    );
  }
  return (
    //aligning things take note//
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      bg="lightBlue"
      p={2}
      align="center"
      boxShadow="md"
    >
      <Flex maxWidth={800} align="center" flex={1} m="auto">
        <NextLink href="/">
          <Link>
            <Heading>MyReddit:)</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
