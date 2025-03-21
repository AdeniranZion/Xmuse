import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';
import Communities from '../views/Communities.vue';
import Library from '../views/Library.vue';
import CommunityDetail from '../views/CommunityDetail.vue';
import Messages from '../views/Messages.vue';


// Placeholder views for other routes (create these files if needed)
// import Studio from '../views/Studio.vue';
// import Events from '../views/Events.vue';
// import Collaborations from '../views/Collaborations.vue';
// import Analytics from '../views/Analytics.vue';
// import Library from '../views/Library.vue';
// import Library from '../views/Communities.vue';

const Search = { template: '<div>Search Page</div>' };
const NotificationsPage = { template: '<div>Notifications Page</div>' };
// const Messages = { template: '<div>Messages Page</div>' };


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/communities/:id', name: 'CommunityDetail', component: CommunityDetail },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/communities', name: 'Communities', component: Communities },
  { path: '/library', name: 'Library', component: Library},
  { path: '/search', name: 'Search', component: Search },
  { path: '/notifications', name: 'Notifications', component: NotificationsPage },
  { path: '/messages', name: 'Messages', component: Messages },
  // { path: '/studio', name: 'Studio', component: Studio },
  // { path: '/events', name: 'Events', component: Events },
  // { path: '/collaborations', name: 'Collaborations', component: Collaborations },
  // { path: '/analytics', name: 'Analytics', component: Analytics },
  // { path: '/library', name: 'Library', component: Library },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;