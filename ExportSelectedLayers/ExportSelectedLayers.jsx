﻿ /* * ExportSelectedLayers.jsx * * Copyright (c) more_more_for. * * This software is released under the MIT License. * http://opensource.org/licenses/mit-license.php * */preferences.rulerUnits = Units.PIXELS;var openDoc = activeDocument;var fileObj= openDoc.fullName;var assetFolderObj = new Folder(fileObj.parent + "/" + "assets");main();function main() {  createFolder(assetFolderObj);  exportSelectedLayers(openDoc);}function exportSelectedLayers(doc) {  var arr = getSelectedLayersIdx();  for(var i=0; i<arr.length; i++) {    var idx = arr[i];    getLayerFromIndex(idx);    newDocName = doc.activeLayer.name;    newDoc = documents.add(doc.width, doc.height, 72.0, newDocName, NewDocumentMode.RGB, DocumentFill.TRANSPARENT);    app.activeDocument = doc;    doc.activeLayer.duplicate(newDoc, ElementPlacement.PLACEATBEGINNING);    app.activeDocument = newDoc;    var newDocWebFile = new File(assetFolderObj + "/" + newDoc.activeLayer.name + ".png");    var webOpt = new ExportOptionsSaveForWeb();    webOpt.format = SaveDocumentType.PNG;    webOpt.PNG8 = false;    newDoc.exportDocument(newDocWebFile, ExportType.SAVEFORWEB, webOpt);    newDoc.close(SaveOptions.DONOTSAVECHANGES);  }}function createFolder(folderObj) {  if (!folderObj.exists) {    var result = folderObj.create();    if (!result){      alert("Error: can't create directory.");    }  }}//////////////////////////////////////////////////// Select layers from index//////////////////////////////////////////////////function getLayerFromIndex(index) {  var idslct = charIDToTypeID( "slct" );    var desc6 = new ActionDescriptor();    var idnull = charIDToTypeID( "null" );        var ref4 = new ActionReference();        var idLyr = charIDToTypeID( "Lyr " );        ref4.putIndex( idLyr, index );    desc6.putReference( idnull, ref4 );    var idMkVs = charIDToTypeID( "MkVs" );    desc6.putBoolean( idMkVs, false );executeAction( idslct, desc6, DialogModes.NO );}function getLayerReference(index) {  var idTrnf = charIDToTypeID( "Trnf" );        var desc48 = new ActionDescriptor();        var idnull = charIDToTypeID( "null" );            var ref36 = new ActionReference();            var idLyr = charIDToTypeID( "Lyr " );            var idOrdn = charIDToTypeID( "Ordn" );            var idTrgt = charIDToTypeID( "Trgt" );            ref36.putEnumerated( idLyr, idOrdn, idTrgt );        desc48.putReference( idnull, ref36 );}function getSelectedLayersIdx(){      var selectedLayers = new Array;      var ref = new ActionReference();      ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );      var desc = executeActionGet(ref);      if( desc.hasKey( stringIDToTypeID( 'targetLayers' ) ) ){         desc = desc.getList( stringIDToTypeID( 'targetLayers' ));          var c = desc.count          var selectedLayers = new Array();          for(var i=0;i<c;i++){            try{               activeDocument.backgroundLayer;               selectedLayers.push(  desc.getReference( i ).getIndex() );            }catch(e){               selectedLayers.push(  desc.getReference( i ).getIndex()+1 );            }          }       }else{         var ref = new ActionReference();         ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" ));         ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );         try{            activeDocument.backgroundLayer;            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))-1);         }catch(e){            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" )));         }     var vis = app.activeDocument.activeLayer.visible;        if(vis == true) app.activeDocument.activeLayer.visible = false;        var desc9 = new ActionDescriptor();    var list9 = new ActionList();    var ref9 = new ActionReference();    ref9.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );    list9.putReference( ref9 );    desc9.putList( charIDToTypeID('null'), list9 );    executeAction( charIDToTypeID('Shw '), desc9, DialogModes.NO );    if(app.activeDocument.activeLayer.visible == false) selectedLayers.shift();        app.activeDocument.activeLayer.visible = vis;      }      return selectedLayers;};