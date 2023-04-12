// @ts-nocheck
import { Box, Button } from "@chakra-ui/react";
import { SearchInput } from "./SearchInput";
import { CategoryCheckbox } from "./CategoryCheckbox";
import { SortSelect } from "./SortSelect";
import { buttonColor } from "../functions/constants";
import PropTypes from "prop-types";

export const QueryComponent = ({ categories }) => {
  return (
    <Box display="flex" flexDirection={{ base: "column", md: "row" }}>
      <SearchInput />
      <CategoryCheckbox categories={categories}></CategoryCheckbox>
      <SortSelect />
      <Button type="submit" w="6em" backgroundColor={buttonColor}>
        Search
      </Button>
    </Box>
  );
};

QueryComponent.proptypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};
