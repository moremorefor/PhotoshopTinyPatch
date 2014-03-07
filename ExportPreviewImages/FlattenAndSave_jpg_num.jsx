/*
 * FlattenAndSave_jpg_num.jsx
 *
 * Copyright (c) more_more_for.
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 *
 */

var doc = activeDocument;
var docPath = doc.fullName.toString();
var docName = doc.name.toString();
var filePath = docPath.split(docName)[0];
var folderObj = new Folder(filePath);
var previewsFolderObj = new Folder(filePath+"previews");

if (previewsFolderObj.exists) {
  makePreview();
} else {
  var result = previewsFolderObj.create();
  if (result){
    makePreview();
  }else {
    alert("フォルダが作成出来ませんでした");
  };
};

function makePreview() {
  fileList = previewsFolderObj.getFiles();
  if (fileList.length == 0) {
    saveJPG(0);
  }else {
    var maxNum;
    var docNameUnderscore = docName.split(".")[0] + "_";
    for (var i=0; i < fileList.length; i++) {
      var fileName = fileList[i].name.split(".")[0];
      if ( fileName.indexOf(docNameUnderscore) == 0 ) {
        var nameNum = parseInt(fileName.slice(docNameUnderscore.length), 10);
        maxNum = maxNum < nameNum ? nameNum : maxNum;
      }
    }
    saveJPG(maxNum+1);
  }
}

function saveJPG(num) {
  var numStr;
  if (num >= 0 && num < 10) {
    numStr = "_00" + num;
  }else if(num > 9 && num < 100) {
    numStr = "_0" + num;
  }else {
    numStr = "_" + num;
  }
  var newFile = new File(previewsFolderObj.fsName+ "/" +docName.split(".")[0]+ numStr + ".jpg");
  var newDoc = doc.duplicate();
  newDoc.flatten();

  jpegOpt = new JPEGSaveOptions();
  jpegOpt.embedColorProfile = true;
  jpegOpt.quality = 8;
  jpegOpt.formatOptions = FormatOptions.STANDARDBASELINE;
  jpegOpt.scans = 3;
  jpegOpt.matte = MatteType.NONE;

  newDoc.saveAs(newFile,　jpegOpt);

  newDoc.close(SaveOptions.DONOTSAVECHANGES);
}
