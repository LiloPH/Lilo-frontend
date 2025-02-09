import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/routes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/routes"!</div>
}
