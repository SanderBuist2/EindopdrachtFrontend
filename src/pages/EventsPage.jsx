// @ts-nocheck
import { Heading, Box, Text, Button, Grid, GridItem } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { InfoCard } from "../components/InfoCard";
import { QueryComponent } from "../components/QueryComponent";
import { redirect, Form } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import { concatQuery } from "../functions/concatQuery";
import { displayAlign } from "../functions/constants";
import { buttonColor } from "../functions/constants";
import { NoImage } from "../components/NoImage";
import { EventImage } from "../components/EventImage";

let searchQuery;

export const loader = async ({ query }) => {
  let events;
  if (query) {
    events = await fetch(`http://localhost:3000/events${query}`);
  } else {
    events = await fetch("http://localhost:3000/events");
  }
  const categories = await fetch("http://localhost:3000/categories");

  return {
    categories: await categories.json(),
    events: await events.json(),
  };
};

export const action = async ({ request }) => {
  const Query = Object.fromEntries(await request.formData());
  searchQuery = concatQuery(Query);
  return redirect(`/`);
};

export const EventsPage = ({ setQuery }) => {
  setQuery(searchQuery);
  const { events, categories } = useLoaderData();

  return (
    <Box className="events" backgroundColor="gray.200">
      <Heading ml="1em" display={displayAlign}>
        Upcoming events
      </Heading>
      <Link to="/event/add">
        <Button display={displayAlign} ml="1em" backgroundColor={buttonColor}>
          Add event
        </Button>
      </Link>
      <Box ml="1em" mt="1em">
        <Form method="post" id="new_Search">
          <QueryComponent categories={categories} />
        </Form>
      </Box>

      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1fr", "2xl": "1fr 1fr 1fr" }}
      >
        {events.map((event) => {
          return (
            <ErrorBoundary key={event.id}>
              <Link to={`/event/${event.id}`} key={event.id}>
                <Box m="1em" background="blue.400">
                  <Heading size="lg" ml="1rem">
                    {event.title}
                  </Heading>
                  <Text ml="2rem" w={{ base: "15em", sm: "20em", md: "25em" }}>
                    {event.description}
                  </Text>

                  <Grid templateColumns={{ base: "1fr", sm: "220px 1fr" }}>
                    <GridItem>
                      {event.image ? (
                        <EventImage image={event.image} md="200px" />
                      ) : (
                        <NoImage md="200px" />
                      )}
                    </GridItem>
                    <GridItem
                      pt={{ base: "0", sm: "1em" }}
                      ml={{ base: "1em", sm: "0" }}
                      mb={{ base: "1em", sm: "0" }}
                    >
                      <InfoCard event={event} categories={categories} />
                    </GridItem>
                  </Grid>
                </Box>
              </Link>
            </ErrorBoundary>
          );
        })}
      </Grid>
    </Box>
  );
};
