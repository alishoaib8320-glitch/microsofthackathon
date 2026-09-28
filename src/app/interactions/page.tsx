"use client";

import { Search, Filter, Mail, Phone, Calendar, AlertCircle, MessageSquare, ChevronDown, CheckCircle2, Bot } from "lucide-react";

export default function InteractionsPage() {
  const interactions = [
    { id: 1, customer: "ABC Industries", type: "Email", date: "Sep 27, 2026", summary: "Customer reported unresolved issue with integration", sentiment: "negative", urgency: "High", aiStatus: "Analyzed" },
    { id: 2, customer: "Nova Systems", type: "Call", date: "Sep 26, 2026", summary: "Discussed renewal and pricing concerns", sentiment: "neutral", urgency: "Medium", aiStatus: "Analyzed" },
    { id: 3, customer: "Vertex Solutions", type: "Meeting", date: "Sep 24, 2026", summary: "Quarterly review, positive feedback on new features", sentiment: "positive", urgency: "Low", aiStatus: "Analyzed" },
    { id: 4, customer: "Pioneer Labs", type: "Support", date: "Sep 22, 2026", summary: "Login issues, resolved by L1 support", sentiment: "neutral", urgency: "Low", aiStatus: "Analyzed" },
    { id: 5, customer: "Global Reach", type: "Email", date: "Sep 21, 2026", summary: "Request for additional licenses", sentiment: "positive", urgency: "Medium", aiStatus: "Pending" },
    { id: 6, customer: "Alpha Corp", type: "Message", date: "Sep 20, 2026", summary: "Quick check-in on project status", sentiment: "neutral", urgency: "Low", aiStatus: "Analyzed" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Interaction Intelligence</h2>
          <p className="text-muted-foreground mt-1">Review and analyze all recent customer communications.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search interactions..."
              className="h-10 w-64 pl-9 pr-4 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition-colors"
            />
          </div>
          <button className="h-10 bg-primary text-primary-foreground px-4 rounded-md font-medium text-sm transition-colors hover:bg-primary/90 hover:shadow-md flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Analyze Selected
          </button>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex space-x-2 overflow-x-auto pb-1 sm:pb-0">
            <FilterButton icon={<Filter className="h-4 w-4" />} label="All" active />
            <FilterButton icon={<Mail className="h-4 w-4" />} label="Email" />
            <FilterButton icon={<Phone className="h-4 w-4" />} label="Call" />
            <FilterButton icon={<Calendar className="h-4 w-4" />} label="Meeting" />
            <FilterButton icon={<AlertCircle className="h-4 w-4" />} label="Support" />
            <FilterButton icon={<MessageSquare className="h-4 w-4" />} label="Message" />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="h-9 px-3 border border-border rounded-md text-sm font-medium flex items-center gap-2 hover:bg-secondary/20 transition-colors text-foreground">
              Sentiment <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
            <button className="h-9 px-3 border border-border rounded-md text-sm font-medium flex items-center gap-2 hover:bg-secondary/20 transition-colors text-foreground">
              Date Range <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium w-12 text-center">
                  <input type="checkbox" className="rounded border-border" />
                </th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Summary</th>
                <th className="px-6 py-4 font-medium">Sentiment</th>
                <th className="px-6 py-4 font-medium">Urgency</th>
                <th className="px-6 py-4 font-medium">AI Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {interactions.map((i) => (
                <tr key={i.id} className="hover:bg-muted/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input type="checkbox" className="rounded border-border" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground group-hover:text-primary transition-colors">{i.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {i.type === 'Email' && <Mail className="h-3.5 w-3.5" />}
                      {i.type === 'Call' && <Phone className="h-3.5 w-3.5" />}
                      {i.type === 'Meeting' && <Calendar className="h-3.5 w-3.5" />}
                      {i.type === 'Support' && <AlertCircle className="h-3.5 w-3.5" />}
                      {i.type === 'Message' && <MessageSquare className="h-3.5 w-3.5" />}
                      {i.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{i.date}</td>
                  <td className="px-6 py-4 text-muted-foreground max-w-[250px] truncate" title={i.summary}>{i.summary}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`flex items-center gap-1.5 capitalize ${
                      i.sentiment === 'negative' ? 'text-critical-text' : 
                      i.sentiment === 'positive' ? 'text-primary' : 
                      'text-muted-foreground'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        i.sentiment === 'negative' ? 'bg-critical-text' : 
                        i.sentiment === 'positive' ? 'bg-primary' : 
                        'bg-muted-foreground'
                      }`}></div>
                      {i.sentiment}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      i.urgency === 'High' ? 'bg-primary/20 text-primary' :
                      i.urgency === 'Medium' ? 'bg-secondary text-secondary-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {i.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {i.aiStatus === 'Analyzed' ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Analyzed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-primary text-xs font-medium hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                      Analyze Interaction
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ icon, label, active }: any) {
  return (
    <button className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
      active 
        ? 'bg-secondary/30 border-secondary text-primary' 
        : 'bg-transparent border-transparent text-muted-foreground hover:bg-secondary/20 hover:text-foreground'
    }`}>
      {icon}
      {label}
    </button>
  );
}
