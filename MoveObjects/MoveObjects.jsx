/* 
<javascriptresource>
<name>Move Objects</name>
<category>web</category>
</javascriptresource>
*/

/*
 * auther: Tsukada Takumi (@more_more_for)
 * ver: 1.0.2
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
  //statictext
        var dlg = new Window('dialog', 'Move Objects', [100, 100, 250, 280]);
        dlg.movingX = dlg.add('edittext', [40, 10, 140, 30]);
        dlg.labelX = dlg.add('statictext',[10, 10, 30, 30] ,"X:",{multiline:true});
        dlg.movingY = dlg.add('edittext', [40, 60, 140, 80]);
        dlg.labelY = dlg.add('statictext',[10, 60, 30, 80], "Y:",{multiline:true});

        dlg.cancelButton = dlg.add('button', [10, 120, 100, 160], 'cancel');
        dlg.okButton = dlg.add('button', [110, 120, 140, 160], 'OK');

        dlg.movingX.addEventListener ("keydown", handle_key );
        dlg.movingY.addEventListener ("keydown",  handle_key );

        dlg.movingX.text = 0;
        dlg.movingY.text = 0;
        dlg.movingX.active = true;
        return dlg;
}
function initializeDialog(w) {
  // w.allText.onChange = w.allText.onChange = function() {
  //           w.movingX.text = w.allText.text;
  //           w.movingY.text = w.allText.text;
  //           changed = true;

  // }
  w.okButton.onClick = w.okButton.onClick = function() {
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

      moveLayer.translate(xx,yy);
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
