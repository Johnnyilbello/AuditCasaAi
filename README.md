# Property Lead System

Demo Next.js + TypeScript + Tailwind CSS per una web app operativa mobile-first dedicata a valutazione immobile e lead qualificati.

## Avvio locale

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Mobile QA

```bash
npm run qa:mobile
```

La UI è stata progettata con priorità 320px–430px:

- niente `100vw` o `w-screen`
- container fluidi e `max-width: 100%`
- `min-width: 0` globale e su card critiche
- `overflow-x: hidden` su html/body
- testi con wrapping sicuro
- bottom nav con safe area
- bottom sheet con altezza massima basata su `dvh`
- CTA e tap target minimi da 44px
- griglie responsive reali

## Deploy Vercel

Carica la repo su GitHub e importa il progetto da Vercel. Il progetto usa App Router.
