// @ts-nocheck
import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import PropTypes from "prop-types";

export const DeleteModal = ({ isOpen, onClose, event }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", sm: "lg" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color="red" align={{ base: "center", sm: "left" }}>
            You&apos;re about to remove the Event.
          </Text>
          <Text color="red" align={{ base: "center", sm: "left" }}>
            Are you sure?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Form method="post">
            <Button
              text="confirm"
              colorScheme="blue"
              mr={3}
              type="submit"
              name="eventId"
              value={event.id}
            >
              Confirm
            </Button>
          </Form>
          <Button text="Cancel" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

DeleteModal.proptypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};
