export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#C0622B] rounded-t-3xl px-8 py-4 flex justify-around items-center shadow-lg">
      <button className="text-white text-2xl active:scale-95 transition">
        🏠
      </button>

      <button className="text-white text-2xl active:scale-95 transition">
        🛒
      </button>
    </nav>
  )
}