import React, { useState } from "react";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { loader as postListLoader } from "./pages/EventsPage";
import { loader as eventLoader } from "./pages/EventPage";
import { loader as addEventLoader } from "./pages/AddEventPage";
import { loader as editEventLoader } from "./pages/EditEventPage";
import { loader as navigationLoader } from "./components/Root";
import { loader as userLoader } from "./pages/UserPage";
import { action as addEvent } from "./pages/AddEventPage";
import { action as editEvent } from "./pages/EditEventPage";
import { action as deleteEvent } from "./pages/EventPage";
import { action as searchEvents } from "./pages/EventsPage";
import { action as userChange } from "./pages/UserPage";
import { AddEventPage } from "./pages/AddEventPage";
import { EditEventPage } from "./pages/EditEventPage";
import { UserPage } from "./pages/UserPage";

export const App = () => {
  const [query, setQuery] = useState();
  const [userId, setUserId] = useState(2);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root userId={userId} />,
      loader: navigationLoader,
      children: [
        {
          path: "/",
          element: <EventsPage setQuery={setQuery} />,
          loader: () => postListLoader({ query }),
          action: searchEvents,
        },
        {
          path: "/event/:eventId",
          element: <EventPage />,
          loader: eventLoader,
          action: deleteEvent,
        },
        {
          path: "/event/add",
          element: <AddEventPage userId={userId} />,
          loader: addEventLoader,
          action: addEvent,
        },
        {
          path: "/event/edit/:eventId",
          element: <EditEventPage userId={userId} />,
          loader: editEventLoader,
          action: editEvent,
        },
        {
          path: "/user/:userId",
          element: <UserPage setUserId={setUserId} />,
          loader: userLoader,
          action: userChange,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
