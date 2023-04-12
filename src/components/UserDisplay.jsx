// @ts-nocheck
import { Box, Image, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const UserDisplay = ({ userId, users }) => {
  const creator = users.find((user) => user.id === userId);
  return (
    <Box>
      <Image
        src={creator.image}
        boxSize={{ base: "100px", md: "200px" }}
        objectFit="cover"
      />
      <Text>{creator.name}</Text>
    </Box>
  );
};

UserDisplay.proptypes = {
  userId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};
