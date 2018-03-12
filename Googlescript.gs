function doPost(e) {
  var data = Utilities.base64Decode(e.parameters.data);
  var blob = Utilities.newBlob(data, e.parameters.mimetype, e.parameters.filename);
  DriveApp.createFile(blob);
  return ContentService.createTextOutput("Done.")
}
