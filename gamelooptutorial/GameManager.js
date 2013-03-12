function start( canvas_name )
{
	new GameManager() ;
	GameManager.singleton.init( canvas_name ) ;
	
	GameManager.singleton.run() ;// run the gameloop
} ;


var GameManager = Class.create( {
/********************************
* GameManager: Application class of the Game
*********************************/
	inv_fps:1/30,
	canvas:null,
	
	/////////////////////////////////////////////////
	// The initialize method serves as a constructor
    initialize: function () 
	{
		GameManager.singleton = this ;
	},
	
	/////////////////////////////////////////////////
	// init all engines related by the manager and attach to canvas
	init:function( canvas_name )
	{
		this.canvas = document.getElementById( canvas_name ) ;
		
		new GraphicEngine() ;
		new InputManager() ;
		
		GraphicEngine.singleton.init( GameManager.singleton.canvas ) ;// attach rendering context
		InputManager.singleton.init( GameManager.singleton.canvas ) ;// attach input listening context
	},
	
	/////////////////////////////
	// command to execute the gameloop
	run:function()
	{
		GameManager.singleton.game_loop();
	},
	
	next_frame:0,
	frame_cpu:0,
	game_loop:function()
	////////////////////////////
	// Game loop steping the game simulation at the inv_fps attribute value
	{
		var _self = GameManager.singleton ;
		var clock = new Date() ;
		
		var start_of_frame_time = clock.getTime();
		
		///////////////////////////////////
		InputManager.singleton.processEntry( _self.inv_fps ) ;
		_self.update( _self.inv_fps );
		GraphicEngine.singleton.display( _self.inv_fps ) ;
		///////////////////////////////////
		
		clock = new Date() ;
		var end_of_frame_time = clock.getTime();
		var dt = ((end_of_frame_time - start_of_frame_time)/1000);// Used time for frame execution
		
		_self.frame_cpu = dt ;
		_self.next_frame = EL_clamp( _self.inv_fps-dt, 0, _self.inv_fps ) ;// clamp in case of lag
		
		setTimeout( _self.game_loop, _self.next_frame );
		
	},

	DEBUG_STAT:true,
	update:function( dt )
	{
		if( GameManager.singleton.DEBUG_STAT )
		{// Display frame-1 stats
			DEBUG_LOG( "delta time :   " + EL_round(dt*1000, 10) + " ms" , 20, 20 ) ;
			DEBUG_LOG( "cpu frame  :   " + (EL_round( GameManager.singleton.frame_cpu *1000, 10)) + " ms" , 20, 60 ) ;
			DEBUG_LOG( "free frame :   " + (EL_round( GameManager.singleton.next_frame *1000, 10)) + " ms" , 20, 100 ) ;
		}
		////////////////////////////
		// here the sim of the world
		
		// end of the sim of the world
		////////////////////////////
	}

}) ;


