async function cadastrarLivro(){
    
    const tituloLivro = document.getElementById("tituloLivro")
    const descricaoLivro = document.getElementById("descricaoLivro")

    limpaAvisosCadastro()

    const retornaValidacao = await validaTituloDescricao(tituloLivro, descricaoLivro)
    
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
        }
        if(!descricaoLivro.value){
            descricaoLivro.placeholder = "Descrição é obrigatório"
            descricaoLivro.style.backgroundColor = "#AC6363"
        }
        divResultado.style.display = "block"
        divResultado.innerText = "Formulário inválido"
        divResultado.style.backgroundColor = "#AC6363"
        return false
    }
    else if(tituloLivro.value || descricaoLivro.value){
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

    validaRequestPost(retornoFetch)
}
async function validaRequestPost(retornoFetch){

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

    const cardsContainer = document.getElementById("cardsContainer")

    const response = await requestGet()

    for(const element of response){

        let card = document.createElement("div")
        card.classList.add("card")
        
        let listTitle = document.createElement("h1")
        listTitle.textContent = element.title

        let listDescription = document.createElement("p")
        listDescription.textContent = element.description

        estilizaCards(card, listTitle)

        card.appendChild(listTitle)
        card.appendChild(listDescription)

        cardsContainer.appendChild(card)
    }
}
async function requestGet(){

    const url = "https://api-aula.up.railway.app/livros"

    const requestGet = await fetch(url)
    const livro = await requestGet.json()

    return livro
}
async function estilizaCards(card, listTitle){

    card.style.display = "inline-block"
    card.style.marginTop = "10px"
    card.style.marginRight = "10px"
    card.style.padding = "10px"
    card.style.backgroundColor = "#f3f5f7"
    card.style.border = "2px solid #4B5C6B"
    card.style.borderRadius = "8px"
    card.style.minWidth = "300px"
    listTitle.style.paddingBottom = "5px"
    listTitle.style.textTransform = "uppercase"
}