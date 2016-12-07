document.body.addEventListener('click',function(event){
  if (event.target.className=="navbar-A")
      document.body.getElementById('add-photo-modal').classList.toggle('sneaky')
});
