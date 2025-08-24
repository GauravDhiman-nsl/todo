'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Filters() {
  const sp = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function update(key: string, value: string) {
    const params = new URLSearchParams(sp.toString())
    if (!value || value === 'all') params.delete(key)
    else params.set(key, value)
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        type="search"
        className="rounded-md border px-3 py-2 text-sm"
        placeholder="Search..."
        defaultValue={sp.get('q') ?? ''}
        onChange={(e) => update('q', e.target.value)}
      />
      <select
        defaultValue={sp.get('status') ?? 'all'}
        className="rounded-md border px-2 py-2 text-sm"
        onChange={(e) => update('status', e.target.value)}
      >
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="done">Done</option>
      </select>
      <select
        defaultValue={sp.get('priority') ?? 'all'}
        className="rounded-md border px-2 py-2 text-sm"
        onChange={(e) => update('priority', e.target.value)}
      >
        <option value="all">Any priority</option>
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option value="3">Low</option>
      </select>
    </div>
  )
}
