<template>
  <div>
    <h1>Events List</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="event in events" :key="event._id" class="event-post">
        <h2>{{ event.title }}</h2>
        <p>{{ event.description }}</p>
        <p><strong>Date:</strong> {{ new Date(event.date).toLocaleDateString() }}</p>
        <p><strong>Location:</strong> {{ event.location }}</p>
        <p><strong>Capacity:</strong> {{ event.capacity }}</p>
        <button @click="rsvpForEvent(event._id)" class="pure-button pure-button-primary">RSVP</button>
        <p><strong>Upvotes:</strong> {{ event.upvotes }}</p>
        <button @click="handleUpvote(event._id)" class="pure-button pure-button-primary">Upvote</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useEventStore } from "@/stores/eventStore";
import { useUserStore } from "@/stores/user";
const eventStore = useEventStore();
const userStore = useUserStore();
const { events, loading, error, fetchEvents, rsvpForEvent } = eventStore;
const { currentUser } = userStore;

onMounted(fetchEvents);

const handleRsvpForEvent = async (eventId) => {
  if (!currentUser) {
    alert("You need to be logged in to RSVP for an event.");
    return;
  }
  await eventStore.rsvpForEvent(eventId, currentUser._id);
};

const handleUpVote = async (eventId) => {
  if (!currentUser) {
    alert("You need to be logged in to upvote an event.");
    return;
  }
  await eventStore.upvoteEvent(eventId, currentUser._id);
};
</script>

<style scoped>
.event-post {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
