
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
        <span>© {new Date().getFullYear()} BRNDLY. All rights reserved.</span>
        <span className="uppercase tracking-[0.2em]">Social media, 100% organic.</span>
      </div>
    </footer>
  );
}