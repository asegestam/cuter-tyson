<template>
  <div class="flex flex-col justify-center select-none">
    <h1 class="text-center text-2xl mb-2">
      {{ tyson.name }}
    </h1>
    <!-- <nuxt-img class="
      w-full
      h-full
      sm:w-[30vw]
      sm:h-[65vh]
      rounded-lg
      shadow-lg
      object-cover
    shadow-black
    animate-fade-in
    duration-300" quality="80" format="webp" :src="tyson.imgPath" /> -->
    <img
      class="w-full h-full sm:w-[30vw] sm:h-[65vh] object-cover rounded-lg shadow-lg shadow-black animate-fade-in duration-300"
      :src="tyson.imgPath"
    >
    <button
      class="px-4 py-2 rounded mt-10 bg-green-400 hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-700 hover:scale-105 disabled:bg-slate-500 disabled:cursor-wait"
      :disabled="disabled"
      @click="$emit('votedFor')"
    >
      <div class="flex justify-center">
        <span class="ml-2">Cuter</span>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  tyson: {
    default: () => ({
      name: '',
      imgPath: '',
      votePercentage: 0
    }),
    type: Object
  },
  disabled: {
    default: true,
    type: Boolean
  }
})

defineEmits(['votedFor'])
</script>
