<!-- src/views/CommunityDetail.vue -->
<template>
  <div class="max-w-[1440px] mx-auto pt-16 flex relative">
    <!-- Left Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 md:ml-72 md:pr-[340px] p-6">
      <!-- Back Button -->
      <a :href="`/communities`" data-readdy="true" class="block mb-6">
        <button
          class="flex items-center gap-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 cursor-pointer whitespace-nowrap rounded-button"
        >
          <font-awesome-icon icon="arrow-left" />
          <span>Back to Communities</span>
        </button>
      </a>

      <!-- Community Header -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
        <div class="flex items-center gap-4 max-w-full">
          <div class="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
            <img :src="community.image" class="w-full h-full object-cover" alt="community" />
          </div>
          <div class="flex-1 overflow-hidden">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 truncate">{{ community.name }}</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ community.genre }} Community</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 truncate">
              {{ community.members }} Members | {{ community.isPremium ? 'Premium' : 'Free' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Tabs with Invisible Horizontal Scrollbar -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
        <div
          class="flex overflow-x-auto scrollbar-hide max-w-full"
          style="scrollbar-width: none; -ms-overflow-style: none;"
        >
          <div class="flex space-x-4">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="activeTab = tab"
              class="px-4 py-2 -mb-px text-sm font-medium whitespace-nowrap flex-shrink-0"
              :class="{
                'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400': activeTab === tab,
                'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300': activeTab !== tab,
              }"
            >
              {{ tab }}
            </button>
          </div>
        </div>
        <div class="mt-6 max-w-full">
          <div v-if="activeTab === 'Overview'">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Overview</h2>
            <p class="mt-2 text-gray-700 dark:text-gray-300">{{ community.description }}</p>
            <div class="mt-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Moderators</h3>
              <ul class="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300">
                <li v-for="moderator in community.moderators" :key="moderator">{{ moderator }}</li>
              </ul>
            </div>
            <div class="mt-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Rules</h3>
              <ul class="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300">
                <li v-for="rule in community.rules" :key="rule">{{ rule }}</li>
              </ul>
            </div>
          </div>
          <div v-if="activeTab === 'Events'">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Upcoming Events</h2>
            <div class="mt-4 space-y-4">
              <div
                v-for="event in communityEvents"
                :key="event.id"
                class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ event.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ event.date }}</p>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'Posts'">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Community Posts</h2>
            <div class="mt-4 space-y-4">
              <div
                v-for="post in communityPosts"
                :key="post.id"
                class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div class="flex items-center gap-4">
                  <img :src="post.userImage" class="w-10 h-10 rounded-full object-cover" alt="user" />
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ post.userName }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ post.time }}</p>
                  </div>
                </div>
                <p class="mt-2 text-gray-700 dark:text-gray-300">{{ post.content }}</p>
                <img v-if="post.trackImage" :src="post.trackImage" class="mt-2 w-full h-48 object-cover rounded-lg" alt="track" />
                <div class="mt-2 flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{{ post.stats.replies }} Replies</span>
                  <span>{{ post.stats.reposts }} Reposts</span>
                  <span>{{ post.stats.likes }} Likes</span>
                  <span>{{ post.stats.views }} Views</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'Resources'">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Resources</h2>
            <ul class="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300">
              <li v-for="resource in community.resources" :key="resource">{{ resource }}</li>
            </ul>
          </div>
          <div v-if="activeTab === 'Members'">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Members</h2>
            <ul class="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300">
              <li v-for="member in community.memberList" :key="member">{{ member }}</li>
            </ul>
          </div>
          <div v-if="activeTab === 'Discussions'">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Discussion Topics</h2>
            <ul class="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300">
              <li v-for="topic in community.discussionTopics" :key="topic">{{ topic }}</li>
            </ul>
          </div>
          <div v-if="activeTab === 'Featured Artists'">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Featured Artists</h2>
            <ul class="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300">
              <li v-for="artist in community.featuredArtists" :key="artist">{{ artist }}</li>
            </ul>
          </div>
          <div v-if="activeTab === 'Collaborations'">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Collaboration Opportunities</h2>
            <ul class="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300">
              <li v-for="opportunity in community.collaborationOpportunities" :key="opportunity">{{ opportunity }}</li>
            </ul>
          </div>
          <div v-if="activeTab === 'Live Streams'">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Live Streams</h2>
            <ul class="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300">
              <li v-for="stream in community.liveStreams" :key="stream">{{ stream }}</li>
            </ul>
          </div>
          <div v-if="activeTab === 'Workshops'">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Workshops</h2>
            <ul class="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300">
              <li v-for="workshop in community.workshops" :key="workshop">{{ workshop }}</li>
            </ul>
          </div>
          <div v-if="activeTab === 'Challenges'">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Challenges</h2>
            <ul class="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300">
              <li v-for="challenge in community.challenges" :key="challenge">{{ challenge }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Join/Leave Button -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-16 md:mb-6">
        <button
          @click="handleJoinRequest"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full flex items-center justify-center gap-2"
          :class="{
            'bg-indigo-600 text-white hover:bg-indigo-700 dark:hover:bg-indigo-500': !joinRequested,
            'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300': joinRequested,
          }"
          :disabled="joinRequested"
        >
          <font-awesome-icon v-if="joinRequested" icon="check" />
          <span>{{ joinRequested ? 'Requested' : 'Join Community' }}</span>
        </button>
      </div>
    </div>

    <!-- Right Sidebar -->
    <Notifications />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';
const Sidebar = defineAsyncComponent(() => import('../components/Sidebar.vue'));
const Notifications = defineAsyncComponent(() => import('../components/Notifications.vue'));
import { useAppStore } from '../store';

// Access the store
const store = useAppStore();
const route = useRoute();

// State for tabs
const tabs = ref([
  'Overview',
  'Events',
  'Posts',
  'Resources',
  'Members',
  'Discussions',
  'Featured Artists',
  'Collaborations',
  'Live Streams',
  'Workshops',
  'Challenges',
]);
const activeTab = ref('Overview');

// State for join request
const joinRequested = ref(false);

// Computed property to get the current community
const community = computed(() => {
  return store.communities.find((c) => c.id === parseInt(route.params.id as string)) || store.communities[0];
});

// Computed property for community-specific events
const communityEvents = computed(() => {
  return store.upcomingEvents.filter((event) => event.communityId === community.value.id);
});

// Computed property for community-specific posts
const communityPosts = computed(() => {
  return store.posts.filter((post) => post.communityId === community.value.id);
});

// Methods
const handleJoinRequest = () => {
  if (!joinRequested.value) {
    joinRequested.value = true;
    // Approval logic to be added later
  }
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

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Ensure tabs stay on one line */
.space-x-4 > * {
  display: inline-block;
  white-space: nowrap;
}
</style>