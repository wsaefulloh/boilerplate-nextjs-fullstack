import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card className="glass-card bg-[rgba(255,255,255,0.03)] border border-white/10 hover:border-violet-500/30 hover:bg-[rgba(255,255,255,0.06)] transition-all duration-300 relative overflow-hidden p-8 rounded-[20px]">
      <CardContent className="p-0 flex flex-col items-start text-left">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-violet-500 transition-all duration-300 group-hover:bg-violet-500/10 group-hover:border-violet-500/30 group-hover:text-white">{icon}</div>
        <h3 className="text-xl font-semibold mb-3 tracking-tight text-slate-100">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-400">{description}</p>
      </CardContent>
    </Card>
  );
}
