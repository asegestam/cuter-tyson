<template>
  <div class="flex flex-col justify-center">
    <img class="
      w-full
      h-full
      sm:w-[30vw]
      sm:h-[65vh]
      rounded-lg 
      shadow-lg
    shadow-black
    object-cover
    animate-fade-in
    duration-300" :src="tyson.imgPath" />
    <button
      class="px-4 py-2 rounded mt-10 bg-slate-300 hover:bg-slate-400 hover:scale-105 disabled:bg-slate-500 disabled:cursor-wait"
      :disabled="disabled" @click="$emit('votedFor')">
      <div class="flex justify-center">
        <span class="ml-2 text-gray-600">Cuter</span>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  tyson: {
    default: '',
    type: Object
  },
  disabled: {
    default: true,
    type: Boolean
  }
});
</script>