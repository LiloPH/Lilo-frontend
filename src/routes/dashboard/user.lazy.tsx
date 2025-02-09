import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/user')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/user"!</div>
}
