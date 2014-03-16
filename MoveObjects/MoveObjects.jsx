/* 
<javascriptresource>
<name>Move Objects</name>
<category>web</category>
</javascriptresource>
*/

/*
 * auther: Tsukada Takumi (@more_more_for)
 * ver: 1.0.3
 */


 preferences.rulerUnits = Units.PIXELS;

var d = activeDocument;
d.suspendHistory("Move Objects", "main()");

function handle_key (event) {
  //Check keyName
  //alert(event.keyName);
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

  var wMargin = 20;
  var hMargin = 10;
  var wWidth = 340;
  var wHeight = 240;
  var characterHeight = 20;
  var previousObj;
  w = new Window("dialog","Move Objects",[100,100,100+wWidth,100+wHeight]);

  var textObjectX = new Object();
  textObjectX.left = wMargin;
  textObjectX.top = hMargin*2;
  textObjectX.right = wWidth - 150 - wMargin;
  textObjectX.bottom = textObjectX.top + characterHeight;
  w.labelX = w.add("statictext", textObjectX, "moveX:");

  var editObjectX = new Object();
  editObjectX.left = wMargin + 150;
  editObjectX.top = hMargin*2;
  editObjectX.right = wWidth - wMargin;
  editObjectX.bottom = editObjectX.top + characterHeight;
  w.movingX = w.add("edittext", editObjectX);
  previousObj = editObjectX;

  var textObjectY = new Object();
  textObjectY.left = wMargin;
  textObjectY.top = previousObj.bottom + hMargin*2;
  textObjectY.right = wWidth - 150 - wMargin;
  textObjectY.bottom = textObjectY.top + characterHeight;
  w.labelY = w.add("statictext", textObjectY, "moveY:");

  var editObjectY = new Object();
  editObjectY.left = wMargin + 150;
  editObjectY.top = previousObj.bottom + hMargin*2;
  editObjectY.right = wWidth - wMargin;
  editObjectY.bottom = editObjectY.top + characterHeight;
  w.movingY = w.add("edittext", editObjectY);
  previousObj = editObjectY;

  var checkboxObj = new Object();
  checkboxObj.left = wMargin;
  checkboxObj.top = previousObj.bottom + hMargin*2;
  checkboxObj.right = wWidth - wMargin;
  checkboxObj.bottom = checkboxObj.top + characterHeight;
  w.duplicate = w.add("checkbox", checkboxObj, "Duplicate");
  previousObj = checkboxObj;

  var cancelButtonObj = new Object();
  cancelButtonObj.left = wMargin;
  cancelButtonObj.top = previousObj.bottom + hMargin*2;
  cancelButtonObj.right = wWidth - 160 - wMargin;
  cancelButtonObj.bottom = cancelButtonObj.top + characterHeight*2;
  w.cancelButton = w.add("button", cancelButtonObj, "cancel");

  var okButtonObj = new Object();
  okButtonObj.left = wMargin + 160;
  okButtonObj.top = previousObj.bottom + hMargin*2;
  okButtonObj.right = wWidth - wMargin;
  okButtonObj.bottom = okButtonObj.top + characterHeight*2;
  w.okButton = w.add("button", okButtonObj, "OK");
  previousObj = okButtonObj;

  w.movingX.addEventListener ("keydown", handle_key );
  w.movingY.addEventListener ("keydown",  handle_key );

  w.movingX.text = 0;
  w.movingY.text = 0;
  w.movingX.active = true;
  w.duplicate.value = true;
  return w;
}

function initializeDialog(w) {
  w.okButton.onClick = function() {
      var moveLayer = d.activeLayer;

      var _x = w.movingX.text * 1.0;
      var _y = w.movingY.text * 1.0;

      var xx;
      var yy;
      if(_x == null){
        xx = 0;
      }else {
        xx = _x;
      }

      if (_y == null) {
        yy = 0;
      }else {
        yy = _y;
      }

      var duplicateOption = w.duplicate.value;

      if(duplicateOption) {
        _moveLayer = moveLayer;
        var duplicateLayer = moveLayer.duplicate();
        duplicateLayer.translate(xx,yy);

      } else {
        moveLayer.translate(xx,yy);
      }

      w.close();
  }
}

function runDialog(w) {
    return w.show();
};
  
function main() {
  var win = createDialog();
    initializeDialog(win);
    runDialog(win);
}
