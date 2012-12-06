/* 
<javascriptresource>
<name>9-patch</name>
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
var folderObj = new Folder(filePath); //Folderオブジェクトの作成
var pFolderObj = new Folder(filePath+"9patch");

//フォルダの検証・作成
if (pFolderObj.exists) {
} else {
  var result = pFolderObj.create(); //戻り値はBoolean
  if (result){
  }else {
    alert("フォルダが作成出来ませんでした");
  };
};

var newDoc = d.duplicate();

var w = newDoc.width;
var h = newDoc.height;
resizeOnePx(newDoc, w, h);

//デフォルトの4点を作成
makeDefaultDotSet(newDoc, w, h);

saveObj();

newDoc.close(SaveOptions.DONOTSAVECHANGES);
d.close(SaveOptions.DONOTSAVECHANGES);

/*
 * 1px拡大
 */
function resizeOnePx(doc, w, h) {
  //カンバスを全体で1px拡大
  doc.resizeCanvas( w+2, h+2, AnchorPosition.MIDDLECENTER);
}

/*
 * PSD保存
 */
function saveObj() {
  var newFile = new File(pFolderObj.fsName+ "/" +docName.split(".")[0] + ".9.psd");
  newDoc.saveAs(newFile);
}

/*
 * 4点の描画
 */
function makeDefaultDotSet(doc, docW, docH) {
  makeDot(doc, "BOTTOM", [docW,docH+1], [docW+1,docH+1], [docW+1,docH+2], [docW,docH+2] );
  makeDot(doc, "RIGHT", [docW+1,docH], [docW+2,docH], [docW+2,docH+1], [docW+1,docH+1] );
  makeDot(doc, "LEFT", [0,1], [1,1], [1,2], [0,2] );
  makeDot(doc, "UP", [1,0], [2,0], [2,1], [1,1] );
}

/*
 * ドットの描画
 */
function makeDot(doc, layerName, select1, select2, select3, select4) {
var layObj = doc.artLayers.add();
doc.activeLayer = layObj;
doc.activeLayer.name = layerName;

var color = new SolidColor();
color.red = 255;
color.green = 0;
color.blue = 0;
color.model = ColorModel.RGB; 

selectRange = [select1, select2, select3, select4];
activeDocument.selection.select(selectRange);
var idFl = charIDToTypeID( "Fl  " );
    var desc77 = new ActionDescriptor();
    var idUsng = charIDToTypeID( "Usng" );
    var idFlCn = charIDToTypeID( "FlCn" );
    var idBlck = charIDToTypeID( "Blck" );
    desc77.putEnumerated( idUsng, idFlCn, idBlck );
    var idOpct = charIDToTypeID( "Opct" );
    var idPrc = charIDToTypeID( "#Prc" );
    desc77.putUnitDouble( idOpct, idPrc, 100.000000 );
    var idMd = charIDToTypeID( "Md  " );
    var idBlnM = charIDToTypeID( "BlnM" );
    var idNrml = charIDToTypeID( "Nrml" );
    desc77.putEnumerated( idMd, idBlnM, idNrml );
executeAction( idFl, desc77, DialogModes.NO );

}