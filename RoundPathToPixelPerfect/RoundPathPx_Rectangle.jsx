 /*
 * RoundPathPx_Rectangle.jsx
 *
 * Copyright (c) more_more_for.
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 *
 */

var d = activeDocument;
var arr = getSelectedLayersIdx();

d.suspendHistory("FloorPathRectangle", "main()");

function main() {
  var layerArrList = [];
  for(var i=0; i<arr.length; i++) {
    var idx = arr[i];
    getLayerFromIndex(idx);
    alert("From: "+d.pathItems[0].subPathItems[0].pathPoints[0].anchor[0] + " : "+ d.pathItems[0].subPathItems[0].pathPoints[0].anchor[1]);
    floorPathRectangleBounds(d.pathItems[0]);
    alert("After: "+d.pathItems[0].subPathItems[0].pathPoints[0].anchor[0] + " : "+ d.pathItems[0].subPathItems[0].pathPoints[0].anchor[1]);
  }
}

function Rectangle() {
  this.anchor = [];
}​

function floorPathRectangleBounds(pathObj) {
  var subPathObj = pathObj.subPathItems[0];
  if(subPathObj.pathPoints.length == 8) {

    var rect = new Rectangle();
    rect.anchor[0] = [Math.round(subPathObj.pathPoints[7].anchor[0]),Math.round(subPathObj.pathPoints[0].anchor[1])];
    rect.anchor[1] = [Math.round(subPathObj.pathPoints[2].anchor[0]),Math.round(subPathObj.pathPoints[1].anchor[1])];
    rect.anchor[2] = [Math.round(subPathObj.pathPoints[3].anchor[0]),Math.round(subPathObj.pathPoints[4].anchor[1])];
    rect.anchor[3] = [Math.round(subPathObj.pathPoints[6].anchor[0]),Math.round(subPathObj.pathPoints[5].anchor[1])];

    changeRectangleShape(rect);

  } else if(subPathObj.pathPoints.length == 4) {
    var rect = new Rectangle();
    for( var i=0; i<subPathObj.pathPoints.length; i++) {
      var anchor = subPathObj.pathPoints[i].anchor;
      var anchorX = Math.round(anchor[0]);
      var anchorY = Math.round(anchor[1]);
      var newAnchor = [anchorX,anchorY];
      rect.anchor[i] = newAnchor;
    }

    changeRectangleShape(rect);
  } else {
    alert("not Rectangle or RoundRectangle");
    return;
  }
}

function changeRectangleShape(rect) {
  try {
    var idDlt = charIDToTypeID("Dlt ");
    var desc171 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref129 = new ActionReference();
    var idPath = charIDToTypeID("Path");
    var idPath = charIDToTypeID("Path");
    var idvectorMask = stringIDToTypeID("vectorMask");
    ref129.putEnumerated(idPath, idPath, idvectorMask);
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref129.putEnumerated(idLyr, idOrdn, idTrgt);
    desc171.putReference(idnull, ref129);
    executeAction(idDlt, desc171, DialogModes.NO);
  } catch (err) {}

  var lineArray = new Array();
  var i = 0;
  lineArray[i] = new PathPointInfo;
  lineArray[i].kind = PointKind.CORNERPOINT;
  lineArray[i].anchor = rect.anchor[i];
  lineArray[i].rightDirection = rect.anchor[i];
  lineArray[i].leftDirection = rect.anchor[i];

  lineArray[i+=1] = new PathPointInfo;
  lineArray[i].kind = PointKind.CORNERPOINT;
  lineArray[i].anchor = rect.anchor[i];
  lineArray[i].rightDirection = rect.anchor[i];
  lineArray[i].leftDirection = rect.anchor[i];

  lineArray[i+=1] = new PathPointInfo;
  lineArray[i].kind = PointKind.CORNERPOINT;
  lineArray[i].anchor = rect.anchor[i];
  lineArray[i].rightDirection = rect.anchor[i];
  lineArray[i].leftDirection = rect.anchor[i];

  lineArray[i+=1] = new PathPointInfo;
  lineArray[i].kind = PointKind.CORNERPOINT;
  lineArray[i].anchor = rect.anchor[i];
  lineArray[i].rightDirection = rect.anchor[i];
  lineArray[i].leftDirection = rect.anchor[i];

  var lineSubPathArray = new Array()
  lineSubPathArray[0] = new SubPathInfo()
  lineSubPathArray[0].operation = ShapeOperation.SHAPEXOR
  lineSubPathArray[0].closed = true
  lineSubPathArray[0].entireSubPath = lineArray

  var myPathItem = d.pathItems.add("A Line2", lineSubPathArray);

  // =======================================================
  var idMk = charIDToTypeID("Mk  ");
  var desc170 = new ActionDescriptor();
  var idnull = charIDToTypeID("null");
  var ref126 = new ActionReference();
  var idPath = charIDToTypeID("Path");
  ref126.putClass(idPath);
  desc170.putReference(idnull, ref126);
  var idAt = charIDToTypeID("At  ");
  var ref127 = new ActionReference();
  var idPath = charIDToTypeID("Path");
  var idPath = charIDToTypeID("Path");
  var idvectorMask = stringIDToTypeID("vectorMask");
  ref127.putEnumerated(idPath, idPath, idvectorMask);
  desc170.putReference(idAt, ref127);
  var idUsng = charIDToTypeID("Usng");
  var ref128 = new ActionReference();
  var idPath = charIDToTypeID("Path");
  var idOrdn = charIDToTypeID("Ordn");
  var idTrgt = charIDToTypeID("Trgt");
  ref128.putEnumerated(idPath, idOrdn, idTrgt);
  desc170.putReference(idUsng, ref128);
  executeAction(idMk, desc170, DialogModes.NO);
  try {
      var idDlt = charIDToTypeID("Dlt ");
      var desc16 = new ActionDescriptor();
      var idnull = charIDToTypeID("null");
      var ref7 = new ActionReference();
      var idPath = charIDToTypeID("Path");
      ref7.putName(idPath, "A Line2");
      desc16.putReference(idnull, ref7);
      executeAction(idDlt, desc16, DialogModes.NO);
  } catch (err) {

  }
}

function getLayerFromIndex(index) {
  var idslct = charIDToTypeID( "slct" );
    var desc6 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref4 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        ref4.putIndex( idLyr, index );
    desc6.putReference( idnull, ref4 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc6.putBoolean( idMkVs, false );
executeAction( idslct, desc6, DialogModes.NO );
}

function getLayerReference(index) {
  var idTrnf = charIDToTypeID( "Trnf" );
        var desc48 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref36 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref36.putEnumerated( idLyr, idOrdn, idTrgt );
        desc48.putReference( idnull, ref36 );
}

function getSelectedLayersIdx(){ 
      var selectedLayers = new Array; 
      var ref = new ActionReference(); 
      ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
      var desc = executeActionGet(ref); 
      if( desc.hasKey( stringIDToTypeID( 'targetLayers' ) ) ){ 
         desc = desc.getList( stringIDToTypeID( 'targetLayers' )); 
          var c = desc.count 
          var selectedLayers = new Array(); 
          for(var i=0;i<c;i++){ 
            try{ 
               activeDocument.backgroundLayer; 
               selectedLayers.push(  desc.getReference( i ).getIndex() ); 
            }catch(e){ 
               selectedLayers.push(  desc.getReference( i ).getIndex()+1 ); 
            } 
          } 
       }else{ 
         var ref = new ActionReference(); 
         ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" )); 
         ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
         try{ 
            activeDocument.backgroundLayer; 
            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))-1); 
         }catch(e){ 
            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))); 
         } 
     var vis = app.activeDocument.activeLayer.visible;
        if(vis == true) app.activeDocument.activeLayer.visible = false;
        var desc9 = new ActionDescriptor();
    var list9 = new ActionList();
    var ref9 = new ActionReference();
    ref9.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    list9.putReference( ref9 );
    desc9.putList( charIDToTypeID('null'), list9 );
    executeAction( charIDToTypeID('Shw '), desc9, DialogModes.NO );
    if(app.activeDocument.activeLayer.visible == false) selectedLayers.shift();
        app.activeDocument.activeLayer.visible = vis;
      } 
      return selectedLayers; 
}
