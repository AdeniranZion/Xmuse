<template>
    <!-- <div class="messages-container bg-gray-900 min-h-screen text-gray-100"> -->
        <div class="max-w-[1440px] mx-auto pt-16 flex flex-col md:flex-row relative overflow-hidden">
      <!-- Header -->
      <header class="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full overflow-hidden">
            <img :src="store.userProfileImage" alt="User Avatar" class="w-full h-full object-cover" />
          </div>
          <h1 class="text-lg font-semibold">Messages</h1>
        </div>
        <button class="text-gray-400 hover:text-gray-200 transition-colors duration-200">
          <font-awesome-icon icon="cog" class="text-lg" />
        </button>
      </header>
      <sidebar />
  
      <!-- Search Bar -->
      <div class="px-4 py-3">
        <div class="relative">
          <input
            type="text"
            placeholder="Search Direct Messages"
            class="w-full py-2 px-4 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
          <font-awesome-icon icon="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
  
      <!-- Message Requests -->
      <div class="px-4 py-2 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <font-awesome-icon icon="envelope" class="text-gray-400" />
          <span class="text-sm font-medium text-gray-400">Message requests</span>
        </div>
        <span class="text-sm text-indigo-500">4 pending requests</span>
      </div>
  
      <!-- Messages List -->
      <div class="messages-list">
        <div
          v-for="message in messages"
          :key="message.id"
          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
        >
          <div class="w-12 h-12 rounded-full overflow-hidden">
            <img :src="'https://public.readdy.ai/ai/img_res/da26a6109eede1b6885f8b7ad315a465.jpg'" alt="User Avatar" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1">
                <span class="text-sm font-semibold">{{ message.name }}</span>
                <font-awesome-icon v-if="message.verified" icon="check-circle" class="text-indigo-500 text-xs" />
                <span class="text-sm text-gray-500">{{ message.handle }} · {{ message.date }}</span>
              </div>
            </div>
            <p class="text-sm text-gray-400 truncate">{{ message.content }}</p>
          </div>
        </div>
      </div>
  
      <!-- New Message Button -->
      <button
        class="fixed bottom-6 right-6 w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-colors duration-200"
      >
        <font-awesome-icon icon="plus" class="text-white text-lg" />
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
import { useAppStore } from '../store';
const store = useAppStore();
const userProfileImage = ref(store.userProfileImage);

  
  // Mock messages data
  const messages = ref([
    {
      id: 1,
      name: 'OLUCHY',
      handle: '@oluchyyx',
      date: 'Mar 16',
      content: 'Shared a post',
      avatar: 'https://public.readdy.ai/ai/img_res/da26a6109eede1b6885f8b7ad315a465.jpg',
      verified: true,
    },
    {
      id: 2,
      name: 'Lu',
      handle: '@oluchyyx',
      date: 'Feb 19',
      content: 'x.com/fergiejshimy.st...',
      avatar: 'https://public.readdy.ai/ai/img_res/da26a6109eede1b6885f8b7ad315a465.jpg',
      verified: true,
    },
    {
      id: 3,
      name: 'oro touré',
      handle: '@orotoure',
      date: 'Feb 16',
      content: 'HOW YOU DEY??',
      avatar: 'https://public.readdy.ai/ai/img_res/da26a6109eede1b6885f8b7ad315a465.jpg',
      verified: false,
    },
    {
      id: 4,
      name: 'P$euDoRandom',
      handle: '@1Td3o9',
      date: 'Feb 14',
      content: "you'd be fine",
      avatar: 'https://public.readdy.ai/ai/img_res/da26a6109eede1b6885f8b7ad315a465.jpg',
      verified: false,
    },
    {
      id: 5,
      name: 'KING YD',
      handle: '@zionaadeniran',
      date: 'Feb 13',
      content: 'You shared a post',
      avatar: 'https://public.readdy.ai/ai/img_res/da26a6109eede1b6885f8b7ad315a465.jpg',
      verified: false,
    },
    {
      id: 6,
      name: 'CookThatThing',
      handle: '@cookcookkrella',
      date: 'Dec 5, 2024',
      content: 'YES CHEF',
      avatar: 'https://public.readdy.ai/ai/img_res/da26a6109eede1b6885f8b7ad315a465.jpg',
      verified: false,
    },
    {
      id: 7,
      name: 'Xxobestvideos',
      handle: '@WorldUpda...',
      date: 'Nov 26, 2024',
      content: 'x.com/aigbedionivie...',
      avatar: 'https://public.readdy.ai/ai/img_res/da26a6109eede1b6885f8b7ad315a465.jpg',
      verified: false,
    },
    {
      id: 8,
      name: 'Ekundayo Ola',
      handle: '@theekundayo',
      date: 'Oct 17, 2024',
      content: 'You shared a post',
      avatar: 'https://public.readdy.ai/ai/img_res/da26a6109eede1b6885f8b7ad315a465.jpg',
      verified: false,
    },
    {
      id: 9,
      name: 'The Inevitable',
      handle: '@eonsinde',
      date: 'Sep 22, 2024',
      content: '😊',
      avatar: 'https://public.readdy.ai/ai/img_res/da26a6109eede1b6885f8b7ad315a465.jpg',
      verified: false,
    },
    {
      id: 10,
      name: 'UNLEASH WOMEN',
      handle: '',
      date: 'Apr 14, 2023',
      content: '',
      avatar: 'https://public.readdy.ai/ai/img_res/da26a6109eede1b6885f8b7ad315a465.jpg',
      verified: false,
    },
  ]);
  </script>
  
  <style scoped>
  .messages-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  .messages-list {
    overflow-y: auto; /* Corrected the syntax */
  }
  
  /* Ensure the new message button stays above other content */
  button {
    z-index: 50;
  }
  
  /* Truncate long text */
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>