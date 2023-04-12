import PropTypes from "prop-types";

export const setToastErrormessage = (message) => {
  return {
    title: "Error",
    description: `We got an ${message} error`,
    status: "error",
    duration: 5000,
    isClosable: true,
  };
};

export const setToastSuccesMessage = (title, message) => {
  console.log(title);
  console.log(message);
  return {
    title: title,
    description: message,
    status: "success",
    duration: 5000,
    isClosable: true,
  };
};

setToastErrormessage.proptypes = {
  message: PropTypes.string,
};

setToastSuccesMessage.proptypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};
