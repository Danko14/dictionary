<template>
    <div v-if="selectedWord && !loading && !selectedWord.message" class="word-card">
        <div class="card">
            <div class="card-top">
                <div class="word-info">
                    <span class="word-heading">{{ selectedWord.initialForm }}</span>
                    <span class="word-transcription">[{{ selectedWord.pronunciation }}]</span>
                    <div class="word-meanings">
                        <span v-for="(meaning, index) in selectedWord.meaning" :key="index">
                            {{ index + 1 }}. {{ meaning }}
                        </span>
                    </div>
                </div>
                <div class="word-extra">
                    <span class="word-extra-title">FORMS</span>
                    <span class="word-extra-value">
                        {{ selectedWord.forms.join(', ') }}
                    </span>
                </div>
                <div class="word-extra">
                    <span class="word-extra-title">SYNONYMS</span>
                    <div class="word-extra-value">
                        {{ selectedWord.synonyms.join(', ') }}
                    </div>
                </div>
                <div class="word-extra">
                    <span class="word-extra-title">USAGE EXAMPLES</span>
                    <div class="word-extra-value common-phrases">
                        <span v-for="(phrase, index) in processedExamples" :key="index" v-html="phrase">
                        </span>
                    </div>
                </div>
                <div class="word-extra">
                    <span class="word-extra-title">COMMON PHARASES</span>
                    <div class="word-extra-value common-phrases">
                        <span v-for="(phrase, index) in processedPhrases" :key="index" v-html="phrase">
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <UILoader v-else-if="loading"/>
    <h2 v-else-if="selectedWord?.message" class="notfound">Not found</h2>
</template>
  
<script setup>
import { defineProps, onMounted, watch, ref } from 'vue';
import UILoader from './ui/UILoader/index.vue'

    const props = defineProps({
        selectedWord: { type: Object },
        loading: { type: Boolean, default: false }
    })

    const processedExamples = ref()
    const processedPhrases = ref()

    onMounted(() => {
        watch(() => props.selectedWord, val => {
            if (!val || val.message) return


            processedExamples.value = val.usageExamples.map(phrase => {
            return phrase.replace("[[", "<span style='color: rgba(241, 40, 125, 1)'>").replace("]]", "</span>");
            })

            processedPhrases.value = val.commonPhrases.map(phrase => {
            return phrase.replace("[[", "<span style='color: rgba(241, 40, 125, 1)'>").replace("]]", "</span>");
            })
        })
    })
</script>
  
<style scoped lang="scss">
.pb{
    color: aquamarine;
}

.word-card {
    border: 0.1em solid rgba(227, 227, 240, 1);
    border-radius: 0.5em;
    max-height: 70vh;
    overflow: scroll;
}

.notfound{
    text-align: center;
    margin-top: 3em;
}

.card-top {
    display: flex;
    flex-direction: column;
    color: rgba(51, 51, 51, 1);
    font-weight: 400;
}

.card-top>* {
    padding: 1em 2em;
    border-bottom: 0.05em solid black;
}

.card-top> :last-child {
    border: none;
}

.word-info {
    display: flex;
    flex-direction: column;
}

.word-heading {
    color: rgba(51, 51, 51, 1);
    font-size: 1.5em;
    font-weight: 800;
}

.word-meanings {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.word-transcription {
    font-weight: 400;
    color: rgba(151, 151, 151, 1);
    font-size: 1.5em;
}

.word-extra {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.word-extra-title {
    color: rgba(151, 151, 151, 1);
}

.common-phrases {
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    font-weight: 600;
}
</style>
  