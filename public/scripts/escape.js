//-------- Escape Function ---------------------------------------------
//Takes User text input and changes 'damaging' characters to 'safe' ones.

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}