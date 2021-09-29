let lis = document.getElementsByTagName('li')
let buts = document.getElementsByClassName('delete')
let checks = document.getElementsByClassName('check')

for(let i=0; i<lis.length; i++){
  buts[i].addEventListener('click', ()=>{
      fetch(`/todoDelete/:${lis[i].textContent}`, {
          method: 'POST',
          body:  ''
      })
      document.location.reload(true);
    })
    checks[i].addEventListener('click', () => {
      if(checks[i].value == "0" || checks[i].value == "on"){
        checks[i].value = "1"
      } else {
        checks[i].value = "0"
      }

      fetch(`/todoUpdate/:${lis[i].textContent}-${checks[i].value}`, {
        method: 'POST',
        body: ''
      })
    })
  }
