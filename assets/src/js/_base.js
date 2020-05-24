
// 
// READY
// execute when the website has finished loading
// 

function ready(fn) {

	if (document.readyState != 'loading') {
		fn();
	}
	else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

// 
// RESIZE DELAYED
// execute while resizing, but only every 50ms
// 

function onResizeDelayed (fn) {

	fn();

	var execute = true;
	window.addEventListener("resize", function() {

		if (execute) {
			execute = false;
			setTimeout(function() {
				execute = true;
				fn();
			}, 50)
		}
	});
}

// 
// RESIZE READY
// only execute after resize is done
// 

function onResizeReady (fn) {

	var resizeTimer;
	window.addEventListener("resize", function() {

		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			fn();
		}, 250);
	});
}

// 
// GET VALID NUMBER
// 
function getValidNumber (value) {

	var number = parseInt(value);

	if (value === null
		|| value === undefined
		|| isNaN(number)
	) {
		return 0;
	}
	return number
}

// 
// GET PARENT BY CLASS
// 
function getParentByClass (element, className) {

	while ((element = element.parentElement) && !element.classList.contains(className));
	return element;
}