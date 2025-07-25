

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User, JoynLiveUpdate, Role, VisibilityFilter, TrendingLocation, DropInCircle as DropInCircleType, UserDropIn, VibeTag, Conversation, ChatMessage, ConnectionLogEntry, View, Badge, GooglePlace, DropInPrefill, Transaction, JoynPayDetails, LiveReply, Review } from './types';
import { MOCK_USERS, MOCK_LIVE_UPDATES, MOCK_CURRENT_USER_ID, MOCK_CIRCLES, MOCK_TRENDING_LOCATIONS, VIBE_TAGS, MOCK_CONVERSATIONS, MOCK_CONNECTION_LOG, MOCK_BADGES, MOCK_TRANSACTIONS } from './constants';
import { fetchNearbyPlaces } from './services/placesService';
import { MapScreen } from './components/MapScreen';
import ProfileScreen from './components/ProfileScreen';
import DropInModal from './components/DropInModal';
import DropInFlow from './components/DropInFlow';
import NotificationBanner from './components/NotificationBanner';
import ExploreScreen from './components/ExploreScreen';
import { GroupJoynActivityScreen } from './components/GroupJoynActivityScreen';
import CircleChatScreen from './components/CircleChatScreen';
import { InboxScreen } from './components/InboxScreen';
import MessagingScreen from './components/MessagingScreen';
import ConnectionLogScreen from './components/ConnectionLogScreen';
import BottomNavBar from './components/BottomNavBar';
import ActiveDropInBar from './components/ActiveDropInBar';
import Confetti from './components/Confetti';
import PlaceDetailModal from './components/PlaceDetailModal';
import JoynPaySetupScreen from './components/joynpay/JoynPaySetupScreen';
import EarningsDashboard from './components/joynpay/EarningsDashboard';
import JoynCoinWallet from './components/joynpay/JoynCoinWallet';
import PaymentModal from './components/joynpay/PaymentModal';
import ConfirmationScreen from './components/joynpay/ConfirmationScreen';
import JoynLiveModal from './components/JoynLiveModal';
import HostDashboard from './components/HostDashboard';
import WelcomeScreen from './components/onboarding/WelcomeScreen';
import SignUpScreen from './components/onboarding/SignUpScreen';
import CreateProfileScreen from './components/onboarding/CreateProfileScreen';
import PersonaSelectionScreen from './components/onboarding/PersonaSelectionScreen';
import LocationPermissionScreen from './components/onboarding/LocationPermissionScreen';
import TutorialGuide, { TutorialUserPinPlaceholder } from './components/tutorial/TutorialGuide';
import TransitionScreen from './components/onboarding/TransitionScreen';


type NotificationType = 'success' | 'info' | 'error';
type ActiveChat = { type: 'circle' | 'wave'; id: string };
type Theme = 'light' | 'dark';

export interface MapFilters {
    vibe: string | null;
}

type ModalContent = 
    | { type: 'user', data: User }
    | { type: 'place', data: GooglePlace }
    | { type: 'liveUpdate', data: JoynLiveUpdate }
    | { type: 'payment', data: User | DropInCircleType };

export const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [liveUpdates, setLiveUpdates] = useState<JoynLiveUpdate[]>([]);
    const [circles, setCircles] = useState<DropInCircleType[]>([]);
    const [places, setPlaces] = useState<GooglePlace[]>([]);
    const [trendingLocations, setTrendingLocations] = useState<TrendingLocation[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [connectionLog, setConnectionLog] = useState<ConnectionLogEntry[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [view, setView] = useState<View>('map');
    
    // Centralized modal state
    const [activeModal, setActiveModal] = useState<ModalContent | null>(null);
    
    const [dropInPrefill, setDropInPrefill] = useState<DropInPrefill | null>(null);
    
    const [notification, setNotification] = useState<{id: number, message: string, type: NotificationType} | null>(null);

    // Filter state
    const [filters, setFilters] = useState<MapFilters>({ vibe: null });
    
    // Gamification & UX
    const [showConfetti, setShowConfetti] = useState(false);
    const [newlyAwardedBadge, setNewlyAwardedBadge] = useState<Badge | null>(null);
    const [confirmedPaymentInfo, setConfirmedPaymentInfo] = useState<{item: User | DropInCircleType, tipAmount: number, quantity: number} | null>(null);
    const [paymentRequest, setPaymentRequest] = useState<User | DropInCircleType | null>(null);
    const [isPaymentTransitioning, setIsPaymentTransitioning] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);
    
    // Messaging & Groups
    const [joinedCircleIds, setJoinedCircleIds] = useState<string[]>(['circle-2']); // Pre-join one for demo
    const [activeChat, setActiveChat] = useState<ActiveChat | null>(null);
    
    // Explore page data
    const [allVibeTags, setAllVibeTags] = useState<VibeTag[]>([]);

    // Theme state
    const [theme, setTheme] = useState<Theme>('light');
    
    // UI State
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);
    const [isTransitioningToMap, setIsTransitioningToMap] = useState(false);
    const [isFadingOutTransition, setIsFadingOutTransition] = useState(false);
    const transitionStartTimeRef = useRef<number | null>(null);

    // Load initial data and theme
    useEffect(() => {
        setUsers(MOCK_USERS);
        setLiveUpdates(MOCK_LIVE_UPDATES);
        setCircles(MOCK_CIRCLES);
        setTrendingLocations(MOCK_TRENDING_LOCATIONS);
        setAllVibeTags(VIBE_TAGS);
        setConversations(MOCK_CONVERSATIONS);
        setConnectionLog(MOCK_CONNECTION_LOG);
        setTransactions(MOCK_TRANSACTIONS);

        const user = MOCK_USERS.find(u => u.id === MOCK_CURRENT_USER_ID);
        if (user) {
            setCurrentUser(user);
        }
        
        // Set initial theme from localStorage
        const savedTheme = localStorage.getItem('joyn-theme') as Theme;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (prefersDark) {
            setTheme('dark');
        }

    }, []);
    
    // Effect to simulate new live updates
    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomUser = MOCK_USERS[Math.floor(Math.random() * 5)];
            const newUpdate: JoynLiveUpdate = {
                id: `live-${Date.now()}`,
                authorId: randomUser.id,
                location: { lat: 40.725 + (Math.random() - 0.5) * 0.01, lng: -74.045 + (Math.random() - 0.5) * 0.01 },
                locationName: "Downtown JC",
                content: `A new random thought just appeared! The time is ${new Date().toLocaleTimeString()}. What's everyone up to?`,
                timestamp: new Date(),
                expiresAt: new Date(Date.now() + 24 * 3600000),
                replies: [],
            };
            setLiveUpdates(prev => [newUpdate, ...prev]);
        }, 15000); // Add a new update every 15 seconds

        return () => clearInterval(intervalId);
    }, []);

    // Effect for online/offline listeners
    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    
    // Apply theme class to HTML element
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('joyn-theme', theme);
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    // Effect to open the payment modal when a request is made.
    useEffect(() => {
        if (paymentRequest) {
            setActiveModal({ type: 'payment', data: paymentRequest });
            setPaymentRequest(null); // Reset the request after opening the modal
        }
    }, [paymentRequest]);

    const findUserById = useCallback((id: string) => users.find(u => u.id === id), [users]);
    
    const showNotification = (message: string, type: NotificationType = 'info') => {
        setNotification({ id: Date.now(), message, type });
    }
    
    const awardBadge = (badgeId: string) => {
      if (!currentUser || currentUser.badges.includes(badgeId)) return;

      const badge = MOCK_BADGES.find(b => b.id === badgeId);
      if (badge) {
          setNewlyAwardedBadge(badge);
      }
    };

    const handleInteractionHaptic = useCallback(() => {
        if (navigator.vibrate) {
            navigator.vibrate(5); // A short, subtle vibration for mobile feedback
        }
    }, []);
    
    // --- ONBOARDING HANDLERS ---
    const handleLogin = (isGuest = false) => {
        // Mock login: find the predefined user and set as current
        const user = MOCK_USERS.find(u => u.id === MOCK_CURRENT_USER_ID);
        if (user) {
            setCurrentUser(user);
            setIsAuthenticated(true);
            if (user.hasCompletedOnboarding) {
                setView('map');
            } else {
                setView('create-profile'); // Start of profile creation part of flow
            }
        }
    };

    const handleSignUp = () => {
        // In a real app, this would involve API calls. Here, we mock it.
        setIsAuthenticated(true);
        setView('create-profile');
    };

    const handleProfileCreation = (alias: string, avatarUrl: string) => {
        setCurrentUser(prev => prev ? { ...prev, alias, avatarUrl } : null);
        setView('select-persona');
    };

    const handlePersonaSelection = (personaId: string) => {
        setCurrentUser(prev => prev ? { ...prev, personaId } : null);
        setView('location-permission');
    };

    const handleLocationPermission = () => {
        const updatedUser = { ...currentUser!, hasCompletedOnboarding: true };
        setCurrentUser(updatedUser);
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        
        // Record when the transition starts
        transitionStartTimeRef.current = Date.now();
        
        // Set the view to map so the MapScreen starts loading...
        setView('map');
        // ...and start the animated transition to the map.
        setIsTransitioningToMap(true);
    };

    // --- REGULAR APP HANDLERS ---
    
    const handleSaveProfile = (updatedUser: User) => {
        setCurrentUser(updatedUser);
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        showNotification("Settings saved!", 'success');
    };
    
    const handleConfirmDropIn = (data: Omit<UserDropIn, 'expiresAt'>, joynPay?: JoynPayDetails) => {
        if (!currentUser) return;
        const newPin: UserDropIn = {
            ...data,
            expiresAt: new Date(Date.now() + data.duration * 60 * 60 * 1000),
            joynPay: joynPay?.isPaid ? joynPay : undefined,
        };
        const updatedUser = { ...currentUser, pin: newPin, isGhostMode: false }; // Always become visible on drop-in
        if (!updatedUser.badges.includes('first-joyn')) {
            updatedUser.badges.push('first-joyn');
            awardBadge('first-joyn');
        }
         if (joynPay?.isPaid && !updatedUser.badges.includes('first-earning')) {
            updatedUser.badges.push('first-earning');
            awardBadge('first-earning');
        }
        setCurrentUser(updatedUser);
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        setView('map');
        setDropInPrefill(null); // Clear prefill after use
        showNotification(joynPay?.isPaid ? "Your paid Joyn is live!" : "You've Joyned! You are now visible.", 'success');
    };
    
    const handleEndJoyn = () => {
      if (!currentUser) return;
      const updatedUser = { ...currentUser, pin: undefined };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      showNotification("Your Joyn has ended.", 'info');
    };

    const handleNavigate = (newView: View) => {
        handleCloseModals();
        setView(newView);
    };

    const handleNavigateWithHaptic = (newView: View) => {
        handleInteractionHaptic();
        handleNavigate(newView);
    };

    const handleUserClick = (user: User) => {
        setActiveModal({ type: 'user', data: user });
        setIsBottomNavVisible(false);
    };
    const handlePlaceClick = (place: GooglePlace) => {
        setActiveModal({ type: 'place', data: place });
        setIsBottomNavVisible(false);
    };
    const handleLiveUpdateClick = (liveUpdate: JoynLiveUpdate) => {
        setActiveModal({ type: 'liveUpdate', data: liveUpdate });
        setIsBottomNavVisible(false);
    };
    const handleCloseModals = () => {
        setActiveModal(null);
        if (isPaymentTransitioning) {
            setIsPaymentTransitioning(false);
        }
        setIsBottomNavVisible(true);
    };
    
    const handleMapInteraction = () => {
      if (activeModal && (activeModal.type === 'user' || activeModal.type === 'place' || activeModal.type === 'liveUpdate')) {
          handleCloseModals();
      }
    };

    const handleCircleClick = (circle: DropInCircleType) => {
        setActiveModal(null);
        setActiveChat({ type: 'circle', id: circle.id });
        setView('group-activity');
    };
    
    const handleEndCircle = (circleId: string) => {
        setCircles(prev => prev.filter(c => c.id !== circleId));
        showNotification("Your event has been ended.", 'success');
        setView('discovery');
    };

    const handleToggleSaveCircle = (circleId: string) => {
        if (!currentUser) return;
        
        const currentSavedIds = currentUser.savedCircleIds || [];
        const isSaved = currentSavedIds.includes(circleId);
        
        const newSavedIds = isSaved
            ? currentSavedIds.filter(id => id !== circleId)
            : [...currentSavedIds, circleId];
            
        const updatedUser = { ...currentUser, savedCircleIds: newSavedIds };
        setCurrentUser(updatedUser);
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));

        showNotification(isSaved ? "Activity unsaved." : "Activity saved!", 'success');
    };
    
    const handleWaveRequest = (user: User) => {
        if (!currentUser) return;
    
        const existingConvo = conversations.find(c => c.participant.id === user.id);
        if (existingConvo) {
            showNotification(`You already have a wave with ${user.alias}.`, 'info');
            setActiveChat({type: 'wave', id: existingConvo.id});
            setView('messaging');
            return;
        }
        
        const newConversation: Conversation = {
            id: `convo-${Date.now()}`,
            participant: user,
            messages: [{ id: `msg-${Date.now()}`, senderId: MOCK_CURRENT_USER_ID, text: 'Waved at you! 👋', timestamp: new Date() }],
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            status: 'pending',
        };
        setConversations(prev => [newConversation, ...prev]);

        const newCurrentUser = {...currentUser};
        if (!newCurrentUser.badges.includes('first-wave')) {
            newCurrentUser.badges.push('first-wave');
            awardBadge('first-wave');
        }
        setCurrentUser(newCurrentUser);
        setUsers(prev => prev.map(u => u.id === newCurrentUser.id ? newCurrentUser : u));

        setActiveModal(null); 
        showNotification(`Wave sent to ${user.alias}! You can check its status in your Waves inbox.`, 'info');
    };

    const handleInitiatePayment = (item: User | DropInCircleType) => {
        setIsPaymentTransitioning(true);
        setTimeout(() => {
            setPaymentRequest(item);
        }, 50);
    };

    const handlePaymentSuccess = (item: User | DropInCircleType, details: JoynPayDetails, tipAmount: number, quantity: number) => {
        if (!currentUser) return;
    
        const isUserItem = 'alias' in item;
        const updatedUser = { ...currentUser };
        const newTransactions: Transaction[] = [];
    
        const purchaseTransaction: Transaction = {
            id: `txn-purchase-${Date.now()}`,
            type: 'purchase',
            amount: -details.price,
            currency: details.currency,
            description: `Ticket: "${isUserItem ? item.pin?.title || 'Personal Joyn' : item.name}"`,
            timestamp: new Date(),
        };
        if (details.currency === 'joyncoin') updatedUser.joynCoins -= details.price;
        newTransactions.push(purchaseTransaction);
    
        if (tipAmount > 0) {
            const tipTransaction: Transaction = {
                id: `txn-tip-${Date.now()}`,
                type: 'tip',
                amount: -tipAmount,
                currency: details.currency,
                description: `Tip for: "${isUserItem ? item.alias : users.find(u => u.id === item.hostId)?.alias}"`,
                timestamp: new Date(),
            };
            newTransactions.push(tipTransaction);
            if (details.currency === 'joyncoin') updatedUser.joynCoins -= tipAmount;
        }
    
        let newBadgeId: string | null = null;
        if (isUserItem) {
            if (!updatedUser.badges.includes('first-wave')) {
                updatedUser.badges.push('first-wave');
                newBadgeId = 'first-wave';
            }
        } else {
            if (!joinedCircleIds.includes(item.id)) {
                setJoinedCircleIds(prev => [...prev, item.id]);
                if (!updatedUser.badges.includes('group-joyn-hero')) {
                    updatedUser.badges.push('group-joyn-hero');
                    newBadgeId = 'group-joyn-hero';
                }
            }
        }
    
        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
        setTransactions(prev => [...newTransactions, ...prev]);
        
        setIsPaymentTransitioning(false); 
    
        if (newBadgeId) {
            awardBadge(newBadgeId);
        } else {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
    
        setActiveModal(null);
        setConfirmedPaymentInfo({ item, tipAmount, quantity });
        setView('confirmation');
    };
    
    const handleSendMessage = (chatId: string, text: string, type: 'circle' | 'wave') => {
      if (!currentUser) return;
      const newMessage: ChatMessage = { id: `msg-${Date.now()}`, senderId: currentUser.id, text, timestamp: new Date(), status: 'sent' };
      if (type === 'circle') {
        setCircles(prev => prev.map(c => c.id === chatId ? { ...c, messages: [...c.messages, newMessage] } : c));
      } else {
        setConversations(prev => prev.map(c => c.id === chatId ? { ...c, messages: [...c.messages, newMessage] } : c));
      }
    };

    const handleDeleteConversation = (conversationId: string) => {
        setConversations(prev => prev.filter(c => c.id !== conversationId));
        showNotification("Conversation deleted.", 'info');
    };
    
    const handleGhostModeToggle = () => {
        if (!currentUser) return;
        const isNowGhost = !currentUser.isGhostMode;
        const updatedUser = { ...currentUser, isGhostMode: isNowGhost };
        setCurrentUser(updatedUser);
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        showNotification(isNowGhost ? 'Stealth Mode Activated' : 'Stealth Mode Deactivated', 'info');
    };

    const handleInstantMeetToggle = () => {
        if (!currentUser) return;
        const updatedUser = { ...currentUser, isInstantMeet: !currentUser.isInstantMeet };
        setCurrentUser(updatedUser);
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        showNotification(`Instant Meet ${updatedUser.isInstantMeet ? 'enabled' : 'disabled'}.`, 'info');
    };
    
    const handleInviteFriends = () => {
        showNotification("🌍 Joyning is better with friends. Invite your crew and build your city circle.", 'info');
    };
    
    const handleMapReady = (position: {lat: number, lng: number}) => {
        fetchNearbyPlaces(position)
            .then(setPlaces)
            .catch(error => console.error("Failed to fetch nearby places:", error));
    
        // This logic is only for the transition from onboarding.
        if (isTransitioningToMap) {
            const tutorialCompleted = localStorage.getItem('joyn-tutorial-completed') === 'true';
            
            // Ensure the transition screen is visible for a minimum amount of time.
            const minDisplayTime = 3000; // 3 seconds
            const transitionStartedAt = transitionStartTimeRef.current || Date.now();
            const elapsedTime = Date.now() - transitionStartedAt;
            const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
    
            setTimeout(() => {
                setIsFadingOutTransition(true);
                // After the fade out animation (e.g., 500ms), remove the component
                setTimeout(() => {
                    setIsTransitioningToMap(false);
                    setIsFadingOutTransition(false); // Reset for next time
                    
                    // Show tutorial only if it hasn't been completed
                    if (!tutorialCompleted) {
                        setShowTutorial(true);
                        localStorage.setItem('joyn-tutorial-completed', 'true');
                    }
                }, 500); // This should match the animation duration in index.html
            }, remainingTime);
        }
    };

    const handleCreateDropInFromPlace = (place: GooglePlace) => {
        setDropInPrefill({
            locationName: place.displayName,
        });
        setActiveModal(null);
        setView('drop-in');
    };
    
    const handleFilterChange = (newFilters: Partial<MapFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const handleMessageHost = (item: User | DropInCircleType) => {
        const host = 'alias' in item ? item : findUserById(item.hostId);
        if (host) {
            handleWaveRequest(host);
        }
    };

    const handleStartJoynFlow = () => {
        if (!currentUser) return;

        if (currentUser.pin) {
            showNotification("You’ve already started a Joyn. Wrap that one up before launching a new one!", 'error');
            return;
        }

        const isHostingActiveCircle = circles.some(
            c => c.hostId === currentUser.id && (new Date(c.startTime).getTime() + 2 * 60 * 60 * 1000) > Date.now()
        );

        if (isHostingActiveCircle) {
            showNotification("You're already hosting an active Circle. End that one first!", 'error');
            return;
        }

        setView('drop-in');
    };

    const handleStartJoynFlowWithHaptic = () => {
        handleInteractionHaptic();
        handleStartJoynFlow();
    };

    const handleAddLiveReply = (liveUpdateId: string, text: string) => {
        if (!currentUser || !text.trim()) return;

        const newReply: LiveReply = {
            id: `reply-${Date.now()}`,
            authorId: currentUser.id,
            text: text.trim(),
            timestamp: new Date(),
        };

        setLiveUpdates(currentUpdates =>
            currentUpdates.map(update =>
                update.id === liveUpdateId
                    ? { ...update, replies: [...update.replies, newReply] }
                    : update
            )
        );
    };

    const handleAddReview = (hostId: string, rating: number, text: string) => {
        if (!currentUser) return;
        const newReview: Review = {
            id: `review-${Date.now()}`,
            authorId: currentUser.id,
            rating,
            text,
            timestamp: new Date(),
        };

        const updatedUsers = users.map(user => {
            if (user.id === hostId) {
                return { ...user, reviews: [...user.reviews, newReview] };
            }
            return user;
        });
        setUsers(updatedUsers);
        showNotification("Your review has been submitted!", 'success');
    };

    const renderOnboardingFlow = () => {
        switch (view) {
            case 'signup':
                return <SignUpScreen onSignUp={handleSignUp} onNavigateToLogin={() => setIsAuthenticated(true)} />;
            case 'create-profile':
                return <CreateProfileScreen onCreate={handleProfileCreation} />;
            case 'select-persona':
                return <PersonaSelectionScreen onSelect={handlePersonaSelection} />;
            case 'location-permission':
                return <LocationPermissionScreen onGrant={handleLocationPermission} />;
            default:
                // If authenticated but onboarding not complete, default to first step.
                return <CreateProfileScreen onCreate={handleProfileCreation} />;
        }
    };

    const renderFullScreenView = () => {
        if (!currentUser) return null;
        
        let componentToRender: React.ReactNode = null;
        let animationClass = '';

        switch (view) {
            case 'drop-in':
                componentToRender = <DropInFlow currentUser={currentUser} onDropIn={handleConfirmDropIn} onCancel={() => { setView('map'); setDropInPrefill(null); }} isGhostMode={currentUser.isGhostMode ?? false} onGhostModeToggle={handleGhostModeToggle} prefill={dropInPrefill} />;
                animationClass = 'animate-slide-up';
                break;
            case 'group-activity': {
                 const activeCircleForActivity = circles.find(c => c.id === activeChat?.id);
                 if (!activeCircleForActivity) return null;
                 componentToRender = <GroupJoynActivityScreen circle={activeCircleForActivity} users={users} currentUser={currentUser} isJoined={joinedCircleIds.includes(activeCircleForActivity.id)} onJoin={() => {
                     setJoinedCircleIds(prev => [...prev, activeCircleForActivity.id]);
                     awardBadge('group-joyn-hero');
                  }} onJoinPaid={handleInitiatePayment} onClose={() => setView('discovery')} onOpenChat={() => setView('circle-chat')} onWaveHost={handleWaveRequest} isOffline={isOffline} onAddReview={handleAddReview} onEndCircle={handleEndCircle} />;
                 animationClass = 'animate-slide-in-right';
                 break;
            }
            case 'circle-chat': {
                const activeCircle = circles.find(c => c.id === activeChat?.id);
                if (!activeCircle) return null;
                componentToRender = <CircleChatScreen circle={activeCircle} currentUser={currentUser} users={users} onSendMessage={(text) => handleSendMessage(activeCircle.id, text, 'circle')} onClose={() => setView('group-activity')} onWaveRequest={handleWaveRequest} />;
                animationClass = 'animate-slide-in-right';
                break;
            }
            case 'messaging': {
                 const activeWave = conversations.find(c => c.id === activeChat?.id);
                 if (!activeWave) return null;
                 componentToRender = <MessagingScreen currentUser={currentUser} conversation={activeWave} onClose={() => setView('inbox')} onSendMessage={(text) => handleSendMessage(activeWave.id, text, 'wave')} />;
                 animationClass = 'animate-slide-in-right';
                 break;
            }
            case 'connection-log':
                componentToRender = <ConnectionLogScreen log={connectionLog} onClose={() => setView('profile')} />;
                animationClass = 'animate-slide-in-right';
                break;
            case 'joynpay-setup':
                componentToRender = <JoynPaySetupScreen onClose={() => setView('profile')} onSetupComplete={() => {
                    handleSaveProfile({ ...currentUser, isJoynPayActive: true, reviews: currentUser.reviews });
                    setView('profile');
                    showNotification('JoynPay is now active!', 'success');
                }} />;
                animationClass = 'animate-slide-in-right';
                break;
            case 'earnings':
                componentToRender = <EarningsDashboard transactions={transactions} onClose={() => setView('profile')} />;
                animationClass = 'animate-slide-in-right';
                break;
            case 'wallet':
                componentToRender = <JoynCoinWallet user={currentUser} transactions={transactions} onClose={() => setView('profile')} />;
                animationClass = 'animate-slide-in-right';
                break;
            case 'confirmation': {
                if (!confirmedPaymentInfo) return null;
                componentToRender = <ConfirmationScreen 
                            item={confirmedPaymentInfo.item}
                            tipAmount={confirmedPaymentInfo.tipAmount}
                            quantity={confirmedPaymentInfo.quantity}
                            users={users}
                            onClose={() => { setView('discovery'); setConfirmedPaymentInfo(null); }}
                            onMessageHost={handleMessageHost}
                       />;
                animationClass = 'animate-bounce-in';
                break;
            }
            case 'host-dashboard': {
                componentToRender = <HostDashboard user={currentUser} users={users} circles={circles} onClose={() => setView('profile')} />;
                animationClass = 'animate-slide-in-right';
                break;
            }
            default:
                return null;
        }

        if (!componentToRender) return null;

        return (
            <div key={view + (activeChat?.id || '')} className={`absolute inset-0 z-50 ${animationClass}`}>
                {componentToRender}
            </div>
        );
    };
    
    if (!isAuthenticated) {
        return (
             <div id="app-container" className="bg-[#F5F5F7] dark:bg-black text-gray-800 antialiased overflow-hidden relative flex flex-col">
                <WelcomeScreen onSignUp={() => setView('signup')} onLogin={handleLogin} />
            </div>
        )
    }

    if (!currentUser) {
        return <div id="app-container" className="bg-[#F5F5F7] dark:bg-black flex items-center justify-center">Loading...</div>;
    }
    
    if (!currentUser.hasCompletedOnboarding && !isTransitioningToMap) {
        return (
            <div id="app-container" className="bg-[#F5F5F7] dark:bg-black text-gray-800 antialiased overflow-hidden relative flex flex-col">
                {renderOnboardingFlow()}
            </div>
        )
    }

    const fullScreenView = renderFullScreenView();
    const showNavBar = ['map', 'discovery', 'inbox', 'profile'].includes(view) && !fullScreenView;
    
    const backgroundViewClasses = isPaymentTransitioning
        ? 'transition-all duration-300 ease-in-out transform scale-[0.92] opacity-60 rounded-3xl overflow-hidden pointer-events-none'
        : 'transition-all duration-300 ease-in-out';

    const joinedCircles = circles.filter(c => joinedCircleIds.includes(c.id));
    const savedCircles = circles.filter(c => currentUser.savedCircleIds?.includes(c.id));

    return (
        <div id="app-container" className="text-gray-800 dark:text-gray-200 antialiased overflow-hidden relative flex flex-col">
            
            {showTutorial && <TutorialUserPinPlaceholder />}

            {isOffline && (
                <div className="absolute top-0 left-0 right-0 p-2 bg-yellow-500/90 backdrop-blur-sm text-center text-black text-sm font-semibold z-[61]">
                    You’re in offline mode. Some features are disabled.
                </div>
            )}
            
            {showConfetti && <Confetti />}

            <div className={`absolute inset-0 flex flex-col ${backgroundViewClasses}`}>
                <div className={`flex-grow relative overflow-hidden ${isOffline ? 'pt-8' : ''} ${fullScreenView ? 'hidden' : ''}`}>
                    {view === 'map' && <div className="h-full animate-fade-in"><MapScreen users={users} circles={circles} places={places} currentUser={currentUser} onUserClick={handleUserClick} onCircleClick={handleCircleClick} onPlaceClick={handlePlaceClick} onLiveUpdateClick={handleLiveUpdateClick} isGhostMode={currentUser.isGhostMode ?? false} onGhostModeToggle={handleGhostModeToggle} onInstantMeetToggle={handleInstantMeetToggle} onMapReady={handleMapReady} filters={filters} onFilterChange={handleFilterChange} allVibeTags={allVibeTags} theme={theme} onThemeToggle={handleThemeToggle} liveUpdates={liveUpdates} onMapInteraction={handleMapInteraction} /></div>}
                    {view === 'discovery' && <div className="h-full animate-fade-in"><ExploreScreen circles={circles} liveUpdates={liveUpdates} places={places} users={users} currentUser={currentUser} allVibeTags={allVibeTags} onUserClick={handleUserClick} onCircleClick={handleCircleClick} onLiveUpdateClick={handleLiveUpdateClick} onPlaceClick={handlePlaceClick} onToggleSaveCircle={handleToggleSaveCircle} /></div>}
                    {view === 'inbox' && <div className="h-full animate-fade-in"><InboxScreen joinedCircles={joinedCircles} savedCircles={savedCircles} conversations={conversations} currentUser={currentUser} onNavigateToChat={(type, id) => { setActiveChat({type, id}); setView(type === 'circle' ? 'circle-chat' : 'messaging'); }} onDeleteConversation={handleDeleteConversation} /></div>}
                    {view === 'profile' && <div className="h-full animate-fade-in"><ProfileScreen user={currentUser} onSave={handleSaveProfile} onNavigate={handleNavigate} onInviteFriends={handleInviteFriends} newlyAwardedBadge={newlyAwardedBadge} onAcknowledgeNewBadge={() => setNewlyAwardedBadge(null)} theme={theme} /></div>}

                    {currentUser.pin && view === 'map' && <ActiveDropInBar pin={currentUser.pin} onEndJoyn={handleEndJoyn} />}
                </div>

                {fullScreenView}
                
                {showNavBar && (
                    <BottomNavBar 
                        activeView={view} 
                        onNavigate={handleNavigateWithHaptic}
                        onActionClick={handleStartJoynFlowWithHaptic}
                        isOffline={isOffline}
                        isVisible={isBottomNavVisible}
                    />
                )}
            </div>
            
            {activeModal?.type === 'liveUpdate' && <JoynLiveModal liveUpdate={activeModal.data} users={users} currentUser={currentUser} isOpen={true} onClose={handleCloseModals} onAddReply={handleAddLiveReply} />}
            {activeModal?.type === 'user' && <DropInModal user={activeModal.data} currentUser={currentUser} isOpen={true} onClose={handleCloseModals} onWaveRequest={handleWaveRequest} onJoinPaidDropIn={handleInitiatePayment} isOffline={isOffline} circles={circles} />}
            {activeModal?.type === 'place' && <PlaceDetailModal place={activeModal.data} currentUser={currentUser} isOpen={true} onClose={handleCloseModals} onCreateDropIn={handleCreateDropInFromPlace} />}
            {activeModal?.type === 'payment' && <PaymentModal 
                item={activeModal.data}
                users={users} 
                currentUser={currentUser} 
                isOpen={true} 
                onClose={handleCloseModals}
                onPaymentSuccess={handlePaymentSuccess} 
            />}

            {notification && <NotificationBanner key={notification.id} message={notification.message} type={notification.type} onDismiss={() => setNotification(null)} />}
            {showTutorial && <TutorialGuide onComplete={() => setShowTutorial(false)} />}
            
            {isTransitioningToMap && (
                <div className={`absolute inset-0 z-[200] ${isFadingOutTransition ? 'animate-fade-out' : ''}`}>
                    <TransitionScreen />
                </div>
            )}
        </div>
    );
};