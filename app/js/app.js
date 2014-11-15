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


		//	loops through each set of properties
		$.each( selectorItems, function( i, val ){
			var replacementText = val;

			//	This will break each line of the block into it's own string, stored in an array
			var lines = replacementText.split('\n');

			// $log.log('lines length: '+lines.length);

			var noEmptyLines = '';
			//	Cycle through the lines and remove any empty ones (except the first and last);
			$.each( lines, function( j, lineVal ){

				//	ignore first and last
				if( j > 0 && j < lines.length ){
					//	if the string is empty, get rid of it
					if( lineVal.isEmptyString() ){



						lines.splice(j, 1);
					
					}else{
						noEmptyLines += lines[j];
					} 
				}
			});

			// $log.log('lines length (After): ' + lines.length);

			$log.log('replacementText becomes: ');
			$log.log(noEmptyLines);

			replacementText = noEmptyLines;
			// replacementText = lines.join('\n');
			// console.log( replacementText );

			//	Instead of even seeing if its the last one, we just grab the last one
			//	TODO: if its not the last one, remove the first one - this will probably be a global function eventually to remove dupes
			var marginIndex = replacementText.lastIndexOf("margin:"),
				paddingIndex = replacementText.lastIndexOf("padding:");

			//	Checks for any shorthand use of 'margin:' or 'padding:' and returns the block with shorthands expanded
			replacementText = shorthandHandler(replacementText, marginIndex, paddingIndex);


			// $log.log(replacementText.indexOf(";"));

			

			//	This next pair of ifs go check to see if shorthand margins and paddings 
			

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
	var shorthandHandler = function ( str, m, p ) {

		//	If there is an instance of 'margin:'
		if ( m >= 0 ){	

			var trash, copyStr = str;
			//	The plus 7 because there are 7 characters in 'margin:'
			
			//	get rid of everything before 'margin:' (everything up until last line break)
			trash = copyStr.slice( 0, m );
			copyStr = copyStr.replace(trash, "");
				

			//	get rid of everything after the ';' && insert a line break
			trash = copyStr.slice( copyStr.indexOf(";")+1, copyStr.length );
			copyStr = copyStr.replace(trash, "");

			// $log.log( 'Our string is : ' );
			// $log.log( copyStr );

			// $log.log( 'trashing: ' );
			// $log.log( trash );


			// $log.log( 'indexOf(margin:)' + m + 7 );
			// $log.log( '; is @ ' + str.indexOf(";") )



			

			//	now the only spaces are between each of your values
			//	we need to count how many values were added

				//	if 1:
					// apply that amount to each margin level
				//	if 2:
					//	apply the first amount to the top and bottom and the second to left and r
				//	if 3:
					//	apply the 1st to mtop, 2nd to mleft and mright, 3rd to mbottom;
				//	if 4:
					//	apply around to each.


		};
		//	If there is an instance of 'padding:'
		if ( p >= 0 ){
			

			//	If there happens to be more than one instance of padding, we only want the values of the last listed one
			if( appearsHowManyTimes( 'padding:', str ) > 1){

				// lastIndexOf()

			};

		};

		//	break val up into 4 separate items



		return str;

	};
*/


	function initTextareas( ) {
		$scope.bigText = true;
		$scope.dirtyCSS = '\n\n\n\n\n\nAdd your CSS Here...\n\n\n\n\n\n';
		$scope.cleanCSS = '\n\n\n\n\n\n...and see your results over here:\n\n\n\n\n\n';
	};


});

	