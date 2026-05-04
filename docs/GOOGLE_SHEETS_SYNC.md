# Configurar guardado en Google Sheets con Apps Script

Esta guia conecta el boton `Save Excel` de la app con tu Google Sheet.

## 1) Crear el proyecto de Apps Script

1. Abre `https://script.google.com`.
2. Crea un proyecto nuevo.
3. Reemplaza el contenido de `Code.gs` por este script.

```javascript
const SPREADSHEET_ID = '19Gz2ed9zG5NuKARDaxD2thhnYQbO1LHvsiUAwxj0omY';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const plan = body.plan;

    if (!plan || !Array.isArray(plan.weeks)) {
      return jsonResponse({ ok: false, error: 'Payload invalido: falta plan.weeks' }, 400);
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    plan.weeks.forEach((week) => {
      const sheet = spreadsheet.getSheetByName(week.name);
      if (!sheet) return;
      writeWeekToSheet(sheet, week);
    });

    return jsonResponse({ ok: true, message: 'Guardado en Google Sheets completado.' }, 200);
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) }, 500);
  }
}

function doGet() {
  return jsonResponse({ ok: true, message: 'Apps Script activo' }, 200);
}

function writeWeekToSheet(sheet, week) {
  const values = sheet.getDataRange().getValues();
  const dayHeaderRows = [];

  for (let i = 0; i < values.length; i += 1) {
    const colB = String(values[i][1] || '').trim();
    if (/^Day\s+\d+:/i.test(colB)) {
      dayHeaderRows.push(i + 1);
    }
  }

  week.days.forEach((day, dayIdx) => {
    const startRow = dayHeaderRows[dayIdx];
    if (!startRow) return;

    day.exercises.forEach((exercise, exIdx) => {
      const row = startRow + 1 + exIdx;
      sheet.getRange(row, 2).setValue(exercise.exercise || ''); // B Exercise
      sheet.getRange(row, 3).setValue(exercise.sets || ''); // C Sets
      sheet.getRange(row, 4).setValue(exercise.reps || ''); // D Reps
      sheet.getRange(row, 5).setValue(exercise.weight || ''); // E Weight
      sheet.getRange(row, 6).setValue(exercise.rest || ''); // F Rest
      sheet.getRange(row, 7).setValue(exercise.notes || ''); // G Notes
      sheet.getRange(row, 8).setValue(Boolean(exercise.completed)); // H Completed
    });
  });
}

function jsonResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
```

## 2) Publicar como Web App

1. `Deploy` -> `New deployment`.
2. Tipo: `Web app`.
3. `Execute as`: `Me`.
4. `Who has access`: `Anyone` (o `Anyone with the link`).
5. Deploy y copia la URL.

## 3) Configurar la app React

1. En el proyecto, crea `.env`:

```bash
VITE_SHEETS_SYNC_URL="https://script.google.com/macros/s/XXXXX/exec"
```

2. Reinicia el dev server:

```bash
npm run dev
```

3. En la app, usa `Save Excel` para enviar cambios a Sheets.

## 4) Verificar

- Marca un ejercicio como completado y pon peso.
- Pulsa `Save Excel`.
- Revisa la hoja correspondiente (`Week N`): columnas `Weight`, `Notes`, `Completed` deben actualizarse.

## Notas

- La app sigue guardando en `localStorage` automaticamente.
- `Sync Excel` trae estructura y semanas desde Sheets.
- `Save Excel` envia progreso local a Sheets.
- Si agregas una semana nueva en el Excel, la app la mostrara al hacer `Sync Excel`.
