<template>
  <div class="flex flex-col bg-gray-50 min-h-screen dark:bg-gray-900">
    <Header />
    <div class="flex-1">
      <router-view />
    </div>

    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center h-16 z-50">
      <router-link to="/" class="flex flex-col items-center p-2" :class="{'text-indigo-600 dark:text-indigo-400': $route.path === '/'}">
        <font-awesome-icon icon="home" class="text-xl" />
      </router-link>
      <router-link to="/search" class="flex flex-col items-center p-2" :class="{'text-indigo-600 dark:text-indigo-400': $route.path === '/search'}">
        <font-awesome-icon icon="search" class="text-xl" />
      </router-link>
      <router-link to="/notifications" class="flex flex-col items-center p-2" :class="{'text-indigo-600 dark:text-indigo-400': $route.path === '/notifications'}">
        <font-awesome-icon icon="bell" class="text-xl" />
      </router-link>
      <router-link to="/messages" class="flex flex-col items-center p-2" :class="{'text-indigo-600 dark:text-indigo-400': $route.path === '/messages'}">
        <font-awesome-icon icon="envelope" class="text-xl" />
      </router-link>
      <router-link to="/profile" class="flex flex-col items-center p-2" :class="{'text-indigo-600 dark:text-indigo-400': $route.path === '/profile'}">
        <font-awesome-icon icon="user" class="text-xl" />
      </router-link>
      <router-link to="/communities" class="flex flex-col items-center p-2" :class="{'text-indigo-600 dark:text-indigo-400': $route.path === '/community'}">
        <font-awesome-icon icon="user-group" class="text-xl" />
      </router-link>
    </nav>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Header from './components/Header.vue';
import { useAppStore } from './store';

const store = useAppStore();

onMounted(() => {
  const savedTheme = localStorage.getItem('themePreference');
  if (savedTheme) {
    if (savedTheme === 'dark') {
      store.toggleDarkMode(true);
    } else if (savedTheme === 'light') {
      store.toggleDarkMode(false);
    } else if (savedTheme === 'system') {
      const prefersDark = typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : false;
      store.toggleDarkMode(prefersDark);
    }
  }
});
</script>

<style>
/* Global styles */
html {
  overflow-y: scroll; /* Forces vertical scrollbar to always be visible */
  height: 100%; /* Ensures the html element takes full height */
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh; /* Ensures body takes at least the full viewport height */
  background-color: #f9fafb; /* Light mode background */
  color: #1f2937; /* Default text color */
}

.dark body {
  background-color: #1f2937; /* Dark mode background */
  color: #d1d5db; /* Dark mode text color */
}

/* Mobile and Tablet Styles */
@media (max-width: 768px) {
  body {
    padding: 0 1rem; /* Add padding for mobile and tablet */
  }

  /* Additional mobile-specific styles can be added here */
}

/* Ensure Tailwind directives are included */
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>