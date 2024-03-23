async function cadastrarLivro(){
    
    const tituloLivro = document.getElementById("tituloLivro")
    const descricaoLivro = document.getElementById("descricaoLivro")

    limpaAvisosCadastro()

    const retornaValidacao = validaTituloDescricao(tituloLivro, descricaoLivro)
    
    if(retornaValidacao){
        montaJsonPost(tituloLivro, descricaoLivro)
    }

}
async function validaTituloDescricao(tituloLivro, descricaoLivro){

    const divResultado = document.getElementById("resultado")

    if(!tituloLivro.value || !descricaoLivro.value){
        console.log(tituloLivro.value)
        console.log(descricaoLivro.value)
        if(!tituloLivro.value){
            tituloLivro.placeholder = "Título é obrigatório"
            tituloLivro.style.backgroundColor = "#AC6363"
            console.log("entrou titulo")
        }
        if(!descricaoLivro.value){
            descricaoLivro.placeholder = "Descrição é obrigatório"
            descricaoLivro.style.backgroundColor = "#AC6363"
            console.log("entrou descricao")
        }
        divResultado.style.display = "block"
        divResultado.innerText = "Formulário inválido"
        divResultado.style.backgroundColor = "#AC6363"
        return false
    }
    else{
        return true
    }
}
async function montaJsonPost(tituloLivro, descricaoLivro){

    const body = {
         title: tituloLivro.value,
         description: descricaoLivro.value
    }
    await requestPost(body)
}
async function requestPost(body){

    const url = "https://api-aula.up.railway.app/livros"

    const retornoFetch = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json"}
    })

    const retornoJson = await retornoFetch.json()

    console.log(retornoJson)

    const divResultado = document.getElementById("resultado")
    divResultado.style.display = "block"
    if(retornoFetch.ok == true){
        divResultado.innerText = "Enviado com sucesso!"
        divResultado.style.backgroundColor = "#207868"

        const divLivroCadastrado = document.getElementById("livroCadastrado")
        
        const divTituloLivro = document.getElementById("tituloLivro")
        divLivroCadastrado.innerText = `Você cadastrou o livro ${divTituloLivro.value}`
        divLivroCadastrado.style.display = "block"
    }
}
async function limpaAvisosCadastro(){
    const divTituloLivro = document.getElementById("tituloLivro")
    divTituloLivro.style.backgroundColor = "white"

    const divDescricaoLivro = document.getElementById("descricaoLivro")
    divDescricaoLivro.style.backgroundColor = "white"

    const divLivroCadastrado = document.getElementById("livroCadastrado")
    divLivroCadastrado.style.display = "none"
}
async function mostrarLivro(){

    const campoTitle = document.getElementById("title")
    const campoDescription = document.getElementById("description")

    const response = await requestGet()

    console.log(document.getElementById("title"))
    console.log(document.getElementById("description"))
    
    response.forEach(element => {
        //campoTitle.innerText = element.title
        //campoDescription.innerText = element.description
        listTitle = document.createElement('li')
        listDescription = document.createElement('li')

        listTitle.textContent = element.title
        listDescription.textContent = element.description

        console.log(element.title)
        console.log(element.description)


        campoTitle.appendChild(listTitle)
        campoDescription.appendChild(listDescription)




    })
}
async function requestGet(){

    const url = "https://api-aula.up.railway.app/livros"

    const requestGet = await fetch(url)
    const livro = await requestGet.json()

    return livro
}