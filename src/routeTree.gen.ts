/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as DashboardUserImport } from './routes/dashboard/user'
import { Route as DashboardRoutesImport } from './routes/dashboard/routes'
import { Route as DashboardMapImport } from './routes/dashboard/map'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardUserRoute = DashboardUserImport.update({
  id: '/user',
  path: '/user',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardRoutesRoute = DashboardRoutesImport.update({
  id: '/routes',
  path: '/routes',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardMapRoute = DashboardMapImport.update({
  id: '/map',
  path: '/map',
  getParentRoute: () => DashboardRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/map': {
      id: '/dashboard/map'
      path: '/map'
      fullPath: '/dashboard/map'
      preLoaderRoute: typeof DashboardMapImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/routes': {
      id: '/dashboard/routes'
      path: '/routes'
      fullPath: '/dashboard/routes'
      preLoaderRoute: typeof DashboardRoutesImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/user': {
      id: '/dashboard/user'
      path: '/user'
      fullPath: '/dashboard/user'
      preLoaderRoute: typeof DashboardUserImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof DashboardImport
    }
  }
}

// Create and export the route tree

interface DashboardRouteChildren {
  DashboardMapRoute: typeof DashboardMapRoute
  DashboardRoutesRoute: typeof DashboardRoutesRoute
  DashboardUserRoute: typeof DashboardUserRoute
  DashboardIndexRoute: typeof DashboardIndexRoute
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardMapRoute: DashboardMapRoute,
  DashboardRoutesRoute: DashboardRoutesRoute,
  DashboardUserRoute: DashboardUserRoute,
  DashboardIndexRoute: DashboardIndexRoute,
}

const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/dashboard/map': typeof DashboardMapRoute
  '/dashboard/routes': typeof DashboardRoutesRoute
  '/dashboard/user': typeof DashboardUserRoute
  '/dashboard/': typeof DashboardIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/dashboard/map': typeof DashboardMapRoute
  '/dashboard/routes': typeof DashboardRoutesRoute
  '/dashboard/user': typeof DashboardUserRoute
  '/dashboard': typeof DashboardIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/dashboard/map': typeof DashboardMapRoute
  '/dashboard/routes': typeof DashboardRoutesRoute
  '/dashboard/user': typeof DashboardUserRoute
  '/dashboard/': typeof DashboardIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/dashboard'
    | '/dashboard/map'
    | '/dashboard/routes'
    | '/dashboard/user'
    | '/dashboard/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/dashboard/map'
    | '/dashboard/routes'
    | '/dashboard/user'
    | '/dashboard'
  id:
    | '__root__'
    | '/'
    | '/dashboard'
    | '/dashboard/map'
    | '/dashboard/routes'
    | '/dashboard/user'
    | '/dashboard/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  DashboardRoute: typeof DashboardRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  DashboardRoute: DashboardRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx",
      "children": [
        "/dashboard/map",
        "/dashboard/routes",
        "/dashboard/user",
        "/dashboard/"
      ]
    },
    "/dashboard/map": {
      "filePath": "dashboard/map.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/routes": {
      "filePath": "dashboard/routes.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/user": {
      "filePath": "dashboard/user.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx",
      "parent": "/dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
