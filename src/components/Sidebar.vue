<template>
  <div class="hidden md:block fixed top-15 left-30 w-72 h-full p-4 border-r border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-black">
    <!-- <div class="hidden md:block fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 shadow-lg z-40"> -->
    <div class="rounded-xl p-4 shadow-sm bg-white dark:bg-neutral-800">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-full overflow-hidden">
          <img :src="store.userProfileImage" class="w-full h-full object-cover" alt="profile" />
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">David Anderson</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">Producer / DJ</p>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-sm text-gray-600 dark:text-gray-50">Latest Release</p>
        <div class="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="flex items-center gap-2">
            <font-awesome-icon icon="play-circle" class="text-indigo-600 dark:text-indigo-400" />
            <span class="text-sm text-gray-900 dark:text-gray-100">Summer Nights (feat. Emma)</span>
          </div>
        </div>
      </div>
    </div>
    <nav class="mt-6 space-y-2 text-lg">
      <router-link
        v-for="item in store.menuItems"
        :key="item.name"
        :to="item.path"
        v-slot="{ isActive, navigate }"
        custom
      >
        <a
      v-if="item.external"
      :href="item.path"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900 cursor-pointer whitespace-nowrap relative no-underline"
      :class="{'bg-gray-50 dark:bg-gray-700': item.active}"
      >
            <font-awesome-icon :icon="item.icon.split(' ')[1]" class="text-gray-600 dark:text-gray-400" />
            <span class="text-gray-900 dark:text-gray-100 text-md">{{ item.name }}</span>
        </a>
        <a
          v-else
          @click="navigate"
          class="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900 cursor-pointer whitespace-nowrap relative no-underline"
          :class="{'bg-indigo-100 dark:bg-gray-700': isActive}"
        >
          <font-awesome-icon :icon="item.icon.split(' ')[1]" class="text-gray-600 dark:text-gray-400" />
          <span class="text-gray-900 dark:text-gray-100 text-md">{{ item.name }}</span>
        </a>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '../store';
import { useRouter, useRoute } from 'vue-router';

const store = useAppStore();
const router = useRouter();
const route = useRoute();

const updateActiveItem = () => {
  store.menuItems.forEach(item => {
    item.active = !item.external && route.path === item.path;
  });
};

router.afterEach(updateActiveItem);
updateActiveItem();
</script>