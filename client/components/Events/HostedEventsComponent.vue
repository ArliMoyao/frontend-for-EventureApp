<script setup lang="ts">
import { onMounted } from "vue";
import { useEventStore } from "@/stores/eventStore";
import { useUserStore } from "@/stores/user";
const eventStore = useEventStore();
const userStore = useUserStore();
const { hostedEvents, loading, error, fetchHostedEvents } = eventStore;
const currentUser = userStore.currentUser as { _id: string } | null;
onMounted(async () => {
  if (currentUser) {
    try {
      await fetchHostedEvents(currentUser._id);
    } catch (error) {
      console.error("Failed to fetch hosted events:", error);
    }
  }
});
</script>

<template>
  <div>
    <h2>Hosted Events</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="event in hostedEvents" :key="event._id">
        <h3>{{ event.title }}</h3>
        <p>{{ event.description }}</p>
        <p>{{ new Date(event.date).toLocaleDateString() }}</p>
        <p>{{ event.location }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
