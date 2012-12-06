/* 
<javascriptresource>
<name>SaveofPNG_9patch</name>
<category>mobile</category>
</javascriptresource>
*/

/*
 * auther: Tsukada Takumi (more_more_for)
 * mail: web.moremorefor@gmail.com
 * license: MIT License
 * ver: 1.00
 */

preferences.rulerUnits = Units.PIXELS;

var d = activeDocument;

var docPath = d.fullName.toString(); //fullName:ドキュメントの保存されている絶対パス
var docName = d.name.toString(); //ファイル名（拡張子含む）
var filePath = docPath.split(docName)[0]; //Folderのパスを取得(カレントディレクトリ)

var newDoc = d.duplicate();

var webOpt = new ExportOptionsSaveForWeb(); // 保存Objectを作成
webOpt.format = SaveDocumentType.PNG;
webOpt.PNG8 = false; // PNG-24*/

var newFile = new File(filePath+ "/" +docName.split(".")[0] + ".9.png");
newDoc.exportDocument(newFile, ExportType.SAVEFORWEB, webOpt);

newDoc.close(SaveOptions.DONOTSAVECHANGES);