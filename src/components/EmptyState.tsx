import type { LucideIcon } from 'lucide-react'
import { Link } from '../router/Link'
import styles from './EmptyState.module.css'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  message: string
  actionLabel: string
  actionTo: string
}

/** Centered icon + message + one action (empty cart, 404, no order). */
export function EmptyState({
  icon: Icon,
  title,
  message,
  actionLabel,
  actionTo,
}: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <span className={styles.icon}>
        <Icon size={32} aria-hidden="true" />
      </span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.message}>{message}</p>
      <Link to={actionTo} className="btn btn-primary">
        {actionLabel}
      </Link>
    </div>
  )
}
