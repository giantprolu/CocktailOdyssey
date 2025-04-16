<template>
  <header class="glassmorphism shadow-lg z-50 relative">
    <div class="container mx-auto px-6 py-3">
      <div class="flex justify-between items-center">
        <NuxtImg src="/Calque_1.svg" alt="Logo" class="h-16 w-auto" />
        
        <div class="flex items-center space-x-4">
          <NuxtLink to="/account" class="bg-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
            <span class="hidden md:inline flex items-center space-x-1">
                <span class="inline-block font-rubik font-black text-tab leading-tab tracking-tab align-middle text-cream">User</span>
              <svg class="inline-block" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_4073_4120)">
              <path d="M10.0007 1.66699C10.8247 1.66699 11.6303 1.91136 12.3155 2.3692C13.0007 2.82704 13.5348 3.47779 13.8501 4.23914C14.1655 5.0005 14.248 5.83828 14.0873 6.64653C13.9265 7.45479 13.5296 8.19722 12.9469 8.77994C12.3642 9.36266 11.6218 9.75949 10.8135 9.92026C10.0053 10.081 9.1675 9.99852 8.40614 9.68316C7.64478 9.36779 6.99403 8.83374 6.53619 8.14853C6.07835 7.46333 5.83398 6.65775 5.83398 5.83366L5.83815 5.65283C5.88475 4.58012 6.34366 3.56681 7.11917 2.82421C7.89468 2.08161 8.92693 1.66705 10.0007 1.66699Z" fill="#FFF7ED"/>
              <path d="M11.666 11.667C12.7711 11.667 13.8309 12.106 14.6123 12.8874C15.3937 13.6688 15.8327 14.7286 15.8327 15.8337V16.667C15.8327 17.109 15.6571 17.5329 15.3445 17.8455C15.032 18.1581 14.608 18.3337 14.166 18.3337H5.83268C5.39065 18.3337 4.96673 18.1581 4.65417 17.8455C4.34161 17.5329 4.16602 17.109 4.16602 16.667V15.8337C4.16602 14.7286 4.605 13.6688 5.3864 12.8874C6.16781 12.106 7.22761 11.667 8.33268 11.667H11.666Z" fill="#FFF7ED"/>
              </g>
              <defs>
              <clipPath id="clip0_4073_4120">
              <rect width="20" height="20" fill="white"/>
              </clipPath>
              </defs>
              </svg>
            </span>
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