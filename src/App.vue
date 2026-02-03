<template>
    <main
        class="bg-black rounded-md p-2 flex flex-col gap-2"
    >
        <div class="search relative">
            <span class="icon symbol">󰍉</span>
            <input v-model="input" type="text" autofocus placeholder="Search..." />
            <span class="absolute p-1 mr-2 right-0 bg-zinc-700 text-zinc-400 rounded">
                {{ mode }}
            </span>
        </div>
        <div class="results flex flex-col gap-2">
            <template v-for="(item, i) in results" :key="i">
                <ResultComponent 
                    :selected="i == selectedIndex"
                    :data="item"
                    :data-plugin="item.plugin"
                    :plugin="item.plugin"
                    @keydown.enter="submitResult(item)"
                    @click="submitResult(item)"
                    class="p-2 focus:bg-zinc-800 rounded-md outline-0"
                />
            </template>
        </div>
    </main>
</template>

<style lang="scss">
.results > *[selected=true] {
    @apply bg-zinc-500/25;
}

.search {
    @apply flex rounded-md border-2 border-zinc-100/15 bg-zinc-900 items-center;

    .icon {
        @apply absolute text-xl p-2 text-zinc-500;
    }

    input {
        @apply p-2 pl-10 w-full text-xl bg-transparent border-none outline-none text-zinc-400;
    }
}
</style>

<script setup lang="ts">
import { ref, computed, Ref, onMounted, ComputedRef, onBeforeMount, watch, useTemplateRef } from 'vue';
import { Plugin } from './types/Plugin';
import { ApplicationPlugin } from './plugins/Application';
import { Result } from './types/Result';
import ResultComponent from './components/Result.vue';
import { ExpressionPlugin } from './plugins/Expression';
import { WebSearchPlugin } from './plugins/WebSearch';
import { onKeyStroke } from '@vueuse/core'

onKeyStroke('Escape', (e) => {
    mode.value = 'all';
    e.preventDefault();
});

onKeyStroke('ArrowUp', (e) => {
    if (selectedIndex.value > 0)
        selectedIndex.value--;

    e.preventDefault();
});

onKeyStroke('ArrowDown', (e) => {
    if (selectedIndex.value < results.value.length - 1)
        selectedIndex.value++;

    e.preventDefault();
});

onKeyStroke('Enter', (e) => {
    submit();
    e.preventDefault();
});

const plugins: Plugin[] = [
    new ExpressionPlugin(),
    new ApplicationPlugin(),
    new WebSearchPlugin(),
];

const input: Ref<string> = ref('');
const selectedIndex: Ref<number> = ref(0);
const results: Ref<Result<any>[]> = ref([]);
const mode: Ref<string> = ref('all');

function submitResult(result: Result) {
    plugins.find(x => x.id == result.plugin).submit(result);
}

function submit() {
    if (input.value.startsWith('.')) {
        // mode setting
        const prefix = input.value.substring(1);

        if (prefix == 'all') {
            mode.value = 'all';
            input.value = '';
            return;
        }

        plugins.forEach(x => {
            if (x.prefix == prefix) {
                mode.value = x.id;
                input.value = '';
            }
        });
        return;
    }

    plugins.forEach(x => {
        const selectedResult = results.value[selectedIndex.value];
        if (x.id == selectedResult.plugin) {
            x.submit(selectedResult);
        }
    })
}

function reloadResults() {
    results.value = [];

    plugins.forEach(x => {
        if (mode.value == 'all' || x.id == mode.value)
            results.value = [
                ...results.value,
                ...x.getResults(input.value),
            ];
    });
}

watch(input, (val, oldVal) => {
    reloadResults();
});

onBeforeMount(async () => {
    const res = await Promise.all(plugins.map(x => x.preSearch()));
    reloadResults();
});

onMounted(() => {
    // reloadResults();
});


</script>
