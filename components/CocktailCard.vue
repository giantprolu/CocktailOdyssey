<template>
  <div class="card group hover:shadow-lg transition-all duration-300">
    <div class="relative overflow-hidden rounded-lg mb-4">
      <img 
        :src="cocktail.image" 
        :alt="cocktail.name" 
        class="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div class="absolute top-2 right-2">
        <button 
          @click.stop="toggleFavorite"
          class="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-5 w-5" 
            :class="isFavorite ? 'text-primary' : 'text-gray-400'"
            fill="currentColor" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
      </div>
    </div>
    
    <h3 class="text-lg font-semibold mb-2">{{ cocktail.name }}</h3>
    
    <div class="flex items-center mb-3">
      <div class="flex">
        <span v-for="i in 5" :key="i" class="text-yellow-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" :class="i <= cocktail.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        </span>
      </div>
      <span class="text-sm text-gray-500 ml-1">({{ cocktail.reviews }})</span>
    </div>
    
    <div class="flex justify-between items-center">
      <div class="flex items-center text-sm text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ cocktail.time }} min
      </div>
      
      <NuxtLink :to="`/cocktail/${cocktail.id}`" class="text-primary hover:text-primary-dark font-medium">
        View Recipe
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cocktail: {
    type: Object,
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['toggle-favorite']);

const toggleFavorite = () => {
  emit('toggle-favorite', props.cocktail.id);
};
</script>