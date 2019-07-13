window.addEventListener("load", ()=>{						
	const canvas = document.querySelector("#canvas");
	const context = canvas.getContext("2d"); 	

	//	Dynamic sizing based on window size
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	context.fillRect(475,20,10,600);
	context.fillRect(700,20,10,600);
	context.fillRect(300,200,600,10);
	context.fillRect(300,400,600,10);
	
	//creating button
	const path = new Path2D()
	path.rect(25,72,100,50);
	path.closePath();
	context.font = "20px Arial";
	context.fillText("Clear",45,100,100,50);
	context.fillStyle = "#FFFFFF"
	context.fillStyle = "rgba(225,225,225,0.5)"
	context.fill(path)
	context.lineWidth = 2
	context.strokeStyle = "#000000"
	context.stroke(path)
	
	let painting = false;
	
	//	Whether the user is painting or not is tracked to know when to stop 
	//	drawing and start a new line 
	
	function startPosition(){
		painting = true; 
	}
	
	//function for the button 
	function getXY(canvas, event){
	  const rect = canvas.getBoundingClientRect()
	  const y = event.clientY - rect.top
	  const x = event.clientX - rect.left
	  return {x:x, y:y}
	}
	
	//listens for the button click to clear
	canvas.addEventListener("click",  function (e) {
	  //stops drawing on the button 
	  painting = false;
	  const XY = getXY(canvas, e)
	  // if button at location is clicked perform clear operation
	  if(context.isPointInPath(path, XY.x, XY.y)) {
		 //	Dynamic sizing based on window size
		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;
		context.fillRect(475,20,10,600);
		context.fillRect(700,20,10,600);
		context.fillRect(300,200,600,10);
		context.fillRect(300,400,600,10);
		/*
		context.fillRect((window.innerWidth/2-150),20,10,600);
		context.fillRect((window.innerWidth/2+150),20,10,600);
		context.fillRect(300,(window.innerHeight/2-100),800,10);
		context.fillRect(300,(window.innerHeight/2+100),800,10);*/
		
		//creating button
		const path = new Path2D()
		path.rect(25,72,100,50);
		path.closePath();
		context.font = "20px Arial";
		context.fillText("Clear",45,100,100,50);
		context.fillStyle = "#FFFFFF"
		context.fillStyle = "rgba(225,225,225,0.5)"
		context.fill(path)
		context.lineWidth = 2
		context.strokeStyle = "#000000"
		context.stroke(path)
	  }
	}, false)
	
	function finishedPosition(){
		painting = false;
		context.beginPath();
	}
	
	//	Drawing function
	function draw(e){
		if(!painting){
			return;
		}
		
		//	line settings
		context.lineWidth = 10;
		context.lineCap = "round";
		
		//	actual drawing starts
		context.lineTo(e.clientX, e.clientY);
		context.stroke();
		context.beginPath(); 
		context.moveTo(e.clientX,e.clientY);
		
	}
	
	//	EventListeners
	canvas.addEventListener("mousedown", startPosition);
	canvas.addEventListener("mouseup", finishedPosition);
	canvas.addEventListener("mousemove",draw);
});
