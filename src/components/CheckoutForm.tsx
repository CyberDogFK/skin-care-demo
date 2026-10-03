import { CircleAlert, Info, Lock } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { DELIVERY_METHODS, isDeliveryMethodId } from '../data/delivery'
import type { DeliveryMethodId } from '../types/shop'
import {
  validateDelivery,
  validateEmail,
  validateName,
  validatePhone,
  validateTerms,
} from '../utils/validation'
import styles from './CheckoutForm.module.css'

/*
 * The form values live ONLY in this component's state. They are never
 * sent anywhere, never saved, and are gone when the page changes.
 * The parent only receives the chosen delivery method.
 */

type FieldName = 'name' | 'email' | 'phone' | 'delivery' | 'terms'

interface FormValues {
  name: string
  email: string
  phone: string
  delivery: DeliveryMethodId | ''
  terms: boolean
}

type FormErrors = Record<FieldName, string>

const FIELD_ORDER: FieldName[] = ['name', 'email', 'phone', 'delivery', 'terms']

function validate(values: FormValues): FormErrors {
  return {
    name: validateName(values.name),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
    delivery: validateDelivery(values.delivery),
    terms: validateTerms(values.terms),
  }
}

interface CheckoutFormProps {
  onDeliveryChange: (method: DeliveryMethodId) => void
  onValidSubmit: (method: DeliveryMethodId) => void
}

export function CheckoutForm({
  onDeliveryChange,
  onValidSubmit,
}: CheckoutFormProps) {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    delivery: '',
    terms: false,
  })
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
    phone: false,
    delivery: false,
    terms: false,
  })
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLInputElement>>>({})

  const errors = validate(values)
  const visibleError = (field: FieldName) =>
    touched[field] || submitAttempted ? errors[field] : ''

  function setValue<K extends keyof FormValues>(
    field: K,
    value: FormValues[K]
  ) {
    setValues((previous) => ({ ...previous, [field]: value }))
  }

  function markTouched(field: FieldName) {
    setTouched((previous) => ({ ...previous, [field]: true }))
  }

  function handleDeliveryChange(value: string) {
    if (!isDeliveryMethodId(value)) return
    setValue('delivery', value)
    markTouched('delivery')
    onDeliveryChange(value)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitAttempted(true)

    const firstInvalid = FIELD_ORDER.find((field) => errors[field])
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus()
      return
    }

    onValidSubmit(values.delivery as DeliveryMethodId)
  }

  const errorCount = FIELD_ORDER.filter((field) => errors[field]).length

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <p className={styles.notice}>
        <Info size={18} aria-hidden="true" />
        Використовуйте лише вигадані тестові дані. Дані форми нікуди не
        надсилаються і не зберігаються.
      </p>

      {submitAttempted && errorCount > 0 && (
        <p className={styles.summaryError} role="alert">
          <CircleAlert size={18} aria-hidden="true" />
          Перевірте форму: є поля з помилками.
        </p>
      )}

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Контактні дані</legend>

        <TextField
          name="name"
          label="Ім’я"
          autoComplete="given-name"
          value={values.name}
          error={visibleError('name')}
          onChange={(value) => setValue('name', value)}
          onBlur={() => markTouched('name')}
          inputRef={(element) => {
            fieldRefs.current.name = element ?? undefined
          }}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="test@example.com"
          value={values.email}
          error={visibleError('email')}
          onChange={(value) => setValue('email', value)}
          onBlur={() => markTouched('email')}
          inputRef={(element) => {
            fieldRefs.current.email = element ?? undefined
          }}
        />
        <TextField
          name="phone"
          label="Телефон"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+380 67 123 45 67"
          hint="Формат: +380XXXXXXXXX або 0XXXXXXXXX"
          value={values.phone}
          error={visibleError('phone')}
          onChange={(value) => setValue('phone', value)}
          onBlur={() => markTouched('phone')}
          inputRef={(element) => {
            fieldRefs.current.phone = element ?? undefined
          }}
        />
      </fieldset>

      <fieldset
        className={styles.group}
        aria-describedby={
          visibleError('delivery') ? 'delivery-error' : undefined
        }
      >
        <legend className={styles.legend}>Спосіб доставки</legend>
        <div className={styles.options}>
          {DELIVERY_METHODS.map((method, index) => (
            <label key={method.id} className={styles.option}>
              <input
                type="radio"
                name="delivery"
                value={method.id}
                checked={values.delivery === method.id}
                onChange={(event) => handleDeliveryChange(event.target.value)}
                aria-invalid={visibleError('delivery') ? true : undefined}
                ref={
                  index === 0
                    ? (element) => {
                        fieldRefs.current.delivery = element ?? undefined
                      }
                    : undefined
                }
              />
              <span className={styles.optionText}>
                <span className={styles.optionLabel}>{method.label}</span>
                <span className={styles.optionDescription}>
                  {method.description}
                </span>
              </span>
              <span className={styles.optionPrice}>Безкоштовно</span>
            </label>
          ))}
        </div>
        <FieldError id="delivery-error" message={visibleError('delivery')} />
      </fieldset>

      <div className={styles.terms}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            name="terms"
            checked={values.terms}
            onChange={(event) => {
              setValue('terms', event.target.checked)
              markTouched('terms')
            }}
            aria-invalid={visibleError('terms') ? true : undefined}
            aria-describedby={visibleError('terms') ? 'terms-error' : undefined}
            ref={(element) => {
              fieldRefs.current.terms = element ?? undefined
            }}
          />
          <span>Я погоджуюсь з умовами демо-магазину</span>
        </label>
        <FieldError id="terms-error" message={visibleError('terms')} />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        <Lock size={18} aria-hidden="true" />
        Підтвердити замовлення
      </button>
    </form>
  )
}

// ---------- Small building blocks ----------

interface TextFieldProps {
  name: FieldName
  label: string
  value: string
  error: string
  onChange: (value: string) => void
  onBlur: () => void
  inputRef: (element: HTMLInputElement | null) => void
  type?: 'text' | 'email' | 'tel'
  autoComplete?: string
  inputMode?: 'text' | 'email' | 'tel'
  placeholder?: string
  hint?: string
}

function TextField({
  name,
  label,
  value,
  error,
  onChange,
  onBlur,
  inputRef,
  type = 'text',
  autoComplete,
  inputMode,
  placeholder,
  hint,
}: TextFieldProps) {
  const inputId = `checkout-${name}`
  const showHint = Boolean(hint) && !error
  const hintId = showHint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        className={styles.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        ref={inputRef}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
      {showHint && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
      <FieldError id={`${inputId}-error`} message={error} />
    </div>
  )
}

function FieldError({ id, message }: { id: string; message: string }) {
  if (!message) return null
  return (
    <span id={id} className={styles.error}>
      <CircleAlert size={14} aria-hidden="true" />
      {message}
    </span>
  )
}
