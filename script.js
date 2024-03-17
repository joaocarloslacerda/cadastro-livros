async function cadastrarLivro(){
    
    const tituloLivro = document.getElementById("tituloLivro").value
    const descricaoLivro = document.getElementById("descricaoLivro").value

    montaJson(tituloLivro, descricaoLivro)    
}
async function montaJson(tituloLivro, descricaoLivro){

    const url = "https://api-aula.up.railway.app/livros"

    const body = {
         title: tituloLivro,
         description: descricaoLivro
    }
    await requestPost(url, body)
}
async function requestPost(url, body){

    const retornoFetch = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json"}
    })

    const retornoJson = await retornoFetch.json()

    const divResultado = document.getElementById("resultado")
    divResultado.style.display = "block"
    if(retornoFetch.ok == true){
        divResultado.innerText = "Enviado com sucesso!"
        divResultado.style.backgroundColor = "#207868"
    }
    else{
        divResultado.innerText = "Formulário inválido"
        divResultado.style.backgroundColor = "#AC6363"
    }


    console.log(retornoFetch)

    console.log(retornoJson)
}