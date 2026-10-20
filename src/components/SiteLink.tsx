import type { AnchorHTMLAttributes } from 'react'
import { Link, useLocation } from 'react-router-dom'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/** Internal links use the router; local anchors retain the selected plan/query. */
export default function SiteLink({ href, children, ...props }: Props) {
  const { pathname, search } = useLocation()
  const internal = href.startsWith('#') || (href.startsWith('/') && !href.startsWith('//'))
  if (!internal || props.target || (props.download !== undefined && props.download !== false))
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  return (
    <Link to={href.startsWith('#') ? { pathname, search, hash: href } : href} {...props}>
      {children}
    </Link>
  )
}
