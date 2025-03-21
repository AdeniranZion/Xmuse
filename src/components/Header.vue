<template>
  <header class="fixed top-0 w-full shadow-sm z-50 bg-white dark:bg-gray-800">
    <div class="max-w-[1440px] mx-auto h-16 flex items-center justify-between px-6 md:px-6">
      <!-- Mobile Header -->
      <div class="flex md:hidden w-full justify-between items-center">
        <div class="flex items-center gap-2">
          <font-awesome-icon icon="music" class="text-2xl text-indigo-600 dark:text-indigo-400" />
          <span class="text-xl font-bold text-gray-900 dark:text-gray-100">Xmuse</span>
        </div>
        <div class="flex items-center gap-4">
          <button class="p-2 rounded-full bg-gray-100 dark:bg-gray-700" @click="toggleMobileSearch">
            <font-awesome-icon icon="search" class="text-gray-600 dark:text-gray-400" />
          </button>
          <button class="p-2 rounded-full bg-gray-100 dark:bg-gray-700" @click="toggleMobileMenu">
            <font-awesome-icon icon="bars" class="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <!-- Mobile Search Dropdown -->
      <transition name="dropdown">
        <div v-if="mobileSearchOpen" class="md:hidden absolute left-0 right-0 top-16 bg-white dark:bg-gray-800 shadow-md px-6 py-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Search artists, tracks, events..."
              class="w-full pl-10 pr-4 py-3 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 border-gray-200 dark:border-gray-600"
            />
            <font-awesome-icon icon="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      </transition>

      <!-- Mobile Menu Dropdown -->
      <transition name="dropdown">
        <div v-if="mobileMenuOpen" class="md:hidden absolute left-0 right-0 top-16 bg-white dark:bg-gray-800 shadow-md px-6 py-4">
          <div class="flex flex-col gap-4">
            <button class="relative flex items-center gap-3 text-gray-600 dark:text-gray-400" @click="store.toggleMessages">
              <font-awesome-icon icon="envelope" class="text-xl" />
              <span>Messages</span>
              <span class="w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">5</span>
            </button>
            <button class="relative flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <font-awesome-icon icon="bell" class="text-xl" />
              <span>Notifications</span>
              <span class="w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
            </button>
            <div class="flex items-center gap-3" @click="store.toggleProfileMenu">
              <div class="w-10 h-10 rounded-full overflow-hidden">
                <img :src="store.userProfileImage" class="w-full h-full object-cover" alt="profile" />
              </div>
              <span class="text-gray-600 dark:text-gray-400">Profile</span>
            </div>
          </div>
        </div>
      </transition>

      <!-- Desktop Header -->
      <div class="hidden md:flex items-center gap-2">
        <font-awesome-icon icon="music" class="text-2xl text-indigo-600 dark:text-indigo-400" />
        <span class="text-xl font-bold text-gray-900 dark:text-gray-100">Xmuse</span>
      </div>
      <div class="hidden md:block relative w-96">
        <input
          type="text"
          placeholder="Search artists, tracks, events..."
          class="w-full pl-10 pr-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 search-input"
        />
        <font-awesome-icon icon="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      </div>
      <div class="hidden md:flex items-center gap-6">
        <button class="relative rounded-button cursor-pointer icon-button">
          <font-awesome-icon icon="bell" class="text-gray-600 dark:text-gray-400" />
          <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 dark:bg-red-600 rounded-full text-white dark:text-gray-100 text-xs flex items-center justify-center">3</span>
        </button>
        <button class="relative rounded-button cursor-pointer icon-button" @click="store.toggleMessages">
          <font-awesome-icon icon="envelope" class="text-gray-600 dark:text-gray-400" />
          <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 dark:bg-red-600 rounded-full text-white dark:text-gray-100 text-xs flex items-center justify-center">5</span>
        </button>
        <div class="relative">
          <div class="w-8 h-8 rounded-full overflow-hidden cursor-pointer profile-button" @click="store.toggleProfileMenu">
            <img :src="store.userProfileImage" class="w-full h-full object-cover" alt="profile" />
          </div>
          <div
            v-if="showProfileMenu"
            class="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg py-1 bg-white dark:bg-gray-900 profile-menu"
            @mouseleave="showProfileMenu = false"
          >
            <a
              v-for="item in store.profileMenuItems"
              :key="item.label"
              href="#"
              class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 menu-item"
              @click="store.handleProfileAction(item.action)"
            >
              <font-awesome-icon :icon="item.icon.split(' ')[1]" class="mr-3 text-gray-600 dark:text-gray-400" />
              {{ item.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAppStore } from '../store';

const store = useAppStore();
const isDarkMode = computed(() => store.isDarkMode);
const showMessages = computed(() => store.showMessages);
const showProfileMenu = computed(() => store.showProfileMenu);
const mobileMenuOpen = ref(false);
const mobileSearchOpen = ref(false);

const toggleMobileSearch = () => {
  mobileSearchOpen.value = !mobileSearchOpen.value;
  if (mobileSearchOpen.value) mobileMenuOpen.value = false;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (mobileMenuOpen.value) mobileSearchOpen.value = false;
};
</script>

<style scoped>
.icon-button {
  transition: transform 0.2s ease, color 0.3s ease;
}

.icon-button:hover {
  transform: scale(1.1);
  color: #4f46e5; /* Tailwind's indigo-600 */
}

/* Custom placeholder style for the search input */
.search-input::placeholder {
  color: #9ca3af; /* Tailwind's gray-400 */
  font-style: italic;
}

/* Hover effect for the profile button */
.profile-button {
  transition: box-shadow 0.3s ease;
}

.profile-button:hover {
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3); /* Indigo-600 with opacity */
}

/* Profile menu animation */
.profile-menu {
  animation: slideDown 0.2s ease-out;
}

/* Menu item hover effect */
.menu-item {
  transition: background-color 0.2s ease;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Animation for profile menu dropdown */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>