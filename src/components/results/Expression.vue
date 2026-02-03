<script setup lang="ts">
import { Result } from '../../types/Result';

defineProps<{
    data: Result<number>,
}>();
</script>

<template>
    <div class="p-4 flex flex-col gap-2">
        <span class="flex gap-2 items-center text-zinc-500">
            <span class="symbol">󰿉</span>
            <span class="">Math result</span>
        </span>
        <span class="text-4xl">{{ data.value }}</span>
    </div>
</template>

<style>

</style>
