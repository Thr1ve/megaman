# Notes:

## Rules:
  - Beyond a simple testing framework, I cannot use what I cannot build completely myself ( i.e. no third-party anything)
  - Anything beyond core functionality must be delayed until core functionality is stable (  i.e. Make it do what it could do before we decided to rewrite it; follow rabit trails later )

## 11/2/15

I am now able to succesfully turn a 2d array of the 'level' into elements on the page

Thus, I can do the following soon:

- Add ability for elements to move in set paths (e.g. moving platforms)
- Add way to add a player starting location to the 2d array
- Abstract to GUI:
  - Generate the map using a simple GUI that maps units on the screen to their respective location in the 2d array
  - Use node / express to 'save' the map you've created in GUI and output it as a JSON file
  - Use more complicated forms of data rather than the current 'X' or '\_'; this will let us encode things like movement paths for platforms into the JSON file we create with our GUI

Right now, however, I believe I am in a place where I can decide how data might flow through the application. I'll be tagging each element with a random, unique Id...because...I can? ( and probably just because React elements always have uids, and I blindly figured "oh hey that's probably a useful thing to do" ) Using these uids, I can hopefully more easily store/retrieve each element (I'm 75% sure this is true/a good thing/worth it).

#### Option A:
  - create a single, large "state" object that is passed along with our render function which we transform every cycle
  - Something something reducers...Redux sounds amazing, what if I try to make my own version of redux for the state based solely on listening to Dan Abramov talk about it on podcasts and "starting" to learn it multiple times before getting sidetracked...there's no way this can go wrong...
    - What is redux?
      - Store
      - Action
      - ~~~Dispatcher? or is that the one that he removed? Googling...~~~
      - Reducer
      - Maybe this isn't a good rabbit trail...
  - In the old version, we looped through all our "element" arrays...
  - can we "transform" the state, then do a diff of the old state and transformed state and only touch the dom for things that have changed? That's kinda how React works right? There's no way that's faster...I have to be missing something
    - How on earth would I write a diff function? Isn't that incredibly complicated?

#### Option B:
  - Don't pass a state object, simply let each component take care of its own state because...modularity?
    - eww...

#### Can we contrast our new state with our rendered state?
  - To do this, we'd have to have a way to compare states...return false if state is the same
  - Use compare to get only those objects whose states have changed
  - pass those objects to Render
  - move the actual DOM elements

  Such as...

  ```javascript
  var initialize = function(level){
    // create initial state with level.JSON
    main(state, null);
  };

  var main = function(state) {
    var newState = transform(state);
    var changed = newState.filter(function(element) {
      return element.state.changed === true;
    });
    render(changed);
    if(newState.alive){
      setTimeout(main, 1000 / 45, newState);
    } else {
      someEndingFunction();
    }
  };
  ```

  Is it faster to store elements in an object and reference them by their key (our uid)? Or is it faster to store them in an array ?

## 11/3/15

Update 11/4/15 : I was wrong in how I thought I might use mapValues below...I think i overcomplicated it

Tried to read through Redux source code more today. Really like the idea of piping my state through "reducer" functions. Still trying to wrap my head around it all, but I think I can mimic parts of it in the mainLoop function. While I don't want to straight-up use Redux since I'm trying not to use any 3rd party libraries in this (outside of testing), I don't think mimicking some of the basic ideas would betray that. I particularly like the possibilities of the mapValues function he has:



[mapValues](https://github.com/rackt/redux/blob/master/src%2Futils%2FmapValues.js):
```javascript
/**
 * Applies a function to every key-value pair inside an object.
 *
 * @param {Object} obj The source object.
 * @param {Function} fn The mapper function that receives the value and the key.
 * @returns {Object} A new object that contains the mapped values for the keys.
 */
export default function mapValues(obj, fn) {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key)
    return result
  }, {})
}
```

we can rewrite it with our own reduce function

```javascript
var mapValues = function(obj, func) {
  return reduce(Object.keys(obj), function(result, key) {
    result[key] = func(obj[key], key);
    return result
  }, {})
};
```

What I think I want is to have an object full of "reducers." I could then call mapValues on the object and pass my state through...no, not that simple

Each part of the cycle would have to call mapValues on our state...but mapValues is just another reduce...still trying to wrap my head about the reduce-inception-fest

Actually I could just call mapValues in each iteration of reduce


example:

```javascript
var reducers = {
  action: function() {
    // apply changes from input, AI decisions, etc...
  },
  physics: function() {
    // compute results of actions
  },
  resolutions: function() {
    // resolve collisions, death, pick-ups, etc...
  },
  // render: function() {
  //    would it be bad to just throw our render function in this cycle as well?
  //    yes, I think it would be...render doesn't change our state and doesn't belong here
  // },
}

var initialState =  {
  element1: {
    x: '50px',
    y: '150px',
    width: '150px',
    height: '150px',
  },
  movingPlatform1: {
    x_start: '300px',
    y_start: '500px',
    x_end: '400px',
    y_end: '500px',
    x_velocity: 5,
    y_velocity: 0,
  }
}

var mainLoop = function(initialState) {
  state = reduce(Object.keys(reducers), function(result, reducer) {
    var newState = mapValues(result, reducers[reducer]);
    return newState;
  }, initialState);
}
```

When I start to think about how each reducer would know which actions to perform / how to perform them for our different kinds of elements, I think I can start to see what I'm missing from Redux. In Redux, these things would be defined in "actions" that explicitly define how the state should change. I may regret this, but I don't think I should try to implement this. I'm wary of getting too close to "copying" redux, and it may be a difficult rabbit trail to recover from.

Instead, I can store the "instructions" for a given element in its prototype. This way, the objects in our state collection can simply hold only the values that are subject to change / need to be available and remain small.


## 11/4/15

I still like the prototype idea...how would this look in practice though?

Note: just realized we'll need to add an "animate" part to the loop to switch frames

First, what specific values do we need available for an element in our state in each part of our loop?
* Action: ( we may need to filter and get only elements that can act such as player and npc)
  * Current keys pressed / active 'action' ?
* Animate:
  * Current Frame
  * Current active Animation
* Physics
  * Width
  * Height
  * X Coordinate
  * Y Coordinate
  * X Velocity
  * Y Velocity
* Resolutions
  * X Coordinate
  * Y Coordinate
  * Alive or Dead
* Render ?
  * Changed

  ...I don't think this is helping me...I'm just going to write code


  ...I've shifted the actual rendering of our elements to a "render" function in the loop...things are starting to make a bit more sense now

  Important Physics note: I don't think we should ever touch the actual x or y coordinates of an element. Rather, we simply add velocity and let the physics engine do that for us

  ...I was way off with mapValues, I don't think I'll have a use for the function at the moment; noting this in previous entry...

  ...I have successfully made megaman appear after changes to the way animation works. The more I look at things, the more I feel that maybe I shouldn't use multiple "classes" to achieve greater control, but rather use fewer more general classes which I can combine in unique ways for instance: an "Element" class and an "Action" class rather than a chain of "Element" > "Unit" > "Player" for the player and "Element" > "Unit" > "cInvert" for the npc. I could simply then say that an "npc" is a combination of an Element and Actions objects.


## 11/5/15

What specific reducers would we need in our state loop ?
* process action
  * This could be a key that is currently pressed or an AI action
  * should only modify velocity
* animate
  * Change frame
  * should only modify background image and width/height
* calculate physics
  * Use velocity to set actual coordinates
* resolve
  * check for collisions / death / etc.

  ...not sure how to implement "actions" as they seem to exist in two reducers simultaneously. Going to try commenting / refactoring player animation scripts from old version to get better understanding of how specifically I was making things work before...

  ...BOUGHT [Functional Programming in Javascript](https://www.manning.com/books/functional-programming-in-javascript)!!!
  I am now re-thinking almost everything. This functional approach is almost exactly what I was trying to describe above with "element" and "action" instead of classes.


## 11/7/15

  Forgot to update yesterday; working on refactoring as much as possible into pure functions. My idea thus far is to use prototypical inheritance / OO systems purely to define datatypes and use composable functions for everything else


## 11/8/15
  Struggling to figure out how to implement actions correctly

  believe I figured out how correctly pass objects to functions without mutability:
  pass new object with specific values you want.
  about to make function that makes new object with array of props found in original object which you specify...
  ```Javascript
  var clone = function(obj, props) {
    var keys = props || Object.keys(obj);
    var i = 0;
    var newObj = {};
    for (i; i < keys.length; i++) {
      newObj[keys[i]] = obj[keys[i]];
    }
    return newObj;
  }
  ```

  I think it may also be helpful to have a function that can apply props from one object to another:
  ```javascript
  var merge = function(oldObj, newObj) {
    var keys = Object.keys(newObj);
    var i = 0;
    for (i; i < keys.length; i++) {
      oldObj[keys[i]] = newObj[keys[i]];
    }
    return oldObj;
  }
  ```

## 11/8/15
  I made clone and merge functions and am now using them, but I don't think I'm using them in the correct places yet. Still need to work on reducing side-effects in my functions.

  herp derp...just realized my merge function works by mutating the original object...

  found interesting stackOverflow about cloning objects: http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object/5344074#5344074

  ...We need to work on a better clone implementation. I'm having trouble trying to make things "immutable" in each various function without creating an inordinate amount of new objects.

## 11/11/15
  I've been rather bad about entering notes the past few days...

  I've reworked our reducers so they are immutable.

  Now, I've hit a bit of a wall trying to figure out how to implement actions correctly. Actions are basically "animations" + "physics instructions"...I need a way to

    * Give a simple list of steps for an action
    * have our actions reducer execute the correct step on each cycle
    * Allow some actions to prevent/override other actions
    * easily assign/modify keybinds to a map of actions
    * differntiate between actions that should loop and those that should only execute one time
    * "program" the actions...I think I want an api or "domain language" that lets me forget about the rest of the app when writing an action
    * should actions be able to call other actions? maybe I should save this for later..

## 11/12/15

  I've created an "Animation" object to better handle the animation part of actions. My current thought is to have an array containing callback functions for each "step" in the action which can do things like change acceleration / x and y positions / etc.

  ```javascript
  var steps = [
    function() {

    },
    function() {

    }
  ]
  ```

  ...also, I've realized I need to eventually turn "processKeys" into a more general "processActions" function as keypresses are not the only place actions can come from.

  ... also, rather than cloning the object and rewriting the same array 3 times in my reducers in index.js, I should probably just namespace all the attributes in an object and simply clone that. What I'm doing right now is basically grabbing everything but the domElement anyways...

  ... Trying to figure out how to thread callbacks through the system correctly so I can access the upper scope when needed. For instance, when I want to create a new element and add it to the state collection ( a new bullet )
  Possible ideas:

## 11/13/15
  levels at which callbacks should be available
  * mainLoop
    * Adding or removing elements to state collection
    * Rendering or removing DOM elements
  * reducers
    * actions
    * physics
    * resolve


## 11/14/15
  ...bullets exist!

  Idea: move all physics related properties to an object such as:
  ```javascript
  this.physics = {
    acceleration: false,
    resolveCollision: true,
    gravity: false,
    friction: true,
  }
  ```

  also, there should be different collision resolution 'strategies'. for instance, a bullet should have a 'remove' strategy that passes a callback to mainLoop to remove itself from the array.


  ## 11/15/15

  Am now wondering if it's possible to redo my element "class" using composition... amazing video: https://www.youtube.com/watch?v=wfMtDGfHWpA
