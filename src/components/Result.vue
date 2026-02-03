<script setup lang="ts">
import { Result, ResultType } from '../types/Result';
import Application from './results/Application.vue';
import Expression from './results/Expression.vue';
import WebSearch from './results/WebSearch.vue';

defineProps<{
    data: Result<any>,
}>();
</script>

<template>
    <Expression v-if="data.plugin == 'expression'" :data="data" />
    <WebSearch v-else-if="data.plugin == 'websearch'" :data="data" />
    <Application v-else-if="data.plugin == 'application'" :data="data" />
    <span v-else class="px-4 py-2">
        {{ data.value }}
    </span>
</template>

<style lang="scss">

</style>