<template>
  <div class="flex-1 p-4 md:ml-80 bg-gray-50 dark:bg-black max-w-screen-md mx-auto overflow-hidden">
    <!-- <div class="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
    </div> -->

    <div class="rounded-xl p-4 mt-0 shadow-sm bg-white dark:bg-neutral-950 border border-gray-200 dark:border-gray-800">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
          <img :src="store.userProfileImage" class="w-full h-full object-cover" alt="profile" />
        </div>
        <input
          type="text"
          placeholder="Share your latest track or update..."
          class="flex-1 rounded-full px-4 py-2 text-sm border-none bg-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
        />
      </div>
      <div class="flex gap-2 sm:gap-4 mt-4 border-t border-gray-200 dark:border-gray-600 pt-4 flex-wrap">
        <button class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer whitespace-nowrap">
          <font-awesome-icon icon="music" />
          Share Track
        </button>
        <button class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer whitespace-nowrap">
          <font-awesome-icon icon="calendar" />
          Create Event
        </button>
        <button class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer whitespace-nowrap">
          <font-awesome-icon icon="users" />
          Collaboration
        </button>
      </div>
    </div>

    <!-- Weekly Challenge -->
    <div class="mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-sm p-4 sm:p-6 text-white">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <font-awesome-icon icon="medal" class="h-6 w-6" />
          <h2 class="text-sm sm:text-lg font-semibold">Weekly Challenge</h2>
        </div>
        <span class="text-xs sm:text-sm opacity-75">3 days left</span>
      </div>
      <p class="mb-4 text-sm sm:text-base">Create a 30-second loop using only acoustic instruments! 🎸</p>
      <div class="flex items-center justify-between">
        <div class="flex -space-x-2">
          <img
            v-for="(participant, index) in store.challengeParticipants"
            :key="index"
            :src="participant.avatar"
            alt=""
            class="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-white"
          />
          <div class="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/20 flex items-center justify-center text-sm">
            +42
          </div>
        </div>
        <button class="px-3 sm:px-4 py-1 sm:py-2 text-sm font-medium rounded-md border bg-white border-indigo-400 text-indigo-600 hover:bg-indigo-600 hover:text-white">
          Join now
        </button>
      </div>
    </div>


    <!-- slate, gray, zinc, neutral, stone -->

    <div class="space-y-4 sm:space-y-6 mt-4">
        <div v-for="post in store.posts" :key="post.id" class="rounded-xl p-4 shadow-sm bg-white dark:bg-neutral-950 border border-gray-200 dark:border-gray-800">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full overflow-hidden">
              <img :src="post.userImage" class="w-full h-full object-cover" alt="profile" />
            </div>
            <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-1 mb-0.5">
                    <span class="font-bold truncate dark:text-gray-100">{{ post.userName }}</span>
                    <font-awesome-icon v-if="post.verified" icon="check-circle" class="text-blue-500 text-sm" />
                    <span class="text-gray-500 text-sm dark:text-gray-100">{{ post.handle }}</span>
                    <span class="text-gray-500 text-sm dark:text-gray-100">· {{ post.time }}</span>
                  </div>
             </div>
          </div>
          <p class="ml-1 pl-12 pr-5 text-sm text-gray-700 dark:text-gray-300">
            {{ post.content }}
            <span v-if="post.hashtags" class="text-indigo-600 dark:text-indigo-400 cursor-pointer">#{{ post.hashtags }}</span>
            <font-awesome-icon v-if="post.isCollaboration" icon="pencil-alt" class="ml-2 text-gray-600 dark:text-gray-400" />
          </p>
          <div v-if="post.trackImage" class="mt-3 rounded-xl overflow-hidden">
            <img :src="post.trackImage" class="w-full h-48 object-cover" alt="content" />
          </div>
          
  
          <!-- <div>
            <div v-for="post in getFormattedPosts()" :key="post.id">
              <p>{{ post.content }}</p>
              <p>Likes: {{ post.formattedStats.likes }} | Views: {{ post.formattedStats.views }}</p>
            </div>
          </div> -->

          <div class="flex justify-between text-gray-500 dark:text-gray-400 text-sm mt-3 mx-10">
              <button @click="store.toggleComments(post.id)" class="flex items-center gap-2" :class="{'text-blue-500 dark:text-blue-400': post.showComments, 'hover:text-blue-500 dark:hover:text-blue-400': !post.showComments}">
              <font-awesome-icon icon="comment" />
              <span>{{ post.stats.replies }}</span>
            </button>
            <button class="flex items-center gap-2 hover:text-green-500 dark:hover:text-green-400 transition-colors">
              <font-awesome-icon icon="retweet" />
              <span>{{ post.stats.reposts }}</span>
            </button>
            <button @click="store.toggleLike(post.id)" class="flex items-center gap-2" :class="{'text-red-500 dark:text-red-400': post.isLiked, 'hover:text-red-500 dark:hover:text-red-400': !post.isLiked}">
              <font-awesome-icon icon="heart" />
              <span>{{ post.stats.likes }}</span>
            </button>
            <button class="flex items-center gap-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <font-awesome-icon icon="chart-bar" />
              <span>{{ post.stats.views }}</span>
            </button>
            <button class="flex items-center hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <font-awesome-icon icon="share-alt" />
            </button>
          </div>
          
          <!-- <div class="flex justify-between text-gray-500 dark:text-gray-400 text-sm mt-3 mx-10">
            <button @click="store.toggleComments(post.id)" class="flex items-center gap-2" :class="{'text-blue-500 dark:text-blue-400': post.showComments, 'hover:text-blue-500 dark:hover:text-blue-400': !post.showComments}">
              <font-awesome-icon icon="comment" />
              <span>{{ post.formattedStats.replies }}</span>
            </button>
            <button class="flex items-center gap-2 hover:text-green-500 dark:hover:text-green-400 transition-colors">
              <font-awesome-icon icon="retweet" />
              <span>{{ post.formattedStats.reposts }}</span>
            </button>
            <button @click="store.toggleLike(post.id)" class="flex items-center gap-2" :class="{'text-red-500 dark:text-red-400': post.isLiked, 'hover:text-red-500 dark:hover:text-red-400': !post.isLiked}">
              <font-awesome-icon icon="heart" />
              <span>{{ post.formattedStats.likes }}</span>
            </button>
            <button class="flex items-center gap-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <font-awesome-icon icon="chart-bar" />
              <span>{{ post.formattedStats.views }}</span>
            </button>
            <button class="flex items-center hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <font-awesome-icon icon="share-alt" />
            </button>
          </div> -->


          <!-- <div v-for="post in getFormattedPosts()" :key="post.id">
      <div class="flex justify-between text-gray-500 dark:text-gray-400 text-sm mt-3 mx-10">
        <button @click="store.toggleComments(post.id)" class="flex items-center gap-2" :class="{'text-blue-500 dark:text-blue-400': post.showComments, 'hover:text-blue-500 dark:hover:text-blue-400': !post.showComments}">
          <font-awesome-icon icon="comment" />
          <span>{{ post.formattedStats.replies }}</span>
        </button>
        <button class="flex items-center gap-2 hover:text-green-500 dark:hover:text-green-400 transition-colors">
          <font-awesome-icon icon="retweet" />
          <span>{{ post.formattedStats.reposts }}</span>
        </button>
        <button @click="store.toggleLike(post.id)" class="flex items-center gap-2" :class="{'text-red-500 dark:text-red-400': post.isLiked, 'hover:text-red-500 dark:hover:text-red-400': !post.isLiked}">
          <font-awesome-icon icon="heart" />
          <span>{{ post.formattedStats.likes }}</span>
        </button>
        <button class="flex items-center gap-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          <font-awesome-icon icon="chart-bar" />
          <span>{{ post.formattedStats.views }}</span>
        </button>
        <button class="flex items-center hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          <font-awesome-icon icon="share-alt" />
        </button>
      </div>
      </div> -->

          <!-- Comments Section -->
          <div v-if="post.showComments" class="mt-4 border-t border-gray-200 dark:border-gray-600 pt-4 mx-10">
                  <p class="text-sm text-gray-600 dark:text-gray-400">Comments ({{ post.stats.replies }})</p>
                  <div class="mt-2 space-y-2">
                      <div v-for="comment in post.comments" :key="comment.id" class="flex items-start gap-2">
                      <div class="md:w-8 md:h-8 w-6 h-6 rounded-full overflow-hidden">
                          <img :src="comment.userImage" class="w-full h-full object-cover" alt="commenter" />
                      </div>
                      <div>
                          <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ comment.userName }}<span class="text-xs text-gray-400 dark:text-gray-400"> · {{ comment.time }}</span></p>
                          <p class="text-sm text-gray-600 dark:text-gray-500">{{ comment.content }}</p>
                      </div>
                      </div>
                  </div>
                  <!-- Comment Form -->
                  <form @submit.prevent="submitComment(post.id)" class="mt-4 flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full overflow-hidden hidden md:block">
                      <img :src="store.userProfileImage" class="w-full h-full object-cover" alt="user" />
                      </div>
                      <input
                      v-model="newComment[post.id]"
                      type="text"
                      placeholder="Add a comment..."
                      class="flex-1 rounded-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button type="submit" class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                      <font-awesome-icon icon="paper-plane" />
                      </button>
                  </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useAppStore } from '../store';
  
  const store = useAppStore();

  const posts = store.posts; // Assuming posts come from store
  // Reactive object to store new comment input for each post
  const newComment = ref<{ [key: number]: string }>({});
  
  const submitComment = (postId: number) => {
    if (newComment.value[postId]?.trim()) {
      store.addComment(postId, newComment.value[postId]);
      newComment.value[postId] = ''; // Clear the input after submission
    }
  };

  const formatNumber = (value: number): string => {
  const num = Number(value) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace('.0', '')}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace('.0', '')}K`;
  return num.toString();
};

const getFormattedPosts = () => {
  return store.posts.map(post => ({
    ...post,
    formattedStats: {
      replies: formatNumber(post.stats.replies),
      reposts: formatNumber(post.stats.reposts),
      likes: formatNumber(post.stats.likes),
      views: formatNumber(post.stats.views),
    },
  }));
};
</script>