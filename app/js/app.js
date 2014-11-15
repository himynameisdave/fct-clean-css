//	Written by Dave Lunny

//////////////////////////////////////
//	 		STRING PROTOS			//
//////////////////////////////////////

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




//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//									APP 										//
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
var app = angular.module('app', [] );

app.controller('Controller', function ($scope, $log) {

	//	By default the text is bigger (when displaying the main msg)
	//	This also sets the main message
	initTextareas();

	//	This function is called each time the textarea is changed
	$scope.cleanSomeCSS = function() {
		//	this is the new cleanCSS, which stores whatever changes need to be made to the CSS
		var newCleanCSS = $scope.dirtyCSS;
		
		//	Remove that big-text class
		$scope.bigText = false;

		//	Obvs if $scope.dirtyCSS is blank, we reset the main msg
		if ( $scope.dirtyCSS.isEmptyString() ){
			initTextareas();
			return;
		}



		//	Compile a list of 'selector items' (stuff in between { }'s' )
		var selectorItems = stuffBetweenCurlies( newCleanCSS )

		//	Right off the bat, we know that if that list is empty there isnt any real css to validate
		if( selectorItems.length == 0 ){
			showErrorMsg( 'Is this really valid CSS?' );
			return;
		}

		///CALLING THE RGB/HEX CONVERSION
		newCleanCSS = convertToRGB( newCleanCSS );

		//	Reset the clean side of the CSS with the new clean CSS
		$scope.cleanCSS = '';
		$scope.cleanCSS = newCleanCSS;
	};

	//	Show an error message
	var showErrorMsg = function ( errorMsg ) {
		$scope.cleanCSS	= 'Error converting your CSS!\n' 
		$scope.cleanCSS	+= '----------------------\n'; 
		$scope.cleanCSS	+= '\tError Message: \n'; 
		$scope.cleanCSS	+= '\t' + errorMsg; 
	};


	//	spits out an array of stuff between curly braces
	var stuffBetweenCurlies = function (str) {
		var results = [], re = /{([^}]+)}/g, text;
		while(text = re.exec(str)) {
			results.push(text[1]);
		}
		return results;
	};

	//	This function takes a list of properties and spits them out as alphabetically
	var alphabatize = function( props ){



	};

	var convertToRGB = function( str ){
		//	the string we can fuck with (and have it be different from the OG)
		var tempStr = str;

		//	anything that starts with '#' and ends with ';' and is between 3 - 6 characters
		//	TODO: in case the user does something dumb like "color: #000 ;"
		var hexes = tempStr.match(/#.{3,6};/img);

		//	if there aren't any hexes found, skip this and return the unfucked with tempStr
		if( hexes != null ){
			//	since there are hex codes found, lets loop through em.
			$.each(hexes, function( i, val ){

				//	get rid of the '#' and ';'
				var  realVal  = val.replace("#","").replace(";",""),
					 hexLength = realVal.length;

				//	if it's a short hexcode, convert it to a 'real' 6 digit one
				if( hexLength === 3 ) {

					//	get each number
					var r = realVal.slice(0,1),
					    g = realVal.slice(1,2),
					    b = realVal.slice(2,3),
					    //	times two!
					    realVal = r+r+g+g+b+b;
				};

				//	if it's some f-worded up value, just leave it (coders mistake);
				if( hexLength < 3 || ( hexLength < 6 && hexLength != 3 ) || hexLength > 6 ){
					console.log('Someone doenst know what a hex val is!');
				}else{
					var	 rgbVals  = toRGB(realVal),// thanks to Dan Lamb for his hex-to-rgb microlibrary @ https://github.com/daniellmb/HEX-RGB-Conversion
						 rgbStr   = 'rgb( '+rgbVals[0]+', '+rgbVals[1]+', '+rgbVals[2]+' );';
					// rgbs.push(rgbStr);
					tempStr = tempStr.replace( val, rgbStr );
				}

			});// end loop through each hex
		};// end check if there are any hexes

		//	always return that (potentially) altered string
		return tempStr;
	};

	//	returns the number of times a substring appears in a string
	var appearsHowManyTimes = function ( val, str ){
		var r = new RegExp( val, 'g');
		return (str.match(r) || []).length;
	};


	function initTextareas( ) {
		$scope.bigText = true;
		$scope.dirtyCSS = '\n\n\n\n\n\nAdd your CSS Here...\n\n\n\n\n\n';
		$scope.cleanCSS = '\n\n\n\n\n\n...and see your results over here:\n\n\n\n\n\n';
	};


});

	