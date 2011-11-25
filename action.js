/*
 * Global variables, use these two vars as the click count
 * var key_j_count = 1;
 * var key_k_count = 1;
*/
// if JKOn is 1, then use jk as the pagedown and pageup key shortcut
// else this could be focused at some input box, so we bail on this
var JKOn = 1;
function isJKOn()
{
    if (JKOn) {
        return 1;
    }
    else {
        return 0;
    }
}

// the current left top corner position relative to the document
function getCurrentPosition()
{
    return window.pageYOffset;
}

function getScrollDistance
{
    return 200;
}

// the height of the document
function getClientPageHeight()
{
    return document.body.clientHeight;
}

/*
 * page down
*/
function pageDown()
{
    var current_position = getCurrentPosition();
    window.scroll(0, getScrollDistance() + current_position);
}

/*
 * page down
*/
function pageUp()
{
    var current_position = getCurrentPosition();
    window.scroll(0, current_position - getScrollDistance());
}

function detectspecialkeys(e){
    var evtobj = e ? e : window.event;
    // key K, 33 Page Up
    if (evtobj.keyCode == 107 && isJKOn()) {
        pageUp();
    }
    // key J, 34 Page Down
    if (evtobj.keyCode == 106 && isJKOn()) {
        pageDown();
    }
}

function setFocusEvent(elements)
{
    // if focus on input, we should bail on JK key shortcut
    var htmlTagArray = elements;
    for (var i=0; i < htmlTagArray.length; i++){
        htmlTagArray[i].onfocus = function() { JKOn = 0;};
        htmlTagArray[i].onblur = function() { JKOn = 1;};
    }
}

function addFocusHandler()
{
    var htmlTags = ["input", "textarea"];
    for (var i=0; i<htmlTags.length; i++) {
        var htmlTag = htmlTags[i];
        var htmlTagArray = document.getElementsByTagName(htmlTag);
        setFocusEvent(htmlTagArray);
    }
}

$(document).ready(function (){
    addFocusHandler();
    document.onkeypress = detectspecialkeys;
});
