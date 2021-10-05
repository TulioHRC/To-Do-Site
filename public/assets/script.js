// Checkboxes

let todos = document.getElementsByTagName('c')
let buts = document.getElementsByClassName('delete')
let checks = document.getElementsByClassName('check')
let lis = document.getElementsByTagName('li')

function save(i){ /* Update in the database */
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

// Themes

document.getElementById('slider').addEventListener('click', () => {
  if(document.getElementById('slider').checked == true){
    localStorage.setItem('theme', 'dark')
  } else {
    localStorage.setItem('theme', 'light')
  }
  document.location.reload(true)
})

if(localStorage.getItem('theme') == 'dark'){ // Dark css load
  document.getElementById('slider').checked = true // pre-checking

  let link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = '/assets/dark.css'

  document.getElementsByTagName('HEAD')[0].appendChild(link)
}
