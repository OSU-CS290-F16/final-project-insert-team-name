document.body.addEventListener('click',function(event){
  console.log(event.target);
  if (event.target.className=="add-button"){
      document.getElementById('add-photo-modal').classList.toggle('sneaky');
      document.getElementById('modal-backdrop').classList.toggle('sneaky');
    }

  if (event.target.className=="modal-cancel"){
      document.getElementById('new-photo-url').value="";
      document.getElementById('new-photo-comment').value="";
      document.getElementById('add-photo-modal').classList.toggle('sneaky');
      document.getElementById('modal-backdrop').classList.toggle('sneaky');
  }

});
