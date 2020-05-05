var numbers = [];
var lines = 200;
var selType;
var finished = false;
//var qscalled = false;

function setup(){
	frameRate(30); //slows sort
	selType = createSelect();
	selType.position(10, 550);
	selType.option('Quicksort')
	selType.option('Selection');
	selType.option('Bubble');
	createCanvas(800,500);
	generateNumbers(); //generate random heights
	strokeWeight(4); //line width
	
}

function draw(){
	background(200);
	if (!finished) {
		switch (selType.value()) {
			case 'Bubble':
				bubblesort();
				//qsCalled = false;
				break;
			case 'Selection':
				selectionsort();
				//qsCalled = false;
				break;
			case 'Quicksort':
				quicksort(numbers, 0, numbers.length - 1);

				break;
			default:
				bubblesort();
				break;
		}
	} else {
		console.log("finished");
		noLoop();
	}


	//draw lines and color
	//c = current element, i = index, a = numbers[]
	numbers.forEach(function(c, i, a){
		if(c == max(a)) {
			stroke(255,0,0);
		}else if(c == min(a)) {
			stroke(0,255,0);
		}else {
			stroke(0);
		}
		line(i * 4 + 2, 0, i * 4 +2, c);
	});
}

function generateNumbers(){ //function to get vals for lines
	for(var i = 0; i < lines; i++){
		var h = Math.floor(Math.random() * height +1);
		numbers[i] = h;
	}
	//console.log(numbers);
}

reset = function() { //reset lines
	generateNumbers();
	numbers.forEach(function(c, i, a){
		if(c == max(a)) {
			stroke(255,0,0);
		}else if(c == min(a)) {
			stroke(0,255,0);
		}else {
			stroke(0);
		}
		line(i * 4 + 2, 0, i * 4 +2, c);
	});

}


/***************************SORTING ALGORITHMS********************************/

//bubble sort
//compares adjacent elements and swaps if in wrong order
function bubblesort(){
	for(var i = 0; i < numbers.length; i ++){
		if(numbers[i] > numbers[i+1]) {
			var temp = numbers[i+1];
			numbers[i+1] = numbers[i];
			numbers[i] = temp;
		}
	}


}

//selection sort
//
function selectionsort() {
	for(var i = 0; i < numbers.length - 1; i ++){
		for(var j = i + 1; j < numbers.length; j ++){
			let a = numbers[i];
			let b = numbers[j];
			if(a > b){
				var temp = numbers[j];
				numbers[j] = numbers[i];
				numbers[i] = temp;
			}
		}
	}
}

//quick sort
//
function partition(numbers, left, right) {
	var pivot = numbers[Math.floor((right+left) / 2)], //pivot point (middle)
		lp = left, //left pointer
		rp = right; //right pointer

	while(lp <= rp) {
		while(numbers[lp] < pivot) {
			lp++;
		}
		while(numbers[rp] > pivot) {
			rp--;
		}
		if( lp <= rp){
			var temp = numbers[rp];
			numbers[rp] = numbers[lp];
			numbers[lp] = temp;
			lp ++;
			rp --;
		}
	}
	return lp; //returns left index
}

function quicksort(numbers, left, right){
	var index;
	if(numbers.length > 1){
		index = partition(numbers, left, right); //lp index
		if(left < index - 1){  //if more numbers on left side
			quicksort(numbers, left, index - 1);
		}
		if(index < right) { //if more numbers on right side
			quicksort(numbers, index, right);
		}
	}
}





	

