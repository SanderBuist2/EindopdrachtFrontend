// @ts-nocheck
import {
  Box,
  Image,
  Heading,
  Button,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLoaderData, redirect, Form } from "react-router-dom";
import { SelectUserForm } from "../components/SelectUserForm";
import { UrlInput } from "../components/UrlInput";
import { TextInput } from "../components/TextInput";
import {
  setToastSuccesMessage,
  setToastErrormessage,
} from "../functions/setToastMessages";
import { buttonColor } from "../functions/constants";

let userId;
let message;

export const loader = async ({ params }) => {
  const users = await fetch("http://localhost:3000/users");
  const user = await fetch(`http://localhost:3000/users/${params.userId}`);
  userId = params.userId;

  return {
    users: await users.json(),
    user: await user.json(),
  };
};

export const action = async ({ request }) => {
  const user = Object.fromEntries(await request.formData());
  if (user.createdBy) return redirect(`/user/${user.createdBy}`);

  const keys = Object.keys(user);
  keys.forEach((key) => {
    if (!user[key]) delete user[key];
  });

  if ((user.name || user.image) && !user.createdBy) {
    try {
      const result = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });

      message = result.status;
    } catch (error) {
      console.log(error);
    }
    return redirect(`/user/${userId}`);
  }
  return null;
};

export const UserPage = ({ setUserId }) => {
  const { users, user } = useLoaderData();
  const [edit, setEdit] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (message === 200) {
      toast(setToastSuccesMessage("Userupdate", "the update was succesfull"));
      message = 0;
    } else if (message > 200) {
      toast(setToastErrormessage(message));
      message = 0;
    }
  }, [message]);

  return (
    <Box h="100vh" m="2em">
      <Grid templateColumns={{ base: "1fr", md: "1fr 30em" }}>
        <GridItem>
          <Heading>{user.name}</Heading>
          <Image src={user.image} boxSize={{ base: "300px" }} />
        </GridItem>
        <GridItem>
          <Button
            onClick={() => {
              setUserId(user.id);
            }}
            mt={{ base: "0.5em", md: "5em" }}
            w="6em"
            background={buttonColor}
            mb="0.5em"
          >
            set active
          </Button>
          <Button
            onClick={() => setEdit(!edit)}
            mt={{ base: "0.5em", md: "5em" }}
            w="6em"
            background={buttonColor}
            ml="1em"
            mb="0.5em"
          >
            edit
          </Button>
          {edit && (
            <Form method="post" mt="0.5em">
              <UrlInput name="image" />
              <TextInput name="name">Name</TextInput>
              <Button
                type="submit"
                mt="0.5em"
                mb="0.5em"
                w="6em"
                background={buttonColor}
              >
                update
              </Button>
            </Form>
          )}
          {!edit && <SelectUserForm users={users} selectedUser={user.id} />}
        </GridItem>
      </Grid>
    </Box>
  );
};
