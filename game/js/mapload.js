function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
function httpGet(theUrl)
    {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
    }
var level = "x0dzC6jQ"
var $map = httpGet("./levels/raw.php?i=" + level);
//alert(httpGet("./levels/" + window.location.href.replace(/http:\/\/.+\/(.*)/, "$1")));
