```javascript
function searchPhoneNumber(phoneNumber) {
  var sheetNames = ["Flooring", "Drywall", "Windows"];
  var found = false;
  var message = "Phone number not found in any sheet.";

  // Clear formatting from all sheets before searching
  for (var i = 0; i < sheetNames.length; i++) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetNames[i]);
    sheet.getDataRange().setBackground(null); // Reset background color
  }

  for (var i = 0; i < sheetNames.length; i++) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetNames[i]);
    var data = sheet.getRange("B2:B").getValues(); // Assuming phone numbers are in column B, starting from row 2

    for (var j = 0; j < data.length; j++) {
      if (data[j][0] == phoneNumber) {
        var name = sheet.getRange("A" + (j + 2)).getValue(); // Get the name from column A
        
         // Highlight the cell with the found phone number
        var range = sheet.getRange("B" + (j + 2));
        range.setBackground("yellow");
        
        // Shift focus to the found phone number
        sheet.activate();
        sheet.setActiveRange(range);
        
        message = "Phone number found in sheet: " + sheetNames[i] + " and belongs to " + name;
        
       
        
        found = true;
        break;
      }
    }

    if (found) break;
  }

  SpreadsheetApp.getUi().alert(message);
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Search')
    .addItem('Search Phone Number', 'showPrompt')
    .addToUi();
}

function showPrompt() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Search Phone Number', 'Enter the phone number:', ui.ButtonSet.OK_CANCEL);

  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.OK) {
    var phoneNumber = response.getResponseText();
    searchPhoneNumber(phoneNumber);
  }
}

```
