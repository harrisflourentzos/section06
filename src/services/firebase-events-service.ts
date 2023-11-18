import { Event, EventsService, MonthYear } from "@/types/types";

const FIREBASE_URL = "https://learningreact-4a2be-default-rtdb.firebaseio.com/";

async function getAllEvents() {
  const url = FIREBASE_URL + "/eventsNext.json";

  const response = await fetch(url);
  if (!response.ok) throw Error("Issue fetching event data...");

  const data = await response.json();
  const events: Event[] = [];

  for (const key in data) {
    events.push({ id: key, ...data[key] } as Event);
  }

  return events;
}

async function getFeaturedEvents() {
  const events = await getAllEvents();
  return events.filter((event) => event.isFeatured);
}

async function getFilteredEvents(dateFilter: MonthYear) {
  const events = await getAllEvents();
  const { year, month } = dateFilter;

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

async function getEventById(id: any) {
  const events = await getAllEvents();
  return events.find((event) => event.id === id);
}

const eventsService: EventsService = {
  getAllEvents: getAllEvents,
  getFeaturedEvents: getFeaturedEvents,
  getFilteredEvents: getFilteredEvents,
  getEventById: getEventById,
};

export default eventsService;
