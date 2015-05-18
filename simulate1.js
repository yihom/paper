/*換算滑鼠的位置為ParametricGeometry的SandFunc(u0,v0)位置*/
/*  	 (u)	  										 */
/*	0	┌----┐											 */
/*(v)	|    |											 */
/*		|    |											 */
/*		└----┘	1										 */
/*mousepos(400*400的平面)->0~1的u0,v0					 */
var ru,rv;
function reuv(){//pick return u0,v0
	var x,z;
	x=mousepos.x;
	z=mousepos.z;
	if(mousepos.x<=0){
		x=-1*x/400;
		ru=0.5-x;
	}
	else{
		 x=x/400;
		 ru=0.5+x;
	}
//	console.log("u0:"+ru);	
	if(mousepos.z<=0){
		z=-1*z/400;
		rv=0.5-z;		
	}
	else{
		z=z/400;
		rv=0.5+z;	
	}
//	console.log("v0:"+rv);
}


/*沙子掉落					   */
/*點擊位置及周圍8個位置隨機掉落*/
var dropnumber;
var droprand;
var deformed = [];
function randdrop(u,v){//sand drop
	u=u*100;
	v=v*100;
	u=Math.floor(u);
	v=Math.floor(v);
	
	/////rand drop 9 points/////
	dropnumber=100*v+u;
	droprand=Math.random()*9;
	droprand=Math.floor(droprand);
//	console.log(rand);

	switch(droprand) {
		case 0:SandGeometry.vertices[dropnumber-101].y+=1;
				break; 
		case 1:SandGeometry.vertices[dropnumber-100].y+=1;
				break; 
		case 2:SandGeometry.vertices[dropnumber-99].y+=1;
				break; 
		case 3:SandGeometry.vertices[dropnumber-1].y+=1;
				break;
		case 4:SandGeometry.vertices[dropnumber].y+=1;
				break;
		case 5:SandGeometry.vertices[dropnumber+1].y+=1;
				break;
		case 6:SandGeometry.vertices[dropnumber+99].y+=1;
				break;
		case 7:SandGeometry.vertices[dropnumber+100].y+=1;
				break;
		case 8:SandGeometry.vertices[dropnumber+101].y+=1;
				break;
	}
	
} 

/*沙子掉落					    */
/*點擊位置掉落					*/
function pointdrop(u,v){//sand drop
	u=u*100;
	v=v*100;
	u=Math.floor(u);
	v=Math.floor(v);
	dropnumber=100*v+u;
	SandGeometry.vertices[dropnumber].y+=3;
	
	/*平衡*/
	deformed[0]=dropnumber;
//	console.log(deformed[0]);
//	balance(deformed);
}

/*沙子平衡							*/
/*高度差3以上就平均掉落到周圍8個位置*/
/*高度差越高優先處理				*/
/*高度差越大掉越遠??				*/
function balance(deform = []){
	var heigherpoint=[];
	var i=0,j=0,p=0;
	var heighpos=[];
	var heighvalue=[];
	var save;
	var number=0;
	var rand;
	/*接收陣列*/
	while(deform[i]!=undefined)
	{
		heigherpoint[i]=deform[i];
		i++;
	}
	/*儲存差值大小*/
	while(heigherpoint[p]!=undefined)
	{
		heighpos[j]=heigherpoint[p]+1;
		heighvalue[j]=SandGeometry.vertices[heigherpoint[p]].y-SandGeometry.vertices[heigherpoint[p]+1].y;
		j++;
		heighpos[j]=heigherpoint[p]+99;
		heighvalue[j]=SandGeometry.vertices[heigherpoint[p]].y-SandGeometry.vertices[heigherpoint[p]+99].y;
		j++;	
		heighpos[j]=heigherpoint[p]+100;
		heighvalue[j]=SandGeometry.vertices[heigherpoint[p]].y-SandGeometry.vertices[heigherpoint[p]+100].y;
		j++;
		heighpos[j]=heigherpoint[p]+101;
		heighvalue[j]=SandGeometry.vertices[heigherpoint[p]].y-SandGeometry.vertices[heigherpoint[p]+101].y;
		j++;
		heighpos[j]=heigherpoint[p]-1;
		heighvalue[j]=SandGeometry.vertices[heigherpoint[p]].y-SandGeometry.vertices[heigherpoint[p]-1].y;
		j++;
		heighpos[j]=heigherpoint[p]-99;
		heighvalue[j]=SandGeometry.vertices[heigherpoint[p]].y-SandGeometry.vertices[heigherpoint[p]-99].y;
		j++;
		heighpos[j]=heigherpoint[p]-100;
		heighvalue[j]=SandGeometry.vertices[heigherpoint[p]].y-SandGeometry.vertices[heigherpoint[p]-100].y;
		j++;
		heighpos[j]=heigherpoint[p]-101;
		heighvalue[j]=SandGeometry.vertices[heigherpoint[p]].y-SandGeometry.vertices[heigherpoint[p]-101].y;
		j++;
		
/*		for(i=0;i<8;i++){
			console.log(heighpos[i]);
			console.log(heighvalue[i]);
		}*/	
//		p++;
	/*排列差值大小*/
	for(i=0;i<8;i++)
		for(j=0;j<7;j++)
		{
			if(heighvalue[j]<heighvalue[j+1])
			{
				save=heighvalue[j];
				heighvalue[j]=heighvalue[j+1];
				heighvalue[j+1]=save;
				
				save=heighpos[j];
				heighpos[j]=heighpos[j+1];
				heighpos[j+1]=save;
			}
		}

	/*有number個高度差>3*/
	for(i=0;i<8;i++)
	{
		if(heighvalue[i]>3)
		{
			number++;
		}
	}
//	console.log(number);
	/*將1平均分配到number個位置到<=3為止*/
	
	if(heighvalue[0]>3){
		SandGeometry.vertices[heigherpoint[p]].y--;
		console.log("1:"+heigherpoint[p]);
		for(i=0;i<number;i++)
		{
			SandGeometry.vertices[heighpos[i]].y+(1/number);
			console.log("2:"+heighpos[i]);
			console.log("2:"+SandGeometry.vertices[heighpos[i]].y);
			heighvalue[i]=heighvalue[i]+(1/number);
		}
	}
		
		
		break; 
	}


	console.log("-------------");
	
}





