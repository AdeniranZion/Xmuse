<template>
    <div class="hidden md:block fixed top-30 right-56 w-80 h-[calc(100vh-4rem)] p-4 border-l border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-black overflow-y-auto">
      <div class="bg-gray-50 shadow-sm dark:bg-neutral-800 rounded-lg p-3 py-5">
        <h3 class="font-semibold mb-4 text-gray-900 dark:text-gray-100">Trending Artists</h3>
        <div class="space-y-4">
          <div v-for="artist in store.trendingArtists" :key="artist.id" class="flex items-center gap-3 cursor-pointer">
            <div class="w-10 h-10 rounded-full overflow-hidden">
              <img :src="artist.image" class="w-full h-full object-cover" alt="artist" />
            </div>
            <div class="flex-1">
              <h4 class="font-medium text-gray-900 dark:text-gray-100">{{ artist.name }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ artist.genre }}</p>
            </div>
            <!-- <button class="text-indigo-600 dark:text-indigo-400 text-sm font-medium cursor-pointer whitespace-nowrap rounded-button">Follow</button> -->
            <button class="h-9 px-5 text-sm font-medium rounded-md border border-indigo-600 text-indigo-600 dark:text-white dark:bg-indigo-600 hover:bg-indigo-600 hover:text-white dark:hover:bg-gray-800 dark:hover:text-white" type="button">
            Follow
          </button>
          <!-- <button type="button" class="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg">Follow</button> -->
          </div>
        </div>
      </div>
      
      <h3 class="font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">Upcoming Events</h3>
      <div class="space-y-4">
        <div v-for="event in store.upcomingEvents" :key="event.id" class="bg-gray-50 dark:bg-neutral-800 rounded-lg p-3 cursor-pointer">
          <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ event.name }}</p>
          <div class="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <font-awesome-icon icon="calendar-alt" />
            <span>{{ event.date }}</span>
          </div>
        </div>
      </div>
      <!-- Footer Links Section -->
      <div class="mt-8 pt-4 border-t border-gray-200 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-400 footer-links">
        <a href="#" class="mr-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a>
        <a href="#" class="mr-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Help</a>
        <a href="#" class="mr-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Press</a>
        <a href="#" class="mr-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">API</a>
        <a href="#" class="mr-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Jobs</a>
        <a href="#" class="mr-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</a>
        <a href="#" class="mr-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms</a>
        <a href="#" class="mr-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Locations</a>
        <a href="#" class="mr-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Language</a>
        <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">© 2025 Xmuse</p>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { useAppStore } from '../store';

const store = useAppStore();
</script>

<style scoped>
/* Style for the footer links section */
.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem;
}

/* Ensure links stack on small screens */
@media (max-width: 640px) {
  .footer-links a {
    display: block;
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.5rem; /* Tailwind equivalent: mb-2 */
  }
}

/* Smooth transition for hover effects */
.footer-links a:hover {
  text-decoration: none;
}

/* Style for the copyright text */
.footer-links p {
  font-size: 0.75rem;
}
</style>