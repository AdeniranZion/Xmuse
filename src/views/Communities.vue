<!-- src/views/Communities.vue -->
<template>
  <div class="max-w-[1440px] mx-auto pt-16 flex relative overflow-hidden">
    <!-- Left Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 md:ml-72 md:pr-[340px] p-6">
      <!-- Back Button -->
      <a href="/" data-readdy="true" class="block mb-6">
        <button
          class="flex items-center gap-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 cursor-pointer whitespace-nowrap rounded-button"
        >
          <font-awesome-icon icon="arrow-left" />
          <span>Back to Feed</span>
        </button>
      </a>

      <!-- Communities Header -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Communities</h1>
          <button
            @click="showCreateCommunityModal = true"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors"
          >
            Create Community
          </button>
        </div>
      </div>

      <!-- Community Search and Filter -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
        <div class="flex flex-col md:flex-row items-center gap-4">
          <div class="relative flex-1 w-full">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search communities..."
              class="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
            />
            <font-awesome-icon
              icon="search"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
          </div>
          <select
            v-model="selectedGenre"
            class="w-full md:w-auto px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">All Genres</option>
            <option v-for="genre in store.genres" :key="genre" :value="genre">{{ genre }}</option>
          </select>
        </div>
      </div>

      <!-- Communities List -->
      <div class="space-y-6">
        <div
          v-for="community in filteredCommunities"
          :key="community.id"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        >
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full overflow-hidden">
              <img :src="community.image" class="w-full h-full object-cover" alt="community" />
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div>
                  <router-link :to="`/communities/${community.id}`" class="text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                    {{ community.name }}
                  </router-link>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ community.genre }} | {{ community.members }} Members</p>
                </div>
                <button
                  @click="store.toggleJoinCommunity(community.id)"
                  class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  :class="community.isJoined ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300' : 'bg-indigo-600 text-white hover:bg-indigo-700 dark:hover:bg-indigo-500'"
                >
                  {{ community.isJoined ? 'Leave' : 'Join' }}
                </button>
              </div>
              <p class="mt-2 text-gray-700 dark:text-gray-300">{{ community.description }}</p>
              <div class="flex items-center gap-2 mt-3">
                <font-awesome-icon icon="calendar-alt" class="text-gray-500 dark:text-gray-400" />
                <span class="text-sm text-gray-500 dark:text-gray-400">Next Event: {{ community.nextEvent }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Create Community Modal -->
      <div
        v-if="showCreateCommunityModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
          <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Create a New Community</h2>
          <form @submit.prevent="createCommunity">
            <div class="space-y-4">
              <div>
                <label for="community-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Community Name</label>
                <input
                  id="community-name"
                  v-model="newCommunity.name"
                  type="text"
                  class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Enter community name"
                  required
                />
              </div>
              <div>
                <label for="community-genre" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Genre</label>
                <select
                  id="community-genre"
                  v-model="newCommunity.genre"
                  class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  required
                >
                  <option value="" disabled>Select a genre</option>
                  <option v-for="genre in store.genres" :key="genre" :value="genre">{{ genre }}</option>
                </select>
              </div>
              <div>
                <label for="community-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  id="community-description"
                  v-model="newCommunity.description"
                  class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Describe your community"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div class="flex justify-end gap-3">
                <button
                  type="button"
                  @click="showCreateCommunityModal = false"
                  class="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Right Sidebar -->
    <Notifications />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { defineAsyncComponent } from 'vue';
const Sidebar = defineAsyncComponent(() => import('../components/Sidebar.vue'));
const Notifications = defineAsyncComponent(() => import('../components/Notifications.vue'));
import { useAppStore } from '../store';

// Access the store
const store = useAppStore();

// State for search and filtering
const searchQuery = ref('');
const selectedGenre = ref('');

// State for creating a new community
const showCreateCommunityModal = ref(false);
const newCommunity = ref({
  name: '',
  genre: '',
  description: '',
});

// Computed property for filtered communities
const filteredCommunities = computed(() => {
  return store.communities.filter((community) => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesGenre = selectedGenre.value ? community.genre === selectedGenre.value : true;
    return matchesSearch && matchesGenre;
  });
});

// Methods
const createCommunity = () => {
  store.createCommunity({
    name: newCommunity.value.name,
    genre: newCommunity.value.genre,
    description: newCommunity.value.description,
  });
  // Reset form and close modal
  newCommunity.value = { name: '', genre: '', description: '' };
  showCreateCommunityModal.value = false;
};

// Reapply theme on mount
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