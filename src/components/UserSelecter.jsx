// @ts-nocheck
import { Box, Select } from "@chakra-ui/react";
import { inputBackground, inputWidth } from "../functions/constants";
import PropTypes from "prop-types";

export const UserSelecter = ({ users, selectedUser = "" }) => {
  return (
    <Box>
      <Select
        name="createdBy"
        w={inputWidth}
        background={inputBackground}
        defaultValue={selectedUser}
        type="number"
      >
        <option value="" disabled hidden>
          Select user
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id} type="number">
            {user.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};

UserSelecter.proptypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};
