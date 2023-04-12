// @ts-nocheck
import { Outlet, useLoaderData } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");

  return {
    users: await users.json(),
  };
};

export const Root = ({ userId }) => {
  const { users } = useLoaderData();
  return (
    <Box w="100%" background="lightgrey">
      <Grid templateColumns={{ base: "1fr", md: "1fr 48em 1fr" }}>
        <GridItem colStart={{ base: 0, md: 2 }}>
          <Navigation users={users} userId={userId} />
        </GridItem>
      </Grid>
      <Outlet />
    </Box>
  );
};

Root.proptypes = {
  userId: PropTypes.string,
};
