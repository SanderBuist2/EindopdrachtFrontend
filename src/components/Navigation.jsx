// @ts-nocheck
import { Link } from "react-router-dom";
import { Image, Box } from "@chakra-ui/react";
import "./Navigation.css";
import PropTypes from "prop-types";

export const Navigation = ({ users, userId }) => {
  const user = users.find((use) => use.id === userId);
  return (
    <Box w={{ base: "100%", md: "48em" }} textAlign="center">
      <nav>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/event/add">
            <li>Add event</li>
          </Link>
        </ul>
        <Link to={`/user/${userId}`}>
          <Image src={user.image} boxSize="3em" />
        </Link>
      </nav>
    </Box>
  );
};

Navigation.proptypes = {
  userId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};
