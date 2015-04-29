//simulate

function veccal(u,v){//mechfunc 
	var dis;
	dis = Math.sqrt((u-0.5)*(u-0.5)+(v-0.5)*(v-0.5));
	return dis;
}

function reuv(){//pick return u0,v0
	var x,z;
	x=pos.x;
	z=pos.z;
	if(pos.x<=0){
		x=-1*x/400;
		ru=0.5-x;
	}
	else{
		 x=x/400;
		 ru=0.5+x;
	}
	console.log(ru);	
	if(pos.z<=0){
		z=-1*z/400;
		rv=0.5-z;		
	}
	else{
		z=z/400;
		rv=0.5+z;	
	}
	console.log(rv);
}

function mousedeform(u,v){
	var number;
	var i;
	u=u*40;
	v=v*40;
	u=Math.floor(u);
	v=Math.floor(v); 
	console.log(u);
	console.log(v);	
	number=40*v+u;
	console.log(number);
	if(geometry.vertices[number].y>-40){
		geometry.vertices[number].y-=1;
		geometry.vertices[number+40].y+=0.125;
		geometry.vertices[number+41].y+=0.125;
		geometry.vertices[number+39].y+=0.125;
		geometry.vertices[number+1].y+=0.125;
		geometry.vertices[number-1].y+=0.125;
		geometry.vertices[number-41].y+=0.125;
		geometry.vertices[number-40].y+=0.125;
		geometry.vertices[number-39].y+=0.125;
	}
/*	for(i=0;i<1600;i++){
		if(i==0){
			if(geometry.vertices[1].y-geometry.vertices[0].y>3){
				geometry.vertices[]
			}
		}		
		if(geometry.vertices[i].y-geometry.vertices[i+1]>3)
			geometry.vertices[]
		if(geometry.vertices[i])
	}
	*/
}
