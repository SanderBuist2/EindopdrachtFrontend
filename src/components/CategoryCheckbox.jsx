// @ts-nocheck
import { Box, FormLabel } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const CategoryCheckbox = ({ categories }) => {
  return (
    <Box display="flex" flexDirection="row" mt="0.4em">
      <FormLabel>Category</FormLabel>
      <Box display="flex" flexDirection="row">
        {categories.map((categorie) => (
          <Box key={categorie.id} mr="1em">
            <input
              type="checkbox"
              key={categorie.id}
              name={`categoryIds${categorie.id}`}
              value={categorie.id}
            ></input>
            <label> {categorie.name}</label>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

CategoryCheckbox.proptypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};
