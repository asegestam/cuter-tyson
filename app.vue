
<template>
  <div class="h-full sm:h-screen flex flex-col justify-between bg-slate-900">
    <NuxtLayout>
      <NuxtLoadingIndicator :height="5" color="green" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
