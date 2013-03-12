var EF_Rad2Deg = 180/Math.PI ;
var EF_Deg2Rad = Math.PI/180 ;

/////////////////////////////////////
// Reference handle
function isNil( obj )
{
	return (obj == undefined || obj == null ) ;
}

function unNil( obj, value )
{
	return ( isNil( obj) )?value:obj ;

}
////////////////////////////////////
// range handle
function EL_clamp( value, min, max ) 
{
	return (( value < min )?min:((value > max)?max:value)) ;
}

function EL_isRange( value, min, max ) 
{
	return (value >= min && value <= max ) ;
}

function EL_round( num, floating )
{
	return ((floating == 0 )?Math.round(num):Math.round( num*10*floating)/(10*floating)) ;
}
/////////////////////////////////////
// interpolation handle

function EL_lerp( from, to, ratio, is_clamp ) 
{
	is_clamp = unNil( is_clamp, false ) ;

	if( is_clamp )
		ratio = EL_clamp( ratio, 0, 1 ) ;

	var a = (1-ratio)/ (ratio + (1-ratio)) ;
	var b = ratio / (ratio + (1-ratio)) ;
	
	return (a*from + b*to) ;
}


function EL_hermite(from , to,  ratio, is_clamp )
{
	return EL_lerp(from, to, ratio * ratio * (3 - 2 * ratio), is_clamp );
}

function EL_clerp( from, to, ratio, is_clamp, as_radian )
{
	as_radian = unNil( as_radian, false ) ;
	is_clamp = unNil( is_clamp, false ) ;
	if( is_clamp )
		ratio = EL_clamp( ratio, 0, 1 ) ;

	if( as_radian == true )
	{
		from *= EF_Rad2Deg ;
		to *= EF_Rad2Deg ;
	}

	from = ((from%360)+360)%360 ;
	to =   ((to%360)+360)%360 ;

	var min = 0 ;
	var max = 360 ;
	var half = Math.abs((max - min)/2);//half the distance between min and max

	var retval = 0 ;
	var diff = 0 ;

	if((to - from) < -half)
	{
		diff = ((max - from)+to)*ratio;
		retval =  from+diff;
	}
	else if((to - from) > half)
	{
		diff = -((max - to)+from)*ratio;
		retval =  from+diff;
	}
	else retval =  from+(to-from)*ratio;

	retval = retval%360 ;

	if( as_radian == true )
		return retval * EF_Deg2Rad ;

	return retval;
}

function EL_chermite(from , to,  ratio, is_clamp, is_radian )
{
	return EL_clerp(from, to, ratio * ratio * (3 - 2 * ratio), is_clamp, is_radian );
}

function EL_berp( from, to , ratio )
{
    ratio = EL_clamp(ratio, 0, 1);

    ratio = (Math.sin( ratio * Math.PI * (0.2 + 2.5 * ratio * ratio * ratio)) * Math.pow(1 - ratio, 2.2) + ratio) * (1 + (1.2 * (1 - ratio)));

    return from + (to - from) * ratio;

}

function EL_bounce( from, to, ratio )
{
	ratio = EL_clamp(ratio, 0, 1);
	var bounce_rate = (Math.abs(Math.sin(6.28*(ratio+1)*(ratio+1)) * (1-ratio))) ;
	
	return from+(to-from)*bounce_rate ;
}

////////////////////////////
// Vector & angle handle

function EL_vec2DLen(v)
{
	var l = Math.sqrt( v.x * v.x + v.y * v.y ) ;
	if (l < Number.MIN_VALUE)
		return 0 ;

	return l ;
} ;



function EL_vec2DNormalize(v)
{
	var l = Math.sqrt( v.x * v.x + v.y * v.y ) ;

	if (l < Number.MIN_VALUE)
	{
		return {x:0,y:0,z:0};
	}

	var vn = { x: v.x, y:v.y } ;

	vn.x = vn.x/l ;
	vn.y = vn.y/l ;

	return vn ;
};
