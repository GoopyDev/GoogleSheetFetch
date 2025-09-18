(async () => {
  // Cambiá esto por tu spreadsheet público
  const sheetID = "1BU0v9RaWAlCfHD8UB4hMf-YDSbuDTmRjPR40aYbVaL0";
  const sheetName = "MINORISTA.";

  try {
    const data = await getSheetData({ sheetID, sheetName });
    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    document.getElementById("output").textContent = "Error: " + err.message;
  }
})();
