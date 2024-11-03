import { defineStore } from "pinia";
import { ref } from "vue";

import { fetchy } from "@/utils/fetchy";
import { ObjectId } from "mongodb";
// import { number } from "zod";

export interface EventDoc {
  _id: ObjectId;
  title: string;
  description: string;
  category: ObjectId;
  moodTag: ObjectId;
  capacity: number;
  location: string;
  date: Date;
}

interface Event {
  _id: ObjectId;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
}
export const useEventStore = defineStore("eventStore", () => {
  const events = ref<Event[]>([]);
  const hostedEvents = ref<any[]>([]);
  const rsvpEvents = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const upvoteCount = ref<number>(0);

  const fetchEvents = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetchy("/api/events", "GET");
      events.value = response;
    } catch (err) {
      error.value = "Failed to fetch events.";
    } finally {
      loading.value = false;
    }
  };

  const fetchHostedEvents = async (userId: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetchy(`/api/events/hosted/${userId}`, "GET");
      hostedEvents.value = response;
    } catch (err) {
      error.value = "Failed to fetch hosted events.";
    } finally {
      loading.value = false;
    }
  };

  const fetchRsvpEvents = async (userId: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetchy(`/api/events/rsvp/${userId}`, "GET");
      rsvpEvents.value = response;
    } catch (err) {
      error.value = "Failed to fetch RSVP'd events.";
    } finally {
      loading.value = false;
    }
  };

  const rsvpForEvent = async (eventId: ObjectId) => {
    try {
      await fetchy(`/api/rsvps/${eventId}`, "POST");
      alert("RSVPED for an event!");
    } catch (err) {
      console.error("Failed to rsvp for event:", err);
    }
  };

  const upvoteEvent = async (eventId: ObjectId) => {
    try {
      await fetchy(`/api/upvotes/${eventId}`, "POST");
      alert("Upvoted event!");
    } catch (err) {
      console.error("Failed to upvote event:", err);
    }
  };

  const getUpvoteCount = async (eventId: ObjectId) => {
    try {
      const response = await fetchy(`/api/upvotes/${eventId}/upVoteCount`, "GET");
      upvoteCount.value = response;
    } catch (err) {
      console.error("Failed to get upvote count:", err);
    }
  };

  const addEvent = async (event: any) => {
    try {
      const response = await fetchy(`/api/events`, "POST", { body: event });
      events.value.push(response);
    } catch (err) {
      console.error("Failed to add event:", err);
    }
  };

  function handleEventCreated(newEvent: Event) {
    events.value.push(newEvent);
  }
  // const getEventById = (eventId: string) => {
  //   return events.value.find((event) => event._id === eventId);
  // };
  return { events, rsvpForEvent, addEvent, hostedEvents, rsvpEvents, loading, error, handleEventCreated, fetchEvents, fetchHostedEvents, fetchRsvpEvents, upvoteEvent, upvoteCount };
});
