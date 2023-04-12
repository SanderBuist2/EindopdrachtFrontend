// @ts-nocheck
import { Text, Box } from "@chakra-ui/react";
import {
  dateAndTimeToText,
  dateToText,
  timeToText,
} from "../functions/DateToText";
import PropTypes from "prop-types";

export const InfoCard = ({ event, categories }) => {
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const sameday = startDate.toDateString() === endDate.toDateString();
  return (
    <Box
      textAlign={{ base: "left", md: "center" }}
      ml={{ base: "1em", lg: "0" }}
    >
      When:
      {sameday ? (
        <>
          <Text>{dateToText(startDate)}</Text>
          <Text>{timeToText(startDate) + " - " + timeToText(endDate)}</Text>
        </>
      ) : (
        <>
          <Text>from: {dateAndTimeToText(startDate)}</Text>
          <Text>to: {dateAndTimeToText(endDate)}</Text>
        </>
      )}
      {event.categoryIds && (
        <Box mt="1em" textAlign={{ base: "left", md: "center" }}>
          <Text>category:</Text>
          {event.categoryIds.map((categorie) => {
            return (
              <Text key={categorie} display="inline" mr="0.5em">
                {categories.find((cat) => categorie === cat.id).name}
              </Text>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

InfoCard.proptypes = {
  event: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};
