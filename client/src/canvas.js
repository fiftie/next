var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(540, 380);
document.body.appendChild(renderer.view);
PIXI.loader
  .add("coffee", "src/style/asset/algo.png")
  .load(setup);
var block;

function setup() {
  block = new PIXI.Sprite(PIXI.loader.resources.coffee.texture);  
  block.anchor.x = 0.5;
  block.anchor.y = 0.61;

  block.position.x = 200;
  block.position.y = 150;
  stage.addChild(block);
  renderer.render(stage);
  console.log("rendered");
  //theloop();
}

var theloop = function(){
  requestAnimationFrame(theloop);
  block.rotation += .03;
  renderer.render(stage);
};