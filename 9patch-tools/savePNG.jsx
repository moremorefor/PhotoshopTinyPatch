/*
 * savePNG.jsx
 *
 * Copyright (c) more_more_for.
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 *
 */

preferences.rulerUnits = Units.PIXELS;

var d = activeDocument;

var docPath = d.fullName.toString();
var docName = d.name.toString();
var filePath = docPath.split(docName)[0];

var newDoc = d.duplicate();

var webOpt = new ExportOptionsSaveForWeb();
webOpt.format = SaveDocumentType.PNG;
webOpt.PNG8 = false;

var newFile = new File(filePath+ "/" +docName.split(".")[0] + ".9.png");
newDoc.exportDocument(newFile, ExportType.SAVEFORWEB, webOpt);

newDoc.close(SaveOptions.DONOTSAVECHANGES);
