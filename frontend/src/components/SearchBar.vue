<template>
    <div class="search-bar segment" @keyup.enter="search">
        <input type="text" v-model="searchTerm" placeholder="Search" />
        <button @click="search">Go!</button>
    </div>
</template>
  
<script setup>
import { ref, defineEmits } from 'vue';

const searchTerm = ref('');

const emit = defineEmits(['search'])

const search = () => {
    emit('search', searchTerm.value);
}
</script>
  
<style scoped>
.search-bar {
    display: flex;
    align-items: flex-end;
    margin-bottom: 2rem;
}

.search-bar>input {
    padding: 0.7em;
    border-radius: 0.4em;
    font-size: 1em;
    width: 25em;
    border: 0.1em solid rgba(227, 227, 240, 1);
}

.search-bar>button {
    margin-left: 1em;
    background: none;
    border: none;
    font-weight: 900;
    color: white;
    background-color: rgba(195, 94, 118, 1);
    border-radius: 0.4em;
    width: 4em;
    font-size: 1em;
    padding: 0.8em;
}
.search-bar>button:hover{
    background-color: rgba(219, 95, 125, 1);
}
.sort-container{
    margin-left: 4em;
    display: flex;
    flex-direction: column;
    gap: 0.2em;
}
.sort-container > span{
    font-size: 1em;
    color: rgba(132, 139, 141, 1);
    font-weight: 300;
}
.sort-container > select {
    font-size: 1em;
    padding: 0.7em;
    border-color: rgba(212, 212, 231, 1);
    border-radius: 0.4em;
    width: 18em;
}
</style>
  