// @ts-nocheck
import { Select, Box } from "@chakra-ui/react";
import { inputBackground } from "../functions/constants";

export const SortSelect = () => {
  return (
    <Box>
      <Select
        name="sortBy"
        w="7em"
        background={inputBackground}
        defaultValue=""
      >
        <option value="">Sort by</option>
        <option value="title">Title</option>
        <option value="startTime">Date</option>
        <option value="categoryIds">categorie</option>
      </Select>
    </Box>
  );
};
