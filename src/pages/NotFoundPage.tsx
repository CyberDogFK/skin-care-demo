import { SearchX } from 'lucide-react'
import { EmptyState } from '../components/EmptyState'

interface NotFoundPageProps {
  title?: string
  message?: string
}

export function NotFoundPage({
  title = 'Сторінку не знайдено',
  message = 'Схоже, такої сторінки не існує. Перевірте адресу або поверніться на головну.',
}: NotFoundPageProps) {
  return (
    <div className="container page">
      <EmptyState
        icon={SearchX}
        title={title}
        message={message}
        actionLabel="На головну"
        actionTo="/"
      />
    </div>
  )
}
