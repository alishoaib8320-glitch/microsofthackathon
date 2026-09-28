"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, AlertCircle, MapPin, Paperclip } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello Alex. I'm your HumanTouch AI Assistant. I've analyzed your portfolio today and noticed 18 accounts require immediate attention. How can I help you manage them?",
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userText = input;
    const newMsg = { id: Date.now(), role: "user", content: userText };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulate AI response logic based on input keywords
    setTimeout(() => {
      let aiContent = "I've processed your request. Is there anything else you'd like me to look into?";
      let hasAction = false;
      let actionTitle = "";
      let actionDesc = "";
      let actionBtn = "";

      const lowerText = userText.toLowerCase();

      if (lowerText.includes("schedule") || lowerText.includes("visit") || lowerText.includes("nova")) {
        aiContent = "Based on the latest data from Nova Systems, I've drafted a follow-up email and suggested three available times for a physical visit next week. Would you like me to go ahead and schedule that visit for you?";
        hasAction = true;
        actionTitle = "Action Suggested";
        actionDesc = "Schedule physical visit with Nova Systems at Secunderabad.";
        actionBtn = "Schedule Visit";
      } else if (lowerText.includes("hello") || lowerText.includes("hi")) {
        aiContent = "Hello! I am HumanTouch AI. How can I assist you with your customer portfolio today?";
      } else if (lowerText.includes("report") || lowerText.includes("analytics")) {
        aiContent = "I've generated a brief report on your recent interactions. Your team's average response time has improved by 15% this week. I can send the full PDF report to your email.";
      } else if (lowerText.includes("critical") || lowerText.includes("priority")) {
        aiContent = "You have 3 critical accounts that require immediate attention: ABC Industries, Nova Systems, and Vertex Solutions. I recommend checking the Priority Queue for more details.";
      } else {
        aiContent = `I understand you're asking about "${userText.length > 20 ? userText.substring(0, 20) + '...' : userText}". As an AI assistant in this dashboard, I can help you schedule visits, analyze customer sentiment, or pull up specific account health metrics. What would you like to do?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: aiContent,
          action: hasAction ? { title: actionTitle, desc: actionDesc, btn: actionBtn } : undefined
        }
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-card rounded-xl border border-border shadow-sm overflow-hidden relative">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-lg text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">AI Assistant</h2>
          <p className="text-xs text-muted-foreground">Powered by HumanTouch Engine</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">
                <Bot className="h-4 w-4" />
              </div>
            )}
            
            <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${
              msg.role === 'user' 
                ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                : 'bg-muted/50 border border-border text-foreground rounded-tl-sm'
            }`}>
              <p className="leading-relaxed">{msg.content}</p>
              
              {/* Interactive Component Example in Chat */}
              {msg.role === 'assistant' && (msg as any).action && (
                <div className="mt-4 p-3 bg-card border border-border rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 font-medium text-foreground mb-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {(msg as any).action.title}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{(msg as any).action.desc}</p>
                  <button className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded transition-transform active:scale-95 hover:bg-primary/90">
                    {(msg as any).action.btn}
                  </button>
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm shrink-0 mt-1">
                A
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background border-t border-border">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2 max-w-3xl mx-auto">
          <div className="relative flex-1 bg-card rounded-xl border border-border shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
            <button type="button" className="absolute left-3 bottom-3 text-muted-foreground hover:text-foreground transition-colors p-1">
              <Paperclip className="h-5 w-5" />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask the AI Assistant to analyze accounts, draft emails, or schedule visits..."
              className="w-full bg-transparent border-none py-3.5 pl-12 pr-12 focus:outline-none resize-none min-h-[56px] max-h-32 text-sm text-foreground custom-scrollbar"
              rows={1}
            />
          </div>
          <button 
            type="submit" 
            disabled={!input.trim()}
            className="h-14 w-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center transition-all disabled:opacity-50 disabled:hover:scale-100 hover:bg-primary/90 active:scale-95 shadow-sm shrink-0"
          >
            <Send className="h-5 w-5 ml-1" />
          </button>
        </form>
        <div className="text-center mt-3 text-xs text-muted-foreground">
          AI Assistant can make mistakes. Consider verifying critical account decisions.
        </div>
      </div>
    </div>
  );
}
