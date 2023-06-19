<template>
  <div id="app">
    <main>
      <div class="content">
        <h1 class="heading segment">
          Dictionary
          <img src="info.svg">
        </h1>
        <SearchBar @search="fetchWord" />
        <div class="dictionary segment">
          <WordList :words="words" @select-word="selectWord" />
          <WordDetail :selectedWord="selectedWord" :loading="loadingWord" />
          <div></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SearchBar from './components/SearchBar.vue';
import WordList from './components/WordList.vue';
import WordDetail from './components/WordDetail.vue';
import { DictionaryService } from './services/DictionaryService.js'
  
  const words = ref([]);
  const loadingWord = ref(false)

  const selectedWord = ref(null);

  const fetchWord = async (searchTerm) => {
    loadingWord.value = true
    selectedWord.value = await DictionaryService.getWord(searchTerm)
    loadingWord.value = false
    await fetchWords()
  }

  const selectWord = async (index) => {
    await fetchWord(words.value[index].word);
  }

  const fetchWords = async () => {
    words.value = (await DictionaryService.getWords()).items
  }

  onMounted(async () => {
    await fetchWords()
  })
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}

h1{
  margin: 0;
}

.content {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.heading {
  font-size: 2em;
  font-weight: 600;
  display: flex;
  align-items: flex-start;
  gap: 0.4em;
  color: rgba(65, 65, 65, 1);
  margin-bottom: 20px;
}
.heading > img {
  height: 1.25em;
  width: auto;
}

.segment {
  width: 90%;
}

.dictionary {
  display: flex;
  gap: 1em;
}

.dictionary> :nth-child(1) {
  flex: 1;
}

.dictionary> :nth-child(2) {
  flex: 2;
}

.dictionary> :nth-child(3) {
  flex: 1;
}
</style>
