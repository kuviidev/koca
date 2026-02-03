<script setup lang="ts">
import { Application } from '../../types/Application';
import { Result } from '../../types/Result';

defineProps<{
    data: Result<Application>,
}>();
</script>

<template>
    <span class="p-2 flex items-center gap-2">
        <span class="symbol text-zinc-500">
            <template v-if="data.value.terminal">󰲋</template>
            <template v-else>󰣆</template>
        </span>
        <span>{{ data.value.name }}</span>
        <span class="text-zinc-500 text-sm italic">
            {{ data.value.comment }}
        </span>
        <!--
        <span class="ml-auto justify-right flex gap-2">
            <span 
                v-for="cat in data.value.categories"
                class="px-1 py-[1px] bg-zinc-800 text-zinc-400 rounded text-xs"
            >
                {{ cat }}
            </span>
        </span>
        -->
    </span>
</template>

<style scoped>
.capitalize {
    text-transform: uppercase;
}
</style>
