// Google Apps Script for Oracle Kolkata Community
// Deploy as Web App (Execute as: Me, Who has access: Anyone)

const SPREADSHEET_ID = '11cz2MMiOWh52kU9MKo83ry2PIs8sYnMc00LnGDn2C_k';
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    // Parse the request data
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    // Prepare the row data
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.type || 'contact',
      data.subject || '',
      data.message || ''
    ];
    
    // Append the row
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'OK',
      message: 'Oracle Kolkata Community API is running'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
