  testVisibilityLevelDeclare = function () {
      wrapper = new Wrapper(1100,900,"player");
    myWorld = new World(2000,1500);
    myWorld.setBackgroundColor("black");
     floor1 = new LevelElem(0,0,2000,50,"floor1");
    floor1.setBackgroundColor("blue");
    staticArray.push(floor1);
     floor2 = new LevelElem(400,50,100,150,"floor2");
    floor2.setBackgroundColor("blue");
    staticArray.push(floor2);
     floor3 = new LevelElem(350,50,50,50,"floor3");
    floor3.setBackgroundColor("blue");
    staticArray.push(floor3);
     floor4 = new LevelElem(600,250,100,50,"floor4");
    floor4.setBackgroundColor("blue");
    staticArray.push(floor4);
     floor5 = new LevelElem(800,250,200,50,"floor5");
    floor5.setBackgroundColor("blue");
    staticArray.push(floor5);
     floor6 = new LevelElem(950,50,100,100,"floor6");
    floor6.setBackgroundColor("blue");
    staticArray.push(floor6);
     floor7 = new LevelElem(845,50,50,75,"floor7");
    floor7.setBackgroundColor("blue");
    staticArray.push(floor7);
     player = new Player(60,60,"player");
    dynamicArray.push(player);
     cinvert1 = new Cinvert(860,150,"cinvert1");
    dynamicArray.push(cinvert1);
    nPCArray.push(cinvert1);
  }
  testVisibilityLevelInitiate = function() {
    wrapper.appendBody();
    wrapper.element.appendChild(myWorld.element);
    myWorld.element.appendChild(floor1.element);
    myWorld.element.appendChild(floor2.element);
    myWorld.element.appendChild(floor3.element);
    myWorld.element.appendChild(floor4.element);
    myWorld.element.appendChild(floor5.element);
    myWorld.element.appendChild(floor6.element);
    myWorld.element.appendChild(floor7.element);
    myWorld.element.appendChild(player.element);
    myWorld.element.appendChild(cinvert1.element);
    wrapper.startLeft();
    wrapper.startBottom();
  }
