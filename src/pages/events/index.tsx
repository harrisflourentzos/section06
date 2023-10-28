import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import eventsService from "../../services/dummy-events-service";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

import { Event } from "../../types/types";

function AllEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function getEvents() {
      const events = await eventsService.getAllEvents();
      setEvents(events);
    }

    getEvents();
  }, []);

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;
