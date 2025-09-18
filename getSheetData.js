async function getSheetData({ sheetID, sheetName, query = '' }) {
  const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
  const params = new URLSearchParams({
    sheet: sheetName,
    tq: query,
    tqx: 'out:json'
  });

  const url = base + params.toString();

  const res = await fetch(url);
  const text = await res.text();

  // La respuesta viene como: google.visualization.Query.setResponse({...});
  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/);
  if (!match) throw new Error("Formato inesperado");
  const jsonStr = match[1];
  const json = JSON.parse(jsonStr);

  // Tomamos cabeceras + filas
  const cols = json.table.cols.map(c => c.label || "col");
  const rows = json.table.rows.map(r => {
    const obj = {};
    r.c.forEach((cell, i) => obj[cols[i]] = cell ? cell.v : null);
    return obj;
  });

  return rows;
}