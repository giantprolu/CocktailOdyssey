<template>
  <header class="glassmorphism shadow-lg z-50 relative">
    <div class="container mx-auto px-6 py-3">
      <div class="flex justify-between items-center">
        <NuxtImg src="/Calque_1.svg" alt="Logo" class="h-16 w-auto" />
        
        <div class="flex items-center space-x-4">
          <NuxtLink to="/account" class="bg-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
            <span class="hidden md:inline">Connecté</span>
            <span class="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<style scoped>
.glassmorphism {
  background: rgba(255, 255, 255, 0.3); 
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  position: relative;
  z-index: 50;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>