let todos = document.getElementsByTagName('c')
let buts = document.getElementsByClassName('delete')
let checks = document.getElementsByClassName('check')
let lis = document.getElementsByTagName('li')

function save(i, initial=false){
  if(initial == false){
    if(checks[i].checked == false){
      checks[i].checked = true
      todos[i].style['text-decoration'] = 'line-through'
    } else {
      checks[i].checked = false
      todos[i].style['text-decoration'] = 'none'
    }


    fetch(`/todoUpdate/:${todos[i].textContent}-${checks[i].checked}`, {
      method: 'POST',
      body: ''
    })
  } else {
    if(checks[i].checked == false){
      todos[i].style['text-decoration'] = 'none'
    } else {
      todos[i].style['text-decoration'] = 'line-through'
    }
  }
}

for(let i=0; i<todos.length; i++){
  buts[i].addEventListener('click', ()=>{
      fetch(`/todoDelete/:${todos[i].textContent}`, {
          method: 'POST',
          body:  ''
      })
      document.location.reload(true);
    })
    todos[i].addEventListener('click', () => save(i))
    checks[i].addEventListener('click', () => save(i))

    save(i, true) // Line-Through initial
  }
