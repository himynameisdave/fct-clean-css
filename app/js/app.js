//	Written by Dave Lunny

//	We need all strings to be able to check if they are empty or not...
String.prototype.isEmptyString = function() {
    return (this.length === 0 || !this.trim());
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

		//	loops through each set of properties
		$.each( selectorItems, function( i, val ){
			var replacementText = val;

			//	Checks for any shorthand use of 'margin:' or 'padding:'
			shorthandHandler(replacementText);


			// $log.log(replacementText.indexOf(";"));

			var marginIndex = replacementText.indexOf("margin:"),
				paddingIndex = replacementText.indexOf("padding:");

			//	This next pair of ifs go check to see if shorthand margins and paddings 
			if ( marginIndex >= 0 ){



				//	The plus 7 because there are 7 characters in 'margin:'
				// $log.log( replacementText.slice( marginIndex + 7 ) );

				// $log.log( 'margin:' + replacementText.indexOf("margin:") )
				// $log.log( ';' + replacementText.indexOf(";") )

			};
			if ( paddingIndex >= 0 ){
				
				$log.log(appearsHowManyTimes( replacementText, 'padding:' ));

			};

			// 	ends with a replace of the old stuff with the new stuff
			newCleanCSS.replace( val, replacementText );
		});



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

	};

	//	returns the number of times a substring appears in a string
	var appearsHowManyTimes = function ( val, str ){
		var r = new RegExp( val, 'g');
		return (str.match(r) || []).length;
	};


	//	Handler for when shorthand 'margin' or 'padding' are used
	var shorthandHandler = function ( type, val ) {



		//	break val up into 4 separate items

	};


	function initTextareas( ) {
		$scope.bigText = true;
		$scope.dirtyCSS = '\n\n\n\n\n\nAdd your CSS Here...';
		$scope.cleanCSS = '\n\n\n\n\n\n...and see your results over here:';
	};


});

