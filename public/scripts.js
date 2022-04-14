
const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')


async function load(){
  const res = await fetch("http://localhost:4000/").then((data) => data.json())
  
  res.urls.map(({name, url}) => addElement({name, url}))


}

load()



function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => {
        removeElement(trash)
        const xhr = new XMLHttpRequest()
        xhr.open('DELETE','http://localhost:4000/urls?name='+name+"&url="+url+"&del=1",true)
        xhr.onload = () =>{
            console.log(this.response)
        }
        xhr.send()
    }

    li.append(a)
    li.append(trash)
    ul.append(li)

   
    

    
   
    
    
    
}

function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?')){
        el.parentNode.remove();
     

    }
}


form.addEventListener("submit", (event) => {
    
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^ http/.test(url)) 
        return alert("Digite a url da maneira correta")

    addElement({ name, url })
   
    input.value = ""

    xhr = new XMLHttpRequest();
    xhr.open('PUT','http://localhost:4000/urls?name='+name+"&url="+url,true);
    xhr.onload = function(){
        console.log(this.responseText);
    }
    xhr.send();
  
})

