import { Suspense, lazy } from 'react'

// Works also with SSR as expected
const Card = lazy(() => import('./Card'))

function AppServer() {
  return (
    <>
      <Suspense fallback={<p>Loading card component...</p>}>
        <Card />
      </Suspense>
    </>
  )
}

export default AppServer