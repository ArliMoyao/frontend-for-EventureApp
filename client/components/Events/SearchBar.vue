<template>
  <div class="search-bar">
    <input type="text" v-model="searchQuery" @input="onSearch" placeholder="Search events by name..." />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
const searchQuery = ref("");
const emit = defineEmits(["search"]);
function onSearch() {
  emit("search", searchQuery.value);
}
</script>

<style scoped>
.search-bar {
  margin: 20px;
  text-align: center;
}
.search-bar input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
