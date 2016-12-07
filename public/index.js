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

  if (event.target.className=="modal-confirm"){
    var rate=Math.floor(Math.random()*5)+11;
    var pikkies = document.getElementsByClassName('pix');
    var postUrl = '/pix/new_photo';
    var post = new XMLHttpRequest();
    post.open('POST', postUrl);
    post.setRequestHeader('Content-Type', 'application/json');
    var newPic= document.createElement('section');
    newPic.classList.add('pix');
    var url=(document.getElementById('new-photo-url').value);
    if(validator.isURL(url)){
    var text="<a href=/pix/"+(pikkies.length+1)+"> <img src="+url +"></a>";
  }
  else {
    document.getElementById('new-photo-url').value="";
    document.getElementById('new-photo-comment').value="";
    document.getElementById('add-photo-modal').classList.toggle('sneaky');
    document.getElementById('modal-backdrop').classList.toggle('sneaky');
  }
    newPic.innerHTML=text;
    var com = document.createElement('p');
    var c = document.createTextNode(document.getElementById('new-photo-comment').value +" "+ rate+"/10");
    com.appendChild(c);
    newPic.appendChild(com);
    document.getElementsByTagName('main')[0].appendChild(newPic);
    document.getElementById('new-photo-url').value="";
    document.getElementById('new-photo-comment').value="";
    document.getElementById('add-photo-modal').classList.toggle('sneaky');
    document.getElementById('modal-backdrop').classList.toggle('sneaky');
    post.send(JSON.stringify({
      url: document.getElementById('new-photo-url').value,
      comment: document.getElementById('new-photo-comment').value,
      rate: rate
  }));
  }
});
