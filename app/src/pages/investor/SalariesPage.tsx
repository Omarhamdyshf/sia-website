import { useStore, calcSalaryAnnual } from '@/stores/financialModel'
import type { SalaryRow } from '@/stores/financialModel'

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const TYPES: SalaryRow['type'][] = ['Full-time', 'Part-time', 'Consultant', 'Project-based', 'Retainer']

const inputCls = 'bg-transparent border border-[var(--border)] rounded px-2 py-1 text-sm emissive-focus text-[var(--text)]'

export function SalariesPage() {
  const salaries = useStore((s) => s.salaries)
  const addSalary = useStore((s) => s.addSalary)
  const removeSalary = useStore((s) => s.removeSalary)
  const updateSalary = useStore((s) => s.updateSalary)

  const totalAnnual = salaries.reduce((a, r) => a + calcSalaryAnnual(r), 0)
  const monthlyBurn = totalAnnual / 12

  return (
    <div className="space-y-8">
      <div className="section-label">Salaries &amp; Team</div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-card-accent p-6">
          <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
            Monthly Salary Burn
          </div>
          <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
            {fmt(monthlyBurn)}
          </div>
        </div>
        <div className="glass-card-accent p-6">
          <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
            Annual Salary Cost
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
              <th>Role</th>
              <th>Type</th>
              <th>Rate/mo</th>
              <th>Months</th>
              <th>FTE/Qty</th>
              <th>Annual Cost</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((row) => {
              const annual = calcSalaryAnnual(row)
              return (
                <tr key={row.id}>
                  <td>
                    <input
                      className={inputCls}
                      type="text"
                      value={row.role}
                      onChange={(e) => updateSalary(row.id, { role: e.target.value })}
                    />
                  </td>
                  <td>
                    <select
                      className={inputCls}
                      value={row.type}
                      onChange={(e) => updateSalary(row.id, { type: e.target.value as SalaryRow['type'] })}
                    >
                      {TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      className={`${inputCls} w-24`}
                      type="number"
                      min={0}
                      value={row.monthlyRate}
                      onChange={(e) => updateSalary(row.id, { monthlyRate: +e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className={`${inputCls} w-16`}
                      type="number"
                      min={0}
                      max={12}
                      value={row.months}
                      onChange={(e) => updateSalary(row.id, { months: +e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className={`${inputCls} w-16`}
                      type="number"
                      min={0}
                      value={row.fte}
                      onChange={(e) => updateSalary(row.id, { fte: +e.target.value })}
                    />
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{fmt(annual)}</td>
                  <td>
                    <button
                      onClick={() => removeSalary(row.id)}
                      className="delete-row-btn text-red-400 hover:text-red-300 text-sm px-2 py-1"
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
              <td className="font-bold" style={{ color: 'var(--accent)' }}>{fmt(totalAnnual)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={addSalary}
        className="add-row-btn px-4 py-2 rounded text-sm font-medium border border-[var(--accent)] hover:bg-[var(--accent)]/10 transition"
        style={{ color: 'var(--accent)' }}
      >
        + Add Role
      </button>
    </div>
  )
}
