import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { navigate, withBase } from './router'

interface LinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> {
  /** App path without the base, e.g. "/cart" or "/#catalog" */
  to: string
}

/**
 * A real <a href> (so "open in new tab" and middle-click work),
 * but a plain left-click navigates without reloading the page.
 */
export function Link({ to, onClick, target, ...rest }: LinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)

    const isModifiedClick =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      isModifiedClick ||
      (target && target !== '_self')
    ) {
      return
    }

    event.preventDefault()
    navigate(to)
  }

  return (
    <a href={withBase(to)} target={target} onClick={handleClick} {...rest} />
  )
}
