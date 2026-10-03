/*
 * Checkout form validation. Returns a Ukrainian error message,
 * or an empty string when the value is valid.
 */

const NAME_PATTERN = /^[A-Za-zА-Яа-яІіЇїЄєҐґЁёЫыЭэЪъ' ’-]+$/
const LETTER_PATTERN = /[A-Za-zА-Яа-яІіЇїЄєҐґЁёЫыЭэЪъ]/g
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^(\+380\d{9}|0\d{9})$/

export function validateName(value: string): string {
  const name = value.trim()
  if (!name) return 'Вкажіть ім’я'
  if (!NAME_PATTERN.test(name)) {
    return 'Ім’я може містити лише літери, пробіл, апостроф і дефіс'
  }
  if ((name.match(LETTER_PATTERN) ?? []).length < 2) {
    return 'Ім’я має містити щонайменше 2 літери'
  }
  return ''
}

export function validateEmail(value: string): string {
  const email = value.trim()
  if (!email) return 'Вкажіть email'
  if (!EMAIL_PATTERN.test(email)) {
    return 'Невірний формат email, наприклад: test@example.com'
  }
  return ''
}

/** "+380 (67) 123-45-67" -> "+380671234567" */
export function normalizePhone(value: string): string {
  return value.replace(/[\s()-]/g, '')
}

export function validatePhone(value: string): string {
  const phone = normalizePhone(value.trim())
  if (!phone) return 'Вкажіть номер телефону'
  if (!PHONE_PATTERN.test(phone)) {
    return 'Формат: +380XXXXXXXXX або 0XXXXXXXXX'
  }
  return ''
}

export function validateDelivery(value: string): string {
  return value ? '' : 'Оберіть спосіб доставки'
}

export function validateTerms(checked: boolean): string {
  return checked ? '' : 'Потрібна згода з умовами демо-магазину'
}
