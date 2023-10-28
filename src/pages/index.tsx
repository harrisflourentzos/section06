import eventsService from "../services/dummy-events-service";
import EventList from "../components/events/event-list";
import { useEffect, useState } from "react";
import { Event } from "../types/types";

function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function getEvents() {
      const events = await eventsService.getFeaturedEvents();
      setEvents(events);
    }

    getEvents();
  }, []);

  return (
    <div>
      <EventList items={events} />
    </div>
  );
}

async function getStaticProps() {}

export default HomePage;
