# Notes:

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
