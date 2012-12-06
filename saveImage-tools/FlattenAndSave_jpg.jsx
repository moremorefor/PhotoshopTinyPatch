/* 
<javascriptresource>
<name>FlattenAndSave_jpg</name>
<category>web</category>
</javascriptresource>
*/

/*
 * auther: Tsukada Takumi (more_more_for)
 * mail: web.moremorefor@gmail.com
 * license: MIT License
 * ver: 1.00
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