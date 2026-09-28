"use client";

import { useState } from "react";
import { Zap, ShieldAlert, Plus, Mail, CheckSquare, Phone, MapPin, Clock, Lock } from "lucide-react";

export default function AutomationPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Automation Center
          </h2>
          <p className="text-muted-foreground mt-1">Configure how the AI acts on different customer priority levels.</p>
        </div>
        <button className="h-10 bg-primary text-primary-foreground px-4 rounded-md font-medium text-sm transition-colors hover:bg-primary/90 hover:shadow-md flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Rule
        </button>
      </div>

      <div className="bg-secondary/20 border border-secondary rounded-xl p-4 flex items-start gap-4">
        <ShieldAlert className="h-5 w-5 text-secondary-foreground mt-0.5 shrink-0" />
        <div>
          <h3 className="font-semibold text-foreground">Important Safeguard</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Human approval is strictly required for high-impact actions (Calls and Visits). Automation will only queue these actions for review.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <AutomationRule 
          title="Low-touch Customer"
          actionTitle="Personalized Email Sequence"
          description="Automatically sends a context-aware check-in email based on recent product usage."
          icon={<Mail className="h-5 w-5 text-muted-foreground" />}
          lastTriggered="10 mins ago"
          requiresApproval={false}
          defaultEnabled={true}
        />
        
        <AutomationRule 
          title="Medium-touch Customer"
          actionTitle="Generate Follow-up Task"
          description="Creates a CRM task for the account owner with AI-generated context and suggested next steps."
          icon={<CheckSquare className="h-5 w-5 text-secondary-foreground" />}
          lastTriggered="1 hour ago"
          requiresApproval={false}
          defaultEnabled={true}
        />

        <AutomationRule 
          title="High-touch Customer"
          actionTitle="Suggest Sales Call"
          description="Drafts a call brief and prompts the account owner to schedule a call. Requires manual execution."
          icon={<Phone className="h-5 w-5 text-primary/80" />}
          lastTriggered="3 hours ago"
          requiresApproval={true}
          defaultEnabled={true}
        />

        <AutomationRule 
          title="Critical Customer"
          actionTitle="Prioritize for Human Visit"
          description="Immediately escalates to the Priority Queue and integrates into the daily Visit Planner."
          icon={<MapPin className="h-5 w-5 text-primary" />}
          lastTriggered="Yesterday"
          requiresApproval={true}
          defaultEnabled={true}
          locked={true}
        />
      </div>
    </div>
  );
}

function AutomationRule({ title, actionTitle, description, icon, lastTriggered, requiresApproval, defaultEnabled, locked }: any) {
  const [enabled, setEnabled] = useState(defaultEnabled);

  return (
    <div className={`bg-card rounded-xl border p-5 shadow-sm transition-all ${enabled ? 'border-border' : 'border-border/50 opacity-70'} ${locked ? 'bg-muted/10' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase tracking-wider">
                {title}
              </span>
              <span className="text-muted-foreground text-sm">→</span>
              <span className="font-bold text-foreground">{actionTitle}</span>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6 md:w-auto w-full border-t md:border-t-0 border-border pt-4 md:pt-0">
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> Last triggered: {lastTriggered}
            </div>
            {requiresApproval ? (
              <span className="flex items-center gap-1.5 text-xs font-medium text-secondary-foreground bg-secondary/20 px-2 py-1 rounded">
                <ShieldAlert className="h-3.5 w-3.5" /> Approval Required
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                <Zap className="h-3.5 w-3.5" /> Fully Automated
              </span>
            )}
          </div>
          
          <div className="pl-4 border-l border-border flex items-center justify-center">
            {locked ? (
              <div className="h-6 w-11 flex items-center justify-center text-muted-foreground" title="System rule - cannot be disabled">
                <Lock className="h-4 w-4" />
              </div>
            ) : (
              <button 
                onClick={() => setEnabled(!enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-primary' : 'bg-muted-foreground/30'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
