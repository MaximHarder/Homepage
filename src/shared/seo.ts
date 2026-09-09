import type { RouteLocationNormalizedLoaded } from 'vue-router'

type I18nLocale = string | { value: string }

type SeoI18nGlobal = {
  locale: I18nLocale
  te?: (key: string, locale?: string) => boolean
  t: (key: string) => unknown
}

type ApplySeoMetaParams = {
  to: RouteLocationNormalizedLoaded
  i18n: unknown
  defaultTitle: string
  defaultDesc: string
}

// Обновляет мета‑теги SEO и переключает локаль
export function applySeoMeta({ to, i18n, defaultTitle, defaultDesc }: ApplySeoMetaParams) {
  let title = (to.meta?.title as string) || defaultTitle
  try {
    const maybeLocale = to.params?.locale
    const g = (i18n as { global: SeoI18nGlobal }).global
    const newLocale = maybeLocale === 'ru' ? 'ru' : 'de'
    if (typeof g.locale === 'string') g.locale = newLocale
    else if (g.locale && typeof g.locale === 'object' && 'value' in g.locale) {
      g.locale.value = newLocale
    }
    const locale: string = typeof g.locale === 'string' ? g.locale : String(g.locale?.value || 'de')
    if (to.name === 'start' && g.te?.('start.title', locale)) {
      title = String(g.t('start.title'))
    }
    const html = document.documentElement
    if (html) html.lang = locale || 'de'
  } catch {}
  const description = (to.meta?.description as string) || defaultDesc

  if (title) document.title = title
  let descTag = document.querySelector('meta[name="description"]')
  if (!descTag) {
    descTag = document.createElement('meta')
    descTag.setAttribute('name', 'description')
    document.head.appendChild(descTag)
  }
  descTag.setAttribute('content', description)

  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  canonical.setAttribute('href', origin + to.fullPath)

  // Open Graph / Twitter basics
  const setMeta = (attr: string, key: string, value: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, key)
      document.head.appendChild(el)
    }
    el.setAttribute('content', value)
  }
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', description)
  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', description)
}
