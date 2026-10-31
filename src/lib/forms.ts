/** Product limit for contact addresses, enforced independently of native form validity. */
export const EMAIL_MAX_LENGTH = 254

/** The example value must never turn an unconfigured site into a broken form. */
export function formspreeEndpoint(formId: string | undefined): string | null {
  const id = formId?.trim()
  if (!id || id === 'your_form_id_here' || !/^[a-zA-Z0-9_-]+$/.test(id)) return null
  return `https://formspree.io/f/${id}`
}
