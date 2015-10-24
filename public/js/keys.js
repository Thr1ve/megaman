
/*Movement*/
/* get unicode */
function getUni(e){
  var unicode=e.keyCode? e.keyCode : e.charCode
  alert(unicode)
}
/* return unicode*/
function retUni(e){
	var unicode=e.keyCode? e.keyCode : e.charCode
	return(unicode)
}
  /*keybool array to store current bool values for keys*/
var keyBool = [
  false, // W     87
  false, // A     65
  false, // D     68
  false, // S      83
  false, // Space Bar 32
]
  /*switch to assign keybools true*/
function switchT(key){
  var keyUni = retUni(key);
  switch(keyUni){
    case 87: // W
      keyBool[0] = true;
      break;
    case 65: // A
      keyBool[1] = true;
      break;
    case 68: // D
      keyBool[2] = true;
      break;
    case 83: // S
      keyBool[3] = true;
      break;
    case 32: // Space Bar
      keyBool[4] = true;
      break;
  }
}
  /*swith to assign keybools false*/
function switchF(key){
  var keyUni = retUni(key);
  switch(keyUni){
    case 87: // W
      keyBool[0] = false;
      break;
    case 65: // A
      keyBool[1] = false;
      break;
    case 68: // D
      keyBool[2] = false;
      break;
    case 83: // S
      keyBool[3] = false;
      break;
    case 32: // Space Bar
      keyBool[4] = false;
      break;
  }
}
