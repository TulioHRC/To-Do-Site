let lis = document.getElementsByTagName('li')
let buts = document.getElementsByClassName('delete')

for(let i=0; i<lis.length; i++){
  buts[i].addEventListener('click', ()=>{
      fetch(`/todoDelete/:${lis[i].textContent}`, {
          method: 'POST',
          body:  ''
      })
      document.location.reload(true);
    })
  }
