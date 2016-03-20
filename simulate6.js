var ap,cube,cubegeometry,cubesize=6,cp,cylinder,cygeometry,cysize=5,bp,ballsize = 6,ballgeometry,ball;
var g = new THREE.Vector3(0,0,-9.8),vel = new THREE.Vector3(0,0,0);
var c = 0.9;
var hexdis = 1;
var objsave = [];
var dt;
var clock = new THREE.Clock();
var sumhex = 50*50;
var lose = 0;
var lose2 = 0;
var lose3 = 0;
var incube = 0;
var inball = 0;
var ground = -2;

function sumsand(){
	var sum = 0;
	for(var i = 0; i <sumhex; i ++){
		sum+=mesh.geometry.vertices[i].z;
	}
	console.log(sum);
}

function obj(){
	ap = new THREE.Vector3(0,0,cubesize/2);
	cubegeometry = new THREE.BoxGeometry( cubesize, cubesize, cubesize );
	var material = new THREE.MeshLambertMaterial( {color: 0x00ffff} );
	cube = new THREE.Mesh( cubegeometry, material );
	cube.position.set(ap.x,ap.y,ap.z);
	scene.add( cube );
	for(var i = 0; i < cube.geometry.vertices.length; i++){
		//console.log(cube.geometry.vertices[i]);
	}
}

function obj2(){
	cp = new THREE.Vector3(0,15,40+cysize);
	cygeometry = new THREE.CylinderGeometry( 5, 5, 2, 32 );
	var material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
	cylinder = new THREE.Mesh( cygeometry, material );
	scene.add( cylinder );
	cylinder.position.set(cp.x,cp.y,cp.z);
}

function obj3(){
	bp = new THREE.Vector3(15,15,20+ballsize);
	ballgeometry = new THREE.SphereGeometry( 5, 32, 32 );
	var material = new THREE.MeshLambertMaterial( {color: 0xff0000} );
	ball = new THREE.Mesh( ballgeometry, material );
	scene.add( ball );
	ball.position.set(bp.x,bp.y,bp.z);
}
function obj3col(hex){
    hex0.visible = true;
    var p = hex_to_pixel(layout, hex);
    hex0.position.set(p.x, p.y, 0);	
	vID = hashHexVertex(hex.q, hex.r);
	//console.log(vID);

	var sv= new THREE.Vector3(0,0,0);
	g = new THREE.Vector3(0,0,-9.8);
	if(bp.z>ballsize){
		//console.log(vel);
		vel = vel.add(g.multiplyScalar(dt));
		//console.log(vel);
		sv.copy(vel);
		bp = bp.add(sv.multiplyScalar(dt));
	}
	else if(bp.z<ballsize && bp.z>ballsize+ground){
		vel = vel.multiplyScalar(c);
		sv.copy(vel);
		bp = bp.add(sv.multiplyScalar(dt));		
	}
	else if(bp.z < ballsize+ground){
		vel = new THREE.Vector3(0,0,0);
		bp.z = ballsize+ground;
		//console.log("in");
		//console.log(ballsize+ground);
		//console.log(bp.z);
	}
	ball.position.set(bp.x,bp.y,bp.z);
	
	var ring = [];
	var heigh = 5-bp.z;
	var hring;
	var hfh;
	var add;
	//console.log(heigh);
	if(bp.z<ballsize){
		
		var r2 = Math.sqrt(ballsize*ballsize-(ballsize-heigh)*(ballsize-heigh));
		//console.log(r2);
		lose3 = ((2*3.14*ballsize*ballsize*heigh)-(r2*r2*3.14*(ballsize-heigh)))/3;
		//console.log(lose3);
		hring = Math.floor(r2)/hexdis;
		//console.log(hring);
		inball = 1;
		
		if(inball===1){objsave.push([vID,ballsize]);}
		
		if(vID>0&&vID<sumhex){
			mesh.geometry.vertices[vID].setZ(-heigh);
			for(var i = 1; i <= hring; i++){
				ring = hex_ring(hex,i);
				hgh = heigh - i*(heigh/r2);
				for(var j = 0; j < i*6; j++){	
					vID = hashHexVertex(ring[j].q,ring[j].r);
					mesh.geometry.vertices[vID].setZ(-hgh);
					if(inball===1){objsave.push([vID,hgh]);}
				}
			}
			ring = hex_ring(hex,hring+1);
			//console.log(hring+1);
			add = lose3/((hring+1)*6);
			//console.log((hring+1)*6);
			for(var j = 0; j < (hring+1)*6; j++){
				vID = hashHexVertex(ring[j].q,ring[j].r);
				//console.log(vID);
				mesh.geometry.vertices[vID].setZ(add);
				//mesh.geometry.vertices[vID].z += add;
			}
		}
	}
}
function obj2col(){
    hex0.visible = true;
    var p = hex_to_pixel(layout, hex);
    hex0.position.set(p.x, p.y, 0);	
	//objsave=[];
	vID = hashHexVertex(hex.q, hex.r);

	var sv= new THREE.Vector3(0,0,0);
	g = new THREE.Vector3(0,0,-9.8);
	if(cp.z>cysize){
		//console.log(vel);
		vel = vel.add(g.multiplyScalar(dt));
		//console.log(vel);
		sv.copy(vel);
		cp = cp.add(sv.multiplyScalar(dt));
	}
	else if(cp.z<cysize && cp.z>cysize+ground){
		vel = vel.multiplyScalar(c);
		sv.copy(vel);
		cp = cp.add(sv.multiplyScalar(dt));		
	}
	else if(cp.z < cysize+ground){
		vel = new THREE.Vector3(0,0,0);
		cp.z = cysize+ground;
		//console.log("in");
		//console.log(cysize+ground);
		//console.log(cp.z);
	}
/*	
	var angle;
	var heigh = cp.z;
	var e1 = cp, e2 = cp, e3 = cp, e4 = cp;
	var addx,addy;
	
	if(cp.z<=cysize){
		angle = heigh*36;
		addx = heigh;
		addy = 1;
		lose2 = cysize*cysize*3.14*angle/360*2;
		//console.log(angle);
		//console.log(lose2);
		//console.log(heigh);
	}
	e1.x+=addx;e1.y+=addy;
	e2.x+=addx;e2.y-=addy;
	e3.x-=addx;e3.y+=addy;
	e4.x-=addx;e4.y-=addy;
	
	for(var i = 0; i < 10; i++){
		
	}
	
	
	
	*/
	//console.log(cysize+ground);
	//cylinder.position.z=cp.z;
	cylinder.position.set(cp.x,cp.y,cp.z);
	//console.log(cylinder.position);
}

function obj1col(hex){
	var save = new THREE.Vector3();
	var ring = [];
	var savei;
    hex0.visible = true;
    var p = hex_to_pixel(layout, hex);
    hex0.position.set(p.x, p.y, 0);	
	//objsave=[];
	vID = hashHexVertex(hex.q, hex.r);
	//console.log(vID);
	if(vID>0&&vID<sumhex){
		if(mesh.geometry.vertices[vID].z>ap.z-cubesize/2){
			incube = 1;
			if(incube===1){objsave.push([vID,cubesize]);}
			//console.log("collision");
			for(var i = 1; i<10; i++){
				mesh.geometry.vertices[vID].setZ(ap.z-cubesize/2);
				if(cubesize/2>hexdis*i){
					ring = hex_ring(hex,i);
					//console.log(i);
					for(var j = 0; j<6*i; j++){
						//console.log(j);
						vID = hashHexVertex(ring[j].q,ring[j].r);
							if(vID>0&&vID<sumhex){
							mesh.geometry.vertices[vID].setZ(ap.z-cubesize/2);
							//console.log(vID);
							//console.log(ap.z-cubesize/2);
							//console.log("-----------------------")
							if(incube===1){objsave.push([vID,cubesize]);}
							savei=i;
						}
					}
				}			
			}	
			
			for(i = 0; i < savei; i++){
				lose = -(ap.z-cubesize/2)*(1+i*6);
				//console.log(lose);
			}
			ring = hex_ring(hex,savei+1);
			for(var j = 0; j<6*(savei+1); j++){
				//console.log(j);
				vID = hashHexVertex(ring[j].q,ring[j].r);
				if(vID>0&&vID<sumhex){
					mesh.geometry.vertices[vID].z += lose/(6*(savei+1));
				}
			}				
			
		}
		else if(mesh.geometry.vertices[vID].z<ap.z-cubesize/2){
			objsave=[];
		}
	}
//console.log("/////////////////");
}

function expdrop(hex){
    var ring = [];
    // display the high lighted hex outline on XY plane
    hex0.visible = true;
    var p = hex_to_pixel(layout, hex);
    hex0.position.set(p.x, p.y, 0);

    // depress/elevate the vertex of the hex
    vID = hashHexVertex(hex.q, hex.r);
	if(vID>0&&vID<sumhex){
		mesh.geometry.vertices[vID].setZ( mesh.geometry.vertices[vID].z + 0.01*Math.exp(-0.5 * 0));
	}
	ring = hex_ring(hex,1);
	for(var i = 0 ;i<6 ;i++){
		vID = hashHexVertex(ring[i].q,ring[i].r);
		if(vID>0&&vID<sumhex){
			mesh.geometry.vertices[vID].setZ( mesh.geometry.vertices[vID].z + 0.01*Math.exp(-0.5 * 2));
		}
	}
	
	ring = hex_ring(hex,2);
	for(var i = 0 ;i<12 ;i++){
		vID = hashHexVertex(ring[i].q,ring[i].r);
		if(vID>0&&vID<sumhex){
			mesh.geometry.vertices[vID].setZ( mesh.geometry.vertices[vID].z + 0.01*Math.exp(-0.5 * 4));
		}
	}
	
	ring = hex_ring(hex,3);
	for(var i = 0 ;i<18 ;i++){
		vID = hashHexVertex(ring[i].q,ring[i].r);
		if(vID>0&&vID<sumhex){
			mesh.geometry.vertices[vID].setZ( mesh.geometry.vertices[vID].z + 0.01*Math.exp(-0.5 * 6));
		}
	}	
}

var lasthex = new THREE.Vector2();;
function draw(hex){
	hex0.visible = true;
    var p = hex_to_pixel(layout, hex);
    hex0.position.set(p.x, p.y, 0);
	
	var counter = 0;
	var ring = [];
	var dot = [];
	var dotsum = 0;
	var lochex;//將提高的位置
	var locl = new THREE.Vector2();//外部向量
//	var ring3 = [];
	var sum=0;
	var nowhex = hex_to_pixel(layout, hex);
	var nl = new THREE.Vector2();
	var dotsave;
	
	nl.x = nowhex.x-lasthex.x;
	nl.y = nowhex.y-lasthex.y;
	nl=nl.normalize();
	
	if(lasthex.x!=1000||lasthex.y!=1000){
		vID = hashHexVertex(hex.q, hex.r);
		if(vID>0&&vID<sumhex){
			sum+=mesh.geometry.vertices[vID].z;
			mesh.geometry.vertices[vID].setZ(0);
		}
		ring = hex_ring(hex,1);
		for(i = 0 ;i<6 ;i++){
			vID = hashHexVertex(ring[i].q,ring[i].r);
			if(vID>0&&vID<sumhex){
				sum+=mesh.geometry.vertices[vID].z;
				mesh.geometry.vertices[vID].setZ(0);
			}
		}
		ring = hex_ring(hex,2);
		for(i = 0 ;i<12 ;i++){
			lochex = hex_to_pixel(layout, ring[i]);
			locl.x = lochex.x-nowhex.x;
			locl.y = lochex.y-nowhex.y;
			locl = locl.normalize();
			dotsave = locl.dot(nl);
			if(dotsave>0){
				dot[counter] = locl.dot(nl);
				counter++;
			}
		}
		for(i = 0; i<dot.length; i++){
			dotsum+=dot[i];
		}
		if(dotsum>0){
			for(i = 0 ;i<12 ;i++){
				lochex = hex_to_pixel(layout, ring[i]);
				locl.x = lochex.x-nowhex.x;
				locl.y = lochex.y-nowhex.y;
				locl = locl.normalize();
				dotsave = locl.dot(nl);
				if(dotsave>0){
					vID = hashHexVertex(ring[i].q, ring[i].r);
					if(vID>0&&vID<sumhex){
						mesh.geometry.vertices[vID].setZ(mesh.geometry.vertices[vID].z + sum*dotsave/dotsum);
					}
				}
			}
		}		
	}
	else{
		vID = hashHexVertex(hex.q, hex.r);
		if(vID>0&&vID<sumhex){
			sum+=mesh.geometry.vertices[vID].z;
			mesh.geometry.vertices[vID].setZ(0);
		}
			
		ring = hex_ring(hex,1);
		for(var i = 0 ;i<6 ;i++){
			vID = hashHexVertex(ring[i].q,ring[i].r);
			if(vID>0&&vID<sumhex){
				sum+=mesh.geometry.vertices[vID].z;
				mesh.geometry.vertices[vID].setZ(0);
			}
		}
		
		ring = hex_ring(hex,2);
		for(i = 0 ;i<12 ;i++){
			vID = hashHexVertex(ring[i].q,ring[i].r);
			if(vID>0&&vID<sumhex){
				mesh.geometry.vertices[vID].setZ( mesh.geometry.vertices[vID].z + sum/12);
			}
		}		
	}
	
	lasthex.x=nowhex.x;
	lasthex.y=nowhex.y;
}

function start(){
	for(var i = 0; i<sumhex; i++){
		mesh.geometry.vertices[i].setZ(1);
	}
}

function balance(){
	var target;
	var ring = [];
	var heighi = [];//較高的位置
	var lower = [];//較矮的位置
	var heigh = [];//相差高度
	var save;
	var counter = 0;
	//var vID;
	var dcol = objsave;//有物體的位置
	var nod = [];//[(有物體=1沒物體=0),高度] 
	
	for(var i = 0; i<sumhex; i++){
			target = pixel_to_hex(layout, Point(mesh.geometry.vertices[i].x, mesh.geometry.vertices[i].y));
			ring = hex_ring(target,1);
		for(var j = 0; j<6; j++){
			vID = hashHexVertex(ring[j].q,ring[j].r);
			if(vID>0&&vID<sumhex){
				nod = [0,0];
				for(var check = 0; check < dcol.length; check++){
					if(vID === dcol[check][0]){
						nod = [1,dcol[check][1]];
					}
				}
				if(mesh.geometry.vertices[i].z-mesh.geometry.vertices[vID].z>1.2){
					//console.log(mesh.geometry.vertices[i].z-mesh.geometry.vertices[vID].z);
					if(nod[0] ===0){
						heighi[counter] = i;
						lower[counter] = vID;
						heigh[counter] = mesh.geometry.vertices[i].z-mesh.geometry.vertices[vID].z;
						counter++;
					}
/*					else if(nod[0] ===1){
						if(mesh.geometry.vertices[i].z-(mesh.geometry.vertices[vID].z+nod[1])>1.2){
							for(var k = 0; k<dcol.length; k++){
								mesh.geometry.vertices[dcol[k][0]].z = dcol[k][1]-0.01;
								//console.log("add");
							}
							
							//incube=1;
							heighi[counter] = i;
							lower[counter] = vID;
							heigh[counter] = mesh.geometry.vertices[i].z-(mesh.geometry.vertices[vID].z+nod[1]);
							counter++;
						}
					}*/
				}
			}
		}
	}
	
	
	//排列高度差，由高到低
	for(i = 0; i<heigh.length; i++){
		for(j = 0; j<heigh.length-1; j++){
			if(heigh[j]>heigh[j+1]){
				save = heigh[j];
				heigh[j]=heigh[j+1];
				heigh[j+1]=save;
				
				save = heighi[j];
				heighi[j]=heighi[j+1];
				heighi[j+1]=save;				
				
				save = lower[j];
				lower[j]=lower[j+1];
				lower[j+1]=save;
			}
		}
	}
	
	for(i = 0; i<heigh.length; i++){
/*		for(check = 0; check<dcol.length; check++){
			if(lower[i]===dcol[check][0]){
				mesh.geometry.vertices[lower[i]].z+=dcol[check][1];
				console.log(dcol[check][1]);
			}
		}*/
		while(mesh.geometry.vertices[heighi[i]].z-mesh.geometry.vertices[lower[i]].z>1.2){
			mesh.geometry.vertices[heighi[i]].z-=0.3;
			mesh.geometry.vertices[lower[i]].z+=0.3;
			heigh-=0.4;
		}
	}
	
	
	
}