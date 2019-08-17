"use strict";;
(function () {
	let clocks = document.querySelectorAll("pixclock");

	for (let i = 0; i < clocks.length; i++) {
		let clock = clocks[i];

		//get data from tags
		let format = clock.hasAttribute("format") ? clock.getAttribute("format") : "hms";
		let align = clock.hasAttribute("align") ? clock.getAttribute("align") : "left";
		let color = clock.hasAttribute("color") ? clock.getAttribute("color") : "#000";
		let interval = clock.hasAttribute("interval") ? clock.getAttribute("interval") : 1000;

		//check Attributes
		format = checkAttrib(format, "format");
		align = checkAttrib(align, "align");
		color = checkAttrib(color, "color");
		interval = checkAttrib(interval, "positiveValue");
		interval = (interval > 1000) ? interval : 1000;

		//set default style
		clock.style.cssText = clock.style.cssText + " \
			display: inline-block; \
			min-height: 5px; \
			min-width: 30px; \
		";

		//set width and height of pixels and dials
		let clockHeight = clock.clientHeight;
		let clockWidth = clock.clientWidth;
		let pixWidth = Math.min(Math.floor(clockWidth / (format.length * 11 - 3)), Math.floor(clockHeight / 5));
		let dialWidth = pixWidth * 8;
		let dialHeight = pixWidth * 5;

		//make container in wich dials'll be
		let container = document.createElement("div");
		container.style.position = "relative";
		container.style.top = `${clockHeight / 2 - dialHeight / 2}px`;
		container.style.width = `${dialWidth * format.length + pixWidth * 3 * (format.length - 1)}px`;
		container.style.height = `${dialHeight}px`;
		clock.appendChild(container);
		switch (align) {
			case "right":
				container.style.float = "right";
				break;
			case "center":
				container.style.margin = "auto";
				break;
			case "left":
				container.style.float = "left";
				break;
		}

		//make dots sign
		if (format.length > 1) {
			let dots = document.createElement("div");
			dots.style.position = "absolute";
			dots.style.width = `${pixWidth * 3}px`;
			dots.style.height = `${pixWidth * 5}px`;
			dots.style.right = `${dialWidth}px`;
			let dot = document.createElement("div");
			dot.style.position = "absolute";
			dot.style.width = `${pixWidth}px`;
			dot.style.height = `${pixWidth}px`;
			dot.style.right = `${pixWidth}px`;
			dot.style.top = `${pixWidth}px`;
			dot.style.background = color;
			dots.appendChild(dot.cloneNode(true));
			dot.style.top = `${pixWidth * 3}px`;
			dots.appendChild(dot);
			container.appendChild(dots.cloneNode(true));
			if (format.length > 2) {
				dots.style.right = `${dialWidth * 2 + pixWidth * 3}px`;
				container.appendChild(dots);
			}
		}

		//make dials
		let dials = [];
		for (let j = 0; j < format.length; j++) {
			let dial = document.createElement("pixDial");
			dial.setAttribute("type", "auto-update");
			dial.setAttribute("color", color);
			dial.setAttribute("numbers", 2);
			dial.setAttribute("interval", interval);
			dial.style.position = "absolute";
			dial.style.width = `${dialWidth}px`;
			dial.style.height = `${dialHeight}px`;
			dial.style.left = `${(dialWidth + pixWidth * 3) * j}px`;
			dial.style.borderWidth = "0";
			dials.push(dial);
			container.appendChild(dial);
		}

		let setTime = () => {
			let time = new Date();
			for (let j = dials.length - 1; j >= 0; j--) {
				switch (format.charAt(j)) {
					case 'h':
						dials[j].setAttribute("value", time.getHours());
						break;
					case 'm':
						dials[j].setAttribute("value", time.getMinutes());
						break;
					case 's':
						dials[j].setAttribute("value", time.getSeconds());
						break;
				}
			}
		}
		setTime();
		//start Working
		setInterval(setTime, interval);
	}

	function checkAttrib(value, attribute) {
		switch (attribute) {
			case "format":
				value = (/^[h,m,s]{1,3}$/i.test(value) &&
					(value.toLowerCase().split('h').length - 1 <= 1) &&
					(value.toLowerCase().split('m').length - 1 <= 1) &&
					(value.toLowerCase().split('s').length - 1 <= 1)) ? value.toLowerCase() : "hms";
				return value;
			case "positiveValue":
				value = (/^[0-9]*$/i.test(value) && +value > 0) ? value : 1;
				return value;
			case "align":
				value = (value.toLowerCase() == "right" ||
					value.toLowerCase() == "center" ||
					value.toLowerCase() == "left") ? value.toLowerCase() : "left";
				return value;
			case "color":
				value = (/(^#[a-f0-9]{6}$)|(^#[a-f0-9]{3}$)/i.test(value)) ? value : "#000";
				return value;
		}
	}

}());

(function () {
	let dials = document.querySelectorAll("pixDial");

	for (let i = 0; i < dials.length; i++) {
		let dial = dials[i];

		//get data from tag
		let type = dial.hasAttribute("type") ? dial.getAttribute("type") : "number";
		let numbers = dial.hasAttribute("numbers") ? dial.getAttribute("numbers") : 1;
		let align = dial.hasAttribute("align") ? dial.getAttribute("align") : "left";
		let color = dial.hasAttribute("color") ? dial.getAttribute("color") : "#000";

		//check Attributes
		type = checkAttrib(type, "type");
		numbers = checkAttrib(numbers, "positiveValue");
		align = checkAttrib(align, "align");
		color = checkAttrib(color, "color");

		//set default style
		dial.style.cssText = dial.style.cssText + " \
			display: inline-block; \
			min-height: 5px; \
			min-width: 4px; \
		";

		//set width and height of pixels and numbers
		let dialHeight = dial.clientHeight;
		let dialWidth = dial.clientWidth;
		numbers = (4 * numbers > dialWidth) ? dialWidth / 4 : numbers;
		let pixWidth = Math.min(Math.floor(Math.floor(dialWidth / numbers) / 4), Math.floor(dialHeight / 5));
		let numbWidth = pixWidth * 4;
		let numbHeight = pixWidth * 5;

		//make container in wich numbers'll be
		let container = document.createElement("div");
		container.style.position = "relative";
		container.style.top = `${dialHeight / 2 - numbHeight / 2}px`;
		container.style.width = `${numbWidth * numbers}px`;
		container.style.height = `${numbHeight}px`;
		dial.appendChild(container);
		switch (align) {
			case "right":
				container.style.float = "right";
				break;
			case "center":
				container.style.margin = "auto";
				break;
			case "left":
				container.style.float = "left";
				break;
		}

		//make minus sign
		let minus = document.createElement("div");
		minus.style.position = "absolute";
		minus.style.width = `${pixWidth * 2}px`;
		minus.style.height = `${pixWidth}px`;
		minus.style.top = `${pixWidth * 2}px`;
		minus.style.left = `-${pixWidth * 2}px`;
		minus.style.background = color;
		minus.style.visibility = "hidden";
		container.appendChild(minus);

		//make numbers
		let signs = [];
		for (let j = 0; j < numbers; j++) {
			let sign = document.createElement("div");
			sign.style.width = `${numbWidth}px`;
			sign.style.height = `${numbHeight}px`;
			sign.style.position = "absolute";
			sign.style.right = `${numbWidth * j}px`;
			signs.push(sign);
			for (let k = 0; k < 13; k++) {
				let pixel = document.createElement("div");
				pixel.style.width = `${pixWidth}px`;
				pixel.style.height = `${pixWidth}px`;
				pixel.style.background = color;
				pixel.style.position = "absolute";
				pixel.style.top = `${pixWidth * 2}px`;
				pixel.style.right = `${pixWidth}px`;
				pixel.style.WebkitTransition = "250ms";
				pixel.style.transition = "250ms";
				sign.appendChild(pixel);
			}
			container.appendChild(sign);
		}

		//start Working
		switch (type) {
			//show static number
			case "number":
				{
					let value = dial.hasAttribute("value") ? dial.getAttribute("value") : 0;
					value = checkAttrib(value, "value");

					draw(signs, value, minus);
					break;
				}
				//show changing value
			case "range":
				{
					let valFrom = dial.hasAttribute("from") ? dial.getAttribute("from") : 0;
					let valTo = dial.hasAttribute("to") ? dial.getAttribute("to") : 0;
					let interval = dial.hasAttribute("interval") ? dial.getAttribute("interval") : 1000
					valFrom = checkAttrib(valFrom, "value");
					valTo = checkAttrib(valTo, "value");
					interval = checkAttrib(interval, "positiveValue");

					let value = valFrom;
					//make drawer throttled
					let thrDraw = throttle(draw, 1000);
					thrDraw(signs, value, minus);
					if (valFrom != valTo) {
						let timer = setInterval(() => {
							if (valFrom < valTo) value++;
							else value--;
							if (value == valTo) clearInterval(timer);
							thrDraw(signs, value, minus);
						}, interval);
					}
					break;
				}
				//show auto-updating number
			case "auto-update":
				{
					let value = dial.hasAttribute("value") ? dial.getAttribute("value") : 0;
					let interval = dial.hasAttribute("interval") ? dial.getAttribute("interval") : 10000
					value = checkAttrib(value, "value");
					interval = checkAttrib(interval, "positiveValue");
					interval = (interval > 1000) ? interval : 1000
					//make drawer throttled
					let thrDraw = throttle(draw, 1000);
					thrDraw(signs, value, minus);
					setInterval(() => {
						let newValue = dial.hasAttribute("value") ? dial.getAttribute("value") : 0;
						if (newValue != value) {
							newValue = checkAttrib(newValue, "value");
							thrDraw(signs, newValue, minus);
							value = newValue;
						}
					}, interval);
					break;
				}
		}
	}

	function checkAttrib(value, attribute) {
		switch (attribute) {
			case "type":
				value = (value.toLowerCase() == "number" ||
					value.toLowerCase() == "range" ||
					value.toLowerCase() == "auto-update") ? value.toLowerCase() : "number";
				return value;
			case "value":
				value = (/^-?[0-9]*$/i.test(value)) ? value : 0;
				return value;
			case "positiveValue":
				value = (/^[0-9]*$/i.test(value) && +value > 0) ? value : 1;
				return value;
			case "align":
				value = (value.toLowerCase() == "right" ||
					value.toLowerCase() == "center" ||
					value.toLowerCase() == "left") ? value.toLowerCase() : "left";
				return value;
			case "color":
				value = (/(^#[a-f0-9]{6}$)|(^#[a-f0-9]{3}$)/i.test(value)) ? value : "#000";
				return value;
		}
	}

	function drawNumber(container, value) {
		//don't draw if value isn't change
		if (container.hasAttribute("value") && container.getAttribute("value") == value)
			return;

		let pixels = container.querySelectorAll("div");
		let pixWidth = pixels[0].clientWidth;

		//move all pixels to center
		for (let i = 0; i < 13; i++) {
			pixels[i].style.top = `${pixWidth * 2}px`;
			pixels[i].style.right = `${pixWidth}px`;
		}

		//draw numbers
		setTimeout(() => {
			switch (value) {
				case 0:
					{
						pixels[0].style.top = 0;
						pixels[0].style.right = `${pixWidth * 2}px`;
						pixels[1].style.top = 0;
						pixels[1].style.right = `${pixWidth}px`;
						pixels[2].style.top = 0;
						pixels[2].style.right = `${pixWidth}px`;
						pixels[3].style.top = 0;
						pixels[3].style.right = 0;
						pixels[4].style.top = `${pixWidth}px`;
						pixels[4].style.right = `${pixWidth * 2}px`;
						pixels[5].style.top = `${pixWidth}px`;
						pixels[5].style.right = 0;
						pixels[6].style.top = `${pixWidth * 2}px`;
						pixels[6].style.right = `${pixWidth * 2}px`;
						pixels[7].style.top = `${pixWidth * 2}px`;
						pixels[7].style.right = 0;
						pixels[8].style.top = `${pixWidth * 3}px`;
						pixels[8].style.right = `${pixWidth * 2}px`;
						pixels[9].style.top = `${pixWidth * 3}px`;
						pixels[9].style.right = 0;
						pixels[10].style.top = `${pixWidth * 4}px`;
						pixels[10].style.right = `${pixWidth * 2}px`;
						pixels[11].style.top = `${pixWidth * 4}px`;
						pixels[11].style.right = `${pixWidth}px`;
						pixels[12].style.top = `${pixWidth * 4}px`;
						pixels[12].style.right = 0;
						break;
					}
				case 1:
					{
						pixels[0].style.top = 0;
						pixels[0].style.right = `${pixWidth}px`;
						pixels[1].style.top = `${pixWidth}px`;
						pixels[1].style.right = `${pixWidth * 2}px`;
						pixels[2].style.top = `${pixWidth}px`;
						pixels[2].style.right = `${pixWidth}px`;
						pixels[3].style.top = `${pixWidth * 3}px`;
						pixels[3].style.right = `${pixWidth}px`;
						pixels[4].style.top = `${pixWidth * 4}px`;
						pixels[4].style.right = `${pixWidth * 2}px`;
						pixels[5].style.top = `${pixWidth * 4}px`;
						pixels[5].style.right = `${pixWidth}px`;
						pixels[6].style.top = `${pixWidth * 4}px`;
						pixels[6].style.right = 0;
						break;
					}
				case 2:
					{
						pixels[0].style.top = 0;
						pixels[0].style.right = `${pixWidth * 2}px`;
						pixels[1].style.top = 0;
						pixels[1].style.right = `${pixWidth}px`;
						pixels[2].style.top = 0;
						pixels[2].style.right = 0;
						pixels[3].style.top = `${pixWidth}px`;
						pixels[3].style.right = 0;
						pixels[4].style.top = `${pixWidth * 2}px`;
						pixels[4].style.right = `${pixWidth * 2}px`;
						pixels[5].style.top = `${pixWidth * 2}px`;
						pixels[5].style.right = 0;
						pixels[6].style.top = `${pixWidth * 3}px`;
						pixels[6].style.right = `${pixWidth * 2}px`;
						pixels[7].style.top = `${pixWidth * 4}px`;
						pixels[7].style.right = `${pixWidth * 2}px`;
						pixels[8].style.top = `${pixWidth * 4}px`;
						pixels[8].style.right = `${pixWidth}px`;
						pixels[9].style.top = `${pixWidth * 4}px`;
						pixels[9].style.right = 0;
						break;
					}
				case 3:
					{
						pixels[0].style.top = 0;
						pixels[0].style.right = `${pixWidth * 2}px`;
						pixels[1].style.top = 0;
						pixels[1].style.right = `${pixWidth}px`;
						pixels[2].style.top = 0;
						pixels[2].style.right = 0;
						pixels[3].style.top = `${pixWidth}px`;
						pixels[3].style.right = 0;
						pixels[4].style.top = `${pixWidth * 2}px`;
						pixels[4].style.right = `${pixWidth * 2}px`;
						pixels[5].style.top = `${pixWidth * 2}px`;
						pixels[5].style.right = 0;
						pixels[6].style.top = `${pixWidth * 3}px`;
						pixels[6].style.right = 0;
						pixels[7].style.top = `${pixWidth * 4}px`;
						pixels[7].style.right = `${pixWidth * 2}px`;
						pixels[8].style.top = `${pixWidth * 4}px`;
						pixels[8].style.right = `${pixWidth}px`;
						pixels[9].style.top = `${pixWidth * 4}px`;
						pixels[9].style.right = 0;
						break;
					}
				case 4:
					{
						pixels[0].style.top = 0;
						pixels[0].style.right = `${pixWidth * 2}px`;
						pixels[1].style.top = 0;
						pixels[1].style.right = 0;
						pixels[2].style.top = `${pixWidth}px`;
						pixels[2].style.right = `${pixWidth * 2}px`;
						pixels[3].style.top = `${pixWidth}px`;
						pixels[3].style.right = 0;
						pixels[4].style.top = `${pixWidth * 2}px`;
						pixels[4].style.right = `${pixWidth * 2}px`;
						pixels[5].style.top = `${pixWidth * 2}px`;
						pixels[5].style.right = 0;
						pixels[6].style.top = `${pixWidth * 3}px`;
						pixels[6].style.right = 0;
						pixels[7].style.top = `${pixWidth * 4}px`;
						pixels[7].style.right = 0;
						break;
					}
				case 5:
					{
						pixels[0].style.top = 0;
						pixels[0].style.right = `${pixWidth * 2}px`;
						pixels[1].style.top = 0;
						pixels[1].style.right = `${pixWidth}px`;
						pixels[2].style.top = 0;
						pixels[2].style.right = 0;
						pixels[3].style.top = `${pixWidth}px`;
						pixels[3].style.right = `${pixWidth * 2}px`;
						pixels[4].style.top = `${pixWidth * 2}px`;
						pixels[4].style.right = `${pixWidth * 2}px`;
						pixels[5].style.top = `${pixWidth * 2}px`;
						pixels[5].style.right = 0;
						pixels[6].style.top = `${pixWidth * 3}px`;
						pixels[6].style.right = 0;
						pixels[7].style.top = `${pixWidth * 4}px`;
						pixels[7].style.right = `${pixWidth * 2}px`;
						pixels[8].style.top = `${pixWidth * 4}px`;
						pixels[8].style.right = `${pixWidth}px`;
						pixels[9].style.top = `${pixWidth * 4}px`;
						pixels[9].style.right = 0;
						break;
					}
				case 6:
					{
						pixels[0].style.top = 0;
						pixels[0].style.right = `${pixWidth * 2}px`;
						pixels[1].style.top = 0;
						pixels[1].style.right = `${pixWidth}px`;
						pixels[2].style.top = 0;
						pixels[2].style.right = 0;
						pixels[3].style.top = `${pixWidth}px`;
						pixels[3].style.right = `${pixWidth * 2}px`;
						pixels[4].style.top = `${pixWidth * 2}px`;
						pixels[4].style.right = `${pixWidth * 2}px`;
						pixels[5].style.top = `${pixWidth * 2}px`;
						pixels[5].style.right = 0;
						pixels[6].style.top = `${pixWidth * 3}px`;
						pixels[6].style.right = `${pixWidth * 2}px`;
						pixels[7].style.top = `${pixWidth * 3}px`;
						pixels[7].style.right = 0;
						pixels[8].style.top = `${pixWidth * 4}px`;
						pixels[8].style.right = `${pixWidth * 2}px`;
						pixels[9].style.top = `${pixWidth * 4}px`;
						pixels[9].style.right = `${pixWidth}px`;
						pixels[10].style.top = `${pixWidth * 4}px`;
						pixels[10].style.right = 0;
						break;
					}
				case 7:
					{
						pixels[0].style.top = 0;
						pixels[0].style.right = `${pixWidth * 2}px`;
						pixels[1].style.top = 0;
						pixels[1].style.right = `${pixWidth}px`;
						pixels[2].style.top = 0;
						pixels[2].style.right = 0;
						pixels[3].style.top = `${pixWidth}px`;
						pixels[3].style.right = 0;
						pixels[4].style.top = `${pixWidth * 3}px`;
						pixels[4].style.right = `${pixWidth}px`;
						pixels[5].style.top = `${pixWidth * 4}px`;
						pixels[5].style.right = `${pixWidth}px`;
						break;
					}
				case 8:
					{
						pixels[0].style.top = 0;
						pixels[0].style.right = `${pixWidth * 2}px`;
						pixels[1].style.top = 0;
						pixels[1].style.right = `${pixWidth}px`;
						pixels[2].style.top = 0;
						pixels[2].style.right = 0;
						pixels[3].style.top = `${pixWidth}px`;
						pixels[3].style.right = `${pixWidth * 2}px`;
						pixels[4].style.top = `${pixWidth}px`;
						pixels[4].style.right = 0;
						pixels[5].style.top = `${pixWidth * 2}px`;
						pixels[5].style.right = `${pixWidth * 2}px`;
						pixels[6].style.top = `${pixWidth * 2}px`;
						pixels[6].style.right = 0;
						pixels[7].style.top = `${pixWidth * 3}px`;
						pixels[7].style.right = `${pixWidth * 2}px`;
						pixels[8].style.top = `${pixWidth * 3}px`;
						pixels[8].style.right = 0;
						pixels[9].style.top = `${pixWidth * 4}px`;
						pixels[9].style.right = `${pixWidth * 2}px`;
						pixels[10].style.top = `${pixWidth * 4}px`;
						pixels[10].style.right = `${pixWidth}px`;
						pixels[11].style.top = `${pixWidth * 4}px`;
						pixels[11].style.right = 0;
						break;
					}
				case 9:
					{
						pixels[0].style.top = 0;
						pixels[0].style.right = `${pixWidth * 2}px`;
						pixels[1].style.top = 0;
						pixels[1].style.right = `${pixWidth}px`;
						pixels[2].style.top = 0;
						pixels[2].style.right = 0;
						pixels[3].style.top = `${pixWidth}px`;
						pixels[3].style.right = `${pixWidth * 2}px`;
						pixels[4].style.top = `${pixWidth}px`;
						pixels[4].style.right = 0;
						pixels[5].style.top = `${pixWidth * 2}px`;
						pixels[5].style.right = `${pixWidth * 2}px`;
						pixels[6].style.top = `${pixWidth * 2}px`;
						pixels[6].style.right = 0;
						pixels[7].style.top = `${pixWidth * 3}px`;
						pixels[7].style.right = 0;
						pixels[8].style.top = `${pixWidth * 4}px`;
						pixels[8].style.right = `${pixWidth * 2}px`;
						pixels[9].style.top = `${pixWidth * 4}px`;
						pixels[9].style.right = `${pixWidth}px`;
						pixels[10].style.top = `${pixWidth * 4}px`;
						pixels[10].style.right = 0;
						break;
					}
			}
		}, 250);
		container.setAttribute("value", value);
	}

	function draw(signs, value, minus) {
		minus.style.visibility = (value < 0) ? "visible" : "hidden";
		if (value < 0) value = -value;
		for (let i = 0; i < signs.length; i++) {
			drawNumber(signs[i], value % 10);
			value = Math.floor(value / 10);
		}
	}

	function throttle(func, ms) {
		let isThrottled = false,
			savedArgs,
			savedThis;

		function wrapper() {
			if (isThrottled) {
				savedArgs = arguments;
				savedThis = this;
				return;
			}

			func.apply(this, arguments);

			isThrottled = true;

			let timer = setTimeout(() => {
				isThrottled = false;
				if (savedArgs) {
					wrapper.apply(savedThis, savedArgs);
					savedArgs = savedThis = null;
				}
			}, ms);
		}

		return wrapper;
	}
}());