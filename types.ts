export enum Role {
  Local = 'Local',
  Traveler = 'Traveler',
  Newcomer = 'Newcomer',
  Nomad = 'Nomad',
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export interface VibeTag {
  id: string;
  name: string;
  emoji: string;
  color: {
    bg: string;
    text: string;
  };
}

export enum VisibilityFilter {
    Everyone = 'Everyone',
    LocalsAndNewcomers = 'Locals & Newcomers',
    NoOne = 'No One',
}

export enum PresenceStatus {
  Available = 'Available',
  Curious = 'Curious',
  Busy = 'Busy',
  Hosting = 'Hosting',
}

export interface JoynPayDetails {
  isPaid: boolean;
  price: number;
  currency: 'USD' | 'joyncoin';
}

export interface UserDropIn {
    presence?: PresenceStatus;
    title?: string;
    expiresAt: Date;
    radius: number; // in miles
    duration: number; // in hours
    vibeTagIds?: string[];
    joynPay?: JoynPayDetails;
}

export interface Review {
  id: string;
  authorId: string;
  rating: number; // 1-5
  text: string;
  timestamp: Date;
}

export interface User {
  id: string;
  alias: string;
  avatarUrl: string;
  role: Role;
  bio?: string;
  interests: string[];
  personaId?: string;
  isGhostMode?: boolean;
  limitLocationAccuracy?: boolean;
  visibilityRadius?: number;
  visibilityFilter?: VisibilityFilter;
  pin?: UserDropIn;
  location?: { lat: number; lng: number };
  isInstantMeet?: boolean;
  isOnline?: boolean;
  isVerified?: boolean;
  language: 'en' | 'es';
  hasCompletedOnboarding: boolean;
  // Gamification
  joynLevel: number;
  joynProgress: number; // 0-100
  joynStreak: number;
  badges: string[]; // array of badge IDs
  savedCircleIds?: string[];
  pastJoyns?: { title: string; type: 'hosted' | 'attended' }[];
  // JoynPay
  joynCoins: number;
  isJoynPayActive: boolean;
  reviews: Review[];
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'tip' | 'payout' | 'earn';
  amount: number;
  currency: 'USD' | 'joyncoin';
  description: string;
  timestamp: Date;
}

export interface LiveReply {
  id: string;
  authorId: string;
  text: string;
  timestamp: Date;
}

export interface JoynLiveUpdate {
  id: string;
  authorId: string;
  location: { lat: number; lng: number };
  locationName: string;
  content: string;
  imageUrl?: string;
  timestamp: Date;
  expiresAt: Date;
  replies: LiveReply[];
  originalLanguage?: 'en' | 'es';
  translatedText?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id:string;
  participant: User;
  messages: ChatMessage[];
  expiresAt: Date;
  locationName?: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
}

export interface TrendingLocation {
  id: string;
  name: string;
  imageUrl: string;
  vibes: string[];
  activeUsers: number;
  location: { lat: number; lng: number };
}

export interface ConnectionLogEntry {
  id: string;
  type: 'Joyn' | 'Joyn Note' | 'Wave' | 'JoynLive';
  title: string;
  description: string;
  timestamp: Date;
  note?: string;
}

export interface DropInCircle {
  id: string;
  name: string;
  hostId: string;
  userIds: string[];
  attendeeIds: string[]; // Track who attended for reviews
  description: string;
  sharedInterests: string[];
  location: { lat: number; lng: number };
  startTime: Date;
  vibeTagIds?: string[];
  isHot?: boolean;
  messages: ChatMessage[];
  joynPay?: JoynPayDetails;
  coverImageUrl?: string;
}

export interface GooglePlace {
  id: string;
  displayName: string;
  location?: { lat: number; lng: number };
  rating?: number;
  types?: string[];
  photos?: { uri: string }[];
  formattedAddress?: string;
  userRatingCount?: number;
}

export type DropInPrefill = {
  locationName: string;
};

export type View =
  | 'map' | 'discovery' | 'inbox' | 'profile' | 'drop-in'
  | 'group-activity' | 'circle-chat' | 'messaging' | 'connection-log'
  | 'joynpay-setup' | 'earnings' | 'wallet' | 'confirmation' | 'host-dashboard'
  // Onboarding views
  | 'signup' | 'create-profile' | 'select-persona' | 'location-permission';