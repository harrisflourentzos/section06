export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export interface EventsService {
  getAllEvents: () => Promise<Event[]>;
  getFeaturedEvents: () => Promise<Event[]>;
  getFilteredEvents: (dateFilter: any) => Promise<Event[]>;
  getEventById: (id: any) => Promise<Event | undefined>;
}
