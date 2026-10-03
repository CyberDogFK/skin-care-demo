const rules = new Intl.PluralRules('uk-UA')

/**
 * Ukrainian plural form.
 * pluralUk(1, ['товар', 'товари', 'товарів']) -> "товар"
 * pluralUk(3, ...) -> "товари", pluralUk(5, ...) -> "товарів"
 */
export function pluralUk(
  count: number,
  [one, few, many]: [string, string, string]
): string {
  switch (rules.select(count)) {
    case 'one':
      return one
    case 'few':
      return few
    default:
      return many
  }
}

export function itemsLabel(count: number): string {
  return `${count} ${pluralUk(count, ['товар', 'товари', 'товарів'])}`
}
