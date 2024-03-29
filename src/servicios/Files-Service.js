import saveAs from "file-saver";
import ServiceToken from '@/servicios/Token-Services.js'

function xml_hhtp_request(urlToFile,nameFile){        
    var oReq = new XMLHttpRequest();  
    oReq.open("GET", urlToFile, true);    
    oReq.responseType = "blob";  
    let token =  ServiceToken.obtenerToken() //ServiceToken.getCookie('Token')    
    oReq.setRequestHeader('Authorization', 'Bearer ' + token);   
    oReq.send();              
    oReq.onload = function () {
      var file = new Blob([oReq.response], {
        type: "application/pdf",
      });       
      saveAs(file, nameFile);  
    };            
}
export default {
    xml_hhtp_request
}