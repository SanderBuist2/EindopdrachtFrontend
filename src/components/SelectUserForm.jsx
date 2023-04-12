// @ts-nocheck
import { Button } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { UserSelecter } from "./UserSelecter";
import { buttonColor } from "../functions/constants";
import PropTypes from "prop-types";

export const SelectUserForm = ({ users, selectedUser }) => {
  return (
    <Form method="post">
      <UserSelecter users={users} selectedUser={selectedUser} />
      <Button type="submit" mt="0.5em" background={buttonColor}>
        change user
      </Button>
    </Form>
  );
};

SelectUserForm.proptype = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  selectedUser: PropTypes.number,
};
