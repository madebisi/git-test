(function ($) {
    "use strict";

    // Detecting IE
    var oldIE;
    if ($('html').is('.ie6, .ie7, .ie8, .ie9')) {
        oldIE = true;
    }

    if (oldIE) {

        //lert("Older Browser");

       // $( ".button" ).wrap( "<div class='mm_buttonWrap'> </div>" );

        // create a double wrapper to fix IE9 gradient/radius problem

       // $( ".mm_blueBox" ).wrap( "<div class='row mm_blueBoxWrap'> </div>" );
       // $( ".mm_blueBoxWrap" ).wrap( "<div class='mm_blueBoxWrapBig'> </div>" );
       
    } else {

        //alert("Newer Browser");
         
    }

}(jQuery))

Operation failed: svn: E160024: Commit failed (details follow):
svn: E160024: File or directory '_ovr-header.scss' is out of date; try updating
svn: E160024: resource out of date; try updating
svn: E175002: CHECKOUT of '/repos/Weekend_Club/!svn/ver/4068/Branches/MyMail/WebSitePrototype/sass/myMail/_ovr-header.scss': 409 Conflict (http://svn.gbl.thehut.local)

