(async () => {
  const sheetID = "1BU0v9RaWAlCfHD8UB4hMf-YDSbuDTmRjPR40aYbVaL0";
  const sheetName = "MINORISTA.";

  try {
    const data = await getSheetData({ sheetID, sheetName });

    // Generamos la tabla
    const output = document.getElementById("output");
    let table = "<table><thead><tr>";

    // Encabezados
    Object.keys(data[0]).forEach(col => {
      table += `<th>${col}</th>`;
    });
    table += "</tr></thead><tbody>";

    // Filas
    data.forEach(row => {
      table += "<tr>";
      Object.values(row).forEach(val => {
        table += `<td>${val !== null ? val : ""}</td>`;
      });
      table += "</tr>";
    });

    table += "</tbody></table>";
    output.innerHTML = table;
  } catch (err) {
    document.getElementById("output").textContent = "Error: " + err.message;
  }
})();
