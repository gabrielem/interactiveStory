let prevScene = 0
let currentScene = 0
let bag = []
const content = [
  {'title': 'Benvenuto!', 'text': 'Sei davanti ad un bivio dove vuoi andare?','imageUrl': 'http://fondazionetpe.it/wp-content/uploads/2018/04/super-1-960.jpg', 'paths':[
    {'label': 'Vai a destra','index': 1},
    {'label': 'Vai a sinistra','index': 2},
  ]},
  {'title': 'Sceltga2', 'text': 'bla bla','imageUrl': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Arrow_Season_3.png/220px-Arrow_Season_3.png',
  'objectRequired': {'name': 'chiave', 'hint': 'serve una chiave'},
  'paths':[
    {'label': 'Muori','index': 2},
    {'label': 'Vinci','index': 3},
  ]},
  {'title': 'Sei morto!', 'text': 'morto..','imageUrl': 'https://cdn-images-1.medium.com/max/1600/1*ZSQNbk2PDP_JLewAjkVLmA.jpeg', 'paths':[
    {'label': 'Ricomincia','index': 0}
  ]},
  {'title': 'Hai vinto!!', 'text': 'Vinto!','imageUrl': 'https://st2.depositphotos.com/1005979/9531/i/950/depositphotos_95312146-stock-photo-and-the-winner-is-gold.jpg', 'paths':[
    {'label': 'Ricomincia','index': 0}
  ]},

];

function makeActionBtn(template, item) {
  let objConstraint = false
  let btns = ''
  let paths = item.paths

  if (item.objectRequired) {
    objConstraint = true
  }
  if (objConstraint) {
    console.log('item', item);
    template = template  + '<div>' + item.objectRequired.hint + '</div>'
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
});
