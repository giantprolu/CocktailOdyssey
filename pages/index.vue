<template>
  <div>
    <!-- Hero Section avec fond dynamique en fonction de l'onglet actif -->
    <section 
      :class="[
        activeTab === 'ai' ? 'bg-primary-orange' : 'bg-[#002233]', 
        'py-16 md:py-24 rounded-3xl mx-3 -mt-12 relative overflow-hidden z-10 transition-colors duration-300'
      ]"
    >
      <!-- Décorations splash - visibles uniquement en mode "ai" -->
      <template v-if="activeTab === 'ai'">
        <div class="absolute bottom-0 -left-10">
          <img src="/soleil.svg" alt="" class="w-32 h-32 opacity-30" />
        </div>
        <div class="absolute -bottom-10 left-20">
          <img src="/soleil.svg" alt="" class="w-20 h-20 opacity-20" />
        </div>
        <div class="absolute top-0 right-0">
          <img src="/soleil.svg" alt="" class="w-40 h-40 opacity-30" />
        </div>
        <div class="absolute bottom-10 -right-10">
          <img src="/soleil.svg" alt="" class="w-28 h-28 opacity-20" />
        </div>
      </template>

      <!-- Décorations lune - visibles uniquement en mode "classic" -->
      <template v-else>
        <div class="absolute top-10 left-10">
          <img src="/lune.svg" alt="" class="w-40 h-40 opacity-80" />
        </div>
        <div class="absolute bottom-0 right-0">
          <img src="/lune.svg" alt="" class="w-48 h-48 opacity-80" />
        </div>
      </template>
      
      <div class="container mx-auto px-4">
        <div class="flex flex-col items-center text-center max-w-3xl mx-auto pt-16">
          <h1 
            :class="[
              activeTab === 'ai' ? 'text-primary-blue' : 'text-primary-orange',
              'font-serif text-heading leading-heading tracking-heading text-center mb-10 font-normal'
            ]"
          >
            Envie d'un bon cocktail ?
          </h1>
          
          <!-- Onglets de recherche -->
          <div class="w-full max-w-2xl mx-auto mb-10">
            <div 
                class="grid grid-cols-2 rounded-lg p-6 mb-11"
                :class="{ 'bg-[#ffbf73]': activeTab === 'ai', 'bg-[#EFF8FF]': activeTab === 'classic' }">
              <button 
                class="py-6 px-7 rounded-md font-rubik font-black text-tab leading-tab tracking-tab align-middle transition-colors"
                :class="{ 
                  'bg-primary-orange shadow-md text-cream': activeTab === 'ai', 
                  'bg-transparent hover:text-primary-orange text-[#002233]': activeTab !== 'ai' 
                }"
                @click="activeTab = 'ai'"
              >
                Recherche avec l'IA
              </button>
              <button 
                class="py-6 px-7 rounded-md font-rubik font-black text-tab leading-tab tracking-tab align-middle text-cream transition-colors"
                :class="{ 'bg-primary-orange shadow-md': activeTab === 'classic', 'bg-transparent hover:text-black': activeTab !== 'classic' }"
                @click="activeTab = 'classic'"
              >
                Recherche classique
              </button>
            </div>
          </div>
            
          <!-- Contenu différent selon l'onglet -->
          <div v-if="activeTab === 'ai'" class="w-full mb-8">
            <!-- Barre de recherche pour IA -->
            <div class="relative w-full mb-3">
              <input 
                type="text" 
                class="w-full py-4 px-5 pl-6 pr-12 rounded-full bg-white shadow-md font-rubik font-medium text-base leading-input tracking-input text-input-text placeholder-styles"
                placeholder="Faire une recherche avec l'IA" 
                v-model="searchQuery"
                @input="handleSearch"
              />
              <button class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary-orange/10 p-2 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.60234 14.3977C9.38088 14.1762 9.11051 14.0099 8.813 13.912L3 12L8.813 10.088C9.11051 9.99015 9.38088 9.82379 9.60234 9.60234C9.82379 9.38088 9.99015 9.11051 10.088 8.813L12 3L13.912 8.813C14.0099 9.11051 14.1762 9.38088 14.3977 9.60234C14.6191 9.82379 14.8895 9.99015 15.187 10.088L21 12L15.187 13.912C14.8895 14.0099 14.6191 14.1762 14.3977 14.3977C14.1762 14.6191 14.0099 14.8895 13.912 15.187L12 21L10.088 15.187C9.99015 14.8895 9.82379 14.6191 9.60234 14.3977ZM9.60234 14.3977L2.5 20.5M5 3V7M19 17V21M3 5H7M17 19H21" stroke="#FF8A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            
            <!-- Switch utilisateur cave -->
            <div class="flex items-center space-x-2 text-sm pl-2 mb-6">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="usePersonalCave" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-orange"></div>
              </label>
              <span class="font-rubik font-light italic text-base leading-[100%] tracking-[0.03em] text-blue-900">Utiliser ma cave</span>
            </div>
          </div>

          <!-- Recherche classique -->
          <div v-else class="w-full">
            <!-- Champ de recherche classique -->
            <div class="relative w-full mb-3">
              <input 
                type="text" 
                class="w-full py-4 px-5 pl-6 pr-12 rounded-full bg-white shadow-md font-rubik font-medium text-base leading-input tracking-input text-input-text placeholder-styles"
                placeholder="Faire une recherche" 
                v-model="searchQuery"
                @input="handleSearch"
              />
                <button class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-100 p-2 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.0002 21L16.7002 16.7M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#012436" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
            </div>
                  
            <!-- Switch utilisateur cave -->
            <div class="flex items-center space-x-2 text-sm pl-2 mb-6">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="usePersonalCave" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-orange"></div>
              </label>
              <span class="font-rubik font-light italic text-base leading-[100%] tracking-[0.03em] text-white">Utiliser ma cave</span>
            </div>
            
            <!-- Options de filtre -->
            <div class="grid grid-cols-3 gap-4 mb-4">
              <div class="flex flex-col">
                <label class="text-primary-orange text-left mb-2">Alcools</label>
                <button class="bg-white text-blue-900 rounded-md py-2 px-4 flex justify-between items-center">
                  <span>Sélectionner</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div class="flex flex-col">
                <label class="text-primary-orange text-left mb-2">Diluants</label>
                <button class="bg-white text-blue-900 rounded-md py-2 px-4 flex justify-between items-center">
                  <span>Sélectionner</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div class="flex flex-col">
                <label class="text-primary-orange text-left mb-2">Ingrédients</label>
                <button class="bg-white text-blue-900 rounded-md py-2 px-4 flex justify-between items-center">
                  <span>Sélectionner</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex justify-between items-center mt-6 mb-2">
              <button class="bg-primary-orange text-white py-2 px-6 rounded-md flex items-center">
                <span class="mr-2">Ajouter à ma cave</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <div class="flex items-center space-x-2">
                <input type="checkbox" class="h-4 w-4">
                <span class="text-white">Sans alcool</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Featured Cocktails -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold">Featured Cocktails</h2>
          <NuxtLink to="/explore" class="text-primary hover:text-primary-dark font-medium">
            View All
          </NuxtLink>
        </div>
        
        <CocktailGrid :cocktails="featuredCocktails" />
      </div>
    </section>
    
    <!-- AI Suggestion -->
    <section class="py-16 bg-light-dark">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row gap-8">
          <div class="md:w-2/3">
            <h2 class="text-3xl font-bold mb-6">Personalized Recommendations</h2>
            <p class="text-lg mb-8">Our AI analyzes your preferences to suggest cocktails you'll love. Discover new flavors and expand your mixology horizons.</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div v-for="(feature, index) in features" :key="index" class="flex">
                <div class="mr-4 p-2 bg-secondary rounded-full h-min">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
                  <p class="text-gray-600">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="md:w-1/3">
            <AiSuggestion :suggestion="aiSuggestion" />
          </div>
        </div>
      </div>
    </section>
    
    <!-- Popular Categories -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div 
            v-for="(category, index) in popularCategories" 
            :key="index"
            class="relative rounded-lg overflow-hidden group cursor-pointer"
          >
            <img 
              :src="category.image" 
              :alt="category.name" 
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
            <div class="absolute bottom-0 left-0 p-4">
              <h3 class="text-xl font-bold text-white">{{ category.name }}</h3>
              <p class="text-white text-sm">{{ category.count }} cocktails</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useCocktailStore } from '~/stores/cocktails';
import { ref } from 'vue';

const cocktailStore = useCocktailStore();
const activeTab = ref('ai'); // Default to AI tab
const featuredCocktails = computed(() => cocktailStore.getAllCocktails.slice(0, 4));
const aiSuggestion = computed(() => cocktailStore.getAiSuggestion);

const searchQuery = ref('');
const classicSearchQuery = ref('');
const usePersonalCave = ref(false);

const categories = ['Popular', 'Classic', 'Tropical', 'Refreshing', 'Strong', 'Non-Alcoholic'];

const features = [
  {
    title: 'Taste Analysis',
    description: 'Our AI learns your flavor preferences to suggest cocktails you\'ll love.',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
  },
  {
    title: 'Ingredient Matching',
    description: 'Find cocktails that match the ingredients you already have at home.',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
  },
  {
    title: 'Seasonal Suggestions',
    description: 'Get recommendations based on season, weather, and current trends.',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-0.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
  },
  {
    title: 'Personalized History',
    description: 'Your cocktail journey evolves as you explore and rate different drinks.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  }
];

const popularCategories = [
  { name: 'Classics', count: 42, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { name: 'Tropical', count: 28, image: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { name: 'Martinis', count: 16, image: 'https://images.unsplash.com/photo-1575023782549-62ca0d244b39?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { name: 'Non-Alcoholic', count: 23, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }
];

const handleSearch = (query) => {
  // Handle search logic
  console.log('Searching for:', query);
};
</script>

<style scoped>
.placeholder-styles::placeholder {
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0.03em;
  color: #012436;
  opacity: 1; /* Firefox applique une opacité par défaut */
}

/* Pour les différents navigateurs */
.placeholder-styles::-webkit-input-placeholder {
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0.03em;
  color: #012436;
}

.placeholder-styles::-moz-placeholder {
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0.03em;
  color: #012436;
  opacity: 1;
}
</style>