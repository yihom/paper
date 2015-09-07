function expdrop(hex){
    var ring = [];
    // display the high lighted hex outline on XY plane
    hex0.visible = true;
    var p = hex_to_pixel(layout, hex);
    hex0.position.set(p.x, p.y, 0);

    // depress/elevate the vertex of the hex
    vID = hashHexVertex(hex.q, hex.r);
    mesh.geometry.vertices[vID].setZ( mesh.geometry.vertices[vID].z + 0.01*Math.exp(-0.5 * 0));
	
	ring = hex_ring(hex,1);
	for(var i = 0 ;i<6 ;i++){
		vID = hashHexVertex(ring[i].q,ring[i].r);
		mesh.geometry.vertices[vID].setZ( mesh.geometry.vertices[vID].z + 0.01*Math.exp(-0.5 * 2));
	}
	
	ring = hex_ring(hex,2);
	for(var i = 0 ;i<12 ;i++){
		vID = hashHexVertex(ring[i].q,ring[i].r);
		mesh.geometry.vertices[vID].setZ( mesh.geometry.vertices[vID].z + 0.01*Math.exp(-0.5 * 4));
	}
	
	ring = hex_ring(hex,3);
	for(var i = 0 ;i<18 ;i++){
		vID = hashHexVertex(ring[i].q,ring[i].r);
		mesh.geometry.vertices[vID].setZ( mesh.geometry.vertices[vID].z + 0.01*Math.exp(-0.5 * 6));
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
		sum+=mesh.geometry.vertices[vID].z;
		mesh.geometry.vertices[vID].setZ(0);
			
		ring = hex_ring(hex,1);
		for(i = 0 ;i<6 ;i++){
			vID = hashHexVertex(ring[i].q,ring[i].r);
			sum+=mesh.geometry.vertices[vID].z;
			mesh.geometry.vertices[vID].setZ(0);
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
					mesh.geometry.vertices[vID].setZ(mesh.geometry.vertices[vID].z + sum*dotsave/dotsum);
				}
			}
		}		
	}
	else{
		vID = hashHexVertex(hex.q, hex.r);
		sum+=mesh.geometry.vertices[vID].z;
		mesh.geometry.vertices[vID].setZ(0);
			
		ring = hex_ring(hex,1);
		for(var i = 0 ;i<6 ;i++){
			vID = hashHexVertex(ring[i].q,ring[i].r);
			sum+=mesh.geometry.vertices[vID].z;
			mesh.geometry.vertices[vID].setZ(0);
		}
		
		ring = hex_ring(hex,2);
		for(i = 0 ;i<12 ;i++){
			vID = hashHexVertex(ring[i].q,ring[i].r);
			mesh.geometry.vertices[vID].setZ( mesh.geometry.vertices[vID].z + sum/12);
		}		
	}
	
	lasthex.x=nowhex.x;
	lasthex.y=nowhex.y;
}

function start(){
	for(var i = 0; i<961; i++){
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
	for(var i = 0; i<961; i++){
			target = pixel_to_hex(layout, Point(mesh.geometry.vertices[i].x, mesh.geometry.vertices[i].y));
			ring = hex_ring(target,1);
		for(var j = 0; j<6; j++){
			vID = hashHexVertex(ring[j].q,ring[j].r);
			if(vID>0&&vID<961){
				if(mesh.geometry.vertices[i].z-mesh.geometry.vertices[vID].z>1.2){
					//console.log(mesh.geometry.vertices[i].z-mesh.geometry.vertices[vID].z);
					heighi[counter] = i;
					lower[counter] = vID;
					heigh[counter] = mesh.geometry.vertices[i].z-mesh.geometry.vertices[vID].z;
					counter++;
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
		while(mesh.geometry.vertices[heighi[i]].z-mesh.geometry.vertices[lower[i]].z>1.2){
			mesh.geometry.vertices[heighi[i]].z-=0.3;
			mesh.geometry.vertices[lower[i]].z+=0.3;
			heigh-=0.4;
		}
	}
	
	
	
}