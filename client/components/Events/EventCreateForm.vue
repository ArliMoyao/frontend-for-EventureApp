<template>
  <div class="event-create">
    <button @click="showForm = true" v-if="!showForm">Create Event</button>
    <div v-if="showForm" class="form-container">
      <form @submit.prevent="submitEvent">
        <div>
          <label for="title">Event Title:</label>
          <input v-model="title" id="title" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea v-model="description" id="description" required></textarea>
        </div>
        <div>
          <label for="location">Location:</label>
          <input v-model="location" id="location" required />
        </div>
        <div>
          <label for="date">Event Date:</label>
          <input v-model="date" type="date" id="date" required />
        </div>
        <div>
          <label for="capacity">Capacity:</label>
          <input v-model.number="capacity" id="capacity" type="number" required />
        </div>
        <button type="submit" class="pure-button pure-button-primary">Create Event</button>
        <button type="button" @click="showForm = false">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useEventStore } from "@/stores/eventStore";
const eventStore = useEventStore();

const title = ref("");
const description = ref("");
const location = ref("");
const date = ref("");
const capacity = ref(0);
const showForm = ref(false);

const submitEvent = async () => {
  try {
    await eventStore.addEvent({
      title: title.value,
      description: description.value,
      location: location.value,
      date: date.value,
      capacity: capacity.value,
    });
    alert("Event created successfully!");
    // Clear the form after submission
    title.value = "";
    description.value = "";
    location.value = "";
    date.value = "";
    capacity.value = 0;
    showForm.value = false;
  } catch (error) {
    console.error("Error creating event:", error);
    alert("Failed to create event. Please try again.");
  }
};
</script>

<style scoped>
.event-create {
  text-align: center;
  margin: 20px;
}
.form-container {
  margin-top: 20px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
label {
  margin-top: 10px;
}
input,
textarea {
  margin-top: 5px;
  width: 200px;
}
button {
  margin-top: 10px;
}
</style>
