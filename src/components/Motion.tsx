import { createElement, forwardRef } from 'react'
import {
  motion as animated,
  type HTMLMotionProps,
  type MotionProps,
  type ForwardRefComponent,
} from 'framer-motion'
import { useStaticRendering } from '@/lib/staticRendering'

function staticAware<Tag extends keyof HTMLElementTagNameMap>(
  Component: ForwardRefComponent<HTMLElementTagNameMap[Tag], HTMLMotionProps<Tag>>
) {
  const MotionComponent = forwardRef<HTMLElementTagNameMap[Tag], HTMLMotionProps<Tag>>(
    (props, ref) => {
      const isStatic = useStaticRendering()
      // HTMLMotionProps includes MotionProps; React's generic ref omission loses that constraint.
      const { whileInView, animate } = props as MotionProps
      return createElement(Component, {
        ...props,
        ref,
        ...(isStatic ? { initial: false, animate: whileInView ?? animate } : {}),
      })
    }
  )
  MotionComponent.displayName = 'StaticMotion'
  return MotionComponent
}

export const motion = {
  article: staticAware<'article'>(animated.article),
  div: staticAware<'div'>(animated.div),
  dl: staticAware<'dl'>(animated.dl),
  form: staticAware<'form'>(animated.form),
  h1: staticAware<'h1'>(animated.h1),
  h2: staticAware<'h2'>(animated.h2),
  header: staticAware<'header'>(animated.header),
  li: staticAware<'li'>(animated.li),
  ol: staticAware<'ol'>(animated.ol),
  p: staticAware<'p'>(animated.p),
  span: staticAware<'span'>(animated.span),
  ul: staticAware<'ul'>(animated.ul),
}
