import { defineStore } from "pinia";
import { ref } from "vue";
import { genresRepository } from '@/api/repositories/genres-repository';

export const useGenreStore = defineStore('genreStore', () => {
  const genres = ref([])
  const isSearching = ref(false)

  function handleSearchGenres() {
    isSearching.value = true

    const data = genresRepository.fetch()
  
    data.then(response => {
      genres.value = response
    }).finally(() => {
      isSearching.value = false
    })
  
    return data
  }

  return {
    genres,
    handleSearchGenres,
    isSearching
  }
})