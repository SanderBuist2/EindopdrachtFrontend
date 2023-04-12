// @ts-nocheck
import {
  Box,
  Heading,
  Button,
  FormLabel,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { redirect, useLoaderData, Form } from "react-router-dom";
import { FormatEvent } from "../functions/formatEvent";
import { DateInput } from "../components/DateInput";
import { UserSelecter } from "../components/UserSelecter";
import { TextInput } from "../components/TextInput";
import { UrlInput } from "../components/UrlInput";
import { CategoryCheckbox } from "../components/CategoryCheckbox";
import { useEffect } from "react";
import {
  setToastErrormessage,
  setToastSuccesMessage,
} from "../functions/setToastMessages";
import { buttonColor } from "../functions/constants";

const inputWidth = { base: "100%", sm: "30em" };

let message;
let EventId;

export const loader = async ({ params }) => {
  const users = await fetch("http://localhost:3000/users");
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");

  EventId = params.eventId;

  return {
    users: await users.json(),
    event: await event.json(),
    categories: await categories.json(),
  };
};

export const action = async ({ request }) => {
  const Event = Object.fromEntries(await request.formData());
  FormatEvent(Event);

  try {
    const result = await fetch(`http://localhost:3000/events/${EventId}`, {
      method: "PATCH",
      body: JSON.stringify(Event),
      headers: { "Content-Type": "application/json" },
    });
    message = result.status;
  } catch (error) {
    console.log(error);
  }
  return redirect(`/event/${EventId}`);
};

export const EditEventPage = ({ userId }) => {
  const { users, event, categories } = useLoaderData();
  const creator = users.find((user) => user.id === event.createdBy);
  const toast = useToast();

  useEffect(() => {
    if (message === 200) {
      toast(setToastSuccesMessage("Event update", "the udate was succesfull"));
      message = 0;
    } else if (message > 200) {
      toast(setToastErrormessage(message));
      message = 0;
    }
  }, [message]);

  return (
    <Box p={{ base: "0em", sm: "1em" }} background="blue.200" h="100vh">
      <Box textAlign={{ base: "left", md: "center" }}>
        <Heading>Edit Event</Heading>
      </Box>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}>
        <GridItem colStart={{ base: 0, md: "2" }}>
          <Form method="post" id="new-post-form">
            <FormLabel w={inputWidth}>
              Previous poster: {creator.name}
            </FormLabel>
            <UserSelecter users={users} selectedUser={userId} />
            <TextInput name="title" title={event.title}>
              Previous title:
            </TextInput>

            <TextInput name="description" title={event.description}>
              Previous description:
            </TextInput>
            <UrlInput name="image" image={event.image} />
            <TextInput name="location" title={event.location}>
              Previous location:
            </TextInput>
            <Box display="flex" flexDir={{ base: "column", sm: "row" }}>
              <Box>
                <DateInput time={event.startTime} name="startTime">
                  was:
                </DateInput>
              </Box>
              <Box ml={{ base: "0", sm: "1.5em" }}>
                <DateInput time={event.endTime} name="endTime">
                  was:
                </DateInput>
              </Box>
            </Box>
            <CategoryCheckbox categories={categories} />
            <Button type="submit" background={buttonColor}>
              Submit
            </Button>
          </Form>
        </GridItem>
      </Grid>
    </Box>
  );
};
