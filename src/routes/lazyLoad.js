import { Suspense, lazy } from 'react'
import React from 'react'

const lazyLoad = (importFunc) => {
  const LazyComponent = lazy(importFunc)
  const ComponentWithSuspense = (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  )
  ComponentWithSuspense.displayName = `LazyLoad(${importFunc.name || 'Component'})`
  return <ComponentWithSuspense />
}

export default lazyLoad
