"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, User, Calendar, MessageSquare, AlertCircle, Phone, ArrowUpRight, CheckCircle2, TrendingDown, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { fetchApi } from "@/lib/api";

export default function CustomerProfile() {
  const params = useParams();
  const customerId = params.id as string;
  const [customer, setCustomer] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const custData = await fetchApi<any>(`/customers/${customerId}`, null);
      if (custData) {
        setCustomer(custData);
      } else {
        // Fallback dummy data for UI display if backend fails
        setCustomer({
          name: "ABC Industries",
          company: "Enterprise",
          location: "Hyderabad",
          assignedUser: { name: "Rahul Sharma" },
          dealValue: 1500000,
          relationshipHealth: 41,
          humanTouchScore: 92,
          priority: "CRITICAL",
          interactions: [
            { id: 1, interactionDate: "2026-09-27", type: "EMAIL", content: "Customer reported unresolved issue", sentiment: "negative" },
            { id: 2, interactionDate: "2026-09-26", type: "SUPPORT", content: "Complaint opened", sentiment: "negative" },
            { id: 3, interactionDate: "2026-09-24", type: "CALL", content: "Follow-up required", sentiment: "neutral" },
            { id: 4, interactionDate: "2026-09-22", type: "MEETING", content: "Opportunity discussed", sentiment: "positive" }
          ]
        });
      }

      const aiData = await fetchApi<any>(`/analyze-customer/${customerId}`, null);
      if (aiData && aiData.analysis) {
        setAnalysis(aiData);
      } else {
        setAnalysis({
          analysis: {
            recommendedAction: "PHYSICAL_VISIT",
            reasons: [
              "High-value opportunity",
              "Complaint remains unresolved",
              "Multiple unanswered follow-ups",
              "Negative sentiment detected",
              "Relationship health declining"
            ]
          },
          memoryContext: {
            relevantMemories: [
              { memory: "Previously reported implementation issue", relevance: 0.94 },
              { memory: "Two previous follow-ups were unsuccessful", relevance: 0.91 },
              { memory: "Customer historically prefers technical discussions", relevance: 0.83 }
            ]
          }
        });
      }
      setLoading(false);
    }
    loadData();
  }, [customerId]);

  const chartData = [
    { name: "Sep 1", value: 72 },
    { name: "Sep 10", value: 68 },
    { name: "Sep 17", value: 61 },
    { name: "Sep 24", value: 49 },
    { name: "Sep 27", value: customer?.relationshipHealth || 41 },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      <Link href="/customers" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Customers
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{customer.name}</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-medium border border-secondary">
              {customer.company}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {customer.location || 'Hyderabad'}</div>
            <div className="flex items-center gap-1.5"><User className="h-4 w-4" /> {customer.assignedUser?.name || 'Unassigned'}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-md border border-primary text-primary font-medium text-sm transition-colors hover:bg-secondary/30">
            Analyze with AI
          </button>
          <button className="h-10 px-4 rounded-md border border-border bg-card text-foreground font-medium text-sm transition-colors hover:bg-secondary/20">
            Create Follow-up
          </button>
          <button className="h-10 bg-primary text-primary-foreground px-4 rounded-md font-medium text-sm transition-colors hover:bg-primary/90 hover:shadow-md">
            Schedule Visit
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Deal Value</h4>
          <div className="text-2xl font-bold text-foreground">₹{(customer.dealValue || 0).toLocaleString()}</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Relationship Health</h4>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-foreground">{customer.relationshipHealth}<span className="text-sm font-normal text-muted-foreground">/100</span></div>
            <TrendingDown className="h-5 w-5 text-critical-text" />
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Human Touch</h4>
          <div className="flex items-center gap-3 mt-1">
            <div className="text-2xl font-bold text-foreground leading-none">{customer.humanTouchScore}<span className="text-sm font-normal text-muted-foreground">/100</span></div>
            <div className="w-full h-1.5 rounded-full bg-secondary/30 overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${customer.humanTouchScore}%` }}></div>
            </div>
          </div>
        </div>
        <div className="bg-primary/10 rounded-xl border border-primary/20 p-5 shadow-sm">
          <h4 className="text-sm font-medium text-primary mb-1">Current Priority</h4>
          <div className="text-2xl font-bold text-primary">{customer.priority}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* AI Recommendation Card */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-primary/30 shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 text-primary font-semibold mb-4">
                <AlertCircle className="h-5 w-5" />
                AI Recommendation
              </div>
              <h3 className="text-xl font-bold text-foreground mb-6">
                {analysis?.analysis?.recommendedAction === 'PHYSICAL_VISIT' ? 'Physical visit recommended within 24 hours.' : 
                 analysis?.analysis?.recommendedAction === 'SALES_CALL' ? 'Immediate sales call recommended.' : 
                 analysis?.analysis?.recommendedAction === 'FOLLOW_UP' ? 'Human follow-up required.' :
                 'Automated communication suggested.'}
              </h3>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Why?</h4>
                <ul className="space-y-2">
                  {(analysis?.analysis?.reasons || []).map((reason: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="text-primary font-medium text-sm flex items-center hover:underline group">
                View Full Analysis <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
          
          {/* Relationship Memory */}
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-secondary/5">
              <h3 className="text-lg font-semibold text-foreground">Relationship Memory</h3>
              <p className="text-sm text-muted-foreground mt-1">Long-term context retrieved by Hindsight.</p>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {(analysis?.memoryContext?.relevantMemories || []).map((mem: any, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 rounded bg-primary/10 text-primary">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground">{mem.memory}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Relevance: {(mem.relevance * 100).toFixed(0)}%</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Relationship Health Chart */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Relationship Health Trend</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#1A1A1A', fontWeight: 600 }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#9381FF" strokeWidth={3} dot={{ r: 4, fill: '#9381FF', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#B8B8FF', stroke: '#9381FF', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Interaction Timeline */}
        <div className="col-span-1">
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 h-full">
            <h3 className="text-lg font-semibold text-foreground mb-6">Interaction Timeline</h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 md:before:hidden before:h-full before:w-0.5 before:bg-border">
              {(customer.interactions || []).map((interaction: any) => (
                <TimelineItem 
                  key={interaction.id}
                  date={new Date(interaction.interactionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} 
                  type={interaction.type} 
                  summary={interaction.content || interaction.subject || 'Interaction recorded'} 
                  sentiment={interaction.sentiment?.toLowerCase() || 'neutral'} 
                  icon={
                    interaction.type === 'EMAIL' ? <MessageSquare className="h-4 w-4" /> :
                    interaction.type === 'CALL' ? <Phone className="h-4 w-4" /> :
                    interaction.type === 'MEETING' ? <Calendar className="h-4 w-4" /> :
                    <AlertCircle className="h-4 w-4" />
                  } 
                />
              ))}
            </div>
            
            <button className="w-full mt-6 py-2 border border-border rounded-md text-sm font-medium text-foreground hover:bg-secondary/20 transition-colors">
              View All Interactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ date, type, summary, sentiment, icon }: any) {
  const getSentimentColor = () => {
    if (sentiment === 'negative') return 'bg-critical-text';
    if (sentiment === 'positive') return 'bg-primary';
    return 'bg-muted-foreground';
  };

  return (
    <div className="relative flex items-start gap-4">
      <div className="absolute left-0 mt-1 h-8 w-8 rounded-full bg-secondary/30 border border-secondary flex items-center justify-center text-primary z-10">
        {icon}
      </div>
      <div className="pl-12 w-full pb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-muted-foreground">{date}</span>
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${getSentimentColor()}`}></div>
            <span className="text-xs text-muted-foreground capitalize">{sentiment}</span>
          </div>
        </div>
        <div className="text-sm font-medium text-foreground mb-1">{type}</div>
        <p className="text-sm text-muted-foreground">{summary}</p>
      </div>
    </div>
  );
}
