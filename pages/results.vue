<template>
    <div class="relative">
        <NuxtLink to="/" class="ml-1 mt-2 bg-slate-500 p-2 text-white float-left rounded text-sm absolute left-0 top-0">
            Go
            back
        </NuxtLink>
        <div class="flex flex-col items-center">
            <div class="flex flex-row ">
                <h1 class="text-2xl my-5">Results</h1>
            </div>
            <div class="flex flex-col w-full max-w-2xl border">
                <div v-for="(tyson, index) in tysons">
                    <div class="relative flex border-b p-2 items-center justify-between">
                        <div class="flex items-center">
                            <div class="flex items-center pl-4">
                                <img :src="tyson.imgPath" class="w-16 h-16 object-cover rounded ml-2" layout="fixed" />
                                <div class="pl-2 capitalize">{{ tyson.name }}</div>
                            </div>
                        </div>
                        <div class="pr-4">
                            {{ generateCountPercent(tyson).toFixed(2) + "%" }}
                        </div>
                        <div
                            class="absolute top-0 left-0 z-20 flex items-center justify-center px-2 font-semibold text-white bg-gray-600 border border-gray-500 shadow-lg rounded-br-md">
                            {{ index + 1 }}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>

</template>


<script setup lang="ts">
const { data: tysons } = await useAsyncData('tysons-ordered', () => $fetch('/api/tysons-ordered'));

const generateCountPercent = (tyson) => {
    const { VoteFor, VoteAgainst } = tyson._count;

    if (VoteFor + VoteAgainst === 0) {
        return 0;
    }
    return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

</script>