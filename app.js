const text = document.querySelector('.text')
const btn = document.querySelector('.btn')
const results = document.querySelector('.results')

let todos = JSON.parse(localStorage.getItem("TODOS")) || [];

window.onload = () => {
    text.focus()
    
    todos.forEach((x) => {
   results.innerHTML += ` <div id= ${x.id} class ="result ${
     x.icon ? "bg" : ""
   }">
            <i class="${
              x.icon ? "fa-solid fa-check" : "fa-regular fa-square"
            }"></i>
        <p>${x.text}</p>
        <i class="fa-sharp fa-solid fa-trash-can"></i>
        </div>`;
    });

};

btn.addEventListener('click',()=>{
    if(!text.value){
        alert('Listeye Birşeyler Giriniz')
    }
    else{
        const template = {
            id : new Date().getTime(),
            icon : false,
            text : text.value,
        }
        results.innerHTML += ` <div id= ${template.id} class ="result ${
          template.icon ? "bg" : ""
        }">
            <i class="${
              template.icon ? "fa-solid fa-check" : "fa-regular fa-square"
            }"></i>
        <p>${template.text}</p>
        <i class="fa-sharp fa-solid fa-trash-can"></i>
        </div>`;
        todos.push(template)
        localStorage.setItem("TODOS",JSON.stringify(todos))
        console.log(todos)
        text.value = ''
    }
})

text.addEventListener('keydown',(e) =>{
    if(e.code === 'Enter'){
        btn.click()
    }
})

results.addEventListener('click',(e)=>{

    // const { id, completed, text } = template;
    const id = e.target.parentElement.getAttribute("id");
    if (e.target.classList.contains("fa-trash-can")) {
        e.target.parentElement.remove()
        
        todos = todos.filter((todo) => todo.id !== Number(id));
        localStorage.setItem("TODOS", JSON.stringify(todos));
    }

    else if(e.target.classList.contains('fa-square')){
        e.target.parentElement.classList.add("bg")
      e.target.classList.remove("fa-regular","fa-square");
       e.target.classList.add("fa-solid" ,"fa-check");
   todos.map((todo, index) => {
     if (todo.id == id) {
       todos[index].icon = !todos[index].icon;
     }
   });
   localStorage.setItem("TODOS", JSON.stringify(todos));
    
    }
    else if (e.target.classList.contains("fa-check")) {
         e.target.parentElement.classList.remove("bg");
      e.target.classList.add("fa-regular", "fa-square");
      e.target.classList.remove("fa-solid", "fa-check");

      todos.map((todo, index) => {
        if (todo.id == id) {
          todos[index].icon = !todos[index].icon;
        }
      });
      localStorage.setItem("TODOS", JSON.stringify(todos));
    }
   
    })

