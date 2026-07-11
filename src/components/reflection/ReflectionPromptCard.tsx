const prompts = [
  '今天的決策是什麼？',
  '我是否照著策略行動？',
  '我的情緒是否影響判斷？',
  '有沒有做出不必要的操作？',
]

function ReflectionPromptCard() {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:p-8">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/80">
        今日｜Today
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-white">
        今日回顧提示
      </h2>

      <div className="mt-6 grid gap-3">
        {prompts.map((prompt) => (
          <div
            className="rounded-lg border border-white/10 bg-slate-950/60 p-4 text-base font-medium text-slate-100"
            key={prompt}
          >
            {prompt}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ReflectionPromptCard
