"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

type Tab = "overview" | "analytics" | "performance";

export default function DashboardPreview() {
  // Mock data for overview vs analytics vs performance
  const data = {
    overview: {
      stats: [
        { label: "Active Subscriptions", value: "$45,231.89", trend: "+12.2% from last month", isDown: false },
        { label: "New Customers", value: "+2,350", trend: "+18.4% from last month", isDown: false },
        { label: "Retention Rate", value: "98.2%", trend: "-0.4% from last month", isDown: true },
      ],
      chart: [
        { label: "Jan", val: 40, height: "40%" },
        { label: "Feb", val: 55, height: "55%" },
        { label: "Mar", val: 45, height: "45%" },
        { label: "Apr", val: 65, height: "65%" },
        { label: "May", val: 85, height: "85%" },
        { label: "Jun", val: 75, height: "75%" },
        { label: "Jul", val: 95, height: "95%" },
        { label: "Aug", val: 90, height: "90%" },
        { label: "Sep", val: 110, height: "100%" },
      ],
    },
    analytics: {
      stats: [
        { label: "Page Views", value: "1,204,593", trend: "+24.5% from last week", isDown: false },
        { label: "Bounce Rate", value: "41.2%", trend: "-2.1% from last week", isDown: false },
        { label: "Avg. Session", value: "4m 32s", trend: "+8.9% from last week", isDown: false },
      ],
      chart: [
        { label: "Jan", val: 20, height: "20%" },
        { label: "Feb", val: 35, height: "35%" },
        { label: "Mar", val: 50, height: "50%" },
        { label: "Apr", val: 40, height: "40%" },
        { label: "May", val: 60, height: "60%" },
        { label: "Jun", val: 70, height: "70%" },
        { label: "Jul", val: 65, height: "65%" },
        { label: "Aug", val: 80, height: "80%" },
        { label: "Sep", val: 90, height: "90%" },
      ],
    },
    performance: {
      stats: [
        { label: "API Response", value: "124 ms", trend: "-12% (faster is better)", isDown: false },
        { label: "LCP Speed Index", value: "0.8s", trend: "-4% (faster is better)", isDown: false },
        { label: "Uptime SLA", value: "99.99%", trend: "Stable at 100%", isDown: false },
      ],
      chart: [
        { label: "Jan", val: 80, height: "80%" },
        { label: "Feb", val: 85, height: "85%" },
        { label: "Mar", val: 90, height: "90%" },
        { label: "Apr", val: 88, height: "88%" },
        { label: "May", val: 92, height: "92%" },
        { label: "Jun", val: 95, height: "95%" },
        { label: "Jul", val: 94, height: "94%" },
        { label: "Aug", val: 98, height: "98%" },
        { label: "Sep", val: 99, height: "99%" },
      ],
    },
  };

  return (
    <div className="max-w-[1000px] mx-auto rounded-[20px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),var(--glow-shadow)] border border-violet-500/25">
      {/* Top OS Window style bar */}
      <div className="h-12 bg-[#0f0c26]/70 flex items-center justify-between px-4 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <div className="text-[0.8rem] text-slate-500 font-medium">boilerplate-console // project-overview</div>
        <div className="w-[42px]"></div>
      </div>

      <div className="bg-[#0a051c]/90 p-6 flex flex-col gap-6 text-left">
        <Tabs defaultValue="overview" className="w-full flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-[200px] flex flex-col md:border-r md:border-white/10 pr-0 md:pr-4">
            <TabsList className="bg-transparent h-auto p-0 flex flex-row md:flex-col items-stretch justify-start gap-1 w-full overflow-x-auto md:overflow-visible">
              <TabsTrigger value="overview" className="justify-start px-3 py-2 rounded-lg text-xs font-medium text-slate-400 data-[state=active]:bg-violet-500/15 data-[state=active]:text-white border-l-2 border-transparent data-[state=active]:border-violet-500 transition-all hover:bg-white/5">
                📊 Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="justify-start px-3 py-2 rounded-lg text-xs font-medium text-slate-400 data-[state=active]:bg-violet-500/15 data-[state=active]:text-white border-l-2 border-transparent data-[state=active]:border-violet-500 transition-all hover:bg-white/5">
                📈 Visitor Analytics
              </TabsTrigger>
              <TabsTrigger value="performance" className="justify-start px-3 py-2 rounded-lg text-xs font-medium text-slate-400 data-[state=active]:bg-violet-500/15 data-[state=active]:text-white border-l-2 border-transparent data-[state=active]:border-violet-500 transition-all hover:bg-white/5">
                ⚡ Platform Health
              </TabsTrigger>
            </TabsList>
          </aside>

          {/* Main Panel Content */}
          <div className="flex-grow flex flex-col gap-6">
            {Object.keys(data).map((key) => {
              const tabData = data[key as Tab];
              return (
                <TabsContent value={key} key={key} className="m-0 flex flex-col gap-6 focus-visible:outline-none">
                  {/* Key Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {tabData.stats.map((stat, idx) => (
                      <Card className="bg-white/[0.02] border border-white/5 p-4 rounded-xl shadow-none" key={idx}>
                        <CardContent className="p-0 flex flex-col">
                          <div className="text-[0.75rem] text-slate-500 mb-1">{stat.label}</div>
                          <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                          <div className={`text-[0.72rem] mt-1 flex items-center gap-1 ${stat.isDown ? "text-red-500" : "text-emerald-500"}`}>
                            {stat.isDown ? "↓" : "↑"} {stat.trend}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Chart Card */}
                  <Card className="bg-white/[0.02] border border-white/5 p-5 rounded-xl flex flex-col shadow-none">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="flex justify-between items-center mb-5">
                        <span className="text-sm font-semibold text-white">Monthly Growth Trajectory</span>
                        <div className="flex gap-3 text-[0.72rem]">
                          <span className="flex items-center gap-1 text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                            Optimized Core
                          </span>
                          <span className="flex items-center gap-1 text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                            SaaS Nodes
                          </span>
                        </div>
                      </div>

                      {/* Chart visual bars */}
                      <div className="h-[180px] flex items-end justify-between pt-2 relative">
                        {tabData.chart.map((bar, idx) => (
                          <div className="flex flex-col items-center justify-end h-full w-[8%]" key={idx}>
                            <div className="w-full rounded-t bg-gradient-to-t from-indigo-500 to-violet-500 hover:brightness-125 transition-all duration-300 relative group/bar cursor-pointer" style={{ height: bar.height }}>
                              {/* Hover data popover */}
                              <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 bg-[#1e1b4b] text-violet-300 text-[0.65rem] px-1.5 py-0.5 rounded shadow opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">val: {bar.val}</div>
                            </div>
                            <span className="text-[0.65rem] text-slate-500 mt-2">{bar.label}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
