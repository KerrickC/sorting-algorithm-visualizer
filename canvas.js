var numbers = [];
var rects = 25;
var loops;
var selType;
var finished = false;
let curPivot, curHi, curLo;
//var qscalled = false;

function setup(){
	frameRate(1); //slows sort
	selType = createSelect();
	selType.position(10, 550);
	selType.option('Bubble');
	selType.option('Selection');
	selType.option('Quicksort')
	

	button = createButton('Restart');
	button.position(10, 50);
	button.mousePressed(reset);

	createCanvas(800,500);
	generateNumbers(); //generate random heights
	strokeWeight(4); //line width

	reset();
}

function draw(){
	background(200);
	if (!finished) {
		switch (selType.value()) {
			case 'Selection':
				selectionsort();
				//qsCalled = false;
				break;
			case 'Bubble':
				bubblesort();
				//qsCalled = false;
				break;
			case 'Quicksort':
				quicksort(numbers, 0, numbers.length - 1);
				break;
		}
	} else {
		console.log("finished");
		noLoop();
	}


	//draw lines and color
	//c = current element, i = index, a = numbers[]
	
	for (i = 0; i < numbers.length; i++) {
		let col = color(numbers[i], height, height);
		let location = map(i, 0, numbers.length, 0, width);
		colorMode(RGB);
		switch (i) {
			case curHi:
				stroke(0);
				//fill(0, 255, 0);
				break;
			case curLo:
				stroke(0);
				//fill(0, 0, 255);
				break;
			case curPivot:
				stroke(0);
				fill(255);
				break;
			default:
				stroke(col);
				fill(col);
				break;
		}
		colorMode(HSB, height);
		rect(location, height - numbers[i], width / rects, height);

}
}

function generateNumbers(){ //function to get vals for lines
	for(var i = 0; i < rects; i++){
		var h = Math.floor(Math.random() * height +1);
		numbers[i] = h;
	}
	//console.log(numbers);
}

reset = function() { //reset lines
	numbers = [];
	for (i = 0; i < rects; i++) {
		numbers[i] = random(height);
	}
	

}

//swap function for swapping two elements
swap = function(numbers, a, b){
	let temp = numbers[a];
	numbers[a] = numbers[b];
	numbers[b] = temp;
}



/***************************SORTING ALGORITHMS********************************/

//bubble sort
//compares adjacent elements and swaps if in wrong order
//time complexity: n
function bubblesort(){
	for(var i = 0; i < numbers.length - 1; i ++){
		if(numbers[i] > numbers[i+1]) {
			swap(numbers, i, i+1);
		}
	}
}

//selection sort
//time complexity: n^2
//finds largest element and puts in last index; repeat
function selectionsort() {
	let len = numbers.length,min;
		for(let i = 0; i < len; i ++){
			min = i; //set min val 
			for(let j = i+1; j < len; j ++){ //check to see if anything is smaller than min
				if(numbers[j] < numbers[min]){
					min = j;
				}
			}
			//setTimeout(() => {
				if(i != min){
					swap(numbers, i, min);
				}
			//},1);
			//if min isnt in the position, swap
	}
}

	


//quick sort
//
//time complexity: nlog(n)
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
			swap(numbers, lp, rp);
			lp ++;
			rp --;
		}
	}
	return lp; //returns left index
}

function quicksort(numbers, left, right){
	setTimeout(() =>{
	var index;
	if(numbers.length > 1){
		index = partition(numbers, left, right); //lp index
		curPivot = index;
		curHi = right;
		curLo = left;
		if(left < index - 1){  //if more numbers on left side
			quicksort(numbers, left, index - 1);
		}
		if(index < right) { //if more numbers on right side
			quicksort(numbers, index, right);
		}
	}
}, 500);
}


