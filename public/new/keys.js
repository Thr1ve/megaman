// get unicode
// function getUni(e) {
//   var unicode = e.keyCode ? e.keyCode : e.charCode;
//   alert(unicode);
// }
/* return unicode*/
var retUni = function(e) {
  var unicode = e.keyCode ? e.keyCode : e.charCode;
  return unicode;
};

// keybool array to store current bool values for keys
var keyBool = {
  w: false, // W     87
  a: false, // A     65
  d: false, // D     68
  s: false, // S      83
  space: false, // Space Bar 32
};

// switch to assign keybools true
var switchT = function(key) {
  var keyUni = retUni(key);
  switch (keyUni) {
  case 87: // W
    key.preventDefault();
    keyBool.w = true;
    break;
  case 65: // A
    key.preventDefault();
    keyBool.a = true;
    break;
  case 68: // D
    key.preventDefault();
    keyBool.d = true;
    break;
  case 83: // S
    key.preventDefault();
    keyBool.s = true;
    break;
  case 32: // Space Bar
    key.preventDefault();
    keyBool.space = true;
    break;
  default:
    break;
  }
};

// switch to assign keybools false
var switchF = function(key) {
  var keyUni = retUni(key);
  switch (keyUni) {
  case 87: // W
    key.preventDefault();
    keyBool.w = false;
    break;
  case 65: // A
    key.preventDefault();
    keyBool.a = false;
    break;
  case 68: // D
    key.preventDefault();
    keyBool.d = false;
    break;
  case 83: // S
    key.preventDefault();
    keyBool.s = false;
    break;
  case 32: // Space Bar
    key.preventDefault();
    keyBool.space = false;
    break;
  default:
    break;
  }
};
