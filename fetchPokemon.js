const type=document.querySelector('#type')
const height=document.querySelector('#height')
const weight=document.querySelector('#weight')
const stats=[document.querySelector('#ps')
    ,document.querySelector('#atk')
    ,document.querySelector('#def')
    ,document.querySelector('#spatk')
    ,document.querySelector('#spdef')
    ,document.querySelector('#speed')]

console.log(stats[0].style)
document.forms[0].addEventListener('submit',(e)=>{
    e.preventDefault()
    const pokemonName=document.querySelector('#input').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    fetch(url)
    .then(async response => {
        if (response.status != "200"){
            alert("Error, no existe ese pokémon")
            img.src="./imgs/estatica.gif"
        }
        return await response.json()
    })
    .then(response => {
        pokemonImage=response.sprites.front_default;
        img.src=pokemonImage;
        height.textContent=response.height
        weight.textContent=response.weight
        if(type.hasChildNodes()){
            type.replaceChildren()
        }
        for(let pokeType of response.types){
            let span=document.createElement('span')
            span.textContent=" "+pokeType.type.name.toUpperCase()
            type.appendChild(span)
        }
        for(let i=0;i<stats.length;i++){
            console.log(response.stats[i].base_stat)
            stats[i].style.height=(response.stats[i].base_stat*100)/200+"%"
        }        
    })
})