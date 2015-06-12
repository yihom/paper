/*����ƹ�����m��ParametricGeometry��SandFunc(u0,v0)��m*/
/*  	 (u)	  										 */
/*	0	�z----�{											 */
/*(v)	|    |											 */
/*		|    |											 */
/*		�|----�}	1										 */
/*mousepos(400*400������)->0~1��u0,v0					 */
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

/*�B�F						*/
/*���������F�b�F�e�@�W		*/
/*10000�Ӧ�m�H��9000�ӱ��� */
var sleep;
function rainsand(){
	var rand;
	var lasttime;
		for(var j = 0; j<300; j++){
			while(sleep-lasttime<0.1){
				sleep=clock.getElapsedTime();
			}
			rand=Math.random()*9999;
			rand=Math.floor(rand);
			if(SandGeometry.vertices[rand].y<=1)
			SandGeometry.vertices[rand].y+=1;
			lasttime=sleep;
		}
}



/*�F�l����					   */
/*�I����m�ΩP��8�Ӧ�m�H������*/
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
		case 0:{SandGeometry.vertices[dropnumber-101].y+=1;
				deformed[0]=dropnumber-101;
				break; 
		}
		case 1:{SandGeometry.vertices[dropnumber-100].y+=1;
				deformed[0]=dropnumber-100;
				break;
		}				
		case 2:{SandGeometry.vertices[dropnumber-99].y+=1;
				deformed[0]=dropnumber-99;
				break;
		}				
		case 3:{SandGeometry.vertices[dropnumber-1].y+=1;
				deformed[0]=dropnumber-1;
				break;
		}
		case 4:{SandGeometry.vertices[dropnumber].y+=1;
				deformed[0]=dropnumber;
				break;
		}
		case 5:{SandGeometry.vertices[dropnumber+1].y+=1;
				deformed[0]=dropnumber+1;
				break;
		}
		case 6:{SandGeometry.vertices[dropnumber+99].y+=1;
				deformed[0]=dropnumber+99;
				break;
		}
		case 7:{SandGeometry.vertices[dropnumber+100].y+=1;
				deformed[0]=dropnumber+100;
				break;
		}
		case 8:{SandGeometry.vertices[dropnumber+101].y+=1;
				deformed[0]=dropnumber+101;
				break;
		}
	}
	balance(deformed);
	
} 

/*�F�l����					    */
/*�I����m����					*/
function pointdrop(u,v){//sand drop
	u=u*100;
	v=v*100;
	u=Math.floor(u);
	v=Math.floor(v);
	dropnumber=100*v+u;
	SandGeometry.vertices[dropnumber].y+=1;
	
	/*����*/
	deformed[0]=dropnumber;
//	console.log(deformed[0]);
	balance(deformed);
}

/*�ƹ��I��+�P��8�Ӧ�m�U��*/
/*8��m���P�򥭧��W��	  */
var mouserand;
var mousenumber;
function handdeform(u,v){//hand move
	var MDeform=[];
	u=u*100;
	v=v*100;
	u=Math.floor(u);
	v=Math.floor(v); 
	mousenumber=100*v+u;
 
	//hand Average
	if(SandGeometry.vertices[mousenumber].y>0){
		SandGeometry.vertices[mousenumber].y-=2;
		SandGeometry.vertices[mousenumber+1].y-=1;
		SandGeometry.vertices[mousenumber+99].y-=1;
		SandGeometry.vertices[mousenumber+100].y-=1;
		SandGeometry.vertices[mousenumber+101].y-=1;
		SandGeometry.vertices[mousenumber-1].y-=1;
		SandGeometry.vertices[mousenumber-99].y-=1;
		SandGeometry.vertices[mousenumber-100].y-=1;
		SandGeometry.vertices[mousenumber-101].y-=1;
		SandGeometry.vertices[mousenumber+2].y+=0.625;
		SandGeometry.vertices[mousenumber+98].y+=0.625;
		SandGeometry.vertices[mousenumber+198].y+=0.625;
		SandGeometry.vertices[mousenumber+199].y+=0.625;
		SandGeometry.vertices[mousenumber+200].y+=0.625;
		SandGeometry.vertices[mousenumber+201].y+=0.625;
		SandGeometry.vertices[mousenumber+202].y+=0.625;
		SandGeometry.vertices[mousenumber+102].y+=0.625;
		SandGeometry.vertices[mousenumber-2].y+=0.625;
		SandGeometry.vertices[mousenumber-98].y+=0.625;
		SandGeometry.vertices[mousenumber-198].y+=0.625;
		SandGeometry.vertices[mousenumber-199].y+=0.625;
		SandGeometry.vertices[mousenumber-200].y+=0.625;
		SandGeometry.vertices[mousenumber-201].y+=0.625;
		SandGeometry.vertices[mousenumber-202].y+=0.625;
		SandGeometry.vertices[mousenumber-102].y+=0.625;
	}
	console.log(SandGeometry.vertices[mousenumber+198].y);
	MDeform[0]=mousenumber;
	MDeform[1]=mousenumber+1;
	MDeform[2]=mousenumber+99;
	MDeform[3]=mousenumber+100;
	MDeform[4]=mousenumber+101;
	MDeform[5]=mousenumber-1;
	MDeform[6]=mousenumber-99;
	MDeform[7]=mousenumber-100;
	MDeform[8]=mousenumber-101;
	MDeform[9]=mousenumber+2;
	MDeform[10]=mousenumber+98;
	MDeform[11]=mousenumber+198;
	MDeform[12]=mousenumber+199;
	MDeform[13]=mousenumber+200;
	MDeform[14]=mousenumber+201;
	MDeform[15]=mousenumber+202;
	MDeform[16]=mousenumber+102;
	MDeform[17]=mousenumber-2;
	MDeform[18]=mousenumber-98;
	MDeform[19]=mousenumber-198;
	MDeform[20]=mousenumber-199;	
	MDeform[21]=mousenumber-200;
	MDeform[22]=mousenumber-201;
	MDeform[23]=mousenumber-202;
	MDeform[24]=mousenumber-102;
	balance(MDeform);
}


/*�ƹ��I����m���I�U��*/
/*�P��8�Ӧ�m�����W�� */
var lastdeform;
function pointdeform(u,v){
	var MDeform=[];
	u=u*100;
	v=v*100;
	u=Math.floor(u);
	v=Math.floor(v); 
	mousenumber=100*v+u;
  //Average  1 point
	var wa=mousenumber-lastdeform;
	console.log(wa);
	var reduce;
	reduce=SandGeometry.vertices[mousenumber].y;
	if(SandGeometry.vertices[mousenumber].y>0){
		SandGeometry.vertices[mousenumber].y=0;
		if(mousenumber+1!=lastdeform)
			SandGeometry.vertices[mousenumber+1].y+=reduce/7;
		if(mousenumber+99!=lastdeform)
			SandGeometry.vertices[mousenumber+99].y+=reduce/7;
		if(mousenumber+100!=lastdeform)
			SandGeometry.vertices[mousenumber+100].y+=reduce/7;
		if(mousenumber+101!=lastdeform)
			SandGeometry.vertices[mousenumber+101].y+=reduce/7;
		if(mousenumber-1!=lastdeform)
			SandGeometry.vertices[mousenumber-1].y+=reduce/7;
		if(mousenumber-99!=lastdeform)
			SandGeometry.vertices[mousenumber-99].y+=reduce/7;
		if(mousenumber-100!=lastdeform)
			SandGeometry.vertices[mousenumber-100].y+=reduce/7;
		if(mousenumber-100!=lastdeform)
			SandGeometry.vertices[mousenumber-101].y+=reduce/7;
	}
	MDeform[0]=mousenumber;
	MDeform[1]=mousenumber+1;
	MDeform[2]=mousenumber+99;
	MDeform[3]=mousenumber+100;
	MDeform[4]=mousenumber+101;
	MDeform[5]=mousenumber-1;
	MDeform[6]=mousenumber-99;
	MDeform[7]=mousenumber-100;
	MDeform[8]=mousenumber-101;
	
	lastdeform=mousenumber;
	balance(MDeform);
}

/*�������		*/
/*2*3���I�U��	*/
/**/
function PollexDeform(u,v){
	var MDeform=[];
	u=u*100;
	v=v*100;
	u=Math.floor(u);
	v=Math.floor(v); 
	mousenumber=100*v+u;
	var reduce=0;
	
	reduce+=SandGeometry.vertices[mousenumber].y;
	reduce+=SandGeometry.vertices[mousenumber+1].y;
	reduce+=SandGeometry.vertices[mousenumber+100].y;
	reduce+=SandGeometry.vertices[mousenumber+101].y;
	reduce+=SandGeometry.vertices[mousenumber-99].y;
	reduce+=SandGeometry.vertices[mousenumber-100].y;

if(SandGeometry.vertices[mousenumber].y>0){
	SandGeometry.vertices[mousenumber].y=0;
	SandGeometry.vertices[mousenumber+1].y=0;	
	SandGeometry.vertices[mousenumber+100].y=0;	
	SandGeometry.vertices[mousenumber+101].y=0;	
	SandGeometry.vertices[mousenumber-99].y=0;	
	SandGeometry.vertices[mousenumber-100].y=0;
	
	if(mousenumber+2!=lastdeform)
		SandGeometry.vertices[mousenumber+2].y+=reduce/8;
	if(mousenumber+102!=lastdeform)
		SandGeometry.vertices[mousenumber+102].y+=reduce/8;
	if(mousenumber+202!=lastdeform)
		SandGeometry.vertices[mousenumber+202].y+=reduce/8;
	if(mousenumber+201!=lastdeform)
		SandGeometry.vertices[mousenumber+201].y+=reduce/8;
	if(mousenumber+200!=lastdeform)
		SandGeometry.vertices[mousenumber+200].y+=reduce/8;
	if(mousenumber-98!=lastdeform)
		SandGeometry.vertices[mousenumber-98].y+=reduce/8;
	if(mousenumber-198!=lastdeform)
		SandGeometry.vertices[mousenumber-198].y+=reduce/8;
	if(mousenumber-199!=lastdeform)
		SandGeometry.vertices[mousenumber-199].y+=reduce/8;
	if(mousenumber-200!=lastdeform)
		SandGeometry.vertices[mousenumber-200].y+=reduce/8;
}
	MDeform[0]=mousenumber;
	MDeform[1]=mousenumber+2;
	MDeform[2]=mousenumber+102;
	MDeform[3]=mousenumber+202;
	MDeform[4]=mousenumber+201;
	MDeform[5]=mousenumber+200;
	MDeform[6]=mousenumber-98;
	MDeform[7]=mousenumber-198;
	MDeform[8]=mousenumber-199;
	MDeform[9]=mousenumber-200;
	
	lastdeform=mousenumber;
	
	balance(MDeform);
}

function ClearHandDeform(u,v){
	var MDeform=[];
	u=u*100;
	v=v*100;
	u=Math.floor(u);
	v=Math.floor(v); 
	mousenumber=100*v+u;
	var reduce=0;

	reduce+=SandGeometry.vertices[mousenumber].y;
	reduce+=SandGeometry.vertices[mousenumber+1].y;
	reduce+=SandGeometry.vertices[mousenumber+100].y;
	reduce+=SandGeometry.vertices[mousenumber+101].y;
	reduce+=SandGeometry.vertices[mousenumber+200].y;
	reduce+=SandGeometry.vertices[mousenumber+201].y;
	reduce+=SandGeometry.vertices[mousenumber+300].y;
	reduce+=SandGeometry.vertices[mousenumber+301].y;
	reduce+=SandGeometry.vertices[mousenumber+400].y;
	reduce+=SandGeometry.vertices[mousenumber+401].y;
	reduce+=SandGeometry.vertices[mousenumber-99].y;
	reduce+=SandGeometry.vertices[mousenumber-100].y;
	reduce+=SandGeometry.vertices[mousenumber-199].y;
	reduce+=SandGeometry.vertices[mousenumber-200].y;
	reduce+=SandGeometry.vertices[mousenumber-299].y;
	reduce+=SandGeometry.vertices[mousenumber-300].y;
	reduce+=SandGeometry.vertices[mousenumber-399].y;
	reduce+=SandGeometry.vertices[mousenumber-400].y;
	
	if(SandGeometry.vertices[mousenumber].y>0){	
	SandGeometry.vertices[mousenumber].y=0;
	SandGeometry.vertices[mousenumber+1].y=0;
	SandGeometry.vertices[mousenumber+100].y=0;
	SandGeometry.vertices[mousenumber+101].y=0;
	SandGeometry.vertices[mousenumber+200].y=0;
	SandGeometry.vertices[mousenumber+201].y=0;
	SandGeometry.vertices[mousenumber+300].y=0;
	SandGeometry.vertices[mousenumber+301].y=0;
	SandGeometry.vertices[mousenumber+400].y=0;
	SandGeometry.vertices[mousenumber+401].y=0;
	SandGeometry.vertices[mousenumber-99].y=0;
	SandGeometry.vertices[mousenumber-100].y=0;
	SandGeometry.vertices[mousenumber-199].y=0;
	SandGeometry.vertices[mousenumber-200].y=0;
	SandGeometry.vertices[mousenumber-299].y=0;
	SandGeometry.vertices[mousenumber-300].y=0;
	SandGeometry.vertices[mousenumber-399].y=0;
	SandGeometry.vertices[mousenumber-400].y=0;
	
	if(mousenumber+2!=lastdeform)
		SandGeometry.vertices[mousenumber+2].y+=reduce/14;
	if(mousenumber+102!=lastdeform)
		SandGeometry.vertices[mousenumber+102].y+=reduce/14;
	if(mousenumber+202!=lastdeform)
		SandGeometry.vertices[mousenumber+202].y+=reduce/14;
	if(mousenumber+302!=lastdeform)
		SandGeometry.vertices[mousenumber+302].y+=reduce/14;
	if(mousenumber+402!=lastdeform)
		SandGeometry.vertices[mousenumber+402].y+=reduce/14;
	if(mousenumber+502!=lastdeform)
		SandGeometry.vertices[mousenumber+502].y+=reduce/14;
	if(mousenumber+501!=lastdeform)
		SandGeometry.vertices[mousenumber+501].y+=reduce/14;
	if(mousenumber+500!=lastdeform)
		SandGeometry.vertices[mousenumber+500].y+=reduce/14;
	if(mousenumber-98!=lastdeform)
		SandGeometry.vertices[mousenumber-98].y+=reduce/14;
	if(mousenumber-198!=lastdeform)
		SandGeometry.vertices[mousenumber-198].y+=reduce/14;
	if(mousenumber-298!=lastdeform)
		SandGeometry.vertices[mousenumber-298].y+=reduce/14;
	if(mousenumber-398!=lastdeform)
		SandGeometry.vertices[mousenumber-398].y+=reduce/14;
	if(mousenumber-498!=lastdeform)
		SandGeometry.vertices[mousenumber-498].y+=reduce/14;
	if(mousenumber-499!=lastdeform)
		SandGeometry.vertices[mousenumber-499].y+=reduce/14;
	if(mousenumber-500!=lastdeform)
		SandGeometry.vertices[mousenumber-500].y+=reduce/14;
	
	}	
	MDeform[0]=mousenumber;
	MDeform[1]=mousenumber+2;
	MDeform[2]=mousenumber+102;
	MDeform[3]=mousenumber+202;
	MDeform[4]=mousenumber+302;
	MDeform[5]=mousenumber+402;
	MDeform[6]=mousenumber+502;
	MDeform[7]=mousenumber+501;
	MDeform[8]=mousenumber+500;
	MDeform[9]=mousenumber-98;
	MDeform[10]=mousenumber-198;
	MDeform[11]=mousenumber-298;
	MDeform[12]=mousenumber-398;
	MDeform[13]=mousenumber-498;
	MDeform[14]=mousenumber-499;
	MDeform[15]=mousenumber-500;
	
	lastdeform=mousenumber;
	
	balance(MDeform);	
}

/*�ƹ��I����m���I�U��*/
/*�P��8�Ӧ�m�H���W�� */
function randpointdeform(u,v){
	var MDeform=[];
	u=u*100;
	v=v*100;
	u=Math.floor(u);
	v=Math.floor(v); 
	mousenumber=100*v+u;
	mouserand=Math.random()*9;
	mouserand=Math.floor(mouserand);
	
	//random  1 point
	if(SandGeometry.vertices[mousenumber].y>0){
		SandGeometry.vertices[mousenumber].y-=1;
		MDeform[0]=mousenumber;
	switch(mouserand) {
		case 0:{SandGeometry.vertices[mousenumber-101].y+=1;
				MDeform[1]=mousenumber-101;
				break; 
		}
		case 1:{SandGeometry.vertices[mousenumber-100].y+=1;
				MDeform[1]=mousenumber-100;
				break;
		}				
		case 2:{SandGeometry.vertices[mousenumber-99].y+=1;
				MDeform[1]=mousenumber-99;
				break;
		}				
		case 3:{SandGeometry.vertices[mousenumber-1].y+=1;
				MDeform[1]=mousenumber-1;
				break;
		}
		case 4:{SandGeometry.vertices[mousenumber].y+=1;
				MDeform[1]=mousenumber;
				break;
		}
		case 5:{SandGeometry.vertices[mousenumber+1].y+=1;
				MDeform[1]=mousenumber+1;
				break;
		}
		case 6:{SandGeometry.vertices[mousenumber+99].y+=1;
				MDeform[1]=mousenumber+99;
				break;
		}
		case 7:{SandGeometry.vertices[mousenumber+100].y+=1;
				MDeform[1]=mousenumber+100;
				break;
		}
		case 8:{SandGeometry.vertices[mousenumber+101].y+=1;
				MDeform[1]=mousenumber+101;
				break;
		}
	}
	}
	balance(MDeform);
}


/*�F�l����							*/
/*���׮t3�H�W�N����������P��8�Ӧ�m*/
/*���׮t�V���u���B�z				*/
/*���׮t�V�j���V��??				*/
function balance(deform){
	var heigherpoint=[];
	var i=0,j=0,p=0;
	var heighpos=[];
	var heighvalue=[];
	var save;
	var number=0;
	var rand;
	var newdeform=[];
	/*�����}�C*/
	while(deform[i]!=undefined)
	{
		heigherpoint[i]=deform[i];
		i++;
	}
	/*�x�s�t�Ȥj�p*/
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
		
	/*�ƦC�t�Ȥj�p*/
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

	/*��number�Ӱ��׮t>3*/
	for(i=0;i<8;i++)
	{
		if(heighvalue[i]>3)
		{
			number++;
		}
	}
//	console.log(number);
	/*�N1�������t��number�Ӧ�m��<=3����*/
	
	if(heighvalue[0]>3){ 
		SandGeometry.vertices[heigherpoint[p]].y--;
//		console.log("1:"+heigherpoint[p]);
		for(i=0;i<number;i++)
		{
			if(heighpos[i]-heigherpoint[p]==99||heighpos[i]-heigherpoint[p]==101||heighpos[i]-heigherpoint[p]==-99||heighpos[i]-heigherpoint[p]==-101)
			SandGeometry.vertices[heighpos[i]].y=SandGeometry.vertices[heighpos[i]].y+1/(number+number/2);
			else
			SandGeometry.vertices[heighpos[i]].y=SandGeometry.vertices[heighpos[i]].y+2/(number+number/2);
//			debugger;
//			console.log("2:"+heighpos[i]);
//			console.log("2:"+SandGeometry.vertices[heighpos[i]].y);
			heighvalue[i]=heighvalue[i]+(1/number);
			newdeform[i]=heighpos[i];
			
		}
	}
		balance(newdeform);
		p++;
	}
	

	console.log("-------------");
	
}





