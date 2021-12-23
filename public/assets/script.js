let todos = document.getElementsByTagName('c')
let buts = document.getElementsByClassName('delete')
let checks = document.getElementsByClassName('check')
let lis = document.getElementsByTagName('li')

// Checkboxes functions

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

// Delete functions

for(let i=0; i<todos.length; i++){
  buts[i].addEventListener('click', ()=>{
      fetch(`/todoDelete/:${todos[i].textContent}`, {
          method: 'POST',
          body:  ''
      }).then(() => {
        document.location.reload(true) // Callback function to avoid errors
      })
    })

    if(checks[i].checked == true){ // Initial line-through
      todos[i].style['text-decoration'] = 'line-through'
    }
    checks[i].addEventListener('click', () => save(i))
  }

// Themes functions

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
