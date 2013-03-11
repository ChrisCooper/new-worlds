//get a reference to the canvas
var canvas_context = $('#gameCanvas')[0].getContext("2d");

//draw a circle
canvas_context.beginPath();
canvas_context.arc(75, 75, 10, 0, Math.PI*2, true); 
canvas_context.closePath();
canvas_context.fill();


canvas_context.beginPath();
canvas_context.rect(200, 300, 30, 50);
canvas_context.closePath();
canvas_context.stroke();
