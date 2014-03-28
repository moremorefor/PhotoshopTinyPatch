 /*
 * CreateImagesWithSerialNumbers.jsx
 *
 * Copyright (c) more_more_for.
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 *
 */

preferences.rulerUnits = Units.PIXELS;

var openDoc = activeDocument;
var docName = openDoc.name.toString();

try{
  var fileObj= openDoc.fullName;
  var assetFolderObj = new Folder(fileObj.parent + "/" + "SerialNumber_" + docName.split(".")[0]);
} catch(e) {
  var folderObj = selectFolder();
  var assetFolderObj = new Folder(folderObj + "/" + "SerialNumber_" + docName.split(".")[0]);
}

main();

function main() {
  createFolder(assetFolderObj);
  openDoc.suspendHistory('createSerialNumberImages', 'showDialog()')
}

function handle_key (event) {
  var step;
  ScriptUI.environment.keyboardState['shiftKey'] ? step = 10 : step = 1;
  if(event.keyName == 'LeftBracket'){
    this.text = Number(this.text)-step;
    event.preventDefault();
  }
  if(event.keyName == 'RightBracket'){
    this.text = Number(this.text)+step;
    event.preventDefault();
  }
}

function createDialog() {
        var dlg = new Window('dialog', 'Move Objects', [100, 100, 350, 290]);
        dlg.count = dlg.add('edittext', [140, 10, 240, 30]);
        dlg.labelCount = dlg.add('statictext',[10, 10, 130, 30] ,"Count:",{multiline:true});

        dlg.fontsize = dlg.add('edittext', [140, 40, 240, 60]);
        dlg.labelFontsize = dlg.add('statictext',[10, 40, 130, 60] ,"Font-size(px):",{multiline:true});

        dlg.cancelButton = dlg.add('button', [10, 140, 120, 170], 'cancel');
        dlg.okButton = dlg.add('button', [130, 140, 240, 170], 'OK');

        dlg.count.addEventListener ("keydown", handle_key );

        dlg.count.text = "0";
        dlg.fontsize.text = "16";
        return dlg;
}

function initializeDialog(w) {

  w.okButton.onClick = w.okButton.onClick = function() {
      var _countNum = parseInt(w.count.text, 10)
      var countNum;

      var _fontsize = parseInt(w.fontsize.text, 10);
      var fontsize;

      if(_countNum == null){
        countNum = 0;
      }else {
        countNum = _countNum;
      }

      if(_fontsize == null){
        fontsize = 20;
      }else {
        fontsize = _fontsize;
      }

      createSerialNumberImages(countNum, fontsize);
      w.close();
  }
}

function showDialog() {
  var win = createDialog();
  initializeDialog(win);
  win.show();
}

function createSerialNumberImages(countNum, fontsize) {
  var allLayers = openDoc.artLayers;
  var targetLayer;
  for (var i=0; i < openDoc.artLayers.length; i ++) {
    if(allLayers[i].kind == LayerKind.TEXT) {
      targetLayer = allLayers[i];
    }
  }

  if(!targetLayer) {
    alert("Text Layer is not found")
    return
  }

  openDoc.activeLayer = targetLayer;
  for (var i=0; i < countNum; i++) {
    var newDoc = openDoc.duplicate();
    newDoc.activeLayer.textItem.contents = "id: " + i;
    newDoc.activeLayer.textItem.size = fontsize;

    var newDocWebFile = new File(assetFolderObj + "/" + docName.split(".")[0] + "_" + i +  ".png");
    var webOpt = new ExportOptionsSaveForWeb();
    webOpt.format = SaveDocumentType.PNG;
    webOpt.PNG8 = false; 
    newDoc.exportDocument(newDocWebFile, ExportType.SAVEFORWEB, webOpt);

    newDoc.close(SaveOptions.DONOTSAVECHANGES);
  }
}


function createFolder(folderObj) {
  if (!folderObj.exists) {
    var result = folderObj.create();
    if (!result){
      alert("Error: can't create directory.");
    }
  }
}

function selectFolder() {
  folderName = Folder.selectDialog("Select Folder...");

  if ((folderName == "") || (folderName == null)) {
    alert("Folder was not selected.");
  } else {
    objFolder = new Folder(folderName);
    return objFolder;
  }
}
