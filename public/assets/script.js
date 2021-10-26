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

      document.location.reload(true)
    })

    if(checks[i].checked == true){ // Initial line-through
      todos[i].style['text-decoration'] = 'line-through'
    }
    checks[i].addEventListener('click', () => save(i))
  }

// Themes

document.getElementById('slider').addEventListener('click', () => {
  fetch(`/theme/:${document.getElementById('slider').checked}`, {
      method: 'POST',
      body:  ''
  })

  // sleep time expects milliseconds
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  sleep(500).then(() => {
      document.location.reload(true) // Reloading page after the cookie switch and waiting 100 milisseconds to avoid errors
  });
})
