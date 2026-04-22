import { useStore } from '@/stores/financialModel'

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const inputCls = 'bg-transparent border border-[var(--border)] rounded px-2 py-1 text-sm emissive-focus text-[var(--text)]'

function calcOpexAnnual(row: { monthlyCost: number; months: number; quantity: number }) {
  return row.monthlyCost * row.months * row.quantity
}

export function OpexPage() {
  const opex = useStore((s) => s.opex)
  const addOpex = useStore((s) => s.addOpex)
  const removeOpex = useStore((s) => s.removeOpex)
  const updateOpex = useStore((s) => s.updateOpex)

  const totalAnnual = opex.reduce((a, r) => a + calcOpexAnnual(r), 0)
  const monthlyOpex = opex.reduce((a, r) => a + r.monthlyCost * r.quantity, 0)

  return (
    <div className="space-y-8">
      <div className="section-label">Operating Expenses</div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-card-accent p-6">
          <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
            Monthly OpEx
          </div>
          <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
            {fmt(monthlyOpex)}
          </div>
        </div>
        <div className="glass-card-accent p-6">
          <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
            Annual OpEx
          </div>
          <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
            {fmt(totalAnnual)}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card p-6 overflow-x-auto">
        <table className="fin-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Monthly Cost</th>
              <th>Months</th>
              <th>Qty</th>
              <th>Annual Cost</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {opex.map((row) => {
              const annual = calcOpexAnnual(row)
              return (
                <tr key={row.id}>
                  <td>
                    <input
                      className={inputCls}
                      type="text"
                      value={row.category}
                      onChange={(e) => updateOpex(row.id, { category: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className={`${inputCls} w-24`}
                      type="number"
                      min={0}
                      value={row.monthlyCost}
                      onChange={(e) => updateOpex(row.id, { monthlyCost: +e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className={`${inputCls} w-16`}
                      type="number"
                      min={0}
                      max={12}
                      value={row.months}
                      onChange={(e) => updateOpex(row.id, { months: +e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className={`${inputCls} w-16`}
                      type="number"
                      min={0}
                      value={row.quantity}
                      onChange={(e) => updateOpex(row.id, { quantity: +e.target.value })}
                    />
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{fmt(annual)}</td>
                  <td>
                    <button
                      onClick={() => removeOpex(row.id)}
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
              <td colSpan={4} className="text-right font-semibold" style={{ color: 'var(--text)' }}>
                Total
              </td>
              <td className="font-bold" style={{ color: 'var(--accent)' }}>{fmt(totalAnnual)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={addOpex}
        className="px-4 py-2 rounded text-sm font-medium border border-[var(--accent)] hover:bg-[var(--accent)]/10 transition"
        style={{ color: 'var(--accent)' }}
      >
        + Add Category
      </button>
    </div>
  )
}
