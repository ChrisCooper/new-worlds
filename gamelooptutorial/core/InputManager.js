

var InputManager = Class.create( 
{
	///////////////////////////
	canvas:null,
	//////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////
	keys:new Array(),// physical key states 
		K_LEFT:37,
		K_RIGHT:39,
		K_UP:38,
		K_DOWN:40,
		K_CTRL:17,
		K_SPACE:32,
		K_ENTER:13,
	
	mouse:{x:0, y:0, press:false },
		
    initialize: function () 
	{
		InputManager.singleton = this ;
	},
	
	init:function( canvas )
	{
		this.canvas = canvas ;
		
		window.addEventListener('keydown', 	 InputManager.singleton.handleKeyDown, true );  
		window.addEventListener('keyup', 	 InputManager.singleton.handleKeyUp, true );  
		window.addEventListener("mousedown", InputManager.singleton.clickInCanvas, true );
		window.addEventListener("mouseup", 	 InputManager.singleton.releaseInCanvas, true );
		window.addEventListener("mousemove", InputManager.singleton.moveInCanvas, true );

	},
	
	/////////////////////////////////////////////////////////
	// User-Event interface
	clickInCanvas:function( e ) 
	{
		var x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		var y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
			
		x -= InputManager.singleton.canvas.offsetLeft;
		y -= InputManager.singleton.canvas.offsetTop;
			
		if( x >= 0 && y >= 0 
			&& x < InputManager.singleton.canvas.width
			&& y < InputManager.singleton.canvas.height )
		{
			InputManager.singleton.mouse.press = true ;
		}
	},
	
	releaseInCanvas:function( e ) 
	{
		var x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		var y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		
		x -= InputManager.singleton.canvas.offsetLeft;
		y -= InputManager.singleton.canvas.offsetTop;
			
		if( x >= 0 && y >= 0 
			&& x < InputManager.singleton.canvas.width
			&& y < InputManager.singleton.canvas.height )
		{
			InputManager.singleton.mouse.press = false ;
		}
	},
	
	moveInCanvas:function( e ) 
	{
		var x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		var y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
			
		x -= InputManager.singleton.canvas.offsetLeft;
		y -= InputManager.singleton.canvas.offsetTop;
			
		if( x >= 0 && y >= 0 
			&& x < InputManager.singleton.canvas.width
			&& y < InputManager.singleton.canvas.height )
		{
			InputManager.singleton.mouse.x = x ;
			InputManager.singleton.mouse.y = y ;
		}
	},
	
	
	handleKeyDown:function( evt )
	{
		inputManager.singleton.keys[evt.keyCode] = unNil( inputManager.singleton.keys[evt.keyCode] ) ;
		InputManager.singleton.keys[evt.keyCode].press = true;
	},
	handleKeyUp:function( evt )
	{
		inputManager.singleton.keys[evt.keyCode] = unNil( inputManager.singleton.keys[evt.keyCode] ) ;
		InputManager.singleton.keys[evt.keyCode].press = false; 
	},
	// End of User-Event interface
	////////////////////////////////////////////////////////////////////////////////////////
	
	processEntry:function( dt )
	{
	
	}
}) ;
