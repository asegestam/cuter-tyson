
<template>
  <div class="h-full sm:h-screen flex flex-col bg-neutral-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
    <NuxtLayout>
      <NuxtLoadingIndicator :height="5" color="green" />
      <SiteHeader />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
