/*
 * FlattenAndSave_jpg.jsx
 *
 * Copyright (c) more_more_for.
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 *
 */

var doc = activeDocument;
var fileName = doc.fullName.toString();
var fileObj = new File(fileName.split(".psd")[0]+".jpg");
var newDoc = doc.duplicate();
newDoc.flatten();

jpegOpt = new JPEGSaveOptions();
jpegOpt.embedColorProfile = true;
jpegOpt.quality = 8;
jpegOpt.formatOptions = FormatOptions.STANDARDBASELINE;
jpegOpt.scans = 3;
jpegOpt.matte = MatteType.NONE;

newDoc.saveAs(fileObj, jpegOpt);

newDoc.close(SaveOptions.DONOTSAVECHANGES)
