import jwt_decode from "jwt-decode";

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function guardarToken(token){
    if(localStorage.getItem("token") != null || localStorage.getItem("userInfo") != null)
        localStorage.clear()
    
    let userInfo = jwt_decode(token);
    let barerToken = token
    localStorage.setItem("token", JSON.stringify(barerToken))
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
}
function obtenerToken(){
    return JSON.parse(localStorage.getItem("token"))
}
function obtenerInfoUser(){
    return JSON.parse(localStorage.getItem("userInfo"))
}
export default{
    getCookie,
    guardarToken,
    obtenerToken,
    obtenerInfoUser
}