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
        dlg.labelFontsize = dlg.add('statictext',[10, 40, 130, 60] ,"Font-size : ( px )",{multiline:true});

        dlg.fontcolor = dlg.add('edittext', [140, 70, 240, 90]);
        dlg.labelFontcolor = dlg.add('statictext',[10, 70, 130, 90] ,"Font-color : ( hex )",{multiline:true});

        dlg.cancelButton = dlg.add('button', [10, 140, 120, 170], 'cancel');
        dlg.okButton = dlg.add('button', [130, 140, 240, 170], 'OK');

        dlg.count.addEventListener ("keydown", handle_key );

        dlg.count.text = "0";
        dlg.fontsize.text = "16";
        dlg.fontcolor.text = "333333";
        return dlg;
}

function initializeDialog(w) {

  w.okButton.onClick = w.okButton.onClick = function() {
      var _countNum = parseInt(w.count.text, 10)
      var countNum;

      var _fontsize = parseInt(w.fontsize.text, 10);
      var fontsize;

      var _fontcolor = w.fontcolor.text;
      var fontcolor;

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

      if(_fontcolor == null){
        fontcolor = "666666";
      }else {
        fontcolor = _fontcolor.toString();
      }


      createSerialNumberImages(countNum, fontsize, fontcolor);
      w.close();
  }
}

function showDialog() {
  var win = createDialog();
  initializeDialog(win);
  win.show();
}

function createSerialNumberImages(countNum, fontsize, fontcolor) {
  var targetLayer = openDoc.artLayers.add();
  targetLayer.kind = LayerKind.TEXT

  openDoc.activeLayer = targetLayer;

  //color check
  var rgbColor = new RGBColor();
  try{
    rgbColor.hexValue = fontcolor;
  } catch(e) {
    alert("Color is incorrect.\nApply the default color.");
    rgbColor.hexValue = "666666";
  }

  for (var i=0; i < countNum; i++) {
    var newDoc = openDoc.duplicate();
    newDoc.activeLayer.textItem.contents = "id: " + i;
    newDoc.activeLayer.textItem.size = fontsize;
    var sColor = new SolidColor();
    sColor.rgb = rgbColor;
    newDoc.activeLayer.textItem.color = sColor;

    newDoc.activeLayer.textItem.position = [0, fontsize];
    var layerInfo = getImageInfo(newDoc.activeLayer);
    var posX = newDoc.width - layerInfo.imageW;
    var posY = newDoc.height - layerInfo.imageH;
    var diffX = posX - layerInfo.imageX;
    var diffY = posY - layerInfo.imageY;
    newDoc.activeLayer.translate(diffX, diffY);

    var newDocWebFile = new File(assetFolderObj + "/" + docName.split(".")[0] + "_" + i +  ".png");
    var webOpt = new ExportOptionsSaveForWeb();
    webOpt.format = SaveDocumentType.PNG;
    webOpt.PNG8 = false; 
    newDoc.exportDocument(newDocWebFile, ExportType.SAVEFORWEB, webOpt);

    newDoc.close(SaveOptions.DONOTSAVECHANGES);
  }

  openDoc.activeLayer.remove();
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

function getImageInfo(layer) {
  var layObj = layer.bounds;
  var infoX = parseInt(layObj[0]);
  var infoY = parseInt(layObj[1]);
  var infoW = parseInt(layObj[2] - layObj[0]);
  var infoH = parseInt(layObj[3] - layObj[1]);
  var centerX = infoX + infoW/2;
  var centerY = infoY + infoH/2;
  var imageInfoArr = {"imageX":infoX, "imageY":infoY, "imageW":infoW, "imageH":infoH, "centerX":centerX, "centerY":centerY };
  return imageInfoArr;
}
