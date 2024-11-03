<script setup lang="ts">
import { useEventStore } from "@/stores/eventStore";
import { useUserStore } from "@/stores/user";
import { ObjectId } from "mongodb";
import { onMounted } from "vue";

const eventStore = useEventStore();
const userStore = useUserStore();
const { events, loading, error, deleteRSVP } = eventStore;

const { fetchRSVPs, currentUsername, rsvpEvents, fetchRsvpEvents } = useUserStore();

onMounted(fetchRSVPs);

// const handleUndoRsvp = async (eventId: ObjectId) => {
//   try {
//     await eventStore.deleteRsvp(eventId);
//     await fetchRSVPs();
//   } catch (error) {
//     console.error("Failed to undo RSVP:", error);
//   }
// };

// const handleRsvpForEvent = async (eventId: ObjectId) => {
//   await eventStore.rsvpForEvent(eventId);
// };
const handleUndoRsvp = async (rsvpId: ObjectId) => {
  try {
    await eventStore.deleteRSVP(rsvpId);
    await fetchRSVPs();
  } catch (error) {
    console.error("Failed to undo RSVP:", error);
  }
};
</script>

<template>
  <div>
    <h1>RSVP'd Events for {{ currentUsername }}</h1>
    <div v-for="rsvp in rsvpEvents" :key="rsvp._id.toString()" class="event-post">
      <h2>Event Title: {{ rsvp.event.title }}</h2>
      <p>{{ rsvp.event.description }}</p>
      <p><strong>Location:</strong> {{ rsvp.event.location }}</p>
      <p><strong>Capacity:</strong> {{ rsvp.event.capacity }}</p>
      <button @click="handleUndoRsvp(rsvp._id)" class="pure-button pure-button-primary">Undo RSVP</button>
    </div>
  </div>
</template>

<style scoped>
.event-post {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
