import { Fragment } from "react";
import { Event } from "../../types/types";

import eventsService from "../../services/dummy-events-service";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";

interface Props {
  event: Event;
}

function EventDetailPage({
  event,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
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

export const getStaticProps = (async (context) => {
  if (!context.params?.eventId)
    return {
      props: {
        event: {} as Event,
      },
    };

  const { eventId } = context.params;
  const event = (await eventsService.getEventById(eventId)) ?? ({} as Event);

  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}) satisfies GetStaticProps<Props>;

export const getStaticPaths = (async () => {
  const events = await eventsService.getFeaturedEvents();

  const paths = events.map((e) => {
    return { params: { eventId: e.id } };
  });

  return { paths: paths, fallback: "blocking" };
}) satisfies GetStaticPaths;

export default EventDetailPage;
