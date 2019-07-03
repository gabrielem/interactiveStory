let prevScene = 0
let currentScene = 0
let bag = []
const objects = {
  'chiave': {'hint': 'serve una chiave', 'description': 'Una vecchia chiave arruginita', 'imageUrl': 'https://d27ucmmhxk51xv.cloudfront.net/media/english/illustration/key.jpg?version=1.1.88'}
}
const content = [
  {'title': 'Benvenuto!', 'text': 'Sei davanti ad un bivio dove vuoi andare?','imageUrl': 'http://fondazionetpe.it/wp-content/uploads/2018/04/super-1-960.jpg', 'paths':[
    {'label': 'Vai a destra','index': 1}, //TODO make 1
    {'label': 'Vai a sinistra','index': 3},
  ]},
  {'title': 'Prendi oggetto', 'text': 'bla bla','imageUrl': 'https://www.securitycagesdirect.co.uk/wp-content/uploads/2016/08/bzp-cage-2.jpg',
  'object': 'chiave',
  'paths':[
    {'label': 'Muori','index': 3},
    {'label': 'Avanti','index': 2},
  ]},
  {'title': 'Sceltga2', 'text': 'bla bla','imageUrl': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Arrow_Season_3.png/220px-Arrow_Season_3.png',
  'objectRequired': 'chiave',
  'paths':[
    {'label': 'Muori','index': 3},
    {'label': 'Vinci','index': 4},
  ]},
  {'title': 'Sei morto!', 'text': 'morto..','imageUrl': 'https://cdn-images-1.medium.com/max/1600/1*ZSQNbk2PDP_JLewAjkVLmA.jpeg', 'paths':[
    {'label': 'Ricomincia','index': 0}
  ]},
  {'title': 'Hai vinto!!', 'text': 'Vinto!','imageUrl': 'https://st2.depositphotos.com/1005979/9531/i/950/depositphotos_95312146-stock-photo-and-the-winner-is-gold.jpg', 'paths':[
    {'label': 'Ricomincia','index': 0}
  ]},

];
function takeObj(ob) {
  bag.push(ob)
}
function makeActionBtn(template, item) {
  let objConstraint = false
  let btns = ''
  let paths = item.paths

  /*
    Add object on the scene to offer the user to get.
  */
  if (item.object && bag.indexOf(item.object) == -1) {
    const ob = objects[item.object]
    template = template  + '<div class="object row"><div class="col-md-2"><img class="img-fluid" src="' +
    ob.imageUrl + '" alt="" /></div><div class="col-md-10 text-left">' + ob.description +  ' <button class="takeObj" rel="' + item.object + '">prendi!</button></div></div>'
  }

  if (item.objectRequired) {
    objConstraint = true
  }
  if (objConstraint && bag.indexOf(item.objectRequired) == -1) {
    console.log('item', item);
    console.log('objects', item.objectRequired, objects[item.objectRequired]);

    template = template  + '<div>' + objects[item.objectRequired].hint + '</div>'
    template = template  + '<button type="button" onclick="goToScene(\'' + prevScene  +  '\')">torna indietro</button>'
  } else {
    console.log('paths', paths);
    for (var i = 0; i < paths.length; i++) {
      btns = btns + '<button type="button" onclick="goToScene(\'' + paths[i].index  +  '\')">' + paths[i].label  + '</button>'
    }
    console.log('btns', btns);
    template = template  + '<div class="sceneBtns">' + btns + '</div>'
    console.log('___template', template);
  }



  return template
}


function start() {
  goToScene(0)
}

function goToScene(index) {
  var template = $('#card-template').html();
  template = template.replace('_page_', index)
  template = template.replace('_title_', content[index].title)
  template = template.replace('_text_', content[index].text)
  template = template.replace('_image_url_', content[index].imageUrl)
  template = makeActionBtn(template, content[index])
  $('#storyContent').html(template);
  prevScene = currentScene
  currentScene = index
}

$( document ).ready(function() {
  start()
  $(document).on('click', 'button.takeObj', function() {
    var ob = $(this).attr('rel');
    console.log('ob', ob);
    takeObj(ob)
    event.preventDefault();
    });

});
