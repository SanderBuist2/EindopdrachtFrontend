// @ts-nocheck
import { Box, FormLabel, Input, Text } from "@chakra-ui/react";
import { inputBackground, inputWidth } from "../functions/constants";
import PropTypes from "prop-types";

export const UrlInput = ({ name, image }) => {
  return (
    <Box>
      <FormLabel w={inputWidth} display="flex" flexDirection="row">
        image: {image && <Text>{image}</Text>}
      </FormLabel>
      <Input
        type="url"
        name={name}
        placeholder="url"
        w={inputWidth}
        background={inputBackground}
      ></Input>
    </Box>
  );
};

UrlInput.proptypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
};
