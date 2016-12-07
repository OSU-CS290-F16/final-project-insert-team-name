
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
<<<<<<< HEAD

=======
  if (event.target.className=="modal-confirm"){
    var newPic= document.createElement('section');
    newPic.classList.add('pix');
    var pikkies = document.getElementsByClassName('pix');
    var text="<a href=/pix/"+(pikkies.length+1)+"> <img src="+document.getElementById('new-photo-url').value +"></a>";
    newPic.innerHTML=text;
    var com = document.createElement('p');
    var c = document.createTextNode(document.getElementById('new-photo-comment').value);
    com.appendChild(c);
    newPic.appendChild(com);
    document.getElementsByTagName('main')[0].appendChild(newPic);
    document.getElementById('new-photo-url').value="";
    document.getElementById('new-photo-comment').value="";
    document.getElementById('add-photo-modal').classList.toggle('sneaky');
  }
>>>>>>> 7f1d80a9669028f691725fb83a9174d6a8f87ea1
});
