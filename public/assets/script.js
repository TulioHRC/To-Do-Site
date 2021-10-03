let todos = document.getElementsByTagName('c')
let buts = document.getElementsByClassName('delete')
let checks = document.getElementsByClassName('check')
let lis = document.getElementsByTagName('li')

function save(i){
  if(checks[i].checked == true){
    todos[i].style['text-decoration'] = 'line-through'
  } else {
    todos[i].style['text-decoration'] = 'none'
  }

  fetch(`/todoUpdate/:${todos[i].textContent}-${checks[i].checked}`, {
    method: 'POST',
    body: ''
  })
}

for(let i=0; i<todos.length; i++){
  buts[i].addEventListener('click', ()=>{
      fetch(`/todoDelete/:${todos[i].textContent}`, {
          method: 'POST',
          body:  ''
      })
      document.location.reload(true);
    })

    if(checks[i].checked == true){ // Initial line-through
      todos[i].style['text-decoration'] = 'line-through'
    }
    checks[i].addEventListener('click', () => save(i))
  }
