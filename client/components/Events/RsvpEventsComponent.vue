<script setup lang="ts">
import { useEventStore } from "@/stores/eventStore";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

const eventStore = useEventStore();
const userStore = useUserStore();
const { events, rsvpEvents, loading, error } = eventStore;

const { currentUsername, fetchRsvpEvents } = useUserStore();

onMounted(fetchRsvpEvents);

// const handleRsvpForEvent = async (eventId: ObjectId) => {
//   await eventStore.rsvpForEvent(eventId);
// };
</script>

<template>
  <div>
    <h1>RSVP'd Events for {{ currentUsername }}</h1>
    <div v-for="event in rsvpEvents" :key="event._id.toString()" class="event-post">
      <h2>{{ event.title }}</h2>
      <p>{{ event.description }}</p>
      <p><strong>Date:</strong> {{ new Date(event.date).toLocaleDateString() }}</p>
      <p><strong>Location:</strong> {{ event.location }}</p>
      <p><strong>Capacity:</strong> {{ event.capacity }}</p>
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
