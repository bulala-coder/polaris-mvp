type SaveDecisionPanelProps = {
  savedCount: number
  saveStatus?: string
  onSave: () => void
}

function SaveDecisionPanel({
  savedCount,
  saveStatus,
  onSave,
}: SaveDecisionPanelProps) {
  return (
    <section className="mt-5 rounded-lg border border-white/10 bg-slate-950/60 p-5 shadow-xl shadow-black/20 backdrop-blur">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-100">
            決策歷史｜Decision History
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Decision History 會儲存在此瀏覽器的 localStorage。完整歷史檢視將在後續版本加入。
          </p>
          <p className="mt-3 text-sm font-medium text-cyan-100">
            目前紀錄數：目前已儲存 {savedCount} 筆決策紀錄
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/15 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
          onClick={onSave}
          type="button"
        >
          儲存今日決策｜Save Today Decision
        </button>
      </div>

      {saveStatus ? (
        <p className="mt-4 rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm font-medium text-emerald-100">
          {saveStatus}
        </p>
      ) : null}
    </section>
  )
}

export default SaveDecisionPanel
