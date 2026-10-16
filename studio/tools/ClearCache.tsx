import {useEffect, useState} from 'react'
import {useClient} from 'sanity'
import {styles} from './panelStyles'

/**
 * "Website verversen": expires the website's cached Sanity content right now,
 * for when a publish does not show up (the webhook missed it, or it was a
 * change outside the studio). Calls the app's `/api/revalidate` with
 * SANITY_REVALIDATE_SECRET — the same secret the webhook signs with.
 *
 * Like the other panels, the secret is not stored in the dataset nor the
 * bundle; the editor pastes it once and it stays in this browser's
 * localStorage. The website address is SANITY_STUDIO_SITE_URL, else the one on
 * Google-koppeling.
 */

const SECRET_KEY = 'revalidateSecret'

const input = {
  padding: 8,
  borderRadius: 4,
  border: '1px solid var(--card-border-color, #c9cdd4)',
  background: 'transparent',
  color: 'inherit',
}

function readSecret() {
  try {
    return window.localStorage.getItem(SECRET_KEY) ?? ''
  } catch {
    return ''
  }
}

export function ClearCache() {
  const client = useClient({apiVersion: '2024-01-01'})
  const [siteUrl, setSiteUrl] = useState(process.env.SANITY_STUDIO_SITE_URL || '')
  const [secret, setSecret] = useState('')
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<{ok: boolean; message: string} | null>(null)

  useEffect(() => setSecret(readSecret()), [])
  useEffect(() => {
    if (siteUrl) return
    client
      .fetch<string | null>(`*[_id == "googleReviews"][0].siteUrl`)
      .then((url) => url && setSiteUrl(url))
      .catch(() => {})
  }, [client, siteUrl])

  const saveSecret = (value: string) => {
    setSecret(value)
    try {
      window.localStorage.setItem(SECRET_KEY, value)
    } catch {
      // Private mode: the secret just lasts for this page view.
    }
  }

  const clear = async () => {
    setBusy(true)
    setResult(null)
    try {
      // Trailing slash: next.config has trailingSlash, and a redirected preflight fails CORS.
      const response = await fetch(new URL('/api/revalidate/', siteUrl), {
        method: 'POST',
        headers: {'x-revalidate-secret': secret},
      })
      const body = (await response.json().catch(() => null)) as {ok?: boolean; message?: string} | null
      setResult(
        body?.ok
          ? {ok: true, message: 'De website toont de gepubliceerde inhoud bij het volgende bezoek.'}
          : {ok: false, message: body?.message ?? `Onverwacht antwoord (HTTP ${response.status}).`},
      )
    } catch (error) {
      setResult({
        ok: false,
        message: `Kon ${siteUrl} niet bereiken: ${error instanceof Error ? error.message : error}`,
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{display: 'grid', gap: 12, padding: 24, maxWidth: 640}}>
      <div style={{fontWeight: 600, fontSize: 16}}>Website verversen</div>
      <div style={styles.intro}>
        Normaal staat een publicatie binnen een paar seconden op de website. Zie je een wijziging
        niet? Leeg dan hier de cache: de website haalt alle gepubliceerde inhoud opnieuw op.
      </div>

      <label style={{display: 'grid', gap: 6, fontSize: 13}}>
        Cache-geheim (SANITY_REVALIDATE_SECRET, alleen bewaard in deze browser)
        <input
          type='password'
          value={secret}
          onChange={(event) => saveSecret(event.currentTarget.value)}
          autoComplete='off'
          style={input}
        />
      </label>

      {!siteUrl ? (
        <div style={styles.notice}>
          Geen website-adres: vul "Website-adres" in bij Google-koppeling, of zet
          SANITY_STUDIO_SITE_URL.
        </div>
      ) : null}

      <div style={{...styles.row, margin: 0}}>
        <button
          type='button'
          style={styles.button}
          disabled={!siteUrl || !secret || busy}
          onClick={clear}
        >
          {busy ? 'Bezig…' : 'Cache legen'}
        </button>
      </div>

      {result ? (
        <div style={{...styles.notice, borderColor: result.ok ? 'var(--card-border-color)' : '#e5484d'}}>
          <b>{result.ok ? 'Gelukt' : 'Mislukt'}</b> — {result.message}
        </div>
      ) : null}
    </div>
  )
}
