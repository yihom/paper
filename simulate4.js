var startb;
var nine = new Array(-41,-40,-39,-1,0,1,39,40,41);
var twfive = new Array(-82,-81,-80,-79,-78,-42,-41,-40,-39,-38,-2,-1,0,1,2,38,39,40,41,42,78,79,80,81,82);
var ru,rv;
var sandsum=0;
function reuv(){//pick return u0,v0
	var x,z;
	x=mousepos.x;
	z=mousepos.z;
	if(mousepos.x<=0){
		x=-1*x/100;
		ru=0.5-x;
	}
	else{
		 x=x/100;
		 ru=0.5+x;
	}
//	console.log("u0:"+ru);	
	if(mousepos.z<=0){
		z=-1*z/100;
		rv=0.5-z;	
	}
	else{
		z=z/100;
		rv=0.5+z;	
	}
//	console.log("v0:"+rv);
	ru=ru*40;
	rv=rv*40;
	ru=Math.floor(ru);
	rv=Math.floor(rv);
}



/*沙子掉落					    */
/*點擊位置掉落					*/
function pointdrop(pos){//sand drop
    var radius = 5;
    var nvs = SandGeometry.vertices.length;
    var clickLoc = new THREE.Vector3(pos.x, 0, pos.z);
    for (var i = 0; i < nvs; i++) {
        var vv = new THREE.Vector3(SandGeometry.vertices[i].x,
        0, SandGeometry.vertices[i].z);
        var dist = clickLoc.distanceTo(vv);
        if (dist < radius) {
            SandGeometry.vertices[i].y += 0.5 * Math.exp(0.01 * dist);
        }
    }
	startb=1;
    SandGeometry.computeFaceNormals();
    SandGeometry.computeVertexNormals();
    SandGeometry.normalsNeedUpdate = true;
    SandGeometry.verticesNeedUpdate = true;
	for(i = 0; i<SandGeometry.vertices.length; i++){
		sandsum+=SandGeometry.vertices[i].y;
	}
//	console.log(sandsum);
	sandsum=0;
}

var point;
var reduce=0;
var lastvec = new THREE.Vector2(-1,-1);//上一個位置
var nowvec = new THREE.Vector2();//目前位置
var nlvec = new THREE.Vector2();//目前位置-上一個位置
var dvec = new THREE.Vector2();//各點到目前位置的向量
function pointdraw(){
	var counter = 0;
	var dotsum = 0;
	var inc = 0;
	var addu,addv,addp;
	point=40*rv+ru;
	
	var vecdot = [];
	for(var i = -2; i<=2; i++){
		vecdot[i]=[];
	}
	for(i = 0; i<nine.length; i++){
		if(point+nine[i]>=0&&point+nine[i]<=1600){
			reduce+=SandGeometry.vertices[point+nine[i]].y;
			SandGeometry.vertices[point+nine[i]].y=0;
		}
	}
	
//	console.log("r="+reduce);
	nowvec.x = ru;
	nowvec.y = rv;
	if(lastvec.x!=-1&&lastvec.y!=-1){
		nlvec.x = nowvec.x - lastvec.x;
		nlvec.y = nowvec.y - lastvec.y;
/*	console.log("u0="+ru+"v0="+rv);	
	console.log("nowvec.x="+nowvec.x);
	console.log("nowvec.y="+nowvec.y);	
	console.log("lastvec.x="+lastvec.x);
	console.log("lastvec.y="+lastvec.y);*/
	nlvec = nlvec.normalize();
//	console.log("nlvec.x="+nlvec.x);
//	console.log("nlvec.y="+nlvec.y);	
	}


	
	if(nlvec.x!=0||nlvec.y!=0){
		for(i = -2; i<=2; i++){
			for(var j = -2; j<=2; j++){
				if(i===2|| j===2|| i===-2|| j===-2){
					dvec.x = i;
					dvec.y = j;
					dvec = dvec.normalize();
					//console.log("dvec.normalize"+dvec.x+","+dvec.y);
					vecdot[i][j] = nlvec.dot(dvec);
					//console.log(vecdot[i][j]);
					if(nlvec.dot(dvec)>=0){
						dotsum+=nlvec.dot(dvec);
					}
				}
			}
		}
		//console.log()
		
		for(var i = -2; i<=2; i++){
			for(var j = -2; j<=2; j++){
				if(vecdot[i][j]>=0){
					//dotsum=Math.floor(dotsum*10)/10;
					//vecdot[i][j]=Math.floor(vecdot[i][j]*10)/10;
					//reduce=Math.floor(reduce*10)/10;
					//console.log("dot:"+vecdot[i][j]);
					//console.log("reduce:"+reduce);
					//console.log("dotsum:"+dotsum);
					inc = vecdot[i][j]*reduce/dotsum;
					//console.log("inc:"+inc);
					//console.log(inc);
					addu=ru+i;
					addv=rv+j;
					addp=40*addv+addu;
					if(addp>0&&addp<1600)
					SandGeometry.vertices[addp].y+=inc;
				}
			}
		}
	}
	else{
		for(i = -2; i<=2; i++){
			for(var j = -2; j<=2; j++){
				if(i===2|| j===2|| i===-2|| j===-2){
					addu=ru+i;
					addv=rv+j;
					addp=40*addv+addu;
					if(addp>0&&addp<1600)
					SandGeometry.vertices[addp].y+=reduce/16;					
				}
			}
		}				
	}
	lastvec.x = nowvec.x;
	lastvec.y = nowvec.y;
	dotsum=0;
	reduce=0;
	
	startb=1;
	SandGeometry.computeFaceNormals();
	SandGeometry.computeVertexNormals();
	SandGeometry.normalsNeedUpdate = true;
	SandGeometry.verticesNeedUpdate = true;		
	for(i = 0; i<SandGeometry.vertices.length; i++){
		sandsum+=SandGeometry.vertices[i].y;
	}
//	console.log(sandsum);	
	sandsum=0;
}


function startdraw(){
	for (var i = 0; i < SandGeometry.vertices.length; i++) {
		if(SandGeometry.vertices[i].y<=1)
		SandGeometry.vertices[i].y = SandGeometry.vertices[i].y +0.1;
	}
	SandGeometry.computeFaceNormals();
	SandGeometry.computeVertexNormals();
	SandGeometry.normalsNeedUpdate = true;
	SandGeometry.verticesNeedUpdate = true;			
}

/*平衡*/
var counter=0;
var hnumber=0;
function balance(){
	if(startb==1){
		var heigher=[];
		var i,j;
		
		for(i = 0; i<SandGeometry.vertices.length; i++){
			for(j = 0; j<nine.length; j++){
				if(i+nine[j]>0&&i+nine[j]<1600){
					if(SandGeometry.vertices[i].y - SandGeometry.vertices[i+nine[j]].y >=3){
						heigher[counter]=1;
					}else {
						heigher[counter]=0;
					}
					counter++;
				}
			}
			
			for(j = 0; j<nine.length; j++){
				if(heigher[j]==1){
					hnumber++;
				}
			}
			
			if(hnumber>0){
				SandGeometry.vertices[i].y--;
				for(j = 0; j<nine.length; j++){
					if(heigher[j]==1){
					if(i+nine[j]>0&&i+nine[j]<1600)
						SandGeometry.vertices[i+nine[j]].y=SandGeometry.vertices[i+nine[j]].y+1/hnumber;
					}
				}
			}
	/*		
			if(hnumber===0){
				startb=0;
			}
			*/
			counter=0;
			hnumber=0;
		}
		
		SandGeometry.computeFaceNormals();
		SandGeometry.computeVertexNormals();
		SandGeometry.normalsNeedUpdate = true;
		SandGeometry.verticesNeedUpdate = true;	
	}

}