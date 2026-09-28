"use client";

import { useState, useEffect } from "react";
import { AlertCircle, ChevronDown, ChevronUp, MapPin, Phone, MessageSquare, Zap, Activity, Info } from "lucide-react";
import { fetchApi } from "@/lib/api";

export default function PriorityQueuePage() {
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    async function loadData() {
      // Fetch priorities from backend, fallback to empty array
      const priorities = await fetchApi('/priorities', []);
      
      // If we got empty array (fallback), inject mock data for UI demo purposes
      if (priorities.length === 0) {
        setData([
          { priority: 'CRITICAL', name: 'ABC Industries', humanTouchScore: 92, dealValue: 1500000, relationshipHealth: 41, reason: 'Unresolved complaint', action: 'Physical Visit' },
          { priority: 'CRITICAL', name: 'Nova Systems', humanTouchScore: 84, dealValue: 2450000, relationshipHealth: 56, reason: 'Failed follow-ups', action: 'Physical Visit' },
          { priority: 'HIGH', name: 'Vertex Solutions', humanTouchScore: 71, dealValue: 820000, relationshipHealth: 65, reason: 'Engagement declining', action: 'Call Customer' },
          { priority: 'MEDIUM', name: 'Pioneer Labs', humanTouchScore: 58, dealValue: 340000, relationshipHealth: 78, reason: 'Renewal approaching', action: 'Follow Up' },
          { priority: 'LOW', name: 'Global Reach', humanTouchScore: 24, dealValue: 4500000, relationshipHealth: 88, reason: 'Healthy relationship', action: 'Automated Check-in' }
        ]);
      } else {
        setData(priorities);
      }
    }
    loadData();
  }, []);

  const getPriorityItems = (level: string) => {
    if (!data) return [];
    return data
      .filter((c: any) => c.priority === level)
      .map((c: any) => ({
        name: c.name || c.company,
        score: c.humanTouchScore || 0,
        value: `₹${(c.dealValue || 0).toLocaleString()}`,
        health: c.relationshipHealth || 0,
        reason: c.reason || 'AI Flagged',
        action: c.action || 'Review Account',
        buttonAction: c.priority === 'CRITICAL' ? 'Schedule Visit' : 'View Account'
      }));
  };

  const criticalCount = getPriorityItems('CRITICAL').length;

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Human Attention Priority Queue</h2>
        <p className="text-muted-foreground mt-1">AI-ranked customers requiring human intervention.</p>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 flex items-start gap-4 shadow-sm">
        <div className="p-2 rounded-full bg-primary/20 text-primary mt-0.5">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{criticalCount} customers require immediate attention.</h3>
          <p className="text-sm text-muted-foreground mt-1">
            The AI engine has identified these accounts based on interaction frequency, sentiment trends, and open issues.
          </p>
        </div>
      </div>

      <div className="space-y-10">
        <QueueSection 
          title="CRITICAL" 
          description="High-value customers where immediate human intervention is recommended."
          colorClass="bg-primary text-primary-foreground"
          borderColor="border-primary/30"
          items={getPriorityItems('CRITICAL')}
        />

        <QueueSection 
          title="HIGH" 
          description="Customers requiring human follow-up."
          colorClass="bg-secondary text-secondary-foreground font-semibold"
          borderColor="border-secondary"
          items={getPriorityItems('HIGH')}
        />

        <QueueSection 
          title="MEDIUM" 
          description="Customers requiring monitoring or calls."
          colorClass="bg-muted text-muted-foreground font-medium"
          borderColor="border-border"
          items={getPriorityItems('MEDIUM')}
        />
        
        <QueueSection 
          title="LOW" 
          description="Customers suitable for automated engagement."
          colorClass="bg-muted/50 text-muted-foreground text-sm"
          borderColor="border-border/50"
          items={getPriorityItems('LOW')}
        />
      </div>
    </div>
  );
}

function QueueSection({ title, description, colorClass, borderColor, items }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 border-b border-border pb-2">
        <span className={`px-2.5 py-1 text-xs rounded-full ${colorClass}`}>
          {title}
        </span>
        <span className="text-sm text-muted-foreground">{description}</span>
      </div>
      
      <div className="space-y-4">
        {items.map((item: any, i: number) => (
          <PriorityCard key={i} item={item} borderColor={borderColor} />
        ))}
      </div>
    </div>
  );
}

function PriorityCard({ item, borderColor }: any) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className={`bg-card rounded-xl border ${borderColor} shadow-sm overflow-hidden transition-all hover:shadow-md`}>
      <div className="p-5 md:p-6 flex flex-col md:flex-row gap-6 justify-between">
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <span>Deal Value: {item.value}</span>
                <span className="w-1 h-1 rounded-full bg-border"></span>
                <span>Rel. Health: {item.health}/100</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-muted-foreground mb-1">Human Touch</div>
              <div className="text-xl font-bold text-foreground">{item.score}<span className="text-sm font-normal text-muted-foreground">/100</span></div>
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Reason</div>
                <div className="text-sm font-medium text-foreground">{item.reason}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Recommended Action</div>
                <div className="text-sm font-medium text-primary flex items-center gap-1.5">
                  {item.action === 'Physical Visit' && <MapPin className="h-4 w-4" />}
                  {item.action === 'Call Customer' && <Phone className="h-4 w-4" />}
                  {item.action === 'Follow Up' && <MessageSquare className="h-4 w-4" />}
                  {item.action === 'Automated Check-in' && <Zap className="h-4 w-4" />}
                  {item.action}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-end gap-3 md:min-w-[160px]">
          <button 
            className="w-full text-left text-xs font-medium text-muted-foreground flex items-center gap-1.5 hover:text-foreground transition-colors p-2 rounded-md hover:bg-secondary/20"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            <Info className="h-4 w-4" />
            Why is this customer here?
            {showExplanation ? <ChevronUp className="h-3 w-3 ml-auto" /> : <ChevronDown className="h-3 w-3 ml-auto" />}
          </button>
          <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-medium text-sm transition-colors hover:bg-primary/90 shadow-sm">
            {item.buttonAction}
          </button>
        </div>
      </div>
      
      {showExplanation && (
        <div className="bg-secondary/10 border-t border-border p-5 text-sm">
          <div className="flex items-start gap-3">
            <Activity className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-foreground mb-2">Signals considered by AI Engine:</div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                  Interaction frequency dropped 40%
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                  Negative sentiment in recent ticket
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                  High business value tier
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                  Relationship trend declining
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
