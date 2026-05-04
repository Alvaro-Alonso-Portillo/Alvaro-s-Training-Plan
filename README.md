# Alvaro's Training Plan

Dashboard de entrenamiento semanal con:

- React + Vite
- Tailwind CSS
- Recharts
- Persistencia local en `localStorage`
- Sincronizacion con Google Sheets (lectura y guardado)

## Desarrollo local

```bash
npm install
npm run dev
```

## Variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
VITE_SHEETS_SYNC_URL=
```

`VITE_SHEETS_SYNC_URL` debe apuntar al Web App URL de Google Apps Script.

## Sincronizacion con Google Sheets

La guia completa para configurar Apps Script esta en:

- `docs/GOOGLE_SHEETS_SYNC.md`
