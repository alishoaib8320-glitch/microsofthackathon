"use client";

import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Download, Calendar, Filter } from "lucide-react";

export default function AnalyticsPage() {
  const touchDistribution = [
    { name: 'Automated', value: 82, color: '#F3F4F6' },
    { name: 'Follow-up', value: 9, color: '#B8B8FF' },
    { name: 'Call', value: 6, color: 'rgba(147, 129, 255, 0.7)' },
    { name: 'Visit', value: 3, color: '#9381FF' },
  ];

  const attentionTrend = [
    { name: 'Week 1', score: 32 },
    { name: 'Week 2', score: 35 },
    { name: 'Week 3', score: 38 },
    { name: 'Week 4', score: 45 },
    { name: 'Week 5', score: 42 },
    { name: 'Week 6', score: 48 },
  ];

  const relHealth = [
    { name: 'Q1', health: 76 },
    { name: 'Q2', health: 74 },
    { name: 'Q3', health: 72 },
    { name: 'Q4 (Current)', health: 68 },
  ];

  const recommendationOutcomes = [
    { name: 'Automated', success: 92, failed: 8 },
    { name: 'Called', success: 75, failed: 25 },
    { name: 'Visited', success: 88, failed: 12 },
  ];

  const visitEffectiveness = [
    { name: 'Visits', completed: 42, resolved: 38, improved: 35 },
  ];

  const customTooltipStyle = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    color: '#1A1A1A'
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Customer Intelligence Analytics</h2>
          <p className="text-muted-foreground mt-1">Portfolio-wide insights and performance metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 border border-border bg-card rounded-md font-medium text-sm transition-colors hover:bg-secondary/20 flex items-center gap-2 text-foreground">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </button>
          <button className="h-10 px-4 border border-border bg-card rounded-md font-medium text-sm transition-colors hover:bg-secondary/20 flex items-center gap-2 text-foreground">
            <Filter className="h-4 w-4" />
            All Segments
          </button>
          <button className="h-10 bg-primary text-primary-foreground px-4 rounded-md font-medium text-sm transition-colors hover:bg-primary/90 hover:shadow-md flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Customer Touch Distribution */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-6">Customer Touch Distribution</h3>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={touchDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {touchDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={customTooltipStyle} itemStyle={{ color: '#1A1A1A' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#6B7280' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">1.2k</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Customers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Human Attention Trend */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-6">Average Human Attention Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attentionTrend} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Line type="monotone" dataKey="score" stroke="#9381FF" strokeWidth={3} dot={{ r: 4, fill: '#9381FF', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#B8B8FF', stroke: '#9381FF', strokeWidth: 2 }} name="Attention Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendation Outcomes */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-6">AI Recommendation Outcomes</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recommendationOutcomes} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: '#F3F4F6' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="success" stackId="a" fill="#9381FF" name="Successful Outcome" radius={[0, 0, 4, 4]} barSize={40} />
                <Bar dataKey="failed" stackId="a" fill="#E5E7EB" name="Unresolved" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Relationship Health */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-semibold text-foreground mb-2">Relationship Health Trend</h3>
          <p className="text-sm text-muted-foreground mb-6">Average portfolio health score over time.</p>
          
          <div className="flex-1 h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={relHealth} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} domain={[50, 100]} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Line type="monotone" dataKey="health" stroke="#B8B8FF" strokeWidth={3} dot={{ r: 4, fill: '#B8B8FF', strokeWidth: 0 }} name="Avg Health Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visit Effectiveness */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm md:col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-6">Visit Effectiveness (This Month)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted/30 p-5 rounded-lg border border-border flex flex-col items-center justify-center text-center">
              <div className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Visits Completed</div>
              <div className="text-4xl font-bold text-foreground">42</div>
            </div>
            <div className="bg-primary/10 p-5 rounded-lg border border-primary/20 flex flex-col items-center justify-center text-center">
              <div className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">Issues Resolved</div>
              <div className="text-4xl font-bold text-primary">38</div>
              <div className="text-xs text-primary/70 mt-1">90% success rate</div>
            </div>
            <div className="bg-secondary/20 p-5 rounded-lg border border-secondary flex flex-col items-center justify-center text-center">
              <div className="text-sm font-medium text-secondary-foreground mb-2 uppercase tracking-wider">Relationships Improved</div>
              <div className="text-4xl font-bold text-foreground">35</div>
              <div className="text-xs text-muted-foreground mt-1">Health score increased by &gt;10%</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
