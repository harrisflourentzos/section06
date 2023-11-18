import { Fragment } from "react";

import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import eventsService from "@/services/firebase-events-service";
import { Event } from "../../types/types";
import { GetServerSideProps } from "next";

type Props = {
  events: Event[];
  filters: { numYear: number; numMonth: number };
  isFiltersValid: boolean;
};

function FilteredEventsPage({ events, isFiltersValid, filters }: Props) {
  const { numMonth, numYear } = filters;

  if (!isFiltersValid) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!events || events.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </Fragment>
  );
}

export const getServerSideProps = (async (context) => {
  const { params } = context;
  const { getFilteredEvents } = eventsService;

  const filterData = params?.slug;

  const filteredYear = filterData![0];
  const filteredMonth = filterData![1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  const isFiltersNotValid =
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12;

  if (isFiltersNotValid) {
    return {
      props: {
        events: [],
        isFiltersValid: false,
        filters: { numMonth: 0, numYear: 0 },
      } as Props,
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      filters: { numMonth, numYear },
      isFiltersValid: true,
    } as Props,
  };
}) satisfies GetServerSideProps<Props>;

export default FilteredEventsPage;
