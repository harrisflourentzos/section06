import EventItem from "./event-item";
import classes from "./event-list.module.css";
import { Event } from "../../types/types";

type Props = { items: Event[] };

function EventList(props: Props) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((event: any) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  );
}

export default EventList;
