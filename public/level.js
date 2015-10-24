// Initiate and Main Function
// declare shit for initiate
level1Declare = function() {
  wrapper = new Wrapper(1100, 900, 'player');
  myWorld = new World(2000, 1500);
  myWorld.setBackgroundColor('black');
  floor1 = new LevelElem(0, 0, 2000, 50, 'floor1');
  floor1.setBackgroundColor('blue');
  staticArray.push(floor1);
  floor2 = new LevelElem(1950, 50, 50, 1450, 'floor2');
  floor2.setBackgroundColor('blue');
  staticArray.push(floor2);
  floor3 = new LevelElem(0, 50, 50, 1450, 'floor3');
  floor3.setBackgroundColor('blue');
  staticArray.push(floor3);
  floor4 = new LevelElem(150, 50, 150, 50, 'floor4');
  floor4.setBackgroundColor('blue');
  staticArray.push(floor4);
  floor5 = new LevelElem(300, 50, 150, 100, 'floor5');
  floor5.setBackgroundColor('blue');
  staticArray.push(floor5);
  floor6 = new LevelElem(500, 200, 100, 50, 'floor6');
  floor6.setBackgroundColor('blue');
  staticArray.push(floor6);
  floor7 = new LevelElem(650, 300, 100, 50, 'floor7');
  floor7.setBackgroundColor('blue');
  staticArray.push(floor7);
  floor8 = new LevelElem(800, 350, 100, 50, 'floor8');
  floor8.setBackgroundColor('blue');
  staticArray.push(floor8);
  floor9 = new LevelElem(900, 450, 150, 50, 'floor9');
  floor9.setBackgroundColor('blue');
  staticArray.push(floor9);
  floor10 = new LevelElem(1100, 500, 250, 100, 'floor10');
  floor10.setBackgroundColor('blue');
  staticArray.push(floor10);
  floor11 = new MElement(1450, 450, 100, 50, 'floor11', 800, 200, 10);
  floor11.setBackgroundColor('blue');
  staticArray.push(floor11);
  mElementArray.push(floor11);
  floor12 = new LevelElem(1650, 450, 250, 150, 'floor12');
  floor12.setBackgroundColor('blue');
  staticArray.push(floor12);
  floor13 = new LevelElem(670, 800, 500, 50, 'floor13');
  floor13.setBackgroundColor('blue');
  staticArray.push(floor13);
  floor14 = new LevelElem(50, 1450, 1900, 50, 'floor14');
  floor14.setBackgroundColor('blue');
  staticArray.push(floor14);
  floor15 = new LevelElem(800, 1230, 100, 50, 'floor15');
  floor15.setBackgroundColor('blue');
  staticArray.push(floor15);

  player = new Player(60, 60, 'player');
  dynamicArray.push(player);
  headcoin1 = new HeadCoin(540, 300, 'headcoin1');
  staticArray.push(headcoin1);
  headcoin2 = new HeadCoin(690, 400, 'headcoin2');
  staticArray.push(headcoin2);
  headcoin3 = new HeadCoin(840, 450, 'headcoin3');
  staticArray.push(headcoin3);
  headcoin4 = new HeadCoin(945, 550, 'headcoin4');
  staticArray.push(headcoin4);
  headcoin5 = new HeadCoin(1160, 640, 'headcoin5');
  staticArray.push(headcoin5);
  headcoin6 = new HeadCoin(1200, 680, 'headcoin6');
  staticArray.push(headcoin6);
  headcoin7 = new HeadCoin(1250, 640, 'headcoin7');
  staticArray.push(headcoin7);
  telePowerUp = new GiveAbility(1750, 610, 'GiveTele', 'addTele');
  staticArray.push(telePowerUp);
  telePowerUp.collisionAction = function() {
    this.element.remove();
    return player.addTele();
  };
  cinvert1 = new Cinvert(860, 60, 'cinvert1');
  dynamicArray.push(cinvert1);
  nPCArray.push(cinvert1);
};
level1Initiate = function() {
  wrapper.appendBody();
  wrapper.element.appendChild(myWorld.element);
  myWorld.element.appendChild(floor1.element);
  myWorld.element.appendChild(floor2.element);
  myWorld.element.appendChild(floor3.element);
  myWorld.element.appendChild(floor4.element);
  myWorld.element.appendChild(floor5.element);
  myWorld.element.appendChild(floor6.element);
  myWorld.element.appendChild(floor7.element);
  myWorld.element.appendChild(floor8.element);
  myWorld.element.appendChild(floor9.element);
  myWorld.element.appendChild(floor10.element);
  myWorld.element.appendChild(floor11.element);
  myWorld.element.appendChild(floor12.element);
  myWorld.element.appendChild(floor13.element);
  myWorld.element.appendChild(floor14.element);
  myWorld.element.appendChild(floor15.element);

  myWorld.element.appendChild(player.element);
  myWorld.element.appendChild(headcoin1.element);
  myWorld.element.appendChild(headcoin2.element);
  myWorld.element.appendChild(headcoin3.element);
  myWorld.element.appendChild(headcoin4.element);
  myWorld.element.appendChild(headcoin5.element);
  myWorld.element.appendChild(headcoin6.element);
  myWorld.element.appendChild(headcoin7.element);
  myWorld.element.appendChild(telePowerUp.element);
  myWorld.element.appendChild(cinvert1.element);
  wrapper.startLeft();
  wrapper.startBottom();
};
