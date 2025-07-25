

import React from 'react';
import { User, Role, JoynLiveUpdate, VisibilityFilter, TrendingLocation, DropInCircle, VibeTag, Conversation, ChatMessage, ConnectionLogEntry, Badge, PresenceStatus, Transaction, Review } from './types';
import { Icon } from './components/common/Icon';
import { CafeIcon, FoodIcon, ArtIcon, OutdoorsIcon, ShoppingIcon, BarIcon, AttractionIcon, DefaultPlaceIcon, CreatorIcon, ExplorerIcon, ConnectorIcon, HelperIcon, ShoutoutIcon, InviteIcon, MessageIcon } from './components/common/AppIcons';

export const PERSONAS = [
  { id: 'explorer', title: 'The Explorer', description: 'Curious and always on the move.', Icon: ExplorerIcon },
  { id: 'creator', title: 'The Creator', description: 'Finds inspiration everywhere.', Icon: CreatorIcon },
  { id: 'connector', title: 'The Connector', description: 'Loves meeting new people.', Icon: ConnectorIcon },
  { id: 'helper', title: 'The Helper', description: 'Ready to offer a hand.', Icon: HelperIcon },
];

export const MOCK_BADGES: Badge[] = [
    { id: 'first-joyn', name: 'First Joyn Sparked', description: 'You sparked your first Joyn!', emoji: '✨' },
    { id: 'first-wave', name: 'Wave Maker', description: 'You sent your first wave to someone.', emoji: '👋' },
    { id: 'wave-accepted', name: 'Connection!', description: 'Someone accepted your wave.', emoji: '🤝' },
    { id: 'group-joyn-hero', name: 'Group Joyn Hero', description: 'You joined your first group activity.', emoji: '🦸' },
    { id: 'explorer-badge', name: 'Explorer', description: 'Joined 5 group activities.', emoji: '🗺️' },
    { id: 'first-earning', name: 'Joyn Host', description: 'You earned your first JoynCoin!', emoji: '🪙' },
];

export const MOCK_CURRENT_USER_ID = 'user-0';

export const ROLE_COLORS: Record<Role, { bg: string; text: string; border: string; }> = {
  [Role.Local]: { bg: 'bg-sky-100 dark:bg-sky-900/50', text: 'text-sky-800 dark:text-sky-200', border: 'border-sky-400 dark:border-sky-600' },
  [Role.Traveler]: { bg: 'bg-purple-100 dark:bg-purple-900/50', text: 'text-purple-800 dark:text-purple-200', border: 'border-purple-400 dark:border-purple-600' },
  [Role.Newcomer]: { bg: 'bg-teal-100 dark:bg-teal-900/50', text: 'text-teal-800 dark:text-teal-200', border: 'border-teal-400 dark:border-teal-600' },
  [Role.Nomad]: { bg: 'bg-gray-100 dark:bg-gray-800/50', text: 'text-gray-800 dark:text-gray-300', border: 'border-gray-400 dark:border-gray-600' },
};

export const PRESENCE_OPTIONS = [
  { id: PresenceStatus.Available, title: "Available", description: "Open to new connections.", emoji: "👋" },
  { id: PresenceStatus.Curious, title: "Curious", description: "Exploring, might say hi.", emoji: "👀" },
  { id: PresenceStatus.Hosting, title: "Hosting", description: "Leading a vibe or activity.", emoji: "🎉" },
  { id: PresenceStatus.Busy, title: "Busy", description: "Focused, just sharing my spot.", emoji: "🎧" },
];


export const VIBE_TAGS: VibeTag[] = [
    { id: 'creative', name: 'Creative', emoji: '🎨', color: { bg: 'bg-purple-100 dark:bg-purple-900/50', text: 'text-purple-800 dark:text-purple-200' } },
    { id: 'chill', name: 'Chill', emoji: '☕', color: { bg: 'bg-stone-100 dark:bg-stone-800/50', text: 'text-stone-800 dark:text-stone-200' } },
    { id: 'solo', name: 'Solo Flow', emoji: '🎧', color: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-800 dark:text-blue-200' } },
    { id: 'active', name: 'Active', emoji: '🏃', color: { bg: 'bg-lime-100 dark:bg-lime-900/50', text: 'text-lime-800 dark:text-lime-200' } },
    { id: 'explore', name: 'Explore', emoji: '🗺️', color: { bg: 'bg-orange-100 dark:bg-orange-900/50', text: 'text-orange-800 dark:text-orange-200' } },
    { id: 'mindful', name: 'Mindful', emoji: '🧘', color: { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-800 dark:text-green-200' } },
    { id: 'social', name: 'Social', emoji: '🎉', color: { bg: 'bg-pink-100 dark:bg-pink-900/50', text: 'text-pink-800 dark:text-pink-200' } },
    { id: 'focused', name: 'Focused', emoji: '🧑‍💻', color: { bg: 'bg-gray-100 dark:bg-gray-800/50', text: 'text-gray-800 dark:text-gray-300' } },
    { id: 'shopping', name: 'Shopping', emoji: '🛍️', color: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-800 dark:text-blue-200' } },
    { id: 'foodie', name: 'Foodie', emoji: '🍔', color: { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-800 dark:text-red-200' } },
    { id: 'music', name: 'Music', emoji: '🎶', color: { bg: 'bg-yellow-100 dark:bg-yellow-900/50', text: 'text-yellow-800 dark:text-yellow-200' } },
];

export const MOCK_POPULAR_VIBES: { tagId: string, count: number }[] = [
    { tagId: 'social', count: 25 },
    { tagId: 'active', count: 18 },
    { tagId: 'foodie', count: 17 },
    { tagId: 'music', count: 16 },
    { tagId: 'chill', count: 15 },
    { tagId: 'explore', count: 12 },
    { tagId: 'creative', count: 9 },
];

export const INTEREST_TAG_SUGGESTIONS = [
  'Live Music', 'Startups', 'Book Clubs', 'AI', 'Film Photography', 'Indie Games',
  'Rock Climbing', 'Craft Beer', 'Solo Travel', 'Board Games', 'Volunteering', 'Salsa Dancing'
];

export const PLACE_TYPE_STYLES: Record<string, { icon: React.FC, color: string }> = {
  cafe: { icon: CafeIcon, color: 'bg-amber-400' },
  restaurant: { icon: FoodIcon, color: 'bg-pink-400' },
  bar: { icon: BarIcon, color: 'bg-red-400' },
  park: { icon: OutdoorsIcon, color: 'bg-green-400' },
  tourist_attraction: { icon: AttractionIcon, color: 'bg-sky-400' },
  art_gallery: { icon: ArtIcon, color: 'bg-cyan-400' },
  book_store: { icon: CreatorIcon, color: 'bg-purple-400' },
  museum: { icon: ArtIcon, color: 'bg-orange-400' },
  default: { icon: DefaultPlaceIcon, color: 'bg-gray-400' },
};

export const getPlaceStyle = (types?: string[]) => {
    if (!types) return PLACE_TYPE_STYLES.default;
    for (const type of types) {
        if (PLACE_TYPE_STYLES[type]) {
            return PLACE_TYPE_STYLES[type];
        }
    }
    return PLACE_TYPE_STYLES.default;
};

const JC_CENTER = { lat: 40.720, lng: -74.045 }; // Centered on Jersey City

// --- MOCK USER AND CIRCLE GENERATION ---

// Helper function to generate a random location within Jersey City bounds
const getRandomLocationInJC = () => {
  const bounds = {
    minLat: 40.70,
    maxLat: 40.76,
    minLng: -74.10,
    maxLng: -74.03,
  };
  return {
    lat: bounds.minLat + Math.random() * (bounds.maxLat - bounds.minLat),
    lng: bounds.minLng + Math.random() * (bounds.maxLng - bounds.minLng),
  };
};

const firstNames = ["Alex", "Jordan", "Taylor", "Casey", "Riley", "Jessie", "Morgan", "Skyler", "Cameron", "Drew"];
const lastInitials = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const allInterests = ["Coffee", "Dogs", "Hiking", "Yoga", "Live Music", "Tech", "Art", "Foodie", "Travel", "Running", "Books", "Movies", "Gaming", "Startups"];

// Function to generate 100 new mock users in Jersey City
const generateAdditionalUsers = (): User[] => {
  const users: User[] = [];
  for (let i = 0; i < 100; i++) {
    const hasPin = Math.random() > 0.6; // 40% of new users have an active pin
    users.push({
      id: `gen-user-${i}`,
      alias: `${firstNames[i % firstNames.length]}_${lastInitials[i % lastInitials.length]}${i}`,
      avatarUrl: `https://i.pravatar.cc/100?u=gen-user-${i}`,
      role: Object.values(Role)[i % 4],
      interests: [allInterests[i % allInterests.length], allInterests[(i + 3) % allInterests.length]],
      location: getRandomLocationInJC(),
      limitLocationAccuracy: Math.random() > 0.2, // 80% have accuracy limited
      isOnline: Math.random() > 0.3,
      isVerified: Math.random() > 0.8,
      isInstantMeet: Math.random() > 0.9,
      language: Math.random() > 0.8 ? 'es' : 'en', // ~20% are Spanish speakers
      hasCompletedOnboarding: true,
      joynLevel: Math.floor(Math.random() * 10) + 1,
      joynProgress: Math.floor(Math.random() * 100),
      joynStreak: Math.floor(Math.random() * 5),
      badges: [],
      joynCoins: Math.floor(Math.random() * 200),
      isJoynPayActive: Math.random() > 0.85, // ~15% are JoynPay active
      reviews: [],
      pin: hasPin ? {
        presence: Object.values(PresenceStatus)[i % 4],
        expiresAt: new Date(Date.now() + (Math.random() * 4 + 1) * 60 * 60 * 1000),
        radius: Math.random() * 2 + 0.5,
        duration: Math.random() * 4 + 1,
        vibeTagIds: [VIBE_TAGS[i % VIBE_TAGS.length].id]
      } : undefined,
    });
  }
  return users;
};

export const MOCK_REVIEWS: Review[] = [
    {
        id: 'review-1',
        authorId: 'user-2',
        rating: 5,
        text: 'Awesome yoga session! JC_Explorer is a great instructor, very clear and patient. The post-yoga refreshments were a lovely touch. Highly recommend!',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
        id: 'review-2',
        authorId: 'user-5',
        rating: 4,
        text: 'The photowalk was a lot of fun and I learned some new tricks for my film camera. Would have loved to explore a bit more of the area, but overall a great experience.',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
];

// --- BASE USERS ---
let MOCK_USERS_BASE: User[] = [
  {
    id: MOCK_CURRENT_USER_ID, alias: 'JC_Explorer', avatarUrl: 'https://i.pravatar.cc/100?u=jersey-city-user', role: Role.Local,
    bio: 'Discovering the best coffee spots and hidden gems in JC & NYC. Always down for a good conversation or a spontaneous adventure.',
    interests: ['Waterfront Runs', 'Food Trucks', 'NYC Views'],
    personaId: 'explorer',
    isGhostMode: false,
    limitLocationAccuracy: true,
    visibilityRadius: 2.5,
    visibilityFilter: VisibilityFilter.Everyone,
    location: { lat: JC_CENTER.lat, lng: JC_CENTER.lng },
    isInstantMeet: false,
    isOnline: true,
    isVerified: true,
    language: 'en',
    hasCompletedOnboarding: false,
    joynLevel: 5,
    joynProgress: 30,
    joynStreak: 3,
    badges: ['first-joyn', 'wave-accepted', 'group-joyn-hero'],
    savedCircleIds: ['circle-3'],
    pastJoyns: [
        { title: 'Morning Run by the Hudson', type: 'attended' },
        { title: 'Left an Echo at The High Line', type: 'hosted' },
    ],
    joynCoins: 250,
    isJoynPayActive: true, // Make current user JoynPay active
    reviews: MOCK_REVIEWS,
  },
  {
    id: 'user-1', alias: 'NYU_Grad', avatarUrl: 'https://i.pravatar.cc/100?u=nyu', role: Role.Newcomer,
    bio: 'Just moved to the city for a new gig in tech. Looking to meet creative people.',
    interests: ['Art Galleries', 'West Village', 'Indie Music'],
    personaId: 'creator',
    location: { lat: 40.7308, lng: -73.9973 }, // Greenwich Village, NYC
    limitLocationAccuracy: true,
    isInstantMeet: true,
    language: 'en',
    hasCompletedOnboarding: true,
    pin: {
        presence: PresenceStatus.Curious,
        title: 'Gallery Hopping in Chelsea',
        expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
        radius: 1,
        duration: 3,
        vibeTagIds: ['explore', 'creative'],
    },
    isOnline: true,
    isVerified: false,
    joynLevel: 2,
    joynProgress: 80,
    joynStreak: 0,
    badges: ['first-wave'],
    pastJoyns: [
        { title: 'Exploring The Met', type: 'attended' },
    ],
    joynCoins: 50,
    isJoynPayActive: false,
    reviews: [],
  },
  {
    id: 'user-2', alias: 'Finance_Bro', avatarUrl: 'https://i.pravatar.cc/100?u=finance', role: Role.Nomad,
    bio: 'Work hard, play hard. Usually grabbing drinks after work in FiDi.',
    interests: ['Finance', 'Steakhouses', 'Rooftop Bars'],
    personaId: 'connector',
    limitLocationAccuracy: true,
    isInstantMeet: false,
    language: 'en',
    hasCompletedOnboarding: true,
    location: { lat: 40.7075, lng: -74.0113 }, // Financial District, NYC
    pin: {
        presence: PresenceStatus.Busy,
        title: 'Working at a cafe',
        expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
        radius: 1.5,
        duration: 4,
        vibeTagIds: ['focused', 'social'],
      },
    isOnline: true,
    isVerified: true, // Make verified to host
    joynLevel: 8,
    joynProgress: 10,
    joynStreak: 12,
    badges: ['first-joyn', 'first-wave', 'wave-accepted', 'group-joyn-hero', 'explorer-badge'],
    joynCoins: 120,
    isJoynPayActive: true, // Make JoynPay active
    reviews: [],
  },
  {
    id: 'user-3', alias: 'Liberty_Chiller', avatarUrl: 'https://i.pravatar.cc/100?u=liberty', role: Role.Local,
    interests: ['Picnics', 'History', 'Biking'],
    bio: 'Big fan of Liberty State Park. I organize bootcamps and picnics here. Come say hi!',
    personaId: 'helper',
    limitLocationAccuracy: false,
    isInstantMeet: true,
    language: 'es',
    hasCompletedOnboarding: true,
    location: { lat: 40.7033, lng: -74.0539 }, // Liberty State Park, JC
    pin: {
        presence: PresenceStatus.Available,
        title: 'Chilling in the park',
        expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
        radius: 1,
        duration: 1,
        vibeTagIds: ['chill', 'outdoors'],
    },
    isOnline: true,
    isVerified: true,
    joynLevel: 1,
    joynProgress: 50,
    joynStreak: 1,
    badges: [],
    pastJoyns: [
        { title: 'Hosted a picnic', type: 'hosted' },
    ],
    joynCoins: 10,
    isJoynPayActive: true,
    reviews: [],
  },
  {
    id: 'user-4', alias: 'Heights_Homebody', avatarUrl: 'https://i.pravatar.cc/100?u=heights', role: Role.Local,
    interests: ['Community Gardens', 'Local Eats', 'Coffee Shops'],
    personaId: 'connector',
    limitLocationAccuracy: true,
    isInstantMeet: false,
    language: 'en',
    hasCompletedOnboarding: true,
    location: { lat: 40.7454, lng: -74.0510 }, // The Heights, JC
    isOnline: true,
    joynLevel: 3,
    joynProgress: 20,
    joynStreak: 2,
    badges: ['first-joyn'],
    joynCoins: 0,
    isJoynPayActive: false,
    reviews: [],
  },
  {
    id: 'user-5', alias: 'Broadway_Bound', avatarUrl: 'https://i.pravatar.cc/100?u=broadway', role: Role.Traveler,
    interests: ['Theater', 'Times Square', 'Pre-show Dinner'],
    bio: 'Professional theater critic and performer. In town for the season, hosting exclusive backstage tours and workshops.',
    personaId: 'creator',
    limitLocationAccuracy: true,
    isInstantMeet: false,
    language: 'en',
    hasCompletedOnboarding: true,
    location: { lat: 40.7580, lng: -73.9855 }, // Theater District, NYC
    pin: {
        presence: PresenceStatus.Hosting,
        title: 'Walking Tour of Broadway History',
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
        radius: 0.5,
        duration: 2,
        vibeTagIds: ['creative', 'social', 'explore'],
        joynPay: {
            isPaid: true,
            price: 15,
            currency: 'USD',
        }
      },
    isOnline: true,
    isVerified: true,
    joynLevel: 10,
    joynProgress: 90,
    joynStreak: 30,
    badges: ['first-wave', 'explorer-badge', 'first-earning'],
    joynCoins: 1500,
    isJoynPayActive: true,
    reviews: [],
  }
];

// --- COMBINED USERS ---
export const MOCK_USERS: User[] = [
  ...MOCK_USERS_BASE,
  ...generateAdditionalUsers(),
];


// --- TRANSACTIONS ---
export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 'txn-1', type: 'earn', amount: 50, currency: 'joyncoin', description: 'Welcome bonus!', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { id: 'txn-2', type: 'earn', amount: 100, currency: 'joyncoin', description: 'Joyn Streak - 3 Days', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { id: 'txn-3', type: 'payout', amount: 25.00, currency: 'USD', description: 'Weekly Payout', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    { id: 'txn-4', type: 'purchase', amount: -20, currency: 'joyncoin', description: 'Ticket: "Rooftop Drinks"', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) },
    { id: 'txn-5', type: 'earn', amount: 100, currency: 'joyncoin', description: 'Hosted "Live Music Jam"', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 'txn-6', type: 'tip', amount: 20, currency: 'joyncoin', description: 'Tip from JC_Explorer', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
];

// --- JOYNLIVE ---
export const MOCK_LIVE_UPDATES: JoynLiveUpdate[] = [
  {
    id: 'talk-1',
    authorId: 'user-1',
    location: { lat: 40.7178, lng: -74.0431 }, // Newark Ave, JC
    locationName: "Newark Ave Pedestrian Plaza",
    content: "The heart of JC! So many great restaurants and a super lively vibe, especially on weekend evenings. Anyone have a favorite spot here?",
    imageUrl: 'https://placehold.co/400x300/6772E5/ffffff?text=Plaza',
    timestamp: new Date(Date.now() - 2 * 3600000),
    expiresAt: new Date(Date.now() + 22 * 3600000),
    replies: [
      { id: 'reply-1-1', authorId: MOCK_CURRENT_USER_ID, text: "Totally agree! Razza has the best pizza.", timestamp: new Date(Date.now() - 1.5 * 3600000) },
      { id: 'reply-1-2', authorId: 'user-4', text: "Don't sleep on Skinner's Loft for brunch.", timestamp: new Date(Date.now() - 1 * 3600000) }
    ]
  },
  {
    id: 'talk-2',
    authorId: 'user-3',
    location: { lat: 40.7484, lng: -73.9857 }, // Empire State Building
    locationName: "Empire State Building",
    content: "Clásico lugar turístico? Quizás. Pero la vista desde arriba al atardecer es innegablemente épica. Vale la pena hacerlo una vez.",
    imageUrl: 'https://placehold.co/400x300/FF5C57/ffffff?text=View',
    timestamp: new Date(Date.now() - 18 * 3600000),
    expiresAt: new Date(Date.now() + 6 * 3600000),
    originalLanguage: 'es',
    replies: []
  },
  {
    id: 'talk-3',
    authorId: 'user-5',
    location: { lat: 40.7580, lng: -73.9855 },
    locationName: "Theater District",
    content: "Just saw the new show at the Majestic, absolutely stunning performance. Anyone else into theater?",
    timestamp: new Date(Date.now() - 5 * 3600000),
    expiresAt: new Date(Date.now() + 19 * 3600000),
    replies: [
      { id: 'reply-3-1', authorId: 'user-1', text: 'OMG I love theater! Which show was it?', timestamp: new Date(Date.now() - 4 * 3600000) }
    ]
  },
  {
    id: 'talk-4',
    authorId: MOCK_CURRENT_USER_ID,
    location: { lat: 40.7411, lng: -74.0018 }, // The High Line
    locationName: "The High Line",
    content: "Shoutout to the amazing street performer near the 14th St entrance! Your music made my day.",
    imageUrl: 'https://placehold.co/400x300/3CD6BE/ffffff?text=Music',
    timestamp: new Date(Date.now() - 10 * 3600000),
    expiresAt: new Date(Date.now() + 14 * 3600000),
    replies: []
  },
];


// --- TRENDING & CIRCLES ---
export const MOCK_TRENDING_LOCATIONS: TrendingLocation[] = [
    {
      id: 'trend-1',
      name: 'The High Line',
      imageUrl: 'https://placehold.co/400x200/5AC8FA/ffffff?text=High+Line',
      vibes: ['Social', 'Outdoors'],
      activeUsers: 35,
      location: { lat: 40.7479, lng: -74.0048 }
    },
    {
      id: 'trend-2',
      name: 'SoHo Shopping District',
      imageUrl: 'https://placehold.co/400x200/FFD94C/000000?text=SoHo',
      vibes: ['Shopping', 'Explore'],
      activeUsers: 28,
      location: { lat: 40.7223, lng: -73.9995 }
    },
    {
      id: 'trend-3',
      name: 'Smorgasburg Jersey City',
      imageUrl: 'https://placehold.co/400x200/FF5C57/ffffff?text=Food+Stalls',
      vibes: ['Foodie', 'Social'],
      activeUsers: 42,
      location: { lat: 40.7169, lng: -74.0336 }
    },
];

const MOCK_PAID_CIRCLES: DropInCircle[] = [
    {
        id: 'paid-circle-1',
        name: 'Yoga in Lincoln Park',
        coverImageUrl: 'https://placehold.co/600x300/3CD6BE/ffffff?text=Yoga+Session',
        hostId: 'user-0', // Current user
        userIds: ['user-0'],
        attendeeIds: [],
        description: 'Guided vinyasa flow session in the park. All levels welcome. Please bring your own mat. Fee covers instruction and post-yoga refreshments.',
        sharedInterests: ['Yoga', 'Mindfulness'],
        location: { lat: 40.718, lng: -74.077 },
        startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        vibeTagIds: ['mindful', 'active', 'chill'],
        isHot: false,
        messages: [],
        joynPay: { isPaid: true, price: 5, currency: 'USD' }
    },
    {
        id: 'paid-circle-2',
        name: 'Exclusive Rooftop DJ Set',
        coverImageUrl: 'https://placehold.co/600x300/7D4CDB/ffffff?text=DJ+Views',
        hostId: 'user-5',
        userIds: ['user-5'],
        attendeeIds: [],
        description: 'Private rooftop party with live deep house music, amazing NYC views, and complimentary drinks. Limited spots available.',
        sharedInterests: ['Music', 'Social'],
        location: { lat: 40.725, lng: -74.040 },
        startTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        vibeTagIds: ['social', 'music'],
        isHot: true,
        messages: [],
        joynPay: { isPaid: true, price: 20, currency: 'USD' }
    },
    {
        id: 'paid-circle-3',
        name: 'JC Heights Foodie Tour',
        coverImageUrl: 'https://placehold.co/600x300/FF5C57/ffffff?text=JC+Eats',
        hostId: 'user-2',
        userIds: ['user-2'],
        attendeeIds: [],
        description: 'A walking tour of the best hidden eats in The Heights. Price includes samples from 4 different locations. Come hungry!',
        sharedInterests: ['Food', 'Exploring'],
        location: { lat: 40.747, lng: -74.050 },
        startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        vibeTagIds: ['foodie', 'explore', 'social'],
        isHot: true,
        messages: [],
        joynPay: { isPaid: true, price: 25, currency: 'USD' }
    },
    {
        id: 'paid-circle-4',
        name: 'Learn Film Photography',
        coverImageUrl: 'https://placehold.co/600x300/6772E5/ffffff?text=Photo+Class',
        hostId: 'user-0',
        userIds: ['user-0'],
        attendeeIds: [],
        description: 'A 2-hour workshop covering the basics of 35mm film photography. We will do a photowalk around Paulus Hook. Film roll included.',
        sharedInterests: ['Photography', 'Art'],
        location: { lat: 40.715, lng: -74.035 },
        startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        vibeTagIds: ['creative', 'chill'],
        isHot: false,
        messages: [],
        joynPay: { isPaid: true, price: 30, currency: 'USD' }
    },
    {
        id: 'paid-circle-5',
        name: 'Waterfront Bootcamp',
        coverImageUrl: 'https://placehold.co/600x300/1f2937/ffffff?text=Fitness',
        hostId: 'user-3',
        userIds: ['user-3'],
        attendeeIds: [],
        description: 'High-intensity interval training with a view! Get ready to sweat. All fitness levels can be accommodated. Ticket gets you a spot and a protein shake.',
        sharedInterests: ['Fitness', 'Outdoors'],
        location: { lat: 40.728, lng: -74.032 },
        startTime: new Date(Date.now() + 1 * 10 * 60 * 60 * 1000),
        vibeTagIds: ['active'],
        isHot: true,
        messages: [],
        joynPay: { isPaid: true, price: 10, currency: 'USD' }
    },
     {
        id: 'paid-circle-6',
        name: 'Salsa Dancing Social',
        coverImageUrl: 'https://placehold.co/600x300/ef4444/ffffff?text=Salsa+Night',
        hostId: 'user-5',
        userIds: ['user-5'],
        attendeeIds: [],
        description: 'Beginner salsa lesson followed by a social dance party. No partner required! Great way to meet people and learn a new skill.',
        sharedInterests: ['Dancing', 'Social'],
        location: { lat: 40.720, lng: -74.045 },
        startTime: new Date(Date.now() + 2 * 20 * 60 * 60 * 1000),
        vibeTagIds: ['social', 'active', 'music'],
        isHot: true,
        messages: [],
        joynPay: { isPaid: true, price: 15, currency: 'USD' }
    },
    {
        id: 'paid-circle-7',
        name: 'Downtown JC History Walk',
        coverImageUrl: 'https://placehold.co/600x300/a8a29e/ffffff?text=History+Tour',
        hostId: 'user-2',
        userIds: ['user-2'],
        attendeeIds: [],
        description: 'A 90-minute guided walk through the historic downtown area, covering stories from the Revolutionary War to today. Fascinating stuff!',
        sharedInterests: ['History', 'Exploring'],
        location: { lat: 40.719, lng: -74.043 },
        startTime: new Date(Date.now() + 4 * 12 * 60 * 60 * 1000),
        vibeTagIds: ['explore', 'chill'],
        isHot: false,
        messages: [],
        joynPay: { isPaid: true, price: 15, currency: 'USD' }
    },
    {
        id: 'paid-circle-8',
        name: 'Board Game Cafe Takeover',
        coverImageUrl: 'https://placehold.co/600x300/f59e0b/ffffff?text=Board+Games',
        hostId: 'user-0',
        userIds: ['user-0'],
        attendeeIds: [],
        description: 'Let\'s take over a section of the local board game cafe. Your ticket covers entry and unlimited access to their game library for 3 hours.',
        sharedInterests: ['Games', 'Social'],
        location: { lat: 40.722, lng: -74.048 },
        startTime: new Date(Date.now() + 1 * 18 * 60 * 60 * 1000),
        vibeTagIds: ['social', 'chill'],
        isHot: true,
        messages: [],
        joynPay: { isPaid: true, price: 10, currency: 'USD' }
    },
    {
        id: 'paid-circle-9',
        name: 'Outdoor Movie Screening',
        coverImageUrl: 'https://placehold.co/600x300/8b5cf6/ffffff?text=Movie+Night',
        hostId: 'user-5',
        userIds: ['user-5'],
        attendeeIds: [],
        description: 'Screening a classic 80s movie in Van Vorst Park. Ticket includes popcorn and a reserved blanket spot. BYO drinks.',
        sharedInterests: ['Movies', 'Outdoors'],
        location: { lat: 40.717, lng: -74.047 },
        startTime: new Date(Date.now() + 3 * 20 * 60 * 60 * 1000),
        vibeTagIds: ['chill', 'social', 'creative'],
        isHot: true,
        messages: [],
        joynPay: { isPaid: true, price: 8, currency: 'USD' }
    },
    {
        id: 'paid-circle-10',
        name: 'Craft Cocktail Making Class',
        coverImageUrl: 'https://placehold.co/600x300/ec4899/ffffff?text=Cocktail+Class',
        hostId: 'user-2',
        userIds: ['user-2'],
        attendeeIds: [],
        description: 'Learn to make 3 classic cocktails from a professional mixologist. All ingredients and tools provided. You get to drink your creations!',
        sharedInterests: ['Cocktails', 'Social'],
        location: { lat: 40.7175, lng: -74.042 },
        startTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        vibeTagIds: ['social', 'creative', 'foodie'],
        isHot: false,
        messages: [],
        joynPay: { isPaid: true, price: 40, currency: 'USD' }
    }
];


export const MOCK_CIRCLES: DropInCircle[] = [
    {
        id: 'circle-1',
        name: 'Morning Run by the Hudson',
        coverImageUrl: 'https://placehold.co/600x300/22d3ee/000000?text=Running+Crew',
        hostId: 'user-3',
        userIds: ['user-3', 'user-0'],
        attendeeIds: ['user-3', 'user-0'],
        description: 'Catching the sunrise and NYC skyline views on a run. Meeting at the Newport waterfront.',
        sharedInterests: ['Running', 'Outdoors'],
        location: { lat: 40.7265, lng: -74.0345 },
        startTime: new Date(Date.now() + 45 * 60 * 1000), // starts in 45 mins
        vibeTagIds: ['active', 'chill', 'social'],
        isHot: true,
        messages: [
            { id: 'cm1', senderId: 'user-3', text: 'Perfect weather for a run! ☀️', timestamp: new Date(Date.now() - 15 * 60000), status: 'read' },
        ],
    },
    {
        id: 'circle-2',
        name: 'Exploring The Met',
        coverImageUrl: 'https://placehold.co/600x300/d1d5db/000000?text=Museum+Day',
        hostId: 'user-1',
        userIds: ['user-1', 'user-2', 'user-0'],
        attendeeIds: ['user-1', 'user-2', 'user-0'],
        description: 'Going to wander around the Metropolitan Museum of Art for a few hours. Let\'s meet by the main steps.',
        sharedInterests: ['Art', 'Museums'],
        location: { lat: 40.7794, lng: -73.9632 },
        startTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // starts in 3 hours
        vibeTagIds: ['explore', 'creative', 'chill'],
        isHot: false,
        messages: [
            { id: 'cm3', senderId: 'user-1', text: 'Who\'s ready for some art history?', timestamp: new Date(Date.now() - 10 * 60000), status: 'read' },
            { id: 'cm4', senderId: 'user-2', text: 'Me! I want to see the Egyptian wing.', timestamp: new Date(Date.now() - 5 * 60000), status: 'delivered' },
        ],
    },
    {
        id: 'circle-3',
        name: 'Happy Hour in the West Village',
        coverImageUrl: 'https://placehold.co/600x300/fca5a5/000000?text=Cocktails',
        hostId: 'user-5',
        userIds: ['user-5', 'user-0', 'user-1'],
        attendeeIds: ['user-5', 'user-0', 'user-1'],
        description: 'Grabbing some after-work drinks at a classic spot in the West Village. First round on me if you can beat me at trivia.',
        sharedInterests: ['Craft Cocktails', 'Social'],
        location: { lat: 40.7338, lng: -74.0031 },
        startTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // starts in 6 hours
        vibeTagIds: ['social', 'chill'],
        isHot: true,
        messages: [
            { id: 'cm5', senderId: 'user-5', text: 'Ready for some cocktails tonight!', timestamp: new Date(Date.now() - 20 * 60000), status: 'sent' },
        ],
    },
    ...MOCK_PAID_CIRCLES,
];

// --- CONVERSATIONS for WAVES ---
export const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: 'convo-1',
        participant: MOCK_USERS[1],
        messages: [
            { id: 'm1', senderId: MOCK_CURRENT_USER_ID, text: 'Hey! Your pin in the West Village is cool. Any favorite spots?', timestamp: new Date(Date.now() - 10 * 60000), status: 'read' },
            { id: 'm2', senderId: 'user-1', text: 'Totally! You have to check out Smalls for live jazz. It\'s incredible.', timestamp: new Date(Date.now() - 8 * 60000), status: 'read' },
        ],
        expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000), // 22 hours left
        status: 'accepted',
        locationName: 'West Village'
    },
    {
        id: 'convo-2',
        participant: MOCK_USERS[2],
        messages: [
             { id: 'm3', senderId: MOCK_CURRENT_USER_ID, text: 'Waved at you! 👋 Saw you\'re into finance, coffee on me if you can explain crypto.', timestamp: new Date(Date.now() - 2 * 60000), status: 'delivered' },
        ],
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours left
        status: 'pending',
        locationName: 'Financial District'
    }
];

// --- CONNECTION LOG ---
export const MOCK_CONNECTION_LOG: ConnectionLogEntry[] = [
    {
        id: 'log-1',
        type: 'Wave',
        title: 'Waved at NYU_Grad',
        description: 'Near West Village, NYC',
        timestamp: new Date(Date.now() - 10 * 60000),
    },
    {
        id: 'log-2',
        type: 'Joyn',
        title: 'Joyned Morning Run by the Hudson',
        description: 'Vibes: Active, Chill, Social',
        timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000),
        note: 'Met a developer from Google. Fun chat.'
    },
    {
        id: 'log-3',
        type: 'Joyn Note',
        title: 'Chat with Finance_Bro',
        description: 'About the stock market',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
        id: 'log-4',
        type: 'JoynLive',
        title: 'Posted a JoynLive at The High Line',
        description: '"Shoutout to the amazing street performer..."',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    }
];

// --- UTILITY FUNCTIONS ---

/**
 * Calculates the distance between two geographical coordinates using the Haversine formula.
 * @param lat1 Latitude of the first point.
 * @param lon1 Longitude of the first point.
 * @param lat2 Latitude of the second point.
 * @param lon2 Longitude of the second point.
 * @returns The distance in miles.
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 3959; // Radius of the Earth in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

/**
 * Obfuscates a user's location by returning a random point within a specified radius.
 * @param location The original lat/lng coordinates.
 * @param radiusInMiles The radius within which to generate a new point.
 * @returns A new, randomized { lat, lng } object.
 */
export const obfuscateLocation = (
  location: { lat: number; lng: number },
  radiusInMiles: number
): { lat: number; lng: number } => {
  const { lat, lng } = location;

  // Convert radius from miles to degrees
  const radiusInDegrees = radiusInMiles / 69;

  // Generate a random angle and distance
  const u = Math.random();
  const v = Math.random();
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  // Adjust for Earth's curvature
  const new_x = x / Math.cos(lat * (Math.PI / 180));

  const newLat = lat + y;
  const newLng = lng + new_x;

  return { lat: newLat, lng: newLng };
};

/**
 * Estimates travel time based on distance in a dense urban environment.
 * @param distanceInMiles The distance in miles.
 * @returns A string representing the estimated travel time (e.g., "~15 min", "~1h 5m").
 */
export const estimateTravelTime = (distanceInMiles: number): string => {
  // Using a mixed-mode travel time estimation (walking/transit/light traffic).
  // Assume ~15 minutes per mile average in a dense city like NYC/JC.
  const timeInMinutes = Math.round(distanceInMiles * 15);

  if (timeInMinutes < 2) {
    return "~1-2 min";
  }
  if (timeInMinutes < 60) {
    return `~${timeInMinutes} min`;
  }

  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;

  if (minutes === 0) {
    return `~${hours}h`;
  }
  
  return `~${hours}h ${minutes}m`;
};
