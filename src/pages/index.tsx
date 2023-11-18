import eventsService from "../services/firebase-events-service";
import EventList from "../components/events/event-list";
import { GetStaticProps, InferGetStaticPropsType } from "next";

function HomePage({ events }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const events = await eventsService.getFeaturedEvents();

  return { props: { events: events }, revalidate: 300 };
};

export default HomePage;
