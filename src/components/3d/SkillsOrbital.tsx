import React, { useState } from 'react';
import { Database, Cpu, Globe, Smartphone, BarChart3, Map, Bot, Palette, Atom, Sparkles } from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  description: string;
  angle: number;
  radius: number;
}

const SKILL_NODES: SkillNode[] = [
  { id: 'fintech', name: 'FINTECH', category: 'TRACK 01', icon: Database, description: 'Micro-payments, financial inclusion engines, & AI fraud prevention algorithms.', angle: 0, radius: 200 },
  { id: 'marketing', name: 'CONSUMER AI', category: 'TRACK 02', icon: BarChart3, description: 'Predictive consumer analytics, transparent marketing, & brand sentiment engines.', angle: 36, radius: 215 },
  { id: 'supply', name: 'SMART LOGISTICS', category: 'TRACK 03', icon: Map, description: 'Green supply chains, inventory forecasting, & circular economy telemetry.', angle: 72, radius: 190 },
  { id: 'mgmt', name: 'ENTREPRENEURSHIP', category: 'TRACK 04', icon: Cpu, description: 'Disruptive business tools, digital workforce platforms, & social enterprise engines.', angle: 108, radius: 220 },
  { id: 'fullstack', name: 'FULLSTACK WEB', category: 'EXECUTION', icon: Globe, description: 'High-performance web apps, interactive dashboards, & SaaS architectures.', angle: 144, radius: 195 },
  { id: 'mobile', name: 'MOBILE APPS', category: 'EXECUTION', icon: Smartphone, description: 'Cross-platform mobile interfaces for on-ground enterprise and consumer tools.', angle: 180, radius: 210 },
  { id: 'ai', name: 'MACHINE LEARNING', category: 'TECHNOLOGY', icon: Bot, description: 'Predictive modeling, NLP sentiment analysis, & automated decision engines.', angle: 216, radius: 225 },
  { id: 'design', name: 'UI / UX DESIGN', category: 'CREATIVE', icon: Palette, description: 'Neo-brutalist interfaces, accessible design systems, & user journey design.', angle: 252, radius: 200 },
  { id: 'data', name: 'DATA SCIENCE', category: 'ANALYTICS', icon: Atom, description: 'Transforming complex datasets into decision-ready business intelligence.', angle: 288, radius: 230 },
  { id: 'sdg', name: 'SDG IMPACT', category: 'SUSTAINABILITY', icon: Sparkles, description: 'Direct alignment with United Nations 2030 Sustainable Development Goals.', angle: 324, radius: 205 },
];

export const SkillsOrbital: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode>(SKILL_NODES[0]);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-12 px-4 flex flex-col items-center">
      <div className="relative w-[320px] sm:w-[460px] md:w-[580px] h-[320px] sm:h-[460px] md:h-[580px] flex items-center justify-center">
        {/* Concentric Brutalist Orbit Rings */}
        <div className="absolute w-[280px] sm:w-[380px] md:w-[460px] h-[280px] sm:h-[380px] md:h-[460px] border-2 border-[#050505] animate-orbit" />
        <div className="absolute w-[180px] sm:w-[260px] md:w-[340px] h-[180px] sm:h-[260px] md:h-[340px] border-2 border-[#FC3D21] border-dashed animate-orbit-reverse" />

        {/* Center Node */}
        <div className="relative z-20 w-24 sm:w-32 md:w-36 h-24 sm:h-32 md:h-36 bg-[#FC3D21] border-3 border-[#050505] shadow-brutal flex flex-col items-center justify-center text-center p-2 text-white">
          <div className="p-1.5 bg-[#FFD600] text-[#050505] border border-[#050505] mb-1">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="font-space font-black text-xs sm:text-sm tracking-wider uppercase">SDG 2030</span>
          <span className="font-mono text-[9px] sm:text-[10px] text-white font-bold">CORE ENGINE</span>
        </div>

        {/* Orbiting Skill Nodes */}
        {SKILL_NODES.map((node) => {
          const IconComponent = node.icon;
          const isSelected = selectedSkill.id === node.id;
          const angleRad = (node.angle * Math.PI) / 180;
          const radiusScale = typeof window !== 'undefined' && window.innerWidth < 640 ? 0.6 : 0.95;
          const x = Math.cos(angleRad) * (node.radius * radiusScale);
          const y = Math.sin(angleRad) * (node.radius * radiusScale);

          return (
            <button
              key={node.id}
              onClick={() => setSelectedSkill(node)}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              aria-label={`Select skill track ${node.name}`}
              className="absolute z-30 transition-all duration-200 transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#050505] flex items-center justify-center shadow-brutal-sm transition-all ${
                  isSelected
                    ? 'scale-125 bg-[#FFD600] text-[#050505]'
                    : 'bg-white text-[#050505] hover:bg-[#FC3D21] hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div
                className={`mt-1 font-mono text-[10px] sm:text-xs whitespace-nowrap px-2 py-0.5 border-2 border-[#050505] ${
                  isSelected
                    ? 'bg-[#050505] text-[#FFD600] font-black'
                    : 'bg-white text-[#050505] font-bold'
                }`}
              >
                {node.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Skill Info Panel */}
      <div className="w-full max-w-xl mt-8 p-6 bg-white border-3 border-[#050505] shadow-brutal-lg text-left">
        <div className="flex items-center gap-4 mb-3">
          <div className="p-3 bg-[#FC3D21] text-white border-2 border-[#050505]">
            {React.createElement(selectedSkill.icon, { className: 'w-6 h-6' })}
          </div>
          <div>
            <div className="font-mono text-xs text-[#FC3D21] font-extrabold tracking-widest uppercase">
              {selectedSkill.category}
            </div>
            <h3 className="font-space font-black text-xl text-[#050505] uppercase">
              {selectedSkill.name}
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-800 font-sans font-medium leading-relaxed">
          {selectedSkill.description}
        </p>

        <div className="mt-4 pt-3 border-t-2 border-[#050505]/20 flex items-center justify-between text-xs font-mono text-[#050505] font-extrabold">
          <span>PRAGYAN 2K26 HACKATHON</span>
          <span className="text-[#FC3D21]">SANJIVANI UNIVERSITY</span>
        </div>
      </div>
    </div>
  );
};
