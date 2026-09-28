"use client";

import { Sparkles, TrendingDown, Users, Zap, AlertTriangle, ArrowRight, Activity, Network, CheckCircle2 } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          AI Insights
        </h2>
        <p className="text-muted-foreground mt-1">Understand what the AI is seeing across your customer portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InsightCard 
          icon={<TrendingDown className="h-5 w-5" />}
          title="Relationship deterioration detected"
          impact="High Impact"
          evidence="7 Enterprise accounts have shown a >15% drop in relationship health score over the last 14 days."
          action="Schedule immediate check-in calls with the account owners."
          priority="high"
        />
        
        <InsightCard 
          icon={<Users className="h-5 w-5" />}
          title="18 accounts require human attention"
          impact="Critical Impact"
          evidence="Combination of unresolved tickets, nearing renewal dates, and drop in product usage detected."
          action="Review Priority Queue and dispatch field team for top 3 critical accounts."
          priority="critical"
          primaryAction="Schedule Visits for Top 3"
        />

        <InsightCard 
          icon={<Zap className="h-5 w-5" />}
          title="42 customers can currently be handled through automation"
          impact="Efficiency Gain"
          evidence="Consistent positive sentiment, no open issues, and stable usage patterns over 90 days."
          action="Move to 'Low Touch' automated engagement sequence."
          priority="low"
        />

        <InsightCard 
          icon={<AlertTriangle className="h-5 w-5" />}
          title="7 high-value opportunities show declining engagement"
          impact="Revenue Risk (Est. ₹4.2M)"
          evidence="Response times from key stakeholders have increased from 2 hours to >48 hours."
          action="Trigger executive sponsorship intervention."
          priority="medium"
        />
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold text-foreground mb-6">AI Decision Transparency</h3>
        <div className="bg-card rounded-xl border border-border shadow-sm p-8">
          <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            HumanTouch AI is designed to be explainable. Here is how the engine determines when a customer needs human intervention.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            
            {/* Input Signals */}
            <div className="flex-1 bg-muted/30 rounded-lg border border-border p-6 w-full md:w-auto relative">
              <div className="flex items-center gap-2 text-foreground font-semibold mb-4">
                <Activity className="h-5 w-5 text-secondary-foreground" />
                Input Signals
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center justify-between bg-card p-2 rounded border border-border"><span>Support Tickets</span> <span className="text-xs bg-secondary/30 px-1.5 rounded text-secondary-foreground">Real-time</span></li>
                <li className="flex items-center justify-between bg-card p-2 rounded border border-border"><span>Communication Frequency</span> <span className="text-xs bg-secondary/30 px-1.5 rounded text-secondary-foreground">Real-time</span></li>
                <li className="flex items-center justify-between bg-card p-2 rounded border border-border"><span>Sentiment Analysis</span> <span className="text-xs bg-secondary/30 px-1.5 rounded text-secondary-foreground">Batch</span></li>
                <li className="flex items-center justify-between bg-card p-2 rounded border border-border"><span>Contract Value / Renewal</span> <span className="text-xs bg-secondary/30 px-1.5 rounded text-secondary-foreground">Static</span></li>
              </ul>
            </div>

            <ArrowRight className="hidden md:block h-8 w-8 text-border shrink-0" />
            <div className="md:hidden h-8 w-px bg-border my-2"></div>

            {/* AI Analysis */}
            <div className="flex-1 bg-primary/5 rounded-lg border border-primary/20 p-6 w-full md:w-auto relative">
              <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                <Network className="h-32 w-32 text-primary" />
              </div>
              <div className="flex items-center gap-2 text-primary font-semibold mb-4 relative z-10">
                <Sparkles className="h-5 w-5" />
                AI Analysis Engine
              </div>
              <div className="space-y-3 text-sm relative z-10">
                <div className="bg-card p-3 rounded border border-border shadow-sm">
                  <div className="font-medium text-foreground mb-1">Pattern Recognition</div>
                  <div className="text-muted-foreground text-xs">Identifies deviations from healthy customer baselines.</div>
                </div>
                <div className="bg-card p-3 rounded border border-border shadow-sm">
                  <div className="font-medium text-foreground mb-1">Scoring Model</div>
                  <div className="text-muted-foreground text-xs">Calculates the precise 'Human Touch' score (0-100).</div>
                </div>
              </div>
            </div>

            <ArrowRight className="hidden md:block h-8 w-8 text-border shrink-0" />
            <div className="md:hidden h-8 w-px bg-border my-2"></div>

            {/* Recommendation */}
            <div className="flex-1 bg-secondary/10 rounded-lg border border-secondary p-6 w-full md:w-auto">
              <div className="flex items-center gap-2 text-foreground font-semibold mb-4">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Recommendation
              </div>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-center gap-2 bg-card p-2 rounded border border-border shadow-sm font-medium">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                  Physical Visit Priority
                </li>
                <li className="flex items-center gap-2 bg-card p-2 rounded border border-border shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-secondary-foreground shrink-0"></div>
                  Human Follow-up
                </li>
                <li className="flex items-center gap-2 bg-card p-2 rounded border border-border shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground shrink-0"></div>
                  Automated Journey
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ icon, title, impact, evidence, action, priority, primaryAction }: any) {
  const getStyle = () => {
    if (priority === 'critical') return 'bg-primary border-primary text-primary-foreground';
    if (priority === 'high') return 'bg-secondary text-secondary-foreground';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-4">
        <div className={`p-2 rounded-lg ${priority === 'critical' ? 'bg-primary/20 text-primary' : priority === 'high' ? 'bg-secondary/50 text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground leading-tight">{title}</h3>
          <span className={`inline-block px-2 py-0.5 mt-2 rounded text-xs font-semibold ${getStyle()}`}>
            {impact}
          </span>
        </div>
      </div>
      
      <div className="space-y-4 flex-1">
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Evidence</h4>
          <p className="text-sm text-foreground">{evidence}</p>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border flex flex-col gap-3">
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Recommended Action</h4>
          <div className="flex items-center justify-between bg-muted/30 p-3 rounded border border-border">
            <span className="text-sm font-medium text-primary">{action}</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
        </div>
        
        {primaryAction && (
          <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-medium text-sm transition-all active:scale-95 hover:bg-primary/90 shadow-sm mt-1">
            {primaryAction}
          </button>
        )}
      </div>
    </div>
  );
}
