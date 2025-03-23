import { defineStore, storeToRefs } from 'pinia';
import router from '../router';
export const useAppStore = defineStore('app', {
  state: () => ({
    isDarkMode: false,
    currentView: 'main',
    userProfileImage: 'https://public.readdy.ai/ai/img_res/95954f3ac1df4f9b4ddf6e5a7a4a328d.jpg',
    recentMessages: [
      { id: 1, senderName: 'Emma Thompson', senderAvatar: 'https://public.readdy.ai/ai/img_res/23f0e902e54701dc8bdac18490a02473.jpg', preview: 'Hey, loved your latest track!', timestamp: '5m ago' },
    ],
    profileMenuItems: [
      { label: 'View Profile', icon: 'fas fa-user', action: 'viewProfile' },
    ],
    menuItems: [
        { name: 'Home', icon: 'fas fa-home', path: '/', active: true },
        { name: 'Studio', icon: 'fas fa-microphone', path: 'https://readdy.ai/home/4434ff49-b9b7-4491-80c2-b9c047f276df/de762503-13cd-4c38-ad30-04256e56e92a', external: true , active: false},
        { name: 'Events', icon: 'fas fa-calendar', path: '/events', active: false},
        { name: 'Collaborations', icon: 'fas fa-users', path: '/collaborations', active: false},
        { name: 'Analytics', icon: 'fas fa-chart-line', path: '/analytics' ,active: false},
        { name: 'Library', icon: 'fas fa-music', path: '/library' ,active: false},
        { name: "Communities", icon: "fas fa-globe", path: '/communities', active: false},
      {
        name: "Profile",
        icon: "fas fa-user",
        // action: () => (currentView.value = "profile"),
        path: '/profile',
        active: false
      },
    ],
    stories: [
      { id: 1, name: 'Sarah Mills', image: 'https://public.readdy.ai/ai/img_res/06bcabd59af3b294d4c4d19f0e0d9a33.jpg' },
      { id: 2, name: 'Mike Chen', image: 'https://public.readdy.ai/ai/img_res/95954f3ac1df4f9b4ddf6e5a7a4a328d.jpg' },
      { id: 3, name: 'Emma Davis', image: 'https://public.readdy.ai/ai/img_res/23f0e902e54701dc8bdac18490a02473.jpg' },
      { id: 4, name: 'James Wilson', image: 'https://public.readdy.ai/ai/img_res/da26a6109eede1b6885f8b7ad315a465.jpg' },
    ],
    posts: [
      {
        id: 1,
        userName: 'Laura Thompson',
        userImage: 'https://public.readdy.ai/ai/img_res/e97c4998e57a2262447145baff3a2c8a.jpg',
        time: '2h',
        content: "Just finished recording my new track! Can't wait to share it with you all",
        hashtags: 'NewMusic',
        trackImage: 'https://public.readdy.ai/ai/img_res/dcd1e74b543f3387761eafef3ebc99b1.jpg',
        verified: true,
        handle: "@laurathompson",
        stats: {
          replies: "156",
          reposts: "2.4K",
          likes: "12,000",
          views: "128K",
        },
        showComments: false,
        isLiked: false,
        comments: [
          {
            id: 1,
            userName: 'Emma Davis',
            userImage: 'https://public.readdy.ai/ai/img_res/23f0e902e54701dc8bdac18490a02473.jpg',
            content: 'Amazing track! Can’t wait to hear more!',
            time: '1 hour ago',
          },
        ],
        communityId: 1,
      },
      {
        id: 2,
        userName: 'Marcus Rodriguez',
        userImage: 'https://public.readdy.ai/ai/img_res/da26a6109eede1b6885f8b7ad315a465.jpg',
        time: '4h',
        content: 'Looking for a vocalist for my upcoming EDM track. DM if interested!',
        isCollaboration: true,
        likes: '123',
        handle: "@marcusrodriguez",
        stats: {
          replies: "234",
          reposts: "3.1K",
          likes: "15.2K",
          views: "156K",
        },
        comments: [],
        communityId: 2,
      },
      {
        id: 3,
        userName: "Isabella Martinez",
        userImage:
          "https://public.readdy.ai/ai/img_res/948f40015592c41ea0311291a4c61e73.jpg",
        time: "6h",
        content:
          "Thrilled to announce my collaboration with @SoundWave Studios! New album dropping next month 🎸✨ #NewChapter",
        trackImage:
          "https://public.readdy.ai/ai/img_res/93da2664063469712afa77289371ea27.jpg",
        likes: "342",
        handle: "@isabellamartinez",
        comments: [],
        stats: {
          replies: "89",
          reposts: "1.2K",
          likes: "5.6K",
          views: "82K",
        },
        communityId: 3,
      },
      {
        id: 4,
        userName: "Nathan Brooks",
        userImage:
          "https://public.readdy.ai/ai/img_res/72fab48d496c08ebd98b479457962b10.jpg",
        time: "8h",
        content:
          "Just wrapped up mixing for @KateWilson's upcoming single. This one's going to be epic! 🎧 #MusicProducer",
        trackImage:
          "https://public.readdy.ai/ai/img_res/1976e6591d1ee13ba85fdce5c619d733.jpg",
        likes: "189",
        comments: [],
        handle: "@nathanbrooks",
        verified: true,
        stats: {
          replies: "234",
          reposts: "3.1K",
          likes: "15.2K",
          views: "156K",
        },
        communityId: 1,
      },
      {
        id: 5,
        userName: "Victoria Chen",
        userImage:
          "https://public.readdy.ai/ai/img_res/1aec433c137a17195d4cb064e08072d8.jpg",
        time: "12 hours ago",
        content:
          "Rehearsing for tomorrow's live stream performance! Join me at 8PM EST for an evening of classical fusion 🎻 #LiveMusic #Violin",
        likes: "276",
        comments: [],
        stats: {
          replies: "234",
          reposts: "3.1K",
          likes: "15.2K",
          views: "156K",
        },
        communityId: 1,
      },
      {
        id: 6,
        isAd: true,
        sponsorName: "Native Instruments",
        sponsorImage:
          "https://public.readdy.ai/ai/img_res/3b3683fdc1093f4a924a8a140de28602.jpg",
        time: "Sponsored",
        content:
          "Take your music production to the next level with KOMPLETE 14. Industry-leading virtual instruments, effects, and more. Limited time offer: Save 50% on all KOMPLETE bundles!",
        adImage:
          "https://public.readdy.ai/ai/img_res/1cee790391d1c3169c2607e37119d687.jpg",
        ctaText: "Shop Now",
        ctaLink: "#",
        likes: "1.2K",
        comments: [],
        stats: {
          replies: "234",
          reposts: "3.1K",
          likes: "15.2K",
          views: "156K",
        },
        communityId: 2,
      },
      {
        id: 7,
        userName: "Chris Anderson",
        userImage:
          "https://public.readdy.ai/ai/img_res/a222e823eb3d74eb3e4a2b12a189dd91.jpg",
        time: "1 hour ago",
        content:
          "🎵 Live streaming my production process! Working on some new beats and showing my studio setup. Drop by and say hi! 🎧 #MusicProduction #LiveStream",
        images: [
          "https://public.readdy.ai/ai/img_res/97e2a0dc13dfbd9e3f0c24caf64ae8e3.jpg",
          "https://public.readdy.ai/ai/img_res/1528a954232fa9cd3e16a0b58e7bc690.jpg",
        ],
        videoThumbnail:
          "https://public.readdy.ai/ai/img_res/9b3d57bd63e1255403d8630594c8a990.jpg",
        isLive: true,
        viewers: "1.2K",
        likes: "342",
        comments: [],
        stats: {
          replies: "234",
          reposts: "3.1K",
          likes: "15.2K",
          views: "156K",
        },
        communityId: 3,
      },
    ],
    trendingArtists: [
      { id: 1, name: 'Alex Turner', image: 'https://public.readdy.ai/ai/img_res/da26a6109eede1b6885f8b7ad315a465.jpg', genre: 'Electronic' },
      { id: 2, name: 'Sophie Bennett', image: 'https://public.readdy.ai/ai/img_res/23f0e902e54701dc8bdac18490a02473.jpg', genre: 'Pop' },
      { id: 3, name: 'Ryan Carter', image: 'https://public.readdy.ai/ai/img_res/06bcabd59af3b294d4c4d19f0e0d9a33.jpg', genre: 'Hip Hop' },
    ],
    upcomingEvents: [
        { id: 1, name: 'Summer Music Festival 2025', date: 'March 15, 2025' , communityId: 1},
      { id: 2, name: 'Producer Workshop', date: 'March 20, 2025' , communityId: 2},
      { id: 3, name: 'Live Studio Session', date: 'March 25, 2025' , communityId: 3},
    ],

    challengeParticipants: [
        { id: 1, name: 'Alex Turner', avatar: 'https://public.readdy.ai/ai/img_res/da26a6109eede1b6885f8b7ad315a465.jpg' },
        { id: 2, name: 'Sophie Bennett', avatar: 'https://public.readdy.ai/ai/img_res/23f0e902e54701dc8bdac18490a02473.jpg' },
        { id: 3, name: 'Ryan Carter', avatar: 'https://public.readdy.ai/ai/img_res/06bcabd59af3b294d4c4d19f0e0d9a33.jpg' },
    ],

    communities: [
        {
          id: 1,
          name: 'Electronic Producers Hub',
          genre: 'Electronic',
          members: 1200,
          description: 'A community for electronic music producers to share tips, tracks, and collaborate.',
          image: 'https://via.placeholder.com/150',
          nextEvent: 'Live Mix Session - March 20, 2025',
          isJoined: false,
          isPremium: false,
          resources: ['Synth Tutorials', 'DAW Setup Guide'],
          moderators: ['Alex Turner', 'Sophie Bennett'],
          rules: ['Be respectful', 'No spam'],
          memberList: ['Alex Turner', 'Sophie Bennett', 'Ryan Carter'],
          discussionTopics: ['Best Plugins', 'Mixing Tips'],
          featuredArtists: ['Alex Turner', 'Ryan Carter'],
          collaborationOpportunities: ['New Track Collaboration', 'Remix Contest'],
          liveStreams: ['Live Mix - March 20, 2025'],
          workshops: ['Producer Workshop - March 20, 2025'],
          challenges: ['30-Day Beat Challenge'],
        },
        {
          id: 2,
          name: 'Pop Songwriters Circle',
          genre: 'Pop',
          members: 850,
          description: 'Join pop songwriters to discuss songwriting techniques and collaborate on new hits.',
          image: 'https://via.placeholder.com/150',
          nextEvent: 'Songwriting Workshop - March 22, 2025',
          isJoined: true,
          isPremium: true,
          resources: ['Songwriting 101', 'Lyric Writing Tips'],
          moderators: ['Sophie Bennett', 'Emma Stone'],
          rules: ['Share original work', 'Provide constructive feedback'],
          memberList: ['Sophie Bennett', 'Emma Stone', 'Liam Parker'],
          discussionTopics: ['Melody Creation', 'Hook Writing'],
          featuredArtists: ['Sophie Bennett', 'Liam Parker'],
          collaborationOpportunities: ['Songwriting Duo', 'Vocal Collaboration'],
          liveStreams: ['Songwriting Session - March 22, 2025'],
          workshops: ['Lyric Craft - March 25, 2025'],
          challenges: ['Write a Chorus in 24 Hours'],
        },
        {
          id: 3,
          name: 'Hip Hop Collective',
          genre: 'Hip Hop',
          members: 2000,
          description: 'A vibrant community for hip hop artists to connect and create.',
          image: 'https://via.placeholder.com/150',
          nextEvent: 'Freestyle Battle - March 25, 2025',
          isJoined: false,
          isPremium: false,
          resources: ['Beat Making Guide', 'Freestyle Techniques'],
          moderators: ['Ryan Carter', 'Jay Brown'],
          rules: ['Respect all artists', 'No hate speech'],
          memberList: ['Ryan Carter', 'Jay Brown', 'Mia Jones'],
          discussionTopics: ['Lyric Flow', 'Beat Production'],
          featuredArtists: ['Ryan Carter', 'Mia Jones'],
          collaborationOpportunities: ['Hip Hop Cypher', 'Track Feature'],
          liveStreams: ['Freestyle Night - March 25, 2025'],
          workshops: ['Beat Making 101 - March 28, 2025'],
          challenges: ['Freestyle Friday'],
        },
      ],

      // Add genres for filtering
    genres: ['Electronic', 'Pop', 'Hip Hop', 'Rock', 'Jazz', 'Classical'],

    showMessages: false,
    showProfileMenu: false,
    hasNewMessage: true, // New property to track if there are new messages
    showNewMessagePane: false,

    friendsAndFans: [
      { id: 1, name: 'Alex', handle: '@alexmusic', avatar: 'https://public.readdy.ai/ai/img_res/sample1.jpg' },
      { id: 2, name: 'Sara', handle: '@sarasinger', avatar: 'https://public.readdy.ai/ai/img_res/sample2.jpg' },
      { id: 3, name: 'Mike', handle: '@mikeguitar', avatar: 'https://public.readdy.ai/ai/img_res/sample3.jpg' },
    ],
    messages: [],
  }),

  actions: {
    toggleDarkMode(state?: boolean) {
        this.isDarkMode = state !== undefined ? state : !this.isDarkMode;
        document.documentElement.classList.toggle('dark', this.isDarkMode);
      },
    setCurrentView(view: string) {
      this.currentView = view;
    },
    toggleProfileMenu() {
      this.showProfileMenu = !this.showProfileMenu;
    },
    toggleMessages() {
      this.showMessages = !this.showMessages;
      if (this.showProfileMenu) this.showProfileMenu = false;
    },
    openChatDialog(message: any) {
      this.showMessages = false;
      console.log('Opening chat with:', message.senderName);
    },
    viewAllMessages() {
      this.showMessages = false;
      console.log('Viewing all messages');
    },
    handleProfileAction(action: string) {
        this.showProfileMenu = false;
        switch (action) {
          case 'viewProfile':
            this.currentView = 'profile'; // This can be used for UI state
            router.push('/profile'); // Navigate to the profile route
            break;
          default:
            break;
        }
      },
    toggleComments(postId: number) {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        post.showComments = !post.showComments;
      }
    },
    toggleLike(postId: number) {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        post.isLiked = !post.isLiked;
        const currentLikes = typeof post.stats.likes === 'string' ? parseInt(post.stats.likes.replace(/,/g, '')) : post.stats.likes;
        const updatedLikes = post.isLiked ? currentLikes + 1 : currentLikes - 1;
        post.stats.likes = updatedLikes.toLocaleString();
      }
    },
    addComment(postId: number, commentContent: string) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
          const newComment = {
            id: post.comments.length + 1,
            userName: 'Current User', // Replace with authenticated user data
            userImage: this.userProfileImage,
            content: commentContent,
            time: 'Just now',
          };
          // Replace the comments array with a new array including the new comment
          post.comments = [...post.comments, newComment];
          post.stats.replies += 1;
        }
      },

      // Add actions for communities
    toggleJoinCommunity(communityId: number) {
        const community = this.communities.find((c) => c.id === communityId);
        if (community) {
          community.isJoined = !community.isJoined;
          community.members += community.isJoined ? 1 : -1;
        }
      },
      createCommunity(community: { name: string; genre: string; description: string }) {
        const newId = this.communities.length + 1;
        this.communities.push({
          id: newId,
          name: community.name,
          genre: community.genre,
          members: 1,
          description: community.description,
          image: 'https://via.placeholder.com/150',
          nextEvent: 'No events scheduled',
          isJoined: true,
          isPremium: false,
          resources: [],
          moderators: [],
          rules: [],
          memberList: [],
          discussionTopics: [],
          featuredArtists: [],
          collaborationOpportunities: [],
          liveStreams: [],
          workshops: [],
          challenges: [],
        });
      },

    toggleNewMessagePane() {
      this.showNewMessagePane = !this.showNewMessagePane;
    },
  
    createNewMessage(content: string, recipient?: { name: string; handle: string; avatar?: string }) {
      const newMessage = {
        id: this.messages.length + 1,
        name: recipient ? recipient.name : 'New Message',
        handle: recipient ? recipient.handle : '@unknown',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        content,
        avatar: recipient ? recipient.avatar : 'https://public.readdy.ai/ai/img_res/default.jpg',
        verified: false,
      };
      this.messages.unshift(newMessage);
    },
  
}});
