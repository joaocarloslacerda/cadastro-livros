async function cadastrarLivro(){
    
    const tituloLivro = document.getElementById("tituloLivro").value
    const descricaoLivro = document.getElementById("descricaoLivro").value

    montaJson(tituloLivro, descricaoLivro)

    console.log(tituloLivro, descricaoLivro)
    
}
async function montaJson(tituloLivro, descricaoLivro){

    const url = "https://api-aula.up.railway.app/livros"

    const body = {
         title: tituloLivro,
         description: descricaoLivro
    }

    await requestPost(url, body)

    console.log(url, body)

}
async function requestPost(url, body){

    const retornoFetch = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json"}
    })

    const retornoJson = await retornoFetch.json()
    console.log(retornoJson)
}