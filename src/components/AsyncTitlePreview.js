import { defineAsyncComponent } from 'vue'
import TitlePreviewSkeleton from './TitlePreviewSkeleton'
const TitlePreviewLoader = () => import('./TitlePreview.vue')

export default defineAsyncComponent({
  loader: TitlePreviewLoader,
  loadingComponent: TitlePreviewSkeleton
})
