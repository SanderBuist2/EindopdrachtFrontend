// @ts-nocheck
import {
  Heading,
  Box,
  Text,
  Grid,
  GridItem,
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { redirect, useLoaderData, Link } from "react-router-dom";
import { InfoCard } from "../components/InfoCard";
import { UserDisplay } from "../components/UserDisplay";
import { DeleteModal } from "../components/DeleteModal";
import { NoImage } from "../components/NoImage";
import { buttonColor } from "../functions/constants";
import { EventImage } from "../components/EventImage";
import { useEffect } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import {
  setToastErrormessage,
  setToastSuccesMessage,
} from "../functions/setToastMessages";

let deleteMessage = 0;

const textAlign = { base: "left", md: "center" };
const leftMargin = { base: "1em", md: "0" };

export const loader = async ({ params }) => {
  const users = await fetch("http://localhost:3000/users");
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    event: await event.json(),
    categories: await categories.json(),
  };
};

export const action = async ({ request }) => {
  const EventToDelete = Object.fromEntries(await request.formData());

  try {
    const result = await fetch(
      `http://localhost:3000/events/${Number(EventToDelete.eventId)}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    deleteMessage = result.status;
  } catch (error) {
    console.log(error);
  }
  if (deleteMessage === 200) return redirect(`/`);
  else return null;
};

export const EventPage = () => {
  const { users, event, categories } = useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    if (deleteMessage === 200) {
      toast(setToastSuccesMessage("Delete", "The event has been deleted"));
      deleteMessage = 0;
    } else if (deleteMessage > 200) {
      toast(setToastErrormessage(deleteMessage));
      deleteMessage = 0;
    }
  }, [deleteMessage]);

  return (
    <Box background="blue.400" h="100vh">
      <Grid templateColumns={{ base: "1fr", md: "1fr 730px 1fr" }}>
        <GridItem
          display="flex"
          justifyContent="space-between"
          w={{ base: "100%", md: "730px" }}
          colStart={{ base: "0", md: "2" }}
        >
          <Box>
            <Heading ml="1rem">{event.title}</Heading>
            <Text ml="2rem">{event.description}</Text>
          </Box>
          <Button onClick={onOpen} mr="1em" mt="0.5em" background={buttonColor}>
            Delete
          </Button>
          <DeleteModal isOpen={isOpen} onClose={onClose} event={event} />
        </GridItem>
      </Grid>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "220px 1fr 110px",
          md: "1fr 320px 200px 210px 1fr",
        }}
      >
        <GridItem colStart={{ base: "0", sm: "1", md: "2" }}>
          {event.image ? <EventImage image={event.image} /> : <NoImage />}
        </GridItem>
        <GridItem colStart={{ base: "0", sm: "2", md: "3" }}>
          <Box display="flex" flexDir="column" mt="1em" textAlign={textAlign}>
            <Link to={`/event/edit/${event.id}`}>
              <Button ml={leftMargin} background={buttonColor}>
                Edit
              </Button>
            </Link>
            <InfoCard event={event} categories={categories} />
            <Text ml={leftMargin} mt="1em">
              Where?
            </Text>
            <Text ml={leftMargin}>{event.location}</Text>
          </Box>
        </GridItem>
        <GridItem pt="1em" colStart={{ base: "0", sm: "3", md: "4" }}>
          <ErrorBoundary>
            <UserDisplay userId={event.createdBy} users={users} />
          </ErrorBoundary>
        </GridItem>
      </Grid>
    </Box>
  );
};
