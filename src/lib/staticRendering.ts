import { createContext, useContext } from 'react'

/** Set only by the build renderer; browser navigation keeps its normal animations. */
export const StaticRenderingContext = createContext(false)
export const useStaticRendering = () => useContext(StaticRenderingContext)
