const ocrForm = document.querySelector("#ocrform");
ocrForm.addEventListener("submit", async event => {
    event.preventDefault();    
    const ocrformdata = new FormData(ocrForm);
    console.log(ocrformdata);
    
    try {
        const response = await fetch('/cgi-bin/pycgi_ocr_fd.py', {
            method: 'POST',
            body: ocrformdata,
          });
          const result = await response.json();
          document.querySelector("#tessdiv").innerText = JSON.stringify(result);
    } catch (error) {
        console.error('TryError:', error);
    }
});

/*
async function tessBtnClick() {
    console.log ("Hi from tessBtnClick()");
    const ocrformdata = new FormData(document.querySelector("#ocrform"));
    const ocrformdataobj = Object.fromEntries(ocrformdata.entries())
    
    console.log (ocrformdataobj);
    req_data = {"lang" : ocrformdataobj["sel-lang"]};
    req_data["file"] = { "name" : ocrformdataobj["img-up"].name };
    req_data["file"]["size"] = ocrformdataobj["img-up"].size;
    req_data["file"]["type"] = ocrformdataobj["img-up"].type;
    req_data["file"]["dataurl"] = await processFile(ocrformdataobj["img-up"]);
    console.log(req_data); 

    for(let [name, value] of ocrformdata) {
        console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
    }
    
    try {
        const response = await fetch('/cgi-bin/pycgi_ocr_json.py', {
            method: 'POST',
            body: JSON.stringify(req_data),
            headers: {
                "Content-Type": "application/json"
            }
          });
          const result = await response.json();
          document.querySelector("#tessdiv").innerText = JSON.stringify(result);
    } catch (error) {
        console.error('TryError:', error);
    }
}

const processFile = async (inputFile) => {
    const reader = new FileReader();
  
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
  
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(inputFile);
    });
};    
*/