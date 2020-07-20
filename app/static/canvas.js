let areaOpen = false;

/* ------▼ matter.js------ */

// Matter Modules
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

// Canvas
const menuHeight = $('.menu').height();
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight - menuHeight;

// Scene Container
let container = document.querySelector(".container");
container.width = canvasWidth;
container.height = canvasHeight;

// Engine
// uncomment to show matter.js canvas
const engine = Engine.create(/*container, */{
  render: {
    options: {
      width: container.width,
      height: container.height
    }
  }
});

// circle for girl
const girlRectangleX = 180;
const girlRectangleY = 380;
const girlRectangleW = 220;
const girlTop = getSpecificCircle(girlRectangleX, girlRectangleY, girlRectangleW);

// circle for hedgehog
let hhRectangleX = 500;
let hhRectangleY = 400;
let hhRectangleW = 80;
const hhTop = getSpecificCircle(hhRectangleX, hhRectangleY, hhRectangleW);

// Circle
let boxes = [];
const circleNum = 100;  // the number of circles
const boundaryLeft = 50;
const boundaryRight = canvasWidth - 50;
const boundaryTop = 20;
const circleMaxSize = 20;
const circleMinSize = 20;
for (let i=0; i<circleNum; i++) {
  const xPos = randomValue(boundaryRight, boundaryLeft);
  const yPos = randomValue(canvasHeight, 0);
  const circleSize = randomValue(circleMaxSize, circleMinSize)
  let tmpBox = Bodies.rectangle(xPos, yPos, circleSize, circleSize, {chamfer: {radius: circleSize / 2}});
  Body.setVelocity(tmpBox, {x: 0, y: randomValue(5, 0)});
  boxes.push(tmpBox);
}

// Add to world
World.add(engine.world, [girlTop, hhTop]);
World.add(engine.world, boxes);

// run the engine
Engine.run(engine);

function getSpecificCircle(x, y, w) {
  return Bodies.rectangle(x, y, w, w, {
    isStatic: true,
    chamfer: { radius: w / 2 }
  });
}

/* ------▲ matter.js------ */


/* ------▼ pixi.js------ */

//Aliases
let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite,
  TextStyle = PIXI.TextStyle,
  AnimatedSprite = PIXI.AnimatedSprite;

//Area
const areaX = canvasWidth / 3;
const areaY = canvasHeight / 3;
const areaWidth = canvasWidth / 2;
const areaHeight =  canvasHeight / 2;

//Create a Pixi Application
let app = new PIXI.Application({width: canvasWidth, height: canvasHeight, transparent: true});
document.querySelector(".container").appendChild(app.view);

let girl, rectangles = [], hedgehogAnim, hhMoving = false, hhDirection = {}, hhDestination = {};
const moveBoundary = {x: 100, y: 100, w: canvasWidth - 100, h: canvasHeight - 100};

loader
  .add("images/pic.json")
  .load(setup);

function setup() {
  //Create girl sprite
  let id = resources["images/pic.json"].textures;
  girl = new Sprite(id["girl.png"]);
  app.stage.addChild(girl);
  girl.anchor.set(0.5, 0.5);
  girl.x = 200;
  girl.y = 400;

  //Create hedgehog sprite
  let hedgehogFrames = [];
  for (let i=0; i<8; i++) {
    hedgehogFrames.push(PIXI.Texture.from(`hedgehog-${i}.png`));
  }
  hedgehogAnim = new AnimatedSprite(hedgehogFrames);
  app.stage.addChild(hedgehogAnim);
  hedgehogAnim.anchor.set(0.5, 0.5);
  hedgehogAnim.x = hhRectangleX;
  hedgehogAnim.y = hhRectangleY + 10;
  hedgehogAnim.animationSpeed = 0.1;
  hedgehogAnim.play();

  //Create circles
  const area = areaPosition();
  boxes.forEach((box,index) => {
    let rectangle = new PIXI.Graphics();
    rectangle.beginFill(randomColor());
    rectangle.drawCircle(0, 0, 10, 10);
    rectangle.endFill();
    rectangle.areaPosition = area[index];
    rectangle.velocityToArea = {};
    rectangles.push(rectangle);
    app.stage.addChild(rectangle);
  })

  //Create text
  const titlePosX = canvasWidth / 2;
  const titlePosY = 100;
  let titleStyle = new TextStyle({
    fontFamily: "Arial",
    fontSize: 100,
    fill: "white",
    stroke: randomColor(),
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
  });
  let title = new PIXI.Text("Pixel Gimmick", titleStyle);
  title.anchor.set(0.5, 0.5);
  title.position.set(titlePosX, titlePosY);
  app.stage.addChild(title);

  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {

  if (areaOpen) {
    // draw area
    rectangles.forEach((rectangle, index) => {
      const diffX = rectangle.areaPosition.x - rectangle.x;
      const diffY = rectangle.areaPosition.y - rectangle.y;
      const velX = 20;
      const velY = 20;

      if (diffX > velX) {
        rectangle.x += velX;
      } else if (diffX < -1 * velX) {
        rectangle.x -= velX;
      } else {
        rectangle.x = rectangle.areaPosition.x;
      }
      if (diffY > velY) {
        rectangle.y += velY;
      } else if (diffY < -1 * velY) {
        rectangle.y -= velY;
      } else {
        rectangle.y = rectangle.areaPosition.y;
      }

      Body.setPosition(boxes[index], {x: rectangle.x, y: rectangle.y});
      Body.setVelocity(boxes[index], {x: 0, y: 0});
    })
  } else {
    // Update falling circles
    boxes.forEach((box, index) => {
      rectangles[index].x = box.position.x;
      rectangles[index].y = box.position.y;
      if (box.position.y > canvasHeight) {
        Body.setPosition(box, {x: randomValue(boundaryRight, boundaryLeft), y: boundaryTop});
        Body.setVelocity(box, {x: 0, y: 0});
      }
    })
  }

  // hedgehog moving
  if (!hhMoving) {
    // will move or not?
    hhMoving = randomValue(0, 100) === 1;
    if (!hhMoving) return;

    // which direction?
    hhDirection.x = randomValue(-1, 2);
    hhDirection.y = randomValue(-1, 2);

    // how far?
    const dist = randomValue(100, 300);
    hhDestination.x = hhRectangleX + dist * hhDirection.x;
    hhDestination.y = hhRectangleY + dist * hhDirection.y;

    // if over boundary, not move
    if (isOverBoundary(hhDestination)) {
      // can't move...
      hhMoving = false;
    } else {
      // can move!
      // flip according to the direction
      if (hhDirection.x > 0) {
        hedgehogAnim.scale.x = -1;
      } else {
        hedgehogAnim.scale.x = 1;
      }
    }

  } else {
    // still move?
    if (hhDestination.x === hhRectangleX && hhDestination.y === hhRectangleY) {
      // arrived, stop!
      hhMoving = false;

    } else {
      // not arrived yet, still move!
      // update hedgehog circle
      hhRectangleX += hhDirection.x;
      hhRectangleY += hhDirection.y;
      Body.setPosition(hhTop, {x: hhRectangleX, y: hhRectangleY});

      // update hedgehog position
      hedgehogAnim.x = hhRectangleX;
      hedgehogAnim.y = hhRectangleY + 10;
    }

  }

}

/* ------▲ pixi.js------ */

// get random value
function randomValue(min, max) {
  return Math.floor( Math.random() * (max - min) ) + min;
}

// get random color
function randomColor() {
  let color = "0x";
  for(let i  =0; i < 6; i++) {
    color += "0123456789ABCDEF"[16 * Math.random() | 0];
  }
  return color;
}

function isOverBoundary(destination) {
  return destination.x < moveBoundary.x ||
    destination.x > moveBoundary.x + moveBoundary.w ||
    destination.y < moveBoundary.y ||
    destination.y > moveBoundary.y + moveBoundary.h;
}

// get area position
function areaPosition() {
  let areaPositions = [];
  const rateWidth = areaWidth * circleNum / (areaWidth + areaHeight);
  const rateHeight = areaHeight * circleNum / (areaWidth + areaHeight);

  const widthCircleNum = Math.floor(rateWidth / 2);
  const heightCircleNum = Math.floor(rateHeight / 2);

  const vertexLeftTop = {x: areaX, y: areaY};
  const vertexLeftBottom = {x: areaX, y: areaY + areaHeight};
  const vertexRightTop = {x: areaX + areaWidth, y: areaY};
  const vertexRightBottom = {x: areaX + areaWidth, y: areaY + areaHeight};

  const circleSpaceX = (vertexRightTop.x - vertexLeftTop.x) / widthCircleNum;
  const circleSpaceY = (vertexLeftBottom.y - vertexLeftTop.y) / heightCircleNum;

  // Top line and bottom line for area
  for (let i=0;i<widthCircleNum;i++) {
    const tmpWidthX = vertexLeftTop.x + i * circleSpaceX;
    const tmpWidthTopY = vertexLeftTop.y;
    const tmpWidthBottomY = vertexLeftBottom.y;
    areaPositions.push({x: tmpWidthX, y: tmpWidthTopY});
    areaPositions.push({x: tmpWidthX, y: tmpWidthBottomY});
  }

  // Left line and right line for area
  for (let i=0;i<heightCircleNum;i++) {
    const tmpHeightY = vertexLeftTop.y + i * circleSpaceY;
    const tmpHeightLeftX = vertexLeftTop.x;
    const tmpHeightRightX = vertexRightTop.x;
    areaPositions.push({x: tmpHeightLeftX, y: tmpHeightY});
    areaPositions.push({x: tmpHeightRightX, y: tmpHeightY});
  }

  // fill in the arr
  if (areaPositions.length <= circleNum) {
    let diffNum = circleNum - areaPositions.length;
    for (let i=0; i<diffNum; i++) {
      areaPositions.push(vertexRightBottom);
    }
  }

  return areaPositions;
}
areaPosition();

window.addEventListener("resize", function(){
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  container.width = window.innerWidth;
  container.height = window.innerHeight;
});
