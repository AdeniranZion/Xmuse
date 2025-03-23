<template>
    <div class="max-w-[1440px] mx-auto pt-16 flex flex-col md:flex-row h-screen relative">
      <Sidebar class="hidden md:block" />
  
      <!-- Messages Pane -->
      <div class="flex flex-col md:w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto ml-0 md:ml-80">
        <!-- Search Bar -->
        <div class="p-4">
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <font-awesome-icon icon="search" />
            </span>
            <input
              type="text"
              placeholder="Search Direct Messages"
              class="w-full py-2 pl-10 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            />
          </div>
        </div>
  
        <div class="fixed md:bottom-4 md:right-4 bottom-12 right-3 my-10 mx-4">
          <button
            @click="store.showNewMessagePane = true"
            class="flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200"
            aria-label="Create New Message"
          >
            <font-awesome-icon icon="plus" />
          </button>
        </div>
        <div v-if="store.showNewMessagePane" class="absolute inset-0 md:inset-auto md:w-1/3 md:right-0 bg-white dark:bg-gray-900 border-l border-gray-300 dark:border-gray-700 flex flex-col shadow-xl z-50 rounded-lg">
  <div class="p-4 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-between rounded-t-lg">
    <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">New Message</h3>
    <button @click="store.showNewMessagePane = false" class="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
      <font-awesome-icon icon="times" />
    </button>
  </div>
  <div class="p-6 flex-1 flex flex-col gap-4">
    <input
      type="text"
      v-model="searchRecipient"
      placeholder="Recipient's name"
      class="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
    />
    <textarea
      v-model="newMessageContent"
      placeholder="Type your message here..."
      class="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
      rows="4"
    ></textarea>
    <button
      @click="sendMessage()"
      class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md"
    >
      Send
    </button>
  </div>
</div>

  
        <!-- Message Requests -->
        <div class="px-4 py-2 my-2 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <font-awesome-icon icon="envelope" class="text-gray-400" />
            <span class="text-sm font-medium text-gray-400">Message requests</span>
          </div>
          <span class="text-sm text-indigo-500">4 pending requests</span>
        </div>
  
        <!-- Messages List -->
        <div class="flex-1">
          <div
            v-for="message in messages"
            :key="message.id"
            class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
            :class="{ 'bg-gray-200 dark:bg-gray-700': selectedMessage && selectedMessage.id === message.id }"
            @click="selectMessage(message)"
          >
            <div class="w-12 h-12 rounded-full overflow-hidden">
              <img :src="message.avatar" alt="User Avatar" class="w-full h-full object-cover" />
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
      </div>
  
      <!-- New Message Pane -->
      <div v-if="store.showNewMessagePane" class="absolute inset-0 md:inset-auto md:w-1/3 md:right-0 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col z-50">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">New Message</h3>
            <button @click="store.toggleNewMessagePane()" class="text-gray-500 hover:text-gray-700">
              <font-awesome-icon icon="times" />
            </button>
          </div>
        </div>
        <div class="p-4">
          <input
            type="text"
            v-model="searchRecipient"
            placeholder="Search friends or fans..."
            class="w-full py-2 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div class="flex-1 overflow-y-auto">
          <div
            v-for="friend in filteredFriends"
            :key="friend.id"
            class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            @click="selectRecipient(friend)"
          >
            <div class="w-10 h-10 rounded-full overflow-hidden">
              <img :src="friend.avatar" alt="Friend Avatar" class="w-full h-full object-cover" />
            </div>
            <div>
              <span class="text-sm font-semibold">{{ friend.name }}</span>
              <span class="text-sm text-gray-500">{{ friend.handle }}</span>
            </div>
          </div>
        </div>
        <div v-if="selectedRecipient" class="p-4 border-t border-gray-200 dark:border-gray-700">
          <textarea
            v-model="newMessageContent"
            placeholder="Type your message here..."
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            rows="3"
          ></textarea>
          <button
            @click="sendNewMessage()"
            class="mt-2 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
  
      <!-- Message Details Pane -->
      <div v-if="selectedMessage && !store.showNewMessagePane" class="flex-1 p-4 overflow-y-auto hidden md:block">
        <h2 class="text-lg font-semibold">{{ selectedMessage.name }}</h2>
        <p class="text-gray-500">{{ selectedMessage.handle }}</p>
        <hr class="my-4 border-gray-300 dark:border-gray-700" />
        <div class="text-sm text-gray-400">
          <p>Conversation history will appear here...</p>
        </div>
        <div class="mt-4">
          <textarea
            placeholder="Type your message here..."
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            rows="3"
          ></textarea>
          <div class="flex items-center justify-between mt-2">
            <input type="file" class="hidden" id="attachment" />
            <label for="attachment" class="cursor-pointer text-indigo-500 hover:underline">Attach a file</label>
            <button class="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Send</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { defineAsyncComponent } from 'vue';
  import { useAppStore } from '../store';
  
  const store = useAppStore();
  const Sidebar = defineAsyncComponent(() => import('../components/Sidebar.vue'));
  
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
  ]);
  
  const selectedMessage = ref(null);
  const selectMessage = (message) => {
    selectedMessage.value = message;
    store.showNewMessagePane = false;
  };
  
  // New Message Logic
  const searchRecipient = ref('');
  const selectedRecipient = ref(null);
  const newMessageContent = ref('');
  
  const filteredFriends = computed(() => {
    return store.friendsAndFans.filter(friend =>
      friend.name.toLowerCase().includes(searchRecipient.value.toLowerCase()) ||
      friend.handle.toLowerCase().includes(searchRecipient.value.toLowerCase())
    );
  });
  
  const selectRecipient = (friend) => {
    selectedRecipient.value = friend;
  };
  
  const sendNewMessage = () => {
    if (selectedRecipient.value && new newMessageContent.value) {
      store.createNewMessage(newMessageContent.value, selectedRecipient.value);
      store.toggleNewMessagePane();
      selectedRecipient.value = null;
      newMessageContent.value = '';
    }
  };
  
  </script> 
  
  <style scoped>
  .messages-list {
    overflow-y: auto;
    max-height: calc(100vh - 160px);
  }
  
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>