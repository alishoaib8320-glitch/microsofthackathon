import Link from "next/link";
import { Map, MapPin, Clock, ArrowRight, Navigation, FileText, CheckCircle2 } from "lucide-react";

export default function VisitPlannerPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Visit Planner</h2>
          <p className="text-muted-foreground mt-1">Turn AI priorities into an efficient field plan.</p>
        </div>
        <button className="h-10 bg-primary text-primary-foreground px-5 rounded-md font-medium text-sm transition-colors hover:bg-primary/90 hover:shadow-md flex items-center gap-2">
          <Navigation className="h-4 w-4" />
          Optimize Route
        </button>
      </div>

      {/* Top Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard title="Today's Visits" value="12" />
        <SummaryCard title="Critical" value="3" highlight="critical" />
        <SummaryCard title="High" value="9" />
        <SummaryCard title="Estimated Travel" value="2h 18m" icon={<Clock className="h-5 w-5 text-muted-foreground" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Today's Visits Timeline */}
        <div className="lg:col-span-3 space-y-6">
          <h3 className="text-lg font-semibold text-foreground">Today's Itinerary</h3>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[23px] before:-translate-x-px before:h-full before:w-0.5 before:bg-border">
            
            <VisitCard 
              time="09:30 AM"
              customer="ABC Industries"
              priority="Critical"
              location="Hyderabad"
              objective="Resolve outstanding service issue"
              points={[
                "Resolve complaint",
                "Discuss renewal",
                "Confirm implementation timeline"
              ]}
              status="current"
            />
            
            <VisitCard 
              time="11:15 AM"
              customer="Nova Systems"
              priority="High"
              location="Secunderabad"
              objective="Re-engage stalled opportunity"
              points={[
                "Address budget concerns",
                "Present new ROI data"
              ]}
            />

            <VisitCard 
              time="02:00 PM"
              customer="Vertex Solutions"
              priority="High"
              location="HITEC City, Hyderabad"
              objective="Quarterly business review"
              points={[
                "Review usage metrics",
                "Identify upsell opportunities"
              ]}
            />
            
          </div>
        </div>

        {/* Route View */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden sticky top-24">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/20">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <Map className="h-5 w-5 text-primary" />
                Route Optimization
              </div>
              <span className="text-xs font-medium bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-md">
                AI-optimized sequence
              </span>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-muted/30 h-[400px] w-full relative overflow-hidden flex items-center justify-center p-8">
              {/* Abstract Map UI */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#9381FF 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              <svg width="100%" height="100%" viewBox="0 0 400 300" className="drop-shadow-md">
                {/* Route Path */}
                <path d="M 80 80 Q 150 50 220 120 T 320 220" fill="none" stroke="#9381FF" strokeWidth="4" strokeDasharray="6,6" className="animate-[dash_20s_linear_infinite]" />
                
                {/* Location Points */}
                <g transform="translate(80, 80)">
                  <circle cx="0" cy="0" r="10" fill="#9381FF" />
                  <circle cx="0" cy="0" r="16" fill="none" stroke="#9381FF" strokeWidth="2" opacity="0.5" />
                  <text x="15" y="5" fontSize="12" fontWeight="bold" fill="#1A1A1A">Start / HQ</text>
                </g>
                
                <g transform="translate(180, 70)">
                  <circle cx="0" cy="0" r="8" fill="#FFFFFF" stroke="#9381FF" strokeWidth="3" />
                  <text x="12" y="4" fontSize="12" fontWeight="bold" fill="#1A1A1A">ABC Ind.</text>
                </g>

                <g transform="translate(260, 150)">
                  <circle cx="0" cy="0" r="8" fill="#FFFFFF" stroke="#9381FF" strokeWidth="3" />
                  <text x="12" y="4" fontSize="12" fontWeight="bold" fill="#1A1A1A">Nova Sys.</text>
                </g>
                
                <g transform="translate(320, 220)">
                  <circle cx="0" cy="0" r="8" fill="#FFFFFF" stroke="#9381FF" strokeWidth="3" />
                  <text x="-70" y="4" fontSize="12" fontWeight="bold" fill="#1A1A1A">Vertex Sol.</text>
                </g>
              </svg>
            </div>
            
            <div className="p-5 border-t border-border bg-card">
              <p className="text-sm text-muted-foreground mb-4">
                The AI engine has optimized this route to reduce travel time by 32 mins while prioritizing Critical accounts.
              </p>
              <button className="w-full h-10 bg-secondary/30 text-primary border border-secondary rounded-md font-medium text-sm transition-colors hover:bg-secondary/50 flex items-center justify-center gap-2">
                Send to Mobile
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, highlight, icon }: any) {
  return (
    <div className={`bg-card rounded-xl border p-4 shadow-sm ${highlight === 'critical' ? 'border-primary/40 bg-secondary/10' : 'border-border'}`}>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
        {icon && <div>{icon}</div>}
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
    </div>
  );
}

function VisitCard({ time, customer, priority, location, objective, points, status }: any) {
  return (
    <div className="relative flex items-start gap-4 z-10 group">
      <div className={`mt-1 flex flex-col items-center gap-1 w-12 shrink-0 ${status === 'current' ? 'text-primary font-bold' : 'text-muted-foreground font-medium'}`}>
        <span className="text-xs text-center">{time}</span>
      </div>
      
      <div className={`absolute left-[47px] mt-1.5 h-3 w-3 rounded-full border-2 border-card ${status === 'current' ? 'bg-primary' : 'bg-muted-foreground/30 group-hover:bg-primary/50 transition-colors'}`}></div>
      
      <div className={`w-full bg-card rounded-xl border shadow-sm overflow-hidden transition-shadow hover:shadow-md ${status === 'current' ? 'border-primary/30 ring-1 ring-primary/10' : 'border-border'}`}>
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-lg font-bold text-foreground">{customer}</h4>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {location}</span>
              </div>
            </div>
            <span className={`px-2.5 py-1 text-xs rounded-full border ${priority === 'Critical' ? 'bg-primary border-primary text-primary-foreground font-semibold' : 'bg-secondary/50 border-secondary text-foreground font-medium'}`}>
              {priority}
            </span>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-3 border border-border mb-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Objective</span>
            <span className="text-sm font-medium text-foreground">{objective}</span>
          </div>
          
          <div className="mb-5">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Suggested Talking Points</span>
            <ul className="space-y-1.5">
              {points.map((pt: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary/70 shrink-0 mt-0.5" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Link href={`/customers/abc`} className="h-9 px-4 border border-border rounded-md text-sm font-medium flex items-center justify-center hover:bg-secondary/20 transition-colors text-foreground flex-1">
              View Customer
            </Link>
            <button className="h-9 px-4 bg-secondary/30 text-primary border border-secondary rounded-md text-sm font-medium flex items-center justify-center hover:bg-secondary/50 transition-colors flex-1 gap-2">
              <FileText className="h-4 w-4" />
              Open Visit Brief
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
