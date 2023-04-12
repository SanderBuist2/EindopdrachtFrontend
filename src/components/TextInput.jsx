// @ts-nocheck
import { FormLabel, Input, Box, Text } from "@chakra-ui/react";
import { inputBackground, inputWidth } from "../functions/constants";
import PropTypes from "prop-types";

export const TextInput = ({ name, title, required = false, children }) => {
  return (
    <Box>
      <FormLabel w={inputWidth} display="flex" flexDirection="row">
        {children} {title && <Text ml="0.5em"> {title} </Text>}
      </FormLabel>
      <Input
        type="text"
        name={name}
        placeholder={name}
        w={inputWidth}
        background={inputBackground}
        isRequired={required}
      ></Input>
    </Box>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  required: PropTypes.bool,
};
