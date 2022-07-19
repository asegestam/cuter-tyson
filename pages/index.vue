
<template>
    <div class="flex flex-col justify-between h-full">
        <div>
            <h1 class="text-center text-2xl p-4">Which Tyson is cuter?</h1>
            <div class="flex flex-col sm:flex-row justify-evenly m-2">
                <Tyson :tyson="tysons.firstTyson" :disabled="pendingVote" @votedFor="voteFor(tysons.firstTyson)" />
                <Tyson class="mt-6 sm:mt-0" :tyson="tysons.secondTyson" :disabled="pendingVote"
                    @votedFor="voteFor(tysons.secondTyson)" />
            </div>
        </div>
        <div class="flex justify-center mb-10 mt-10 sm:mt-0">
            <NuxtLink to="results"
                class="w-50 px-2 py-2 bg-green-700 hover:bg-green-600 text-slate-200 rounded shadow-sm shadow-slate-900">
                <div class="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Results
                </div>
            </NuxtLink>
        </div>
    </div>

</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const mostRecentlyVotedFor = ref(null);
const pendingVote = ref(false);

const { data: tysons } = await useAsyncData('tysons', () => $fetch(`${config.API_URL}/api/pair`, { params: { except: mostRecentlyVotedFor.value } }));

const voteFor = async (votedForTyson: any) => {
    pendingVote.value = true;

    mostRecentlyVotedFor.value = votedForTyson.id;

    await refreshNuxtData('tysons');

    pendingVote.value = false;

    $fetch('/api/vote', {
        method: 'POST',
        body: {
            votedForId: votedForTyson.id,
            votedAgainstId: votedForTyson.id === tysons.value.firstTyson.id ? tysons.value.secondTyson.id : tysons.value.firstTyson.id,
        }
    });

};

useHead({
    title: 'Cutest Tyson',
    charset: 'utf-8',
});

</script>