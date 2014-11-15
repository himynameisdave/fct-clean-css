//	Written by Dave Lunny

//	We need all strings to be able to check if they are empty or not...
String.prototype.isEmptyString = function() {

	if(/\S/.test(this.toString())){
		console.log(this.toString());
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
		//	the string we can fuck with
		var tempStr = str;

		//	STEP 1: Find instances of '#000000' OR '#000'
		var hexes = tempStr.match(/#.{3,6};/img);

		//	STEP 2: Create a mirror array of rgb() values
		var rgbs = [];

		//	check if there are any hexes in the CSS
		if( hexes != null ){
			$.each(hexes, function( i, val ){
				//without all the '#' and ';'
				var realLength = val.length - 2;

				//	STEP 2A): See if any of the hexes are mini hexes
				$log.log(realLength);
				//	Expand mini hexes
				if( realLength === 3 ){

				};
				//	Could catch invalid hexes here:
				if( realLength > 3 && realLength < 6 ){

				};



			});
		};


		// R = hexToR("#FFFFFF");
		// G = hexToG("#FFFFFF");
		// B = hexToB("#FFFFFF");

		// function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
		// function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
		// function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
		// function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}



		//	always return that altered string
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

	