<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Sidebar = defineAsyncComponent(() => import('../components/Sidebar.vue'));
const Feed = defineAsyncComponent(() => import('../components/Feed.vue'));
const Notifications = defineAsyncComponent(() => import('../components/Notifications.vue'));
</script>


<template>
  <div class="max-w-[1440px] mx-auto pt-16 flex relative bg-gray-50 dark:bg-black">
    <Header />
    <Sidebar />
    <Feed />
    <Notifications />
  </div>
</template>

