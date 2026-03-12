import { computed } from 'vue'
import { useRoute } from 'vue-router'

export interface BreadcrumbItem {
  title: string
  path: string
}

export interface BreadcrumbClasses {
  container: string
  item: string
  separator: string
  last: string
}

export function useBreadcrumb() {
  const route = useRoute()

  const breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const matched = route.matched.filter(item => item.meta && item.meta.title)
    
    return matched.map(item => ({
      title: (item.meta.title as string) || '',
      path: item.path
    }))
  })

  // UnoCSS styles for breadcrumb
  const classes: BreadcrumbClasses = {
    container: 'flex items-center text-sm text-gray-500',
    item: 'hover:text-primary transition-colors cursor-pointer',
    separator: 'mx-2 text-gray-400',
    last: 'text-gray-900 font-medium cursor-default pointer-events-none'
  }

  return {
    breadcrumbs,
    classes
  }
}
