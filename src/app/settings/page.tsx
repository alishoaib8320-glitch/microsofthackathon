"use client";

import { useState } from "react";
import { User, Users, Bell, BrainCircuit, Zap, Shield, Save } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("ai-preferences");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "team", label: "Team", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "ai-preferences", label: "AI Preferences", icon: BrainCircuit },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="max-w-[1200px] mx-auto pb-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Nav */}
      <div className="w-full md:w-64 shrink-0 space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground mb-4 px-3">Settings</h2>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-secondary/50 text-foreground font-semibold'
                : 'text-muted-foreground hover:bg-secondary/20 hover:text-foreground'
            }`}
          >
            <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-primary' : ''}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-3xl">
        {activeTab === "ai-preferences" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground">AI Preferences</h3>
              <p className="text-sm text-muted-foreground mt-1">Configure how the HumanTouch AI engine evaluates your accounts.</p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <h4 className="text-base font-semibold text-foreground mb-4">Human Touch Thresholds</h4>
              <p className="text-sm text-muted-foreground mb-6">
                Adjust the scoring thresholds (0-100) that determine customer priority levels. The AI engine uses these brackets to categorize accounts.
              </p>

              <div className="space-y-6">
                <ThresholdInput label="Critical" range="80–100" colorClass="bg-primary border-primary text-primary-foreground" description="Requires immediate human intervention (Visits)" defaultMin={80} defaultMax={100} />
                <ThresholdInput label="High" range="61–79" colorClass="bg-secondary text-secondary-foreground" description="Requires prioritized follow-up (Calls)" defaultMin={61} defaultMax={79} />
                <ThresholdInput label="Medium" range="31–60" colorClass="bg-muted border-border text-muted-foreground" description="Requires standard monitoring" defaultMin={31} defaultMax={60} />
                <ThresholdInput label="Low" range="0–30" colorClass="bg-muted/50 border-border/50 text-muted-foreground" description="Suitable for automated engagement" defaultMin={0} defaultMax={30} />
              </div>

              <div className="mt-8 pt-6 border-t border-border flex justify-end">
                <button className="h-10 bg-primary text-primary-foreground px-6 rounded-md font-medium text-sm transition-colors hover:bg-primary/90 hover:shadow-md flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </div>
            
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm opacity-50">
              <h4 className="text-base font-semibold text-foreground mb-4">Signal Weighting</h4>
              <p className="text-sm text-muted-foreground">Advanced configuration for AI signal weights is currently locked by your organization administrator.</p>
            </div>
          </div>
        )}
        
        {activeTab !== "ai-preferences" && (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground bg-card rounded-xl border border-border shadow-sm border-dashed">
            <p>This settings page is a placeholder for the hackathon prototype.</p>
            <button onClick={() => setActiveTab('ai-preferences')} className="text-primary mt-2 font-medium hover:underline text-sm">
              View AI Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ThresholdInput({ label, range, colorClass, description, defaultMin, defaultMax }: any) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
      <div className="w-32 shrink-0">
        <span className={`inline-block px-2.5 py-1 text-xs rounded-full border font-medium ${colorClass}`}>
          {label}
        </span>
      </div>
      
      <div className="flex items-center gap-2 shrink-0">
        <input 
          type="number" 
          defaultValue={defaultMin}
          className="w-16 h-9 px-2 text-center rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium"
        />
        <span className="text-muted-foreground text-sm font-medium">to</span>
        <input 
          type="number" 
          defaultValue={defaultMax}
          className="w-16 h-9 px-2 text-center rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium"
        />
      </div>
      
      <p className="text-xs text-muted-foreground sm:ml-4">{description}</p>
    </div>
  );
}
