"use client";

import React, { useState, useEffect } from "react";
import { 
  Button, 
  Card, 
  Input, 
  Textarea 
} from "@nextui-org/react";
import { 
  Plus, 
  CloudUpload, 
  Trash2, 
  Clapperboard, 
  Film,
  Lock,
  User as UserIcon,
  LogOut
} from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<"landing" | "login" | "studio">("landing");
  const [isSyncing, setIsSyncing] = useState(false);
  const [scenes, setScenes] = useState([
    { id: "1", title: "Scene 01", description: "Establish wide shot." }
  ]);

  useEffect(() => { setMounted(true); }, []);

  // Load from DB when entering studio
  useEffect(() => {
    if (view === "studio") {
      fetch("/api/project")
        .then(res => res.json())
        .then(data => { if (data.scenes?.length > 0) setScenes(data.scenes); })
        .catch(() => console.log("Fresh project started."));
    }
  }, [view]);

  const saveToCloud = async () => {
    setIsSyncing(true);
    try {
      await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "DIRECTOR_MAIN_BOARD", scenes }),
      });
      alert("SYNC SUCCESSFUL");
    } catch (e) { alert("SYNC FAILED"); }
    setIsSyncing(false);
  };

  if (!mounted) return <div className="bg-black min-h-screen" />;

  const SparkleBg = () => (
    <div className="absolute inset-0 z-0 h-screen w-full">
      <SparklesCore id="bg" background="transparent" minSize={0.6} maxSize={1.4} particleDensity={80} className="h-full w-full" particleColor="#FFFFFF" />
    </div>
  );

  // --- LANDING ---
  if (view === "landing") {
    return (
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-center">
        <SparkleBg />
        <div className="relative z-10">
          <Film className="mx-auto mb-6 h-16 w-16 animate-pulse text-blue-500" />
          <h1 className="mb-4 text-7xl font-black tracking-tighter text-white uppercase">Director's Board</h1>
          <p className="mb-10 text-zinc-500 tracking-[0.3em] uppercase">Studio Orchestration</p>
          <Button size="lg" color="primary" className="px-12 font-bold" onClick={() => setView("login")}>INITIALIZE</Button>
        </div>
      </div>
    );
  }

  // --- LOGIN ---
  if (view === "login") {
    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black p-6">
        <SparkleBg />
        <Card className="relative z-10 w-full max-w-md border-white/10 bg-zinc-900/40 p-10 backdrop-blur-3xl">
          <Lock className="mx-auto mb-4 text-blue-500" size={32} />
          <h2 className="mb-8 text-center text-xl font-bold text-white uppercase">Secure Entry</h2>
          <div className="flex flex-col gap-6">
            <Input label="CREDENTIAL_ID" labelPlacement="outside" variant="bordered" placeholder="Any User" />
            <Input label="ACCESS_KEY" labelPlacement="outside" type="password" variant="bordered" placeholder="Any Password" />
            <Button color="primary" className="h-12 font-bold" onClick={() => setView("studio")}>PROCEED</Button>
          </div>
        </Card>
      </div>
    );
  }

  // --- STUDIO ---
  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="flex w-72 flex-col gap-8 border-r border-white/10 bg-zinc-950 p-6">
        <div className="flex items-center gap-3"><Clapperboard className="text-blue-500" size={24} /><span className="text-xl font-black tracking-tighter">STUDIO_V1</span></div>
        <nav className="flex flex-col gap-3">
          <Button variant="flat" color={isSyncing ? "warning" : "primary"} className="justify-start font-bold" onClick={saveToCloud} isLoading={isSyncing} startContent={<CloudUpload size={20}/>}>CLOUD SYNC</Button>
          <Button variant="light" className="justify-start text-zinc-500" onClick={() => setView("landing")} startContent={<LogOut size={20}/>}>LOGOUT</Button>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto bg-zinc-950/40 p-12">
        <div className="mx-auto max-w-6xl">
          <header className="mb-16 flex items-end justify-between border-b border-white/5 pb-8">
            <h1 className="text-4xl font-black uppercase tracking-tighter">Project_Manifesto</h1>
            <Button color="primary" startContent={<Plus size={20}/>} onClick={() => setScenes([...scenes, { id: Math.random().toString(36).substr(2, 9), title: "", description: "" }])}>ADD FRAME</Button>
          </header>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            {scenes.map((scene, index) => (
              <Card key={scene.id} className="group border-white/5 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all hover:border-blue-500/30">
                <div className="mb-10 flex items-center justify-between">
                  <span className="rounded bg-blue-500/5 px-2 py-1 font-mono text-[10px] tracking-[0.3em] text-blue-500 uppercase">Frame_0{index + 1}</span>
                  <Button isIconOnly variant="light" size="sm" className="opacity-0 transition-opacity group-hover:opacity-100" onClick={() => setScenes(scenes.filter(s => s.id !== scene.id))}><Trash2 size={16} className="text-zinc-600" /></Button>
                </div>
                
                {/* INPUTS WITH OVERLAP FIX */}
                <div className="space-y-12">
                  <Input 
                    variant="underlined" 
                    label="SCENE TITLE" 
                    labelPlacement="outside" // <--- FIX IS HERE
                    value={scene.title} 
                    onChange={(e) => { const n = [...scenes]; n[index].title = e.target.value; setScenes(n); }}
                    classNames={{ label: "text-zinc-500 font-bold text-xs tracking-widest", input: "text-xl font-bold text-white pt-2" }} 
                  />
                  <Textarea 
                    variant="bordered" 
                    label="VISUAL NOTES" 
                    labelPlacement="outside" // <--- FIX IS HERE
                    value={scene.description}
                    onChange={(e) => { const n = [...scenes]; n[index].description = e.target.value; setScenes(n); }}
                    classNames={{ label: "text-zinc-500 font-bold text-xs tracking-widest", input: "text-zinc-300" }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}