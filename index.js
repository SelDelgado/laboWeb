var createGame = require('voxel-engine');
var highlight = require('voxel-highlight');
var voxel = require('voxel');
var createTerrain = require('voxel-perlin-terrain');

var game = createGame({
	texturePath: 'textures/',
    generate: function(x,y,z) {
    //return x*x+y*y+z*z <= 30*30 ? 1 : 0 // sphere world
    return y === 1 ? 1 : 0
    },
    
  
    materials: [['grass', 'dirt', 'grass_dirt'], 'brick', 'dirt'],
    keybindings: {
        'W': 'forward'
      , 'A': 'left'
      , 'S': 'backward'
      , 'D': 'right'
      , 'R': 'view'
      , 'H': 'adjacent'
      , 'I': 'select'
      , 'X': 'select_copy'
      , 'L': 'select_preview'
      , 'E': 'select_paste'
      , 'Y': 'select_export'
      , 'T': 'select_rotate_right'
      , 'G': 'select_rotate_left'
      , 'O': 'life_reset'
      , 'P': 'life_pause'
      , 'U': 'fire3'
      , 'J': 'fire2'
      , 'N': 'material_change'
      , '<mouse 1>': 'fire'
      , '<mouse 2>': 'firealt'
      , '<space>'  : 'jump'
      , '<shift>'  : 'crouch'
      , '<control>': 'alt'
    }, controls: {
        discreteFire: true
      , speed: 0.001    // default is 0.0032, see voxel-control/index.js
      , accelTimer: 500 // time to reach max speed
    }
});

var container = document.querySelector('#container')

game.appendTo(container)



// rotate camera left so it points at the characters
//game.controls.yawObject.rotation.y = 1.5


var createPlayer = require('voxel-player')(game);

var dude = createPlayer('textures/shama.png');
dude.possess();
dude.yaw.position.set(0,100,0);


// highlight blocks when you look at them
var blockPosPlace, blockPosErase
var highlighter = highlight(game, {
  color: 0xffff00
  , distance: 100
  , animate: true
})

highlighter.on('highlight', function (voxelPos) { blockPosErase = voxelPos })
highlighter.on('remove', function (voxelPos) { blockPosErase = null })
highlighter.on('highlight-adjacent', function (voxelPos) { blockPosPlace = voxelPos })
highlighter.on('remove-adjacent', function (voxelPos) { blockPosPlace = null })

window.game = game;


game.on('fire', function (target, state) {
  var position = blockPosPlace
  if (position) {
    game.createBlock(position, 1)
  }
  else {
    position = blockPosErase
    if (position) game.setBlock(position, 0)
  }
})

game.on('fire2', function (target, state) {
  var position = blockPosPlace
  if (position) {
    game.createBlock(position, 2)
  }
  else {
    position = blockPosErase
    if (position) game.setBlock(position, 0)
  }
})

game.on('fire3', function (target, state) {
  var position = blockPosPlace
  if (position) {
    game.createBlock(position, 3)
  }
  else {
    position = blockPosErase
    if (position) game.setBlock(position, 0)
  }
})