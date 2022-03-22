import { defineAsyncComponent } from 'vue'
import TitleRelatedTitlesSkeleton from './TitleRelatedTitlesSkeleton.vue'

export default defineAsyncComponent({
  loader: () => import('./TitleRelatedTitles.vue'),
  loadingComponent: TitleRelatedTitlesSkeleton
})
