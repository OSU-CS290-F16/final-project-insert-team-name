document.body.addEventListener('click',function(event){
  console.log(event.target);
  if (event.target.className=="add-button")
      document.getElementById('add-photo-modal').classList.toggle('sneaky');

  if (event.target.className=="modal-cancel"){
      document.getElementById('new-photo-url').innerHTML="";
      document.getElementById('new-photo-comment').innerHTML="";
      document.getElementById('add-photo-modal').classList.toggle('sneaky');

  }
});
