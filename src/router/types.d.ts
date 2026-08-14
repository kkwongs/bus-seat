import 'vue-router'

import type { RouteMeta as AppRouteMeta } from '@/types/router'

declare module 'vue-router' {
  interface RouteMeta extends AppRouteMeta {}
}
