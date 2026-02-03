<script setup lang="ts">
import { Result } from '../../types/Result';

defineProps<{
    data: Result<string>,
}>();
</script>

<template>
    <span class="p-2 flex items-center gap-2">
        <span class="symbol text-zinc-500">󰖟</span>
        <span>Search "{{ data.value }}" on the web</span>
    </span>
</template>

<style>

</style>
