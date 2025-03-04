<template>
  <div class="py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">My Account</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="card">
            <div class="flex flex-col items-center text-center mb-6">
              <img 
                :src="user.avatar" 
                :alt="user.name" 
                class="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h2 class="text-xl font-semibold">{{ user.name }}</h2>
              <p class="text-gray-500">{{ user.email }}</p>
            </div>
            
            <div class="border-t border-gray-200 pt-6">
              <nav class="flex flex-col space-y-1">
                <button 
                  v-for="(tab, index) in tabs" 
                  :key="index"
                  @click="activeTab = tab.id"
                  class="flex items-center px-4 py-3 rounded-lg transition-colors"
                  :class="activeTab === tab.id ? 'bg-primary text-white' : 'hover:bg-gray-100'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.icon" />
                  </svg>
                  {{ tab.name }}
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Profile Tab -->
          <div v-if="activeTab === 'profile'" class="card">
            <h3 class="text-xl font-semibold mb-6">Profile Information</h3>
            
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="profileForm.name" 
                    class="input"
                  />
                </div>
                
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="profileForm.email" 
                    class="input"
                  />
                </div>
              </div>
              
              <div>
                <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea 
                  id="bio" 
                  v-model="profileForm.bio" 
                  rows="4" 
                  class="input"
                ></textarea>
              </div>
              
              <div class="flex justify-end">
                <button type="submit" class="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
          
          <!-- Preferences Tab -->
          <div v-if="activeTab === 'preferences'" class="card">
            <h3 class="text-xl font-semibold mb-6">Taste Preferences</h3>
            
            <form @submit.prevent="updatePreferences" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Favorite Liquors</label>
                <div class="flex flex-wrap gap-2">
                  <div 
                    v-for="liquor in availableLiquors" 
                    :key="liquor"
                    @click="toggleLiquor(liquor)"
                    class="px-4 py-2 rounded-full cursor-pointer transition-colors"
                    :class="preferencesForm.favoriteLiquors.includes(liquor) ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'"
                  >
                    {{ liquor }}
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Disliked Ingredients</label>
                <div class="flex flex-wrap gap-2">
                  <div 
                    v-for="ingredient in commonIngredients" 
                    :key="ingredient"
                    @click="toggleDislikedIngredient(ingredient)"
                    class="px-4 py-2 rounded-full cursor-pointer transition-colors"
                    :class="preferencesForm.dislikedIngredients.includes(ingredient) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'"
                  >
                    {{ ingredient }}
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Preferred Style</label>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div 
                    v-for="style in cocktailStyles" 
                    :key="style"
                    @click="preferencesForm.preferredStyle = style"
                    class="px-4 py-3 rounded-lg text-center cursor-pointer transition-colors"
                    :class="preferencesForm.preferredStyle === style ? 'bg-secondary text-white' : 'bg-gray-100 hover:bg-gray-200'"
                  >
                    {{ style }}
                  </div>
                </div>
              </div>
              
              <div class="flex justify-end">
                <button type="submit" class="btn btn-primary">Save Preferences</button>
              </div>
            </form>
          </div>
          
          <!-- Saved Cocktails Tab -->
          <div v-if="activeTab === 'saved'" class="space-y-6">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold">Saved Cocktails</h3>
              <div class="flex space-x-2">
                <button class="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </button>
                <button class="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div v-if="savedCocktails.length > 0">
              <CocktailGrid :cocktails="savedCocktails" />
            </div>
            
            <div v-else class="card text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h4 class="text-lg font-medium mb-2">No saved cocktails yet</h4>
              <p class="text-gray-500 mb-6">Start exploring and save your favorite cocktails to see them here.</p>
              <NuxtLink to="/explore" class="btn btn-primary inline-flex">
                Explore Cocktails
              </NuxtLink>
            </div>
          </div>
          
          <!-- Settings Tab -->
          <div v-if="activeTab === 'settings'" class="card">
            <h3 class="text-xl font-semibold mb-6">Account Settings</h3>
            
            <div class="space-y-6">
              <div>
                <h4 class="text-lg font-medium mb-4">Notification Preferences</h4>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-medium">Email Notifications</p>
                      <p class="text-sm text-gray-500">Receive emails about new cocktail recommendations</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="settingsForm.emailNotifications" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-medium">Weekly Digest</p>
                      <p class="text-sm text-gray-500">Get a weekly summary of trending cocktails</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="settingsForm.weeklyDigest" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div class="border-t border-gray-200 pt-6">
                <h4 class="text-lg font-medium mb-4">Privacy Settings</h4>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-medium">Public Profile</p>
                      <p class="text-sm text-gray-500">Allow others to see your profile and saved cocktails</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="settingsForm.publicProfile" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-medium">Data Collection</p>
                      <p class="text-sm text-gray-500">Allow us to collect usage data to improve recommendations</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="settingsForm.dataCollection" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-end">
                <button @click="saveSettings" class="btn btn-primary">Save Settings</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
import { useCocktailStore } from '~/stores/cocktails';

const userStore = useUserStore();
const cocktailStore = useCocktailStore();

const user = computed(() => userStore.getUserProfile);
const savedCocktailIds = computed(() => userStore.getSavedCocktails);
const savedCocktails = computed(() => 
  cocktailStore.getAllCocktails.filter(cocktail => 
    savedCocktailIds.value.includes(cocktail.id)
  )
);

const activeTab = ref('profile');

const tabs = [
  { id: 'profile', name: 'Profile Information', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'preferences', name: 'Taste Preferences', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
  { id: 'saved', name: 'Saved Cocktails', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { id: 'settings', name: 'Account Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
];

// Form data
const profileForm = ref({
  name: user.value.name,
  email: user.value.email,
  bio: 'Cocktail enthusiast and home bartender. I love experimenting with new flavors and techniques.'
});

const preferencesForm = ref({
  favoriteLiquors: user.value.preferences.favoriteLiquors,
  dislikedIngredients: user.value.preferences.dislikedIngredients,
  preferredStyle: user.value.preferences.preferredStyle
});

const settingsForm = ref({
  emailNotifications: true,
  weeklyDigest: false,
  publicProfile: true,
  dataCollection: true
});

// Available options
const availableLiquors = [
  'Vodka', 'Gin', 'Rum', 'Tequila', 'Whiskey', 'Bourbon', 'Brandy', 'Mezcal'
];

const commonIngredients = [
  'Olives', 'Egg whites', 'Mint', 'Ginger', 'Coffee', 'Coconut', 'Cinnamon', 'Hot peppers'
];

const cocktailStyles = [
  'Strong', 'Sweet', 'Sour', 'Bitter', 'Refreshing', 'Creamy', 'Spicy', 'Fruity', 'Herbal'
];

// Methods
const updateProfile = () => {
  userStore.updateUserProfile({
    name: profileForm.value.name,
    email: profileForm.value.email
  });
  
  // Show success message (in a real app)
  alert('Profile updated successfully!');
};

const updatePreferences = () => {
  userStore.updatePreferences(preferencesForm.value);
  
  // Show success message (in a real app)
  alert('Preferences updated successfully!');
};

const saveSettings = () => {
  // In a real app, this would save to the user's settings
  alert('Settings saved successfully!');
};

const toggleLiquor = (liquor) => {
  if (preferencesForm.value.favoriteLiquors.includes(liquor)) {
    preferencesForm.value.favoriteLiquors = preferencesForm.value.favoriteLiquors.filter(l => l !== liquor);
  } else {
    preferencesForm.value.favoriteLiquors.push(liquor);
  }
};

const toggleDislikedIngredient = (ingredient) => {
  if (preferencesForm.value.dislikedIngredients.includes(ingredient)) {
    preferencesForm.value.dislikedIngredients = preferencesForm.value.dislikedIngredients.filter(i => i !== ingredient);
  } else {
    preferencesForm.value.dislikedIngredients.push(ingredient);
  }
};
</script>