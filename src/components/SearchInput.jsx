// @ts-nocheck
import { Box, Input, FormLabel } from "@chakra-ui/react";
import { inputBackground } from "../functions/constants";

export const SearchInput = () => {
  return (
    <Box display="flex" flexDirection={{ base: "column", sm: "row" }}>
      <FormLabel pt="0.5em">Search:</FormLabel>
      <Input
        type="search"
        w="15em"
        background={inputBackground}
        name="textSearch"
        mr="0.5em"
      ></Input>
    </Box>
  );
};
