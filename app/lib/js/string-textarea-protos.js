//////////////////////////////////////
//	 		STRING PROTOS			//
//////////////////////////////////////
//	...should really break these off into a sep file..

//	We need all strings to be able to check if they are empty or not...
String.prototype.isEmptyString = function() {

	if(/\S/.test(this.toString())){
		return false;
	}else{
    	// return (this.length === 0 || !this.trim());
 		return true;
 	}
};
//	All strings should also be able to have text inserted at a certain 
String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};
//	Woot woot find the index of a reg-exed val
//	thanks stackOh: http://stackoverflow.com/questions/273789/is-there-a-version-of-javascripts-string-indexof-that-allows-for-regular-expr
String.prototype.regexIndexOf = function(regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
};
//	All strings can now remove a 'line'
String.prototype.deleteLine = function ( index ) {

};

//////////////////////////////////////
//	   TEXTAREA FOCUS/TAB PROTO 	//
//////////////////////////////////////

//	Thanks CSS-Tricks!
//	http://css-tricks.com/snippets/javascript/support-tabs-in-textareas/
HTMLTextAreaElement.prototype.getCaretPosition = function () { //return the caret position of the textarea
    return this.selectionStart;
};
HTMLTextAreaElement.prototype.setCaretPosition = function (position) { //change the caret position of the textarea
    this.selectionStart = position;
    this.selectionEnd = position;
    this.focus();
};
HTMLTextAreaElement.prototype.hasSelection = function () { //if the textarea has selection then return true
    if (this.selectionStart == this.selectionEnd) {
        return false;
    } else {
        return true;
    }
};
HTMLTextAreaElement.prototype.getSelectedText = function () { //return the selection text
    return this.value.substring(this.selectionStart, this.selectionEnd);
};
HTMLTextAreaElement.prototype.setSelection = function (start, end) { //change the selection area of the textarea
    this.selectionStart = start;
    this.selectionEnd = end;
    this.focus();
};

$(document).ready(function(){

	var textarea = document.getElementsByTagName('textarea')[0]; 

	textarea.onkeydown = function(event) {
	    
	    //support tab on textarea
	    if (event.keyCode == 9) { //tab was pressed
	        var newCaretPosition;
	        newCaretPosition = textarea.getCaretPosition() + "    ".length;
	        textarea.value = textarea.value.substring(0, textarea.getCaretPosition()) + "    " + textarea.value.substring(textarea.getCaretPosition(), textarea.value.length);
	        textarea.setCaretPosition(newCaretPosition);
	        return false;
	    }
	    if(event.keyCode == 8){ //backspace
	        if (textarea.value.substring(textarea.getCaretPosition() - 4, textarea.getCaretPosition()) == "    ") { //it's a tab space
	            var newCaretPosition;
	            newCaretPosition = textarea.getCaretPosition() - 3;
	            textarea.value = textarea.value.substring(0, textarea.getCaretPosition() - 3) + textarea.value.substring(textarea.getCaretPosition(), textarea.value.length);
	            textarea.setCaretPosition(newCaretPosition);
	        }
	    }
	    if(event.keyCode == 37){ //left arrow
	        var newCaretPosition;
	        if (textarea.value.substring(textarea.getCaretPosition() - 4, textarea.getCaretPosition()) == "    ") { //it's a tab space
	            newCaretPosition = textarea.getCaretPosition() - 3;
	            textarea.setCaretPosition(newCaretPosition);
	        }    
	    }
	    if(event.keyCode == 39){ //right arrow
	        var newCaretPosition;
	        if (textarea.value.substring(textarea.getCaretPosition() + 4, textarea.getCaretPosition()) == "    ") { //it's a tab space
	            newCaretPosition = textarea.getCaretPosition() + 3;
	            textarea.setCaretPosition(newCaretPosition);
	        }
	    } 
	};
});