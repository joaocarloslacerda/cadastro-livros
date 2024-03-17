async function cadastrarLivro(){
    
    const tituloLivro = document.getElementById("tituloLivro").value
    const descricaoLivro = document.getElementById("descricaoLivro").value

    montaJsonPost(tituloLivro, descricaoLivro)    
}
async function mostrarLivro(){

    const campoTitle = document.getElementById("title")
    const campoDescription = document.getElementById("description")

    const response = await requestGet()
    
    response.forEach(element => {
        campoTitle.innerText = element.title
        campoDescription.innerText = element.description

        console.log(element.title)
        console.log(element.description)
    })

}

async function montaJsonPost(tituloLivro, descricaoLivro){

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
async function requestGet(){

    const url = "https://api-aula.up.railway.app/livros"

    const requestGet = await fetch(url)
    const livro = await requestGet.json()

    return livro
}