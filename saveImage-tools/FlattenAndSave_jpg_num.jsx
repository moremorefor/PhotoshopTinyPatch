/* 
<javascriptresource>
<name>FlattenAndSave_jpg_num</name>
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
var docPath = doc.fullName.toString(); //fullName:ドキュメントの保存されている絶対パス
var docName = doc.name.toString(); //ファイル名（拡張子含む）
var filePath = docPath.split(docName)[0]; //Folderのパスを取得(カレントディレクトリ)
var folderObj = new Folder(filePath); //Folderオブジェクトの作成
var previewsFolderObj = new Folder(filePath+"previews");

//フォルダの検証
if (previewsFolderObj.exists) {
  makePreview();
} else {
  var result = previewsFolderObj.create(); //戻り値はBoolean
  if (result){
    makePreview();
  }else {
    alert("フォルダが作成出来ませんでした");
  };
};


/*
 * 画像の連番書き出し
 */
function makePreview() {
  fileList = previewsFolderObj.getFiles(); //ファイル一覧の取得
  if (fileList.length == 0) {
    sliceJPG(0);
  }else {
    var maxNum; //貯めていく変数
    var docNameUnderscore = docName.split(".")[0] + "_"; // 拡張子を除いたドキュメント名 + _
    for (var i=0; i < fileList.length; i++) {
      var fileName = fileList[i].name.split(".")[0]; //拡張子とる
      if ( fileName.indexOf(docNameUnderscore) == 0 ) {
        var nameNum = parseInt(fileName.slice(docNameUnderscore.length), 10);
        maxNum = maxNum < nameNum ? nameNum : maxNum;
      }
    }
    sliceJPG(maxNum+1);
  }
}

/*
 * JPG保存
 */
function sliceJPG(num) {
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