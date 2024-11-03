<script setup lang="ts">
import { useEventStore } from "@/stores/eventStore";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

const eventStore = useEventStore();
const userStore = useUserStore();
const { rsvpEvents, loading, error, fetchRsvpEvents } = eventStore;
const { currentUser } = userStore;

onMounted(async () => {
  if (currentUser) {
    try {
      await fetchRsvpEvents(currentUser._id);
    } catch (error) {
      console.error("Failed to fetch RSVP'd events:", error);
    }
  }
});
</script>

<template>
  <div>
    <h1>RSVP'd Events</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="event in rsvpEvents" :key="event._id" class="event-post">
        <h2>{{ event.title }}</h2>
        <p>{{ event.description }}</p>
        <p><strong>Date:</strong> {{ new Date(event.date).toLocaleDateString() }}</p>
        <p><strong>Location:</strong> {{ event.location }}</p>
        <p><strong>Capacity:</strong> {{ event.capacity }}</p>
      </div>
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
