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
            SandGeometry.vertices[i].y += 3 * Math.exp(0.01 * dist);
        }
    }
	
    SandGeometry.computeFaceNormals();
    SandGeometry.computeVertexNormals();
    SandGeometry.normalsNeedUpdate = true;
    SandGeometry.verticesNeedUpdate = true;
	
}

var poise = [];
var counter=0;
var hnumber=0;
function balance(){
	poise=SandGeometry.vertices;
	var heigher=[];
	var i,j;
	
	for(i = 0; i<poise.length; i++){
	console.log(poise.length);
		if(poise[i-41]!="undefined")
		if(poise[i].y - poise[i-41].y >=3){
			heigher[counter]=1;
			}else {
				heigher[counter]=0;
			}
		counter++;
		if(poise[i-40]!="undefined")
		if(poise[i].y - poise[i-40].y >=3){
			heigher[counter]=1;
			
			}else {
				heigher[counter]=0;
			}
		counter++;
		if(poise[i-39]!="undefined")
		if(poise[i].y - poise[i-39].y >=3){
			heigher[counter]=1;
			
			}else {
				heigher[counter]=0;
			}
		counter++;
		if(poise[i-1]!="undefined")
		if(poise[i].y - poise[i-1].y >=3){
			heigher[counter]=1;
			
			}else {
				heigher[counter]=0;
			}
		counter++;
		if(poise[i+1]!="undefined")
		if(poise[i].y - poise[i+1].y >=3){
			heigher[counter]=1;
			
			}else {
				heigher[counter]=0;
			}
		counter++;
		if(poise[i+39]!="undefined")
		if(poise[i].y - poise[i+39].y >=3){
			heigher[counter]=1;
			
			}else {
				heigher[counter]=0;
			}
		counter++;		
		if(poise[i+40]!="undefined")
		if(poise[i].y - poise[i+40].y >=3){
			heigher[counter]=1;
			
			}else {
				heigher[counter]=0;
			}
		counter++;
		if(poise[i+41]!="undefined")
		if(poise[i].y - poise[i+41].y >=3){
			heigher[counter]=1;
			
			}else {
				heigher[counter]=0;
			}
			
			
		counter=0;

		
		
		
		for(j = 0; j<9; j++){
			if(heigher[j]==1){
				hnumber++;
			}
		}
		console.log(hnumber);
/*		
		if(hnumber>0){
			poise[i].y--;
			for(j = 0; j<nine.length; j++){
				if(heigher[j]==1){
					poise[i+nine[j]].y+0.1;
				}
			}
		}
		counter=0;

	}
	for(i = 0; i<poise.length; i++){
		if(SandGeometry.vertices[i].y!=poise[i].y){
			SandGeometry.vertices[i].y=poise[i].y;
			console.log(SandGeometry.vertices[i].y);
			SandGeometry.verticesNeedUpdate = true;	
		}
	}

		SandGeometry.computeFaceNormals();
		SandGeometry.computeVertexNormals();
		SandGeometry.normalsNeedUpdate = true;
*/
}
}