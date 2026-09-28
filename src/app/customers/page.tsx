import Link from "next/link";
import { Plus, Search, Filter, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { fetchApi } from "@/lib/api";

export default async function CustomersPage() {
  const customers = await fetchApi('/customers', [
    { id: "abc", name: "ABC Industries", company: "Enterprise", value: "₹15,00,000", health: 41, touch: 92, priority: "Critical", lastInteraction: "Sep 27 (Email)", nextAction: "Schedule Visit" },
    { id: "nova", name: "Nova Systems", company: "Enterprise", value: "₹24,50,000", health: 56, touch: 84, priority: "Critical", lastInteraction: "Sep 26 (Call)", nextAction: "Schedule Visit" },
    { id: "vertex", name: "Vertex Solutions", company: "Mid-Market", value: "₹8,20,000", health: 65, touch: 71, priority: "High", lastInteraction: "Sep 22 (Meeting)", nextAction: "Call Customer" },
    { id: "pioneer", name: "Pioneer Labs", company: "SMB", value: "₹3,40,000", health: 78, touch: 58, priority: "Medium", lastInteraction: "Sep 20 (Support)", nextAction: "Follow Up" },
    { id: "global", name: "Global Reach", company: "Enterprise", value: "₹45,00,000", health: 88, touch: 24, priority: "Low", lastInteraction: "Sep 25 (Automated)", nextAction: "None (Automated)" },
    { id: "tech", name: "TechFront", company: "Mid-Market", value: "₹5,10,000", health: 92, touch: 18, priority: "Low", lastInteraction: "Sep 28 (Automated)", nextAction: "None (Automated)" },
    { id: "alpha", name: "Alpha Corp", company: "SMB", value: "₹1,80,000", health: 45, touch: 68, priority: "High", lastInteraction: "Sep 21 (Email)", nextAction: "Call Customer" },
  ]);

  const mapCustomer = (c: any) => ({
    id: c.id,
    name: c.name,
    company: c.company || c.industry || 'Unknown',
    value: c.dealValue ? `₹${c.dealValue.toLocaleString()}` : c.value,
    health: c.relationshipHealth ?? c.health ?? 0,
    touch: c.humanTouchScore ?? c.touch ?? 0,
    priority: c.priority === 'CRITICAL' ? 'Critical' : c.priority === 'HIGH' ? 'High' : c.priority === 'MEDIUM' ? 'Medium' : c.priority === 'LOW' ? 'Low' : c.priority,
    lastInteraction: c.lastInteraction || "Recently",
    nextAction: c.nextAction || "Review"
  });

  const displayCustomers = customers.map(mapCustomer);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Customers</h2>
          <p className="text-muted-foreground mt-1">Understand every customer relationship from one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search customers..."
              className="h-10 w-64 pl-9 pr-4 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition-colors"
            />
          </div>
          <button className="h-10 bg-primary text-primary-foreground px-4 rounded-md font-medium text-sm transition-colors hover:bg-primary/90 hover:shadow-md flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Customer
          </button>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
        {/* Filters */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex space-x-1 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Critical', 'High', 'Medium', 'Low'].map((filter, i) => (
              <button 
                key={filter} 
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  i === 0 ? 'bg-primary text-primary-foreground' : 'bg-transparent text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <button className="h-9 px-3 border border-border rounded-md text-sm font-medium flex items-center gap-2 hover:bg-secondary/20 transition-colors text-foreground">
              <Filter className="h-4 w-4 text-muted-foreground" />
              Industry <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
            <button className="h-9 px-3 border border-border rounded-md text-sm font-medium flex items-center gap-2 hover:bg-secondary/20 transition-colors text-foreground">
              Account Owner <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Deal Value</th>
                <th className="px-6 py-4 font-medium">Rel. Health</th>
                <th className="px-6 py-4 font-medium">Human Touch</th>
                <th className="px-6 py-4 font-medium">Priority</th>
                <th className="px-6 py-4 font-medium">Last Interaction</th>
                <th className="px-6 py-4 font-medium">Next Action</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayCustomers.map((c: any) => (
                <tr key={c.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/customers/${c.id}`} className="block">
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.company}</div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-muted-foreground">{c.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${c.health < 50 ? 'text-critical-text' : 'text-muted-foreground'}`}>{c.health}/100</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="w-6 font-medium text-xs">{c.touch}</span>
                      <div className="w-16 h-1.5 rounded-full bg-secondary/30 overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${c.touch}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs rounded-full border ${
                      c.priority === 'Critical' ? 'bg-primary border-primary text-primary-foreground font-semibold' :
                      c.priority === 'High' ? 'bg-secondary/50 border-secondary text-foreground font-medium' :
                      'bg-muted border-border text-muted-foreground'
                    }`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{c.lastInteraction}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{c.nextAction}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-secondary/50">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <div>Showing 1 to 7 of 1,248 entries</div>
          <div className="flex items-center gap-2">
            <button className="p-1 border border-border rounded disabled:opacity-50 hover:bg-secondary/20">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1">
              <button className="w-7 h-7 rounded bg-primary text-primary-foreground font-medium flex items-center justify-center">1</button>
              <button className="w-7 h-7 rounded hover:bg-secondary/20 font-medium flex items-center justify-center">2</button>
              <button className="w-7 h-7 rounded hover:bg-secondary/20 font-medium flex items-center justify-center">3</button>
              <span className="w-7 h-7 flex items-center justify-center">...</span>
            </div>
            <button className="p-1 border border-border rounded hover:bg-secondary/20">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
