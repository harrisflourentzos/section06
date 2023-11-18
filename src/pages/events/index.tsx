import { Fragment } from "react";
import { useRouter } from "next/router";

import eventsService from "../../services/dummy-events-service";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

import { Event } from "../../types/types";
import { InferGetServerSidePropsType, GetStaticProps } from "next";

type Props = {
  events: Event[];
};

function AllEventsPage({
  events,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const router = useRouter();

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

export const getStaticProps = (async () => {
  const events = await eventsService.getAllEvents();

  return { props: { events: events } as Props };
}) satisfies GetStaticProps<Props>;

export default AllEventsPage;
