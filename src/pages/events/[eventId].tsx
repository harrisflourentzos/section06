import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Event } from "../../types/types";

import eventsService from "../../services/dummy-events-service";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage() {
  const router = useRouter();
  const [event, setEvent] = useState<Event>();

  const eventId = router.query.eventId;

  useEffect(() => {
    async function getEvent() {
      const event = await eventsService.getEventById(eventId);
      setEvent(event);
    }

    getEvent();
  }, [eventId]);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;
