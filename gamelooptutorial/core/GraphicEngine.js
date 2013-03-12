

var GraphicEngine = Class.create( {
	DEBUG_DISPLAY:true,
	DEBUG:null,
	DEBUG_COLOR:"black",

	///////////////////////////
	canvas:null,
	context:null,
	//////////////////////////
		
	// The initialize method serves as a constructor
    initialize: function () 
	{
		GraphicEngine.singleton = this ;
	},

	init:function( canvas )
	{
		this.canvas = canvas ;		
		this.context = canvas.getContext("2d") ;
	},
		
	display:function( dt )
	{
		this.context.clearRect( 0 ,0 , this.canvas.width , this.canvas.height ) ;
		
		if( this.DEBUG != null )this.debug_display() ;
		
		
	},
	
	debug_display:function( dt )
	{
		for( var i = 0 ; i < this.DEBUG.size() ; i++ )
		{
			this.context.font="20px Arial";
			this.context.fillStyle = this.DEBUG[i].color ;
			this.context.fillText( this.DEBUG[i].text, this.DEBUG[i].x ,this.DEBUG[i].y );
		}
		this.DEBUG = null ;// reset DEBUG logs
	},
	
	debug_log:function( text, x, y, color )
	{
		if( !this.DEBUG_DISPLAY )
		{
			this.DEBUG = null ;
			return ;
		}
		///////////////////////////////////////////
		color = unNil( color, this.DEBUG_COLOR ) ;

		if( this.DEBUG == null )
			this.DEBUG = new Array() ;
		
		a_text = {text:text, x:x, y:y, color:color } ;
		this.DEBUG.push( a_text ) ;
		
	}
	
}) ;

function DEBUG_LOG( trace, x,y,color )
{
	GraphicEngine.singleton.debug_log( trace , x, y, color ) ;
}


