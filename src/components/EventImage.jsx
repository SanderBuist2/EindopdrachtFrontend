// @ts-nocheck
import { Image } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const EventImage = ({ image, md = "300px" }) => {
  return (
    <Image
      src={image}
      boxSize={{ base: "100%", sm: "200px", md: { md } }}
      objectFit="cover"
      m={{ base: "0", sm: "1em" }}
    ></Image>
  );
};

EventImage.proptypes = {
  image: PropTypes.string.isRequired,
  md: PropTypes.string,
};
