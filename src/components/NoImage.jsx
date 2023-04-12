// @ts-nocheck
import { Center } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const NoImage = ({ md = "300px" }) => {
  return (
    <Center
      boxSize={{ base: "100% 2em", sm: "200px", md: { md } }}
      objectFit="cover"
      m="1em"
      border="solid"
      borderWidth="1px"
    >
      No image provided
    </Center>
  );
};

NoImage.proptypes = {
  md: PropTypes.string,
};
