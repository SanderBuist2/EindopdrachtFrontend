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
import { Form, useLoaderData, redirect } from "react-router-dom";
import { FormatEvent } from "../functions/formatEvent";
import { CategoryCheckbox } from "../components/CategoryCheckbox";
import { DateInput } from "../components/DateInput";
import { TextInput } from "../components/TextInput";
import { UrlInput } from "../components/UrlInput";
import { UserSelecter } from "../components/UserSelecter";
import { useEffect } from "react";
import {
  setToastErrormessage,
  setToastSuccesMessage,
} from "../functions/setToastMessages";
import { buttonColor } from "../functions/constants";

let message;

export const action = async ({ request }) => {
  const Event = Object.fromEntries(await request.formData());
  FormatEvent(Event);

  if (Event.startTime >= Event.endTime) {
    alert("starting time should be befored ending time");
    return null;
  }

  try {
    const result = await fetch(`http://localhost:3000/events`, {
      method: "POST",
      body: JSON.stringify(Event),
      headers: { "Content-Type": "application/json" },
    });
    console.log(result);
    message = result.status;
    const newPostId = (await result.json()).id;
    return redirect(`/event/${newPostId}`);
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const AddEventPage = ({ userId }) => {
  const { users, categories } = useLoaderData();
  const toast = useToast();

  useEffect(() => {
    if (message === 201) {
      toast(
        setToastSuccesMessage("Event added", "the event was succesfull added")
      );
      message = 0;
    } else if (message > 201) {
      toast(setToastErrormessage(message));
      message = 0;
    }
  }, [message]);

  return (
    <Box p={{ base: "0em", sm: "1em" }} background="blue.200" h="100vh">
      <Box textAlign={{ base: "left", md: "center" }}>
        <Heading>Add Event</Heading>
      </Box>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}>
        <GridItem colStart={{ base: 0, md: "2" }}>
          <Form method="post" id="new-post-form">
            <FormLabel>User</FormLabel>
            <UserSelecter users={users} selectedUser={userId}></UserSelecter>
            <TextInput name="title" required={true}>
              Title:
            </TextInput>
            <TextInput name="description" required={true}>
              Description:
            </TextInput>
            <UrlInput name="image"></UrlInput>
            <TextInput name="location" required={true}>
              Location
            </TextInput>
            <Box display="flex" flexDir={{ base: "column", sm: "row" }}>
              <Box>
                <DateInput name="startTime" required={true}>
                  Starting time and date
                </DateInput>
              </Box>
              <Box ml={{ base: "0", sm: "2em" }}>
                <DateInput name="endTime" required={true}>
                  End time and date
                </DateInput>
              </Box>
            </Box>
            <CategoryCheckbox categories={categories} />
            <Button type="submit" mt="1em" background={buttonColor}>
              Submit
            </Button>
          </Form>
        </GridItem>
      </Grid>
    </Box>
  );
};
