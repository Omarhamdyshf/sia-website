import { useStore, calcCapexDepreciation } from '@/stores/financialModel'
import type { CapexRow } from '@/stores/financialModel'

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const METHODS: CapexRow['depreciation'][] = ['Straight-line', 'Accelerated', 'None']

const inputCls = 'bg-transparent border border-[var(--border)] rounded px-2 py-1 text-sm emissive-focus text-[var(--text)]'

export function CapexPage() {
  const capex = useStore((s) => s.capex)
  const addCapex = useStore((s) => s.addCapex)
  const removeCapex = useStore((s) => s.removeCapex)
  const updateCapex = useStore((s) => s.updateCapex)

  const totalCapex = capex.reduce((a, r) => a + r.cost, 0)
  const totalAnnualDep = capex.reduce((a, r) => a + calcCapexDepreciation(r) * 12, 0)

  return (
    <div className="space-y-8">
      <div className="section-label">Capital Expenditure</div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-card-accent p-6">
          <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
            Total CapEx
          </div>
          <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
            {fmt(totalCapex)}
          </div>
        </div>
        <div className="glass-card-accent p-6">
          <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
            Annual Depreciation
          </div>
          <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
            {fmt(totalAnnualDep)}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card p-6 overflow-x-auto">
        <table className="fin-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Cost</th>
              <th>Purchase Month</th>
              <th>Useful Life (Yr)</th>
              <th>Method</th>
              <th>Annual Dep</th>
              <th>Book Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {capex.map((row) => {
              const annualDep = calcCapexDepreciation(row) * 12
              const bookValue = Math.max(0, row.cost - annualDep)
              return (
                <tr key={row.id}>
                  <td>
                    <input
                      className={inputCls}
                      type="text"
                      value={row.asset}
                      onChange={(e) => updateCapex(row.id, { asset: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className={`${inputCls} w-24`}
                      type="number"
                      min={0}
                      value={row.cost}
                      onChange={(e) => updateCapex(row.id, { cost: +e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className={`${inputCls} w-16`}
                      type="number"
                      min={1}
                      max={24}
                      value={row.purchaseMonth}
                      onChange={(e) => updateCapex(row.id, { purchaseMonth: +e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className={`${inputCls} w-16`}
                      type="number"
                      min={0}
                      value={row.usefulLife}
                      onChange={(e) => updateCapex(row.id, { usefulLife: +e.target.value })}
                    />
                  </td>
                  <td>
                    <select
                      className={inputCls}
                      value={row.depreciation}
                      onChange={(e) => updateCapex(row.id, { depreciation: e.target.value as CapexRow['depreciation'] })}
                    >
                      {METHODS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{fmt(annualDep)}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{fmt(bookValue)}</td>
                  <td>
                    <button
                      onClick={() => removeCapex(row.id)}
                      className="text-red-400 hover:text-red-300 text-sm px-2 py-1"
                      title="Delete"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              )
            })}
            <tr className="row-total">
              <td colSpan={5} className="text-right font-semibold" style={{ color: 'var(--text)' }}>
                Total
              </td>
              <td className="font-bold" style={{ color: 'var(--accent)' }}>{fmt(totalAnnualDep)}</td>
              <td className="font-bold" style={{ color: 'var(--accent)' }}>
                {fmt(capex.reduce((a, r) => {
                  const dep = calcCapexDepreciation(r) * 12
                  return a + Math.max(0, r.cost - dep)
                }, 0))}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={addCapex}
        className="px-4 py-2 rounded text-sm font-medium border border-[var(--accent)] hover:bg-[var(--accent)]/10 transition"
        style={{ color: 'var(--accent)' }}
      >
        + Add Asset
      </button>
    </div>
  )
}
