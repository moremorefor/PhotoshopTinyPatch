/* 
<javascriptresource>
<name>9-patch Tool</name>
<category>mobile</category>
</javascriptresource>
*/

/*
 * auther: Tsukada Takumi (more_more_for)
 * mail: web.moremorefor@gmail.com
 * license: MIT License
 * ver: 1.00
 */
// =======================================================
var id1074 = charIDToTypeID( "setd" );
    var desc184 = new ActionDescriptor();
    var id1075 = charIDToTypeID( "null" );
        var ref133 = new ActionReference();
        var id1076 = charIDToTypeID( "Chnl" );
        var id1077 = charIDToTypeID( "fsel" );
        ref133.putProperty( id1076, id1077 );
    desc184.putReference( id1075, ref133 );
    var id1078 = charIDToTypeID( "T   " );
        var desc185 = new ActionDescriptor();
        var id1079 = charIDToTypeID( "Top " );
        var id1080 = charIDToTypeID( "#Pxl" );
        desc185.putUnitDouble( id1079, id1080, 0.000000 );
        var id1081 = charIDToTypeID( "Left" );
        var id1082 = charIDToTypeID( "#Pxl" );
        desc185.putUnitDouble( id1081, id1082, 0.000000 );
        var id1083 = charIDToTypeID( "Btom" );
        var id1084 = charIDToTypeID( "#Pxl" );
        desc185.putUnitDouble( id1083, id1084, 1.000000 );
        var id1085 = charIDToTypeID( "Rght" );
        var id1086 = charIDToTypeID( "#Pxl" );
        desc185.putUnitDouble( id1085, id1086, 10.000000 );
    var id1087 = charIDToTypeID( "Rctn" );
    desc184.putObject( id1078, id1087, desc185 );
executeAction( id1074, desc184, DialogModes.NO );

// =======================================================
var id1088 = charIDToTypeID( "Trnf" );
    var desc186 = new ActionDescriptor();
    var id1089 = charIDToTypeID( "null" );
        var ref134 = new ActionReference();
        var id1090 = charIDToTypeID( "Chnl" );
        var id1091 = charIDToTypeID( "fsel" );
        ref134.putProperty( id1090, id1091 );
    desc186.putReference( id1089, ref134 );
    var id1092 = charIDToTypeID( "FTcs" );
    var id1093 = charIDToTypeID( "QCSt" );
    var id1094 = charIDToTypeID( "Qcsa" );
    desc186.putEnumerated( id1092, id1093, id1094 );
    var id1095 = charIDToTypeID( "Ofst" );
        var desc187 = new ActionDescriptor();
        var id1096 = charIDToTypeID( "Hrzn" );
        var id1097 = charIDToTypeID( "#Prc" );
        desc187.putUnitDouble( id1096, id1097, 0 );
        var id1098 = charIDToTypeID( "Vrtc" );
        var id1099 = charIDToTypeID( "#Prc" );
        desc187.putUnitDouble( id1098, id1099, 0 );
    var id1100 = charIDToTypeID( "Ofst" );
    desc186.putObject( id1095, id1100, desc187 );
    var id1101 = charIDToTypeID( "Wdth" );
    var id1102 = charIDToTypeID( "#Prc" );
    desc186.putUnitDouble( id1101, id1102, 100.000000 );
    var id1103 = charIDToTypeID( "Hght" );
    var id1104 = charIDToTypeID( "#Prc" );
    desc186.putUnitDouble( id1103, id1104, 100.000000 );
executeAction( id1088, desc186, DialogModes.ALL );

RGBColor = new SolidColor();
RGBColor.red = 0;
RGBColor.green = 0;
RGBColor.blue = 0;

activeDocument.selection.fill(RGBColor,ColorBlendMode.NORMAL, 100, false);
