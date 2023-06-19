<template>
    <div class="word-list">
        <span v-for="(word, index) in props.words" :key="index" @click="selectWord(index)" :class="{ 'selected-word': index === selectedWordIndex }">
            {{ word.word }}
        </span>
    </div>
</template>
  
<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['select-word']);

const props = defineProps({
    words: { type: Array, default: () => [] },
});
   
const selectedWordIndex = ref(null);

const selectWord = (index) => {
    selectedWordIndex.value = index;
    emit('select-word', index);
}
</script>
  
<style scoped>
.word-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5em;
    max-height: 70vh;
    overflow: scroll;
}
.word-list > span{
    padding: 0.4em 0.8em;
    background-color: rgba(238, 238, 238, 1);
    border-radius: 1em;
    color: rgba(79, 79, 79, 1);
    cursor: pointer;
}
.word-list > span.selected-word {
    background-color: rgba(195, 94, 118, 1);
    color: white;
}
</style>
  