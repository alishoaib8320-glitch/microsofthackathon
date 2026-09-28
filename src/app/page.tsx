import Link from "next/link";
import { ArrowUpRight, ArrowRight, Clock, MapPin, Phone, Users, AlertTriangle, Zap, Activity } from "lucide-react";
import { fetchApi } from "@/lib/api";

export default async function OverviewDashboard() {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const data = await fetchApi('/dashboard', {
    totalCustomers: 1248,
    criticalAttention: 18,
    highPriority: 74,
    automated: 1032,
    visitsToday: 12,
    attentionDistribution: {
      automated: 82,
      humanFollowUp: 9,
      callRequired: 6,
      physicalVisit: 3
    }
  });

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Good morning, Alex</h2>
          <span className="text-sm font-medium text-muted-foreground px-2 py-0.5 rounded-full bg-secondary/30 ml-2">
            {currentDate}
          </span>
        </div>
        <p className="text-muted-foreground">Here’s what requires your attention today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard 
          title="Total Customers" 
          value={data.totalCustomers.toLocaleString()} 
          subValue="+8.2% this month"
          icon={<Users className="h-5 w-5 text-primary" />}
        />
        <KpiCard 
          title="Critical Attention" 
          value={data.criticalAttention.toString()} 
          subValue="Requires immediate action"
          icon={<AlertTriangle className="h-5 w-5 text-primary" />}
          highlight="critical"
        />
        <KpiCard 
          title="High Priority" 
          value={data.highPriority.toString()} 
          subValue="Human follow-up recommended"
          icon={<Activity className="h-5 w-5 text-primary" />}
        />
        <KpiCard 
          title="Automated" 
          value={data.automated.toLocaleString()} 
          subValue="No human intervention required"
          icon={<Zap className="h-5 w-5 text-primary" />}
        />
        <KpiCard 
          title="Visits Today" 
          value={data.visitsToday.toString()} 
          subValue={`${data.criticalAttention} critical accounts`}
          icon={<MapPin className="h-5 w-5 text-primary" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* Main AI Insight */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Zap className="h-32 w-32 text-primary" />
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-1">AI Attention Overview</h3>
            <p className="text-sm text-muted-foreground mb-8">Where your team's human attention is needed most.</p>
            
            <div className="mb-8">
              {/* Distribution Bar */}
              <div className="flex h-6 rounded-full overflow-hidden mb-3 border border-border/50">
                <div className="bg-secondary/40 h-full" style={{ width: `${data.attentionDistribution.automated}%` }}></div>
                <div className="bg-secondary h-full" style={{ width: `${data.attentionDistribution.humanFollowUp}%` }}></div>
                <div className="bg-primary/70 h-full" style={{ width: `${data.attentionDistribution.callRequired}%` }}></div>
                <div className="bg-primary h-full" style={{ width: `${data.attentionDistribution.physicalVisit}%` }}></div>
              </div>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary/40 border border-secondary"></div>
                  <span className="font-medium">{data.attentionDistribution.automated}%</span> <span className="text-muted-foreground">Automated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span className="font-medium">{data.attentionDistribution.humanFollowUp}%</span> <span className="text-muted-foreground">Human Follow-up</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary/70"></div>
                  <span className="font-medium">{data.attentionDistribution.callRequired}%</span> <span className="text-muted-foreground">Call Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="font-medium">{data.attentionDistribution.physicalVisit}%</span> <span className="text-muted-foreground">Physical Visit</span>
                </div>
              </div>
            </div>
            
            <Link 
              href="/priority-queue"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-2.5 rounded-md font-medium text-sm transition-colors hover:bg-primary/90 hover:shadow-md"
            >
              View Priority Queue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Priority Customers */}
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Customers Requiring Attention</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Company</th>
                    <th className="px-6 py-4 font-medium min-w-[120px]">Human Touch</th>
                    <th className="px-6 py-4 font-medium">Priority</th>
                    <th className="px-6 py-4 font-medium">Reason</th>
                    <th className="px-6 py-4 font-medium">Recommended Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <CustomerRow 
                    name="ABC Industries" company="Enterprise" score={92} priority="Critical" 
                    reason="Unresolved complaint + high deal value" action="Schedule Visit" 
                  />
                  <CustomerRow 
                    name="Nova Systems" company="Enterprise" score={84} priority="Critical" 
                    reason="Repeated failed follow-ups" action="Schedule Visit" 
                  />
                  <CustomerRow 
                    name="Vertex Solutions" company="Mid-Market" score={71} priority="High" 
                    reason="Engagement declining" action="Call Customer" 
                  />
                  <CustomerRow 
                    name="Pioneer Labs" company="SMB" score={58} priority="Medium" 
                    reason="Renewal approaching" action="Follow Up" 
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side Panel */}
        <div className="col-span-1">
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 h-full">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Recent AI Decisions</h3>
            </div>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:to-transparent">
              <ActivityItem 
                time="10 mins ago" 
                title="ABC Industries moved to Critical"
                isImportant
              />
              <ActivityItem 
                time="45 mins ago" 
                title="Nova Systems flagged for human follow-up"
              />
              <ActivityItem 
                time="2 hours ago" 
                title="Renewal reminder generated for Pioneer Labs"
              />
              <ActivityItem 
                time="3 hours ago" 
                title="14 interactions analyzed and categorized automatically"
              />
              <ActivityItem 
                time="5 hours ago" 
                title="Vertex Solutions human touch score updated based on inactivity"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, subValue, icon, highlight }: { title: string, value: string, subValue: string, icon: React.ReactNode, highlight?: "critical" }) {
  return (
    <div className={`bg-card p-5 rounded-xl border shadow-sm flex flex-col justify-between transition-shadow hover:shadow-md ${highlight === 'critical' ? 'border-primary/40 bg-secondary/10' : 'border-border'}`}>
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
        <div className={`p-2 rounded-lg ${highlight === 'critical' ? 'bg-primary/20' : 'bg-secondary/30'}`}>
          {icon}
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
        <div className="text-xs text-muted-foreground flex items-center">
          {subValue}
        </div>
      </div>
    </div>
  );
}

function CustomerRow({ name, company, score, priority, reason, action }: any) {
  const getPriorityStyle = (p: string) => {
    switch(p) {
      case 'Critical': return 'bg-secondary border-primary/20 text-primary-foreground font-semibold bg-primary';
      case 'High': return 'bg-secondary/50 border-secondary text-foreground font-medium';
      case 'Medium': return 'bg-muted border-border text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <tr className="hover:bg-muted/30 transition-colors cursor-pointer group">
      <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{company}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="w-6 font-medium text-xs">{score}</span>
          <div className="w-16 h-2 rounded-full bg-secondary/30 overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${score}%` }}></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2.5 py-1 text-xs rounded-full border ${getPriorityStyle(priority)}`}>
          {priority}
        </span>
      </td>
      <td className="px-6 py-4 text-muted-foreground max-w-[200px] truncate" title={reason}>{reason}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button className="text-primary text-xs font-medium hover:underline flex items-center group-hover:text-primary/80">
          {action}
        </button>
      </td>
    </tr>
  );
}

function ActivityItem({ time, title, isImportant }: { time: string, title: string, isImportant?: boolean }) {
  return (
    <div className="relative flex items-start gap-4">
      <div className={`absolute left-0 mt-1.5 h-3 w-3 rounded-full border-2 border-card ${isImportant ? 'bg-primary' : 'bg-secondary'} z-10`}></div>
      <div className="pl-6 pb-2 w-full">
        <div className="text-xs text-muted-foreground mb-1 flex items-center">
          <Clock className="h-3 w-3 mr-1 inline" /> {time}
        </div>
        <p className={`text-sm ${isImportant ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{title}</p>
      </div>
    </div>
  );
}
