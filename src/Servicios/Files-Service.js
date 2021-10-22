import saveAs from "file-saver";

function xml_hhtp_request(urlToFile,nameFile){      
    var oReq = new XMLHttpRequest();  
    oReq.open("GET", urlToFile, true);    
    oReq.responseType = "blob";  
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