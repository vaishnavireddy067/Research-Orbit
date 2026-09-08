import React, { useState, useEffect, useRef } from 'react';
import { Share2, Sparkles, Flame, Award, ExternalLink, ArrowRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { PaperAnalysis } from '../types';

interface InnovationMapViewProps {
  papers: PaperAnalysis[];
  onSelectPaper: (paper: PaperAnalysis) => void;
  activePaper: PaperAnalysis | null;
}

interface GraphNode {
  id: number;
  title: string;
  domain: string;
  impactScore: number;
  noveltyScore: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  paper: PaperAnalysis;
}

interface GraphLink {
  source: number;
  target: number;
  similarity: number;
}

export const InnovationMapView: React.FC<InnovationMapViewProps> = ({
  papers,
  onSelectPaper,
  activePaper,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<PaperAnalysis | null>(activePaper || (papers.length > 0 ? papers[0] : null));
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<GraphLink[]>([]);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggedNode, setDraggedNode] = useState<GraphNode | null>(null);

  const domainColors: Record<string, string> = {
    AI: '#6366f1', // Indigo
    'Computer Science': '#8b5cf6', // Purple
    Medicine: '#10b981', // Emerald
    Physics: '#06b6d4', // Cyan
    General: '#f59e0b', // Amber
  };

  const getDomainColor = (domain?: string) => {
    if (!domain) return '#6366f1';
    for (const key in domainColors) {
      if (domain.toLowerCase().includes(key.toLowerCase())) return domainColors[key];
    }
    return '#6366f1';
  };

  // Initialize nodes and links
  useEffect(() => {
    const width = 800;
    const height = 500;
    const centerX = width / 2;
    const centerY = height / 2;

    const newNodes: GraphNode[] = papers.map((p, i) => {
      const angle = (i / Math.max(1, papers.length)) * Math.PI * 2;
      const distance = 120 + Math.random() * 80;
      return {
        id: p.id,
        title: p.title,
        domain: p.domain || 'General',
        impactScore: p.impactScore || 5.0,
        noveltyScore: p.noveltyScore || 5.0,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.max(18, Math.min(32, (p.impactScore || 5) * 3.5)),
        color: getDomainColor(p.domain),
        paper: p,
      };
    });

    // Synthesize links between papers that share domain or high impact
    const newLinks: GraphLink[] = [];
    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 1; j < newNodes.length; j++) {
        const sameDomain = newNodes[i].domain === newNodes[j].domain;
        const closeScore = Math.abs(newNodes[i].impactScore - newNodes[j].impactScore) < 2.0;
        if (sameDomain || closeScore || Math.random() < 0.25) {
          newLinks.push({
            source: newNodes[i].id,
            target: newNodes[j].id,
            similarity: sameDomain ? 0.8 : 0.5,
          });
        }
      }
    }

    setNodes(newNodes);
    setLinks(newLinks);
    if (!selectedNode && papers.length > 0) {
      setSelectedNode(papers[0]);
    }
  }, [papers]);

  // Spring physics simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(offset.x, offset.y);
      ctx.scale(scale, scale);

      // Spring physics forces
      nodes.forEach((node) => {
        // Center gravity
        const dx = canvas.width / 2 - node.x;
        const dy = canvas.height / 2 - node.y;
        node.vx += dx * 0.001;
        node.vy += dy * 0.001;

        // Repulsion from other nodes
        nodes.forEach((other) => {
          if (node.id === other.id) return;
          const diffX = node.x - other.x;
          const diffY = node.y - other.y;
          const dist = Math.sqrt(diffX * diffX + diffY * diffY) || 1;
          if (dist < 180) {
            const force = (180 - dist) / dist * 0.08;
            node.vx += diffX * force;
            node.vy += diffY * force;
          }
        });

        // Spring links attraction
        links.forEach((link) => {
          if (link.source === node.id) {
            const target = nodes.find((n) => n.id === link.target);
            if (target) {
              const lx = target.x - node.x;
              const ly = target.y - node.y;
              node.vx += lx * 0.004 * link.similarity;
              node.vy += ly * 0.004 * link.similarity;
            }
          }
        });

        // Apply friction
        node.vx *= 0.92;
        node.vy *= 0.92;

        if (draggedNode?.id !== node.id) {
          node.x += node.vx;
          node.y += node.vy;
        }
      });

      // Draw Links
      links.forEach((link) => {
        const source = nodes.find((n) => n.id === link.source);
        const target = nodes.find((n) => n.id === link.target);
        if (source && target) {
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${link.similarity * 0.25})`;
          ctx.lineWidth = link.similarity * 2;
          ctx.stroke();
        }
      });

      // Draw Nodes
      nodes.forEach((node) => {
        const isSelected = selectedNode?.id === node.id;

        // Outer glow
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(99, 102, 241, 0.3)';
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.strokeStyle = isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.4)';
        ctx.stroke();

        // Label
        ctx.fillStyle = '#f8fafc';
        ctx.font = '10px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        const truncatedTitle = node.title.length > 18 ? node.title.slice(0, 16) + '...' : node.title;
        ctx.fillText(truncatedTitle, node.x, node.y + node.radius + 14);
      });

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [nodes, links, offset, scale, selectedNode, draggedNode]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - offset.x) / scale;
    const mouseY = (e.clientY - rect.top - offset.y) / scale;

    // Check if clicked on a node
    const clickedNode = nodes.find((n) => {
      const dist = Math.hypot(n.x - mouseX, n.y - mouseY);
      return dist <= n.radius + 5;
    });

    if (clickedNode) {
      setSelectedNode(clickedNode.paper);
      setDraggedNode(clickedNode);
    } else {
      setIsDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    if (draggedNode) {
      const mouseX = (e.clientX - rect.left - offset.x) / scale;
      const mouseY = (e.clientY - rect.top - offset.y) / scale;
      draggedNode.x = mouseX;
      draggedNode.y = mouseY;
    } else if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedNode(null);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            Research Innovation Map
            <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-400">
              Knowledge Graph
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Interactive spring-physics map connecting research nodes by domain, methodology similarities, and novelty metrics.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" /> AI / NLP
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-500" /> CompSci
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Medicine
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" /> Physics
          </span>
        </div>
      </div>

      {/* Main Map & Side Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Canvas Map Area */}
        <div className="lg:col-span-2 relative rounded-3xl border border-slate-800 bg-slate-950/80 p-2 overflow-hidden shadow-2xl h-[520px]">
          
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="w-full h-full cursor-grab active:cursor-grabbing rounded-2xl"
          />

          {/* Map Controls Floating Overlay */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-xl bg-slate-900/90 border border-slate-800 p-1.5 backdrop-blur-md">
            <button
              onClick={() => setScale((s) => Math.min(2, s + 0.15))}
              title="Zoom In"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={() => setScale((s) => Math.max(0.5, s - 0.15))}
              title="Zoom Out"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setScale(1);
                setOffset({ x: 0, y: 0 });
              }}
              title="Reset View"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Node Inspector Side Panel */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 backdrop-blur-xl flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20">
                  {selectedNode.domain || 'General'}
                </span>
                <span className="text-[11px] text-slate-400">
                  Ref #{selectedNode.id}
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                {selectedNode.title}
              </h3>

              <p className="text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Authors:</span> {selectedNode.authors || 'Unknown'}
              </p>

              {/* Score Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Impact Score</div>
                  <div className="text-lg font-bold text-indigo-400 mt-0.5">
                    {selectedNode.impactScore?.toFixed(1) || '0.0'}
                    <span className="text-[10px] text-slate-500 font-normal"> / 10</span>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Novelty Rating</div>
                  <div className="text-lg font-bold text-purple-400 mt-0.5">
                    {selectedNode.noveltyScore?.toFixed(1) || '0.0'}
                    <span className="text-[10px] text-slate-500 font-normal"> / 10</span>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Executive Brief
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800/60 line-clamp-4">
                  {selectedNode.summary}
                </p>
              </div>

              <button
                onClick={() => onSelectPaper(selectedNode)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:from-indigo-500 hover:to-purple-500 transition-all mt-4"
              >
                <span>Open Full Analysis Hub</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 text-slate-500">
              <Share2 className="h-10 w-10 mb-2 opacity-50" />
              <p className="text-xs">Click any node on the graph to inspect its research intelligence profile.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
