"use client";

import { useMemo, useState } from "react";

type Mode = "client" | "staff" | "value";

const quickActions = [
  { label: "Valuta casa", detail: "Lead proprietario", icon: "🏠" },
  { label: "Voglio vendere", detail: "Richiesta vendita", icon: "📍" },
  { label: "Cerco immobile", detail: "Buyer lead", icon: "🔎" },
  { label: "Parla con agente", detail: "WhatsApp pronto", icon: "💬" }
];

const steps = [
  { title: "Che esigenza ha il cliente?", helper: "Partiamo dal motivo reale della richiesta.", options: ["Vorrei vendere", "Vorrei valutare", "Sto cercando casa", "Consulenza"] },
  { title: "Che tipo di immobile è?", helper: "Evita il classico scambio infinito di messaggi.", options: ["Appartamento", "Villa", "Casa indipendente", "Terreno", "Locale"] },
  { title: "Zona e caratteristiche", helper: "Il riepilogo resta compatto e utile per lo staff.", options: ["Centro", "Zona mare", "Periferia", "Vicino aeroporto", "Buono stato"] },
  { title: "Quanto è urgente?", helper: "La priorità aiuta l’agenzia a gestire meglio il contatto.", options: ["Subito", "Entro 7 giorni", "Questo mese", "Sto valutando"] }
];

const problemMessages = ["Quanto vale casa mia?", "Vorrei vendere", "Mi contatta un agente?", "Ho un appartamento a Cinisi", "Quanto prendete?", "Vorrei una valutazione"];
const deliverables = ["Web app mobile-first", "Link pubblico", "QR code", "WhatsApp precompilato", "Flusso guidato", "Testi personalizzati", "Colori configurabili", "Owner/staff preview", "Dashboard demo", "Collegamento sito e Instagram"];
const upgrades = ["Login staff", "Dashboard reale", "Gestione richieste", "Database clienti", "Analytics", "Automazioni", "AI assistant", "Integrazioni future"];
const channels = [{ label: "Instagram", value: 38 }, { label: "QR", value: 24 }, { label: "WhatsApp", value: 21 }, { label: "Sito", value: 17 }];

export default function Page() {
  const [mode, setMode] = useState<Mode>("client");
  const [step, setStep] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const selectedStep = steps[step];

  const whatsappMessage = useMemo(() => {
    return "Ciao, vorrei una valutazione per un appartamento di circa 110 mq a Cinisi, zona centrale. Obiettivo: capire valore e possibilità di vendita. Disponibilità: contatto entro 24h. Nome: Marco R.";
  }, []);

  return (
    <main className="safe-bottom-pad w-full max-w-full overflow-hidden">
      <Hero mode={mode} setMode={setMode} setSheetOpen={setSheetOpen} />
      <QuickActions />
      <ProblemSection />

      <section id="demo" className="app-container grid w-full max-w-full gap-4 py-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="mobile-card rounded-[2rem] p-4 sm:p-6">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">Client Mode</p>
              <h2 className="mt-1 text-balance text-2xl font-black tracking-[-0.05em] text-slate-950 sm:text-4xl">Percorso guidato, non form generico.</h2>
            </div>
            <div className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">{Math.round(((step + 1) / steps.length) * 100)}%</div>
          </div>

          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>

          <div className="mt-5 rounded-[1.5rem] bg-slate-950 p-4 text-white">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Step {step + 1}</p>
            <h3 className="mt-2 text-pretty text-xl font-black tracking-[-0.04em]">{selectedStep.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">{selectedStep.helper}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {selectedStep.options.map((option) => (
                <button key={option} type="button" className="tap-target min-w-0 rounded-2xl bg-white/10 px-3 py-3 text-left text-sm font-black text-white transition active:scale-[0.99]">
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setStep(Math.max(0, step - 1))} className="tap-target rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700">Indietro</button>
            <button type="button" onClick={() => setStep(Math.min(steps.length - 1, step + 1))} className="tap-target rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">Avanti</button>
          </div>
        </div>

        <div className="grid min-w-0 gap-4">
          <LiveSummary />
          <WhatsAppPreview message={whatsappMessage} />
        </div>
      </section>

      <OwnerSection message={whatsappMessage} />
      <DashboardSection />
      <QRSection />
      <SiteComplementSection />
      <BeforeAfterSection />
      <DeliverablesSection />
      <BusinessSystemSection />
      <FinalCTA setSheetOpen={setSheetOpen} />
      <BottomNav mode={mode} setMode={setMode} />
      {sheetOpen ? <BottomSheet setSheetOpen={setSheetOpen} /> : null}
    </main>
  );
}

function Hero({ mode, setMode, setSheetOpen }: { mode: Mode; setMode: (mode: Mode) => void; setSheetOpen: (open: boolean) => void }) {
  return (
    <header className="app-container w-full max-w-full pt-[calc(1rem+var(--safe-top))] sm:pt-8">
      <div className="grid w-full max-w-full gap-5 overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-premium backdrop-blur-2xl sm:p-7 lg:grid-cols-[1.05fr_.95fr]">
        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="max-w-full rounded-full bg-slate-950 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-white">Property Lead System</span>
            <span className="max-w-full rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">Valutazione immobile</span>
          </div>
          <h1 className="max-w-full text-balance text-[clamp(2rem,12vw,4.8rem)] font-black leading-[0.92] tracking-[-0.075em] text-slate-950">Trasforma richieste confuse in lead immobiliari qualificati</h1>
          <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-7 text-slate-600 sm:text-lg">Una web app mobile-first che guida il proprietario, raccoglie dati utili sull’immobile e prepara una richiesta ordinata per l’agenzia.</p>
          <div className="no-scrollbar -mx-1 mt-4 flex max-w-full gap-2 overflow-x-auto px-1 pb-1">
            {["Link o QR", "WhatsApp integrato", "Nessuna app", "Area staff", "Mobile-first"].map((badge) => <span key={badge} className="shrink-0 rounded-full bg-sky-50 px-3 py-2 text-xs font-black text-sky-700">{badge}</span>)}
          </div>
          <div className="mt-5 grid gap-2 sm:flex sm:flex-wrap">
            <a href="#demo" className="tap-target rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-black text-white">Prova il flusso</a>
            <button type="button" onClick={() => setMode("staff")} className="tap-target rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800">Vedi lato titolare</button>
            <button type="button" onClick={() => setSheetOpen(true)} className="tap-target rounded-2xl bg-sky-100 px-5 py-3 text-sm font-black text-sky-800">Come funziona</button>
          </div>
        </div>
        <div className="mobile-card min-w-0 rounded-[1.75rem] bg-slate-950 p-4 text-white">
          <div className="rounded-[1.35rem] bg-white/10 p-3">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/40">Demo operativa</p>
            <div className="mt-3 grid gap-2">
              {["Cliente guidato", "Riepilogo live", "WhatsApp pronto", "Staff preview"].map((item) => <div key={item} className="rounded-2xl bg-white/10 p-3 text-sm font-black">✓ {item}</div>)}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl bg-white/10 p-1">
            {(["client", "staff", "value"] as Mode[]).map((item) => <button key={item} type="button" onClick={() => setMode(item)} className={`tap-target rounded-xl px-2 py-2 text-xs font-black ${mode === item ? "bg-white text-slate-950" : "text-white/70"}`}>{item}</button>)}
          </div>
        </div>
      </div>
    </header>
  );
}

function QuickActions() {
  return <section className="app-container grid w-full max-w-full gap-3 py-5 sm:grid-cols-2 lg:grid-cols-4">{quickActions.map((action) => <div key={action.label} className="mobile-card rounded-[1.4rem] p-4"><div className="text-2xl">{action.icon}</div><p className="mt-2 text-sm font-black text-slate-950">{action.label}</p><p className="text-xs font-bold text-slate-500">{action.detail}</p></div>)}</section>;
}

function ProblemSection() {
  return <Section eyebrow="Problema reale" title="I messaggi sembrano normali, ma fanno perdere tempo."><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{problemMessages.map((msg) => <div key={msg} className="rounded-2xl bg-white/78 p-4 text-sm font-black text-slate-700 shadow-soft">“{msg}”</div>)}</div></Section>;
}

function LiveSummary() {
  return <div className="mobile-card rounded-[2rem] p-4"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Riepilogo live</p><h3 className="mt-2 text-xl font-black tracking-[-0.04em]">Richiesta pronta</h3><div className="mt-4 grid gap-2 text-sm"><Row label="Nome" value="Marco R." /><Row label="Intento" value="Valutazione immobile" /><Row label="Immobile" value="Appartamento 110 mq" /><Row label="Zona" value="Cinisi · centro" /><Row label="Priorità" value="Contatto entro 24h" /></div></div>;
}

function WhatsAppPreview({ message }: { message: string }) {
  return <div className="mobile-card rounded-[2rem] p-4"><p className="text-xs font-black uppercase tracking-[0.18em] text-green-600">WhatsApp preview</p><div className="mt-3 rounded-2xl bg-rose-50 p-3 text-sm font-bold text-rose-700">Prima: “Ciao, vorrei sapere quanto vale casa mia.”</div><div className="mt-3 rounded-2xl bg-emerald-50 p-3 text-sm font-bold leading-6 text-emerald-800">Dopo: {message}</div></div>;
}

function OwnerSection({ message }: { message: string }) {
  return <Section eyebrow="Vista titolare / staff" title="Cosa riceve l’attività"><div className="grid gap-4 lg:grid-cols-2"><StaffCard name="Marco R." priority="Alta" status="nuova" action="Inviare WhatsApp con proposta sopralluogo" /><StaffCard name="Giulia P." priority="Media" status="da confermare" action="Chiedere budget e preferenze camere" /><div className="mobile-card rounded-[1.6rem] p-4 lg:col-span-2"><p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Messaggio generato</p><p className="mt-2 text-sm font-bold leading-6 text-slate-700">{message}</p></div></div></Section>;
}

function StaffCard({ name, priority, status, action }: { name: string; priority: string; status: string; action: string }) {
  return <div className="mobile-card rounded-[1.6rem] p-4"><div className="flex min-w-0 items-center justify-between gap-3"><h3 className="text-lg font-black">{name}</h3><span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-sky-700">{status}</span></div><div className="mt-3 grid gap-2 text-sm"><Row label="Tipo" value="Valutazione immobile" /><Row label="Completezza" value="86%" /><Row label="Priorità" value={priority} /><Row label="Prossima azione" value={action} /></div></div>;
}

function DashboardSection() {
  return <Section eyebrow="Mini dashboard demo" title="Valore gestionale visibile."><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[{ label: "Richieste oggi", value: "18" }, { label: "Da confermare", value: "6" }, { label: "Completezza", value: "82%" }, { label: "Tempo risparmiato", value: "4h" }].map((m) => <div key={m.label} className="mobile-card rounded-[1.5rem] p-4"><p className="text-xs font-black uppercase text-slate-400">{m.label}</p><p className="mt-2 text-3xl font-black tracking-[-0.06em]">{m.value}</p></div>)}</div><div className="mt-4 mobile-card rounded-[1.5rem] p-4"><p className="text-sm font-black">Canali di arrivo</p><div className="mt-3 grid gap-2">{channels.map((c) => <div key={c.label} className="grid grid-cols-[5.5rem_1fr_2.5rem] items-center gap-2 text-xs font-black"><span>{c.label}</span><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-sky-500" style={{ width: `${c.value}%` }} /></div><span>{c.value}%</span></div>)}</div></div></Section>;
}

function QRSection() {
  return <Section eyebrow="QR Mode" title="Usalo anche con QR, link in bio e WhatsApp."><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{["QR in vetrina", "QR su flyer", "QR in reception", "Cartoncino", "Link in bio", "Storie Instagram", "Sito ufficiale", "WhatsApp"].map((item) => <div key={item} className="mobile-card rounded-[1.2rem] p-4 text-sm font-black">◈ {item}</div>)}</div></Section>;
}

function SiteComplementSection() {
  return <Section eyebrow="Non sostituisce il sito" title="Il sito presenta. Questa web app gestisce."><div className="grid gap-4 md:grid-cols-2"><List title="Sito" items={["presenta l’agenzia", "racconta identità", "migliora presenza online", "comunica professionalità"]} /><List title="Web app operativa" items={["guida il cliente", "raccoglie dati", "genera richieste ordinate", "si collega a WhatsApp", "può avere area staff"]} /></div></Section>;
}

function BeforeAfterSection() {
  return <Section eyebrow="Prima / Dopo" title="La differenza non è estetica. È operativa."><div className="grid gap-4 md:grid-cols-2"><List title="Prima" items={["messaggi generici", "domande ripetitive", "dati mancanti", "chat confuse", "tempo perso"]} /><List title="Dopo" items={["richiesta guidata", "dati ordinati", "WhatsApp completo", "stato richiesta", "staff organizzato"]} /></div></Section>;
}

function DeliverablesSection() {
  return <Section eyebrow="Cosa riceve l’attività" title="Deliverable chiari e vendibili."><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{deliverables.map((item) => <div key={item} className="mobile-card rounded-[1.2rem] p-4 text-sm font-black">✓ {item}</div>)}</div></Section>;
}

function BusinessSystemSection() {
  return <Section eyebrow="Evoluzione Business System" title="Base oggi, sistema più potente domani."><div className="mobile-card rounded-[1.8rem] bg-slate-950 p-4 text-white"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{upgrades.map((item) => <div key={item} className="rounded-[1.1rem] bg-white/10 p-3 text-sm font-black">◈ {item}</div>)}</div></div></Section>;
}

function FinalCTA({ setSheetOpen }: { setSheetOpen: (open: boolean) => void }) {
  return <section className="app-container py-7"><div className="overflow-hidden rounded-[2rem] bg-slate-950 p-5 text-white shadow-premium sm:p-8"><p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Risultato</p><h2 className="mt-3 text-balance text-[clamp(1.8rem,9vw,4rem)] font-black leading-[0.95] tracking-[-0.07em]">Questa non è una pagina web. È un sistema digitale operativo.</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-white/66">Aiuta l’attività a ricevere richieste migliori, risparmiare tempo e gestire meglio il primo contatto.</p><button type="button" onClick={() => setSheetOpen(true)} className="tap-target mt-5 w-full rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 sm:w-auto">Apri riepilogo demo</button></div></section>;
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="app-container w-full max-w-full py-6"><div className="mb-4 min-w-0"><p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">{eyebrow}</p><h2 className="mt-2 max-w-3xl text-balance text-[clamp(1.7rem,8vw,3.5rem)] font-black leading-[0.98] tracking-[-0.06em] text-slate-950">{title}</h2></div>{children}</section>;
}

function List({ title, items }: { title: string; items: string[] }) {
  return <div className="mobile-card rounded-[1.6rem] p-4"><p className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">{title}</p><div className="mt-3 grid gap-2">{items.map((item) => <div key={item} className="rounded-2xl bg-white/75 p-3 text-sm font-black text-slate-800">✓ {item}</div>)}</div></div>;
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex min-w-0 items-start justify-between gap-3 rounded-2xl bg-white/75 p-3"><span className="text-slate-500">{label}</span><strong className="max-w-[62%] text-right text-slate-900">{value}</strong></div>;
}

function BottomNav({ mode, setMode }: { mode: Mode; setMode: (mode: Mode) => void }) {
  return <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-xl px-3 bottom-safe"><div className="grid grid-cols-3 gap-2 rounded-[1.35rem] border border-white/70 bg-white/86 p-2 shadow-premium backdrop-blur-xl">{(["client", "staff", "value"] as Mode[]).map((item) => <button key={item} type="button" onClick={() => setMode(item)} className={`tap-target rounded-2xl px-2 py-2 text-xs font-black ${mode === item ? "bg-slate-950 text-white" : "text-slate-500"}`}>{item}</button>)}</div></nav>;
}

function BottomSheet({ setSheetOpen }: { setSheetOpen: (open: boolean) => void }) {
  return <div className="fixed inset-0 z-50 flex items-end bg-slate-950/35 p-3" onClick={() => setSheetOpen(false)}><div className="mx-auto max-h-[86dvh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-premium" onClick={(event) => event.stopPropagation()}><div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200" /><p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">Riepilogo sistema</p><h3 className="mt-2 text-2xl font-black tracking-[-0.05em]">Lead più ordinati, staff più veloce, WhatsApp più chiari.</h3><p className="mt-3 text-sm leading-6 text-slate-600">La demo mostra come un’attività può trasformare richieste generiche in richieste operative: dati raccolti, stato, priorità, riepilogo e messaggio WhatsApp pronto.</p><button type="button" onClick={() => setSheetOpen(false)} className="tap-target mt-5 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">Chiudi</button></div></div>;
}
