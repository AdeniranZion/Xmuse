<template>
  <div class="max-w-[1440px] mx-auto pt-16 flex flex-col md:flex-row relative overflow-hidden">
    <!-- Left Sidebar -->
    <Sidebar class="hidden md:block" />


    <!-- Main Content (Profile Settings) -->
    <div class="flex-1 md:ml-72 p-6 md:pr-[340px]">
      <!-- Back Button -->
      <a href="/" data-readdy="true" class="block mb-6">
        <button class="flex items-center gap-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 cursor-pointer whitespace-nowrap rounded-button">
          <font-awesome-icon icon="arrow-left" />
          <span>Back to Feed</span>
        </button>
      </a>

      <!-- Profile Header -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
        <div class="flex flex-col sm:flex-row items-center gap-4">
          <div class="w-16 h-16 rounded-full overflow-hidden">
            <img :src="store.userProfileImage" class="w-full h-full object-cover" alt="profile" />
          </div>
          <div class="text-center sm:text-left">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ profile.username }}</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ profile.role }}</p>
          </div>
        </div>
      </div>

      <!-- Profile Settings -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Account Settings</h2>
        <form @submit.prevent="saveAccountSettings">
          <div class="space-y-4">
            <!-- Username -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
              <input
                id="username"
                v-model="profile.username"
                type="text"
                class="mt-2 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter your username"
              />
            </div>
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                id="email"
                v-model="profile.email"
                type="email"
                class="mt-2 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter your email"
              />
            </div>
            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                id="password"
                v-model="profile.password"
                type="password"
                class="mt-2 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter new password"
              />
            </div>
            <!-- Save Button -->
            <div>
              <button
                type="submit"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Appearance Settings -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Appearance</h2>
        <div class="space-y-4">
          <!-- Theme Selection -->
          <div>
            <label for="theme" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
            <select
              id="theme"
              v-model="appearance.theme"
              class="w-full px-3 py-2 mt-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
            <button
              @click="saveAndApplyTheme"
              class="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      <!-- Additional Settings -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Preferences</h2>
        <div class="space-y-4">
          <!-- Notifications -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="preferences.emailNotifications"
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors dark:bg-gray-600">
                <div class="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 peer-checked:translate-x-5 transition-transform"></div>
              </div>
            </label>
          </div>
          <!-- Privacy -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Private Profile</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="preferences.privateProfile"
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors dark:bg-gray-600">
                <div class="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 peer-checked:translate-x-5 transition-transform"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Sidebar -->
    <Notifications class="hidden md:block" />

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue';
import { defineAsyncComponent } from 'vue';
const Sidebar = defineAsyncComponent(() => import('../components/Sidebar.vue'));
const Notifications = defineAsyncComponent(() => import('../components/Notifications.vue'));
import { useAppStore } from '../store';

// Access the store
const store = useAppStore();

// Reactive state for profile settings
const profile = reactive({
  username: 'David Anderson',
  email: 'david.anderson@example.com',
  password: '',
  role: 'Producer / DJ',
});

// Reactive state for appearance settings
const appearance = reactive({
  theme: localStorage.getItem('themePreference') || 'light', // Load from localStorage or default to light
});

// Reactive state for preferences
const preferences = reactive({
  emailNotifications: true,
  privateProfile: false,
});

// Methods
const saveAccountSettings = () => {
  console.log('Saving account settings:', {
    username: profile.username,
    email: profile.email,
    password: profile.password,
  });
  profile.password = '';
};

const saveAndApplyTheme = () => {
  // Save the selected theme to localStorage
  localStorage.setItem('themePreference', appearance.theme);

  // Apply the theme
  if (appearance.theme === 'dark') {
    store.toggleDarkMode(true);
  } else if (appearance.theme === 'light') {
    store.toggleDarkMode(false);
  } else if (appearance.theme === 'system') {
    const prefersDark = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
    store.toggleDarkMode(prefersDark);
  }
};

// Watch for navigation and reapply theme if needed
watch(() => store.isDarkMode, (newValue) => {
  if (!newValue && appearance.theme === 'dark') {
    store.toggleDarkMode(true); // Reapply dark mode if it was changed unexpectedly
  }
});

// Load and apply saved theme on mount
onMounted(() => {
  const savedTheme = localStorage.getItem('themePreference');
  if (savedTheme) {
    appearance.theme = savedTheme;
    saveAndApplyTheme(); // Apply the saved theme on initial load
  }
});
</script>

<style scoped>
/* Custom styles for the toggle switch */
.w-11 { width: 2.75rem; }
.h-6 { height: 1.5rem; }
.w-5 { width: 1.25rem; }
.h-5 { height: 1.25rem; }
.top-0\.5 { top: 0.125rem; }
.left-0\.5 { left: 0.125rem; }
.transition-transform { transition: transform 0.3s ease; }

@media (max-width: 768px) {
  .ml-72 { margin-left: 0 !important; }
  .pr-340 { padding-right: 1rem !important; } /* Fixed the class name to remove brackets */
}
</style>