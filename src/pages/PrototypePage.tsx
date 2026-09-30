import { Link } from 'react-router-dom'
import { Card } from '../components/common'
import { prototypeRoutes } from '../data/prototypeRoutes'

export function PrototypePage() {
  const groups = prototypeRoutes.reduce<Record<string, typeof prototypeRoutes>>((acc, route) => {
    const key = route.group ?? 'Other'
    acc[key] = acc[key] ?? []
    acc[key].push(route)
    return acc
  }, {})

  return (
    <div className="mx-auto max-w-2xl p-8">
      <Card padding="lg">
        <h1 className="text-lg font-semibold">Prototype navigator</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Development-only route for jury demos. Not linked from product navigation.
        </p>
        <div className="mt-6 space-y-6">
          {Object.entries(groups).map(([group, routes]) => (
            <section key={group}>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                {group}
              </h2>
              <ul className="mt-2 space-y-1">
                {routes.map((route) => (
                  <li key={route.path}>
                    <Link
                      to={route.path}
                      className="text-sm text-[var(--color-accent)] underline-offset-2 hover:underline"
                    >
                      {route.label}
                      <span className="ml-2 text-[var(--color-text-muted)]">{route.path}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Card>
    </div>
  )
}
