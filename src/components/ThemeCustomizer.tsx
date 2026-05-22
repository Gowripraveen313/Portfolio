import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, MousePointer, Sparkles } from "lucide-react";
import { useTheme, themes, ThemeType } from "@/context/ThemeContext";

const ThemeCustomizer = () => {
  const { theme, setTheme, customCursor, setCustomCursor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Floating Activator Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_4px_20px_hsl(var(--glow-primary)/0.4)] border border-primary/20 hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer z-50 relative"
        whileHover={{ rotate: 15 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="palette"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center relative"
            >
              <Palette size={24} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-primary animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Glassmorphic Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, x: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-20 right-0 w-80 bg-card/85 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl p-6 glow-effect-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5 border-b border-border/40 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-primary animate-pulse" />
                <h3 className="text-lg font-bold text-foreground">Aesthetic Studio</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                Premium
              </span>
            </div>

            {/* Colors Grid */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Curated Themes</h4>
              <div className="grid grid-cols-2 gap-2.5">
                {themes.map((t) => {
                  const isActive = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                        isActive
                          ? "bg-primary/10 border-primary/50 text-foreground font-semibold shadow-inner"
                          : "bg-card hover:bg-muted/40 border-border/60 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex-shrink-0 border border-black/10 shadow-sm"
                        style={{ backgroundColor: t.colorHex }}
                      />
                      <span className="text-xs truncate">{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Features Toggles */}
            <div className="border-t border-border/40 pt-4 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <MousePointer size={14} className="text-primary animate-pulse-glow" />
                    <span className="text-sm font-medium text-foreground">Custom Cursor</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground leading-snug">
                    Dynamic trailing orb & reactive magnet hovering (Desktop)
                  </span>
                </div>

                {/* Styled Toggle Switch */}
                <button
                  onClick={() => setCustomCursor(!customCursor)}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center cursor-pointer ${
                    customCursor ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 rounded-full bg-white shadow-sm"
                    animate={{ x: customCursor ? 14 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>

            {/* Footer Tip */}
            <div className="mt-5 text-[10px] text-muted-foreground/75 text-center leading-relaxed italic border-t border-border/20 pt-3">
              💡 Tip: Hover over cards or buttons to watch the custom cursor reactive halo adapt!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeCustomizer;
