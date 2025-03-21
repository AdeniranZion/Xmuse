<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div class="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-[250px_1fr_300px] gap-6 p-6">
        
        <!-- Sidebar (Desktop Only) -->
        <aside class="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <Sidebar />
        </aside>
  
        <!-- Main Events Section -->
        <main class="flex flex-col">
          <!-- Header -->
          <header class="mb-6">
            <h1 class="text-3xl font-bold">Events & Challenges</h1>
            <p class="text-gray-600 dark:text-gray-400">Participate in exciting events and showcase your skills to win rewards!</p>
          </header>
  
          <!-- Challenges Section (Weekly + Yearly) -->
          <section class="mb-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Weekly Challenge Card -->
              <ChallengeCard 
                title="Weekly Challenge"
                description="Create a 30-second loop using only acoustic instruments! 🎸"
                timeLeft="Ends in 3 days"
                colorClass="from-purple-500 to-indigo-600"
              />
  
              <!-- Yearly Challenge Card -->
              <ChallengeCard 
                title="Yearly Challenge"
                description="Submit your best music track of the year and compete for the grand prize! 🏆"
                timeLeft="Ends in 45 days"
                colorClass="from-blue-500 to-teal-500"
              />
            </div>
          </section>
  
          <!-- Live Countdown Timer for an Event -->
          <section class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-6">
            <h2 class="text-xl font-semibold mb-2">Next Live Event: Summer Music Festival 2025</h2>
            <CountdownTimer :eventDate="new Date('2025-03-25T20:00:00')" />
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Don't miss out on this exciting event!</p>
          </section>
  
          <!-- Filters and Search -->
          <section class="flex flex-wrap items-center justify-between mb-4 gap-4">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search past challenges..."
              class="flex-1 rounded-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            />
            <select v-model="filterOption" class="rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-700 dark:text-gray-100">
              <option value="all">All Challenges</option>
              <option value="past-winners">Past Winners</option>
              <option value="yearly-challenges">Yearly Challenges</option>
              <option value="weekly-challenges">Weekly Challenges</option>
            </select>
          </section>
  
          <!-- Past Challenges -->
          <section class="space-y-6">
            <h2 class="text-2xl font-semibold">Past Challenges</h2>
  
            <div v-for="challenge in filteredChallenges" :key="challenge.id" class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="text-lg font-bold">{{ challenge.name }}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Ended on {{ challenge.endDate }}</p>
                </div>
                <span class="bg-indigo-100 text-indigo-600 text-sm px-3 py-1 rounded-full">{{ challenge.category }}</span>
              </div>
  
              <p class="mt-2 text-gray-600 dark:text-gray-400">{{ challenge.description }}</p>
  
              <div class="mt-4 flex justify-between items-center">
                <div class="flex items-center space-x-4">
                  <div v-for="winner in challenge.winners.slice(0, 3)" :key="winner.id" class="flex items-center">
                    <img :src="winner.avatar" class="w-8 h-8 rounded-full border border-white" alt="winner" />
                    <span class="ml-2 text-sm">{{ winner.name }}</span>
                  </div>
                </div>
                <button class="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                  View Full Results →
                </button>
              </div>
            </div>
          </section>
        </main>
  
        <!-- Notifications (Desktop Only) -->
        <aside class="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <Notification />
        </aside>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import Sidebar from '../components/Sidebar.vue';
  import Notification from '../components/Notifications.vue';
//   import ChallengeCard from '../components/ChallengeCard.vue';
//   import CountdownTimer from '../components/CountdownTimer.vue';
  
  // Search and Filter Logic
  const searchQuery = ref('');
  const filterOption = ref('all');
  const pastChallenges = ref([
    {
      id: 1,
      name: "Summer Acoustic Challenge",
      endDate: "August 15, 2024",
      category: "Acoustic",
      description: "Participants were challenged to create a summer-themed acoustic track.",
      winners: [
        { id: 1, name: "Alice Johnson", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
        { id: 2, name: "Bob Smith", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
      ],
    },
    // Add more sample challenges...
  ]);
  
  // Computed Filtered Challenges
  const filteredChallenges = computed(() => {
    let filtered = pastChallenges.value;
    if (filterOption.value !== 'all') {
      filtered = filtered.filter((challenge) => challenge.category.toLowerCase() === filterOption.value);
    }
    if (searchQuery.value) {
      filtered = filtered.filter((challenge) => challenge.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
    }
    return filtered;
  });
  </script>
  
  <style scoped>
  /* Custom Styling */
  </style>
  