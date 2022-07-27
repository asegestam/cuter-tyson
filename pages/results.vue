<template>
  <div class="select-none">
    <NuxtLink
      to="/"
      class="ml-1 mt-2 bg-green-400 dark:bg-green-600 p-2 float-left rounded text-sm absolute left-0 top-0"
    >
      Go back
    </NuxtLink>
    <div class="flex flex-col items-center">
      <div class="flex flex-row">
        <h1 class="text-2xl my-5">
          Results
        </h1>
      </div>
      <div class="flex flex-col w-full max-w-2xl border border-slate-300 dark:border-slate-400">
        <div v-for="(tyson, index) in tysons" :key="index">
          <div class="relative flex border-b border-slate-300 dark:border-slate-500 p-2 items-center justify-between">
            <div class="flex items-center">
              <div class="flex items-center pl-4">
                <img
                  :src="tyson.imgPath"
                  class="w-16 h-16 object-cover rounded ml-2"
                  layout="fixed"
                >
                <div class="pl-2 capitalize">
                  {{ tyson.name }}
                </div>
              </div>
            </div>
            <div
              :class="{
                'pr-4': true,
                'text-green-600 dark:text-green-500': tyson.votePercentage > 50,
                'text-red-600 dark:text-red-500': tyson.votePercentage <= 50,
              }"
            >
              {{ tyson.votePercentage.toFixed(2) + "%" }}
            </div>
            <div
              class="absolute top-0 left-0 z-20 flex items-center justify-center px-2 font-semibold text-white bg-gray-600 border border-gray-500 shadow-lg rounded-br-md"
            >
              {{ index + 1 }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

useHead({
  title: 'Cutest Tyson - Results',
  charset: 'utf-8'
})

interface Vote {
  id: number;
  votedForId: number;
  votedAgainstId: number;
}

interface TysonResponse {
  id: number;
  name: string;
  imgPath: string;
  votedFor: Array<Vote>;
  votedAgainst: Array<Vote>;
}

const generateCountPercent = (tyson: TysonResponse) => {
  const { votedFor, votedAgainst } = tyson

  const voteForCount = votedFor.length
  const voteAgainstCount = votedAgainst.length

  if (voteForCount + voteAgainstCount === 0) {
    return 0
  }
  return (voteForCount / (voteForCount + voteAgainstCount)) * 100
}

const { data: tysons } = await useAsyncData(
  'tysons-ordered',
  () => $fetch(`${config.API_URL}/api/tysons`),
  {
    transform: (data: TysonResponse[]) => {
      const _data = data.map(tyson => ({
        ...tyson,
        votePercentage: generateCountPercent(tyson)
      }))
      _data.sort((a, b) => b.votePercentage - a.votePercentage)

      return _data
    }
  }
)
</script>
