// Lightweight FAQ-style chat widget with canned responses for common questions.
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Msg = { role: "user" | "bot"; content: string };

const SUGGESTIONS = [
  "What services do you offer?",
  "How much does lawn care cost?",
  "Do you offer free consultations?",
  "What areas do you serve?",
];

function botReply(q: string): string {
  // Route the message to a matching canned response based on keywords.
  const t = q.toLowerCase();
  if (t.includes("price") || t.includes("cost") || t.includes("quote"))
    return "Pricing depends on the size and scope of the project. Most lawn maintenance plans start at $79/visit. Request a free quote on our Contact page and we'll get back within 24 hours.";
  if (t.includes("area") || t.includes("location") || t.includes("serve"))
    return "We proudly serve Calgary and the surrounding communities. Share your address on the Contact page and we'll confirm coverage before scheduling.";
  if (t.includes("consult"))
    return "Yes! Every project starts with a free on-site consultation. Book one from the Contact page.";
  if (t.includes("service"))
    return "Our services include lawn maintenance, garden design, tree trimming, outdoor lighting, hardscaping, and yard cleanups. See the Services page for details.";
  if (t.includes("hour") || t.includes("open"))
    return "We're open Monday to Saturday, 8am – 6pm. Closed Sundays.";
  return "Thanks for your message! A team member will follow up shortly. For the fastest response, request a free quote on the Contact page.";
}

export function ChatWidget() {
  // The widget stays local-state only so it can feel interactive without backend wiring.
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      content: "Hi! 🌿 I'm the Cozy Green assistant. Ask me anything about our services.",
    },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", content: botReply(q) }]);
    }, 500);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-accent text-accent-foreground grid place-items-center shadow-lg hover:scale-105 transition-transform"
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-6 z-40 w-[90vw] max-w-sm h-[480px] bg-card text-card-foreground rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden"
          >
            <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 grid place-items-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">Cozy Green Assistant</div>
                <div className="text-xs opacity-80">Typically replies instantly</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-card border border-border"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {messages.length <= 1 && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="p-3 border-t border-border flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                maxLength={500}
              />
              <Button type="submit" size="icon" aria-label="Send">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
