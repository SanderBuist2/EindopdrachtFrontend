// @ts-nocheck
import { FormLabel, Input, Box, Text } from "@chakra-ui/react";
import { inputBackground } from "../functions/constants";
import PropTypes from "prop-types";

export const DateInput = ({ time, name, required = false, children }) => {
  return (
    <Box>
      <FormLabel w="14em" display="flex" flexDirection="row">
        {children}{" "}
        {time && (
          <Text ml="0.5em">
            {time.slice(0, 10)} {time.slice(11, 16)}
          </Text>
        )}
      </FormLabel>
      <Input
        placeholder="Select Date and Time"
        type="datetime-local"
        name={name}
        w="14em"
        background={inputBackground}
        isRequired={required}
      />
    </Box>
  );
};

DateInput.proptypes = {
  time: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};
