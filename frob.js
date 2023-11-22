const inputbox = document.querySelector("#inputData");
document.addEventListener('DOMContentLoaded', () => {
    inputbox.addEventListener('input', (e) => {
        console.log("Hi");
        console.log(e.target.value);
        //const text = e.target.value;
        //textarea.value = input.replace('/[^0-9,]/g', '');
        //"\d{1,9}\s*,\s*\d{1,9}(\s*,\s*\d{1,9})*\s*,{0,1}"
    });
  });

async function test() {
    const formdata = new FormData(document.querySelector("#myForm"));
    
    /*for(let [name, value] of formdata) {
        console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
    }*/
    const algos = formdata.getAll("algos");
    const langs = formdata.getAll("langs");
    const inputdata = formdata.get("inputData") || "6,9,23";
    const coins_str = inputdata.split(",");
    const coins = coins_str.map((item) => parseInt(item));
    const req_data = { "coins": coins, "algos": algos, "langs": langs };
    
    let cpp_output  = "cpp_blank";
    let py_output  = "py_blank";    
    
    try {
        const response = await fetch('/cgi-bin/test2.cgi', {
            method: 'POST',
            body: JSON.stringify(req_data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });
        if (response.ok) {
            const cppdata = await response.json();
            cpp_output = JSON.stringify(cppdata);
        }        
    
        const pyres = await fetch('/cgi-bin/pycgi_frob.py', { 
            method: 'POST',
            body: JSON.stringify(req_data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then((res) => res.json()).then((pydata)=>{
            py_output = JSON.stringify(pydata);
        });
    } catch (error) {
        // Handle network errors here
        console.error('TryError:', error);
    }
    document.querySelector('#pydiv').innerText = cpp_output.concat("\n***\n", py_output);
    document.querySelector('#inputData').value = "";
}