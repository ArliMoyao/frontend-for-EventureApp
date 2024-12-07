<script setup lang="ts">
import EventCreateForm from "@/components/Events/EventCreateForm.vue";
import EventListComponent from "@/components/Events/EventListComponent.vue";
import HostedEventsComponent from "@/components/Events/HostedEventsComponent.vue";
import RsvpEventsComponent from "@/components/Events/RsvpEventsComponent.vue";
import SearchBar from "@/components/Events/SearchBar.vue";
import PostListComponent from "@/components/Post/PostListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
}

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const events = ref<any[]>([]);
const rsvps = ref<any[]>([]);
const hostedEvents = ref<any[]>([]);
const currentTab = ref("all");

function handleEventCreated(newEvent: Event) {
  events.value.push(newEvent);
}

function handleSearch(query: string) {
  console.log(query);
}
</script>

<template>
  <main>
    <h1>Home Page</h1>
    <section>
      <h1 v-if="isLoggedIn">Welcome {{ currentUsername }}!</h1>
      <h1 v-else>Please login!</h1>
    </section>
    <section v-if="isLoggedIn">
      <EventCreateForm @eventCreated="handleEventCreated" />
      <SearchBar @search="handleSearch" />
      <nav>
        <ul>
          <li><a href="#" @click.prevent="currentTab = 'all'">All Events</a></li>
          <li><a href="#" @click.prevent="currentTab = 'hosted'">Hosted Events</a></li>
          <li><a href="#" @click.prevent="currentTab = 'rsvp'">RSVP'd Events</a></li>
        </ul>
      </nav>
      <div v-if="currentTab === 'all'">
        <EventListComponent :events="events" />
      </div>
      <div v-else-if="currentTab === 'hosted'">
        <HostedEventsComponent :hostedEvents="hostedEvents" />
      </div>
      <div v-else-if="currentTab === 'rsvp'">
        <RsvpEventsComponent :rsvps="rsvps" />
      </div>
    </section>
    <PostListComponent />
  </main>
</template>

<style scoped>
nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  background-color: #333;
}
nav ul li {
  display: inline;
}
nav ul li a {
  color: white;
  text-decoration: none;
  padding: 14px 20px;
  display: block;
}
nav ul li a:hover {
  background-color: #111;
}
h1 {
  text-align: center;
}
</style>
