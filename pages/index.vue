<template>
  <div class="flex flex-col justify-between h-full">
    <div>
      <h1 class="text-center text-3xl mt-4 select-none">
        Which is <span class="text-green-600 dark:text-green-500">Tyson</span> cuter?
      </h1>

      <div class="flex flex-col sm:flex-row justify-evenly items-center m-2">
        <Tyson
          :tyson="tysons.firstTyson"
          :disabled="pendingVote"
          @voted-for="voteFor(tysons.firstTyson)"
        />
        <span class="text-2xl italic my-4 sm:my-0 select-none"> or </span>
        <Tyson
          class="sm:mt-0"
          :tyson="tysons.secondTyson"
          :disabled="pendingVote"
          @voted-for="voteFor(tysons.secondTyson)"
        />
      </div>
    </div>
    <div class="flex justify-center sm:mt-0">
      <NuxtLink
        to="results"
        class="w-50 mt-20 px-6 py-2 bg-green-400 hover:bg-green-500 dark:bg-green-600 hover:dark:bg-green-700 rounded shadow-sm shadow-slate-900 select-none"
      >
        <div class="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Results
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AsyncData } from '#app'

useHead({
  title: 'Cutest Tyson',
  charset: 'utf-8'
})

interface Tyson {
  id: number;
  name: string;
  imgPath: string;
}

interface TysonResponse {
  firstTyson: Tyson;
  secondTyson: Tyson;
}

const config = useRuntimeConfig()

const mostRecentlyVotedFor = ref(null)
const pendingVote = ref(false)

const { data: tysons } = (await useAsyncData('tysons', () =>
  $fetch(`${config.API_URL}/api/pair`, {
    params: { except: mostRecentlyVotedFor.value }
  })
)) as AsyncData<TysonResponse, Error>

const voteFor = async (votedForTyson: Tyson) => {
  pendingVote.value = true

  mostRecentlyVotedFor.value = votedForTyson.id

  await refreshNuxtData('tysons')

  pendingVote.value = false

  $fetch('/api/vote', {
    method: 'POST',
    body: {
      votedForId: votedForTyson.id,
      votedAgainstId:
        votedForTyson.id === tysons.value.firstTyson.id
          ? tysons.value.secondTyson.id
          : tysons.value.firstTyson.id
    }
  })
}
</script>
