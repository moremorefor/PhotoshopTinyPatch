#include "ominoDialogMaker.jsx"

preferences.rulerUnits = Units.PIXELS;
 
var omd = newOminoDialog("Develop Dialog");

omd.sectionLabel("Document");
omd.number("DocumentWidth","docW",0);
omd.number("DocumentHeight","docH",0);
omd.separator();
omd.sectionLabel("Margin");
omd.number("MarginX","marginX",0);

var result = omd.run();

if(result == null) {
  alert("Cancelled\nYou clicked \"cancel\".");
}else{
  if(result.marginX > 0) {
    //指定したサイズ+横マージンで新規ドキュメント作成
    objDoc = documents.add(result.docW + result.marginX*2,result.docH);
    activeDocument.guides.add(Direction.VERTICAL, result.marginX);
    activeDocument.guides.add(Direction.VERTICAL, result.docW + result.marginX);
    //センターガイド
    createCenterGuide();
  }else{
    objDoc = documents.add(result.docW,result.docH);
    //センターガイド
    createCenterGuide();
  }
}

//create center guide
function createCenterGuide()
{
  var docW = activeDocument.width;
  var docH = activeDocument.height;
  activeDocument.guides.add(Direction.VERTICAL, docW/2);
  activeDocument.guides.add(Direction.HORIZONTAL, docH/2);
}