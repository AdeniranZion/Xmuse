<template>
  <div class="max-w-[1440px] mx-auto pt-16 flex flex-col md:flex-row relative overflow-hidden bg-gray-50 dark:bg-neutral-950">
    <!-- Left Sidebar -->
    <Sidebar class="hidden md:block" />

    <!-- Main Content (Profile Page) -->
    <div class="flex-1 md:ml-72 p-6 md:pr-[340px]">
      <!-- Back Button -->
      <a href="/" class="block mb-6">
        <button class="flex items-center gap-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-lg">
          <font-awesome-icon icon="arrow-left" />
          <span>Back to Feed</span>
        </button>
      </a>

      <!-- Profile Header -->
      <div class="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-lg mb-6 relative">
        <div class="flex flex-col sm:flex-row items-center gap-6">
          <div class="w-24 h-24 rounded-full overflow-hidden ring-4 ring-indigo-500 dark:ring-indigo-400">
            <img :src="store.userProfileImage" class="w-full h-full object-cover" alt="profile" />
          </div>
          <div class="text-center sm:text-left flex-1">
            <div class="flex justify-between items-center">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ profile.username }}</h1>
              <font-awesome-icon 
                icon="gear" 
                class="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer" 
                @click="toggleSettings" 
              />
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ profile.role }}</p>
            <div class="flex gap-4 mt-2">
              <span class="text-sm font-medium"><strong>{{ profile.fanCount }}</strong> Fans</span>
              <span class="text-sm font-medium"><strong>{{ profile.releases.length }}</strong> Releases</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Settings Modal (Overlay) -->
      <div v-if="showSettings" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white dark:bg-neutral-900 rounded-xl p-6 w-full max-w-lg shadow-lg">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Settings</h2>
            <font-awesome-icon icon="times" class="cursor-pointer" @click="toggleSettings" />
          </div>
          <!-- Insert your provided settings content here -->
          <form @submit.prevent="saveAccountSettings" class="space-y-4">
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
            <div>
              <button
                type="submit"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Profile Tabs -->
      <div class="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button 
          v-for="tab in tabs" 
          :key="tab" 
          @click="activeTab = tab" 
          :class="[
            'pb-2 px-4 text-sm font-medium',
            activeTab === tab ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400'
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="space-y-6">
        <!-- Communities -->
        <div v-if="activeTab === 'Communities'" class="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm">
          <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Communities</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="community in profile.communities" :key="community.id" class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 class="font-medium text-gray-900 dark:text-gray-100">{{ community.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ community.members }} Members</p>
            </div>
          </div>
        </div>

        <!-- Latest Releases -->
        <div v-if="activeTab === 'Releases'" class="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm">
          <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Latest Releases</h2>
          <div class="space-y-4">
            <div v-for="release in profile.releases" :key="release.id" class="flex items-center gap-4">
              <img :src="release.cover" class="w-16 h-16 rounded-lg object-cover" alt="release cover" />
              <div>
                <h3 class="font-medium text-gray-900 dark:text-gray-100">{{ release.title }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ release.date }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div v-if="activeTab === 'Stats'" class="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm">
          <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Stats</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{{ profile.stats.streams }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Streams</p>
            </div>
            <div class="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{{ profile.stats.likes }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Likes</p>
            </div>
          </div>
        </div>

        <!-- Posts -->
        <div v-if="activeTab === 'Posts'" class="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm">
          <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Posts</h2>
          <div class="space-y-4">
            <div v-for="post in profile.posts" :key="post.id" class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p class="text-gray-900 dark:text-gray-100">{{ post.content }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ post.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Sidebar (Notifications) -->
    <Notifications class="hidden md:block" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { defineAsyncComponent } from 'vue';
const Sidebar = defineAsyncComponent(() => import('../components/Sidebar.vue'));
const Notifications = defineAsyncComponent(() => import('../components/Notifications.vue'));
import { useAppStore } from '../store';

const store = useAppStore();

// Reactive state for profile data
const profile = reactive({
  username: 'David Anderson',
  email: 'david.anderson@example.com',
  role: 'Producer / DJ',
  fanCount: 12500,
  communities: [
    { id: 1, name: 'Electronic Beats', members: 3400 },
    { id: 2, name: 'DJ Collective', members: 1200 },
  ],
  releases: [
    { id: 1, title: 'Midnight Groove', date: 'Mar 10, 2025', cover: 'https://via.placeholder.com/64' },
    { id: 2, title: 'Echoes of Dawn', date: 'Jan 15, 2025', cover: 'https://via.placeholder.com/64' },
  ],
  stats: {
    streams: 250000,
    likes: 18000,
  },
  posts: [
    { id: 1, content: 'New track dropping soon! #MusicLife', date: 'Mar 20, 2025' },
    { id: 2, content: 'Live set at Club X tonight!', date: 'Mar 15, 2025' },
  ],
});

// Tab management
const tabs = ['Communities', 'Releases', 'Stats', 'Posts'];
const activeTab = ref('Releases');

// Settings toggle
const showSettings = ref(false);
const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};

// Methods
const saveAccountSettings = () => {
  console.log('Saving account settings:', {
    username: profile.username,
    email: profile.email,
  });
};
</script>

<style scoped>
/* Modern, sleek design enhancements */
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.rounded-xl { border-radius: 1rem; }
.transition-colors { transition: background-color 0.2s ease, color 0.2s ease; }

@media (max-width: 768px) {
  .md\:ml-72 { margin-left: 0; }
  .md\:pr-\[340px\] { padding-right: 1.5rem; }
}
</style>