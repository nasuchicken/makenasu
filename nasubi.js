﻿
		var n;
		var img, backimg;
		var canvas, ctx, canvas2, ctx2;
		var cv = ["to water","to beer","to wine","to juice","to liquid?","talk","praise","get angry","talking about ambition","complain","hit!","Dekopin","polish","scorch","left"];
		var ch = [5,3,3,3,10,0,-2,-1,0,-1,-3,-2,-2,-3,0];
		var cs = [0,3,-5,-3,3,-2,-4,3,5,0,5,2,-5,5,0];
		var cp = [0,2,0,1,-1,0,0,5,2,0,2,1,0,3,0];
		var ci = [0,0,2,3,-1,3,0,-2,1,2,0,1,0,-3,0];
		var cl = [0,4,2,2,2,-1,6,3,-2,2,-2,-1,0,1,1];
		var cmess = ["Watering plants","Made to drink beer","Toast with wine","Drink the juice was","Poured into?","The chat","The compliment","Scattered shout","Said the ambition","Continued to complain","Hit","Was flicking","Polished","A savory scent was","left..."];
		
		var skset = [];
		skset[0] = [0,5,6,14];
		skset[1] = [0,1,2,3];
		skset[2] = [0,6,7,14];
		skset[3] = [0,4,6,9];
		skset[4] = [6,7,4,14];
		skset[5] = [0,8,10,11];
		skset[6] = [12,13,14,5];
		skset[7] = [10,11,12,13];
		skset[8] = [1,2,3,4];
		skset[9] = [0,4,5,14];
			
		onload = function() {
			start();
		};
		
		function start() {
			n = new nasu(0, 5, 10, 15, 20, 25, 0, 99, 99);
			
			canvas = document.getElementById('s');
			if ( ! canvas || ! canvas.getContext ) { return false; }
			ctx = canvas.getContext('2d');
			
			canvas2 = document.getElementById('s2');
			if ( ! canvas2 || ! canvas2.getContext ) { return false; }
			ctx2 = canvas2.getContext('2d');
			ctx2.clearRect(0,0,64,64);

		  /* create image object */			
			img = new Image();
			img.src = "toukapad.gif?" + new Date().getTime();
			backimg = new Image();
			backimg.src = "back.gif";


			// command init
			backimg.onload = function() {
				document.getElementById('main').style.display = "block";
				document.getElementById('clear').style.display = "none";
				draw();
				setcom();
			}
		};
		
		var nasu = function(day, hp, sex, pow, inte, lack, lev, eye, mouth) {
			this.day = day;
			this.hp = hp;
			this.sex = sex;
			this.pow = pow;
			this.inte = inte;
			this.lack = lack;
			this.lev = lev
			this.eye = eye;
			this.mouth = mouth;
			
			this.command = function(hc, sc, pc, ic, lc){
				this.day += 1;
				
				this.hp += hc;
				this.sex += sc;
				this.pow += pc;
				this.inte += ic;
				this.lack += lc;
				
				if( this.day > 2 & this.day <= 5)
					this.lev = 1;
				if( this.day > 5 & this.day <= 9)
					this.lev = 2;
				if( this.day > 9 & this.day <= 11)
					this.lev = 3;
				if( this.day > 11 & this.day <= 13)
					this.lev = 4;
				if( this.day > 13 & this.day <= 15)
					this.lev = 5;				
				if( this.day > 15 & this.day <= 18)
					this.lev = 6;
				if( this.day > 18 )
					this.lev = 7;
				if( this.day > 21 ){
					this.lev = 8;
					if( this.eye == 99){
						if(this.sex < -5) this.eye = 1;
						if(this.sex < -20) this.eye = 0;
						if(this.sex > 10) this.eye = 3;
						if(this.sex > 20) this.eye = 4;
						if(this.sex >= -5 & this.sex <= 10 ) this.eye = 2;
					}
				}
				if( this.day > 24 ){
					this.lev = 9;
					if( this.mouth == 99 ){
						var m;
						m = Math.max( this.hp, this.sex, this.pow, this.inte, this.lack * 0.7 );
						if( m == this.hp ) this.mouth = 2;
						if( m == this.sex ) this.mouth = 1;
						if( m == this.pow ) this.mouth = 4;
						if( m == this.inte ) this.mouth = 0;
						if( this.mouth == 99 ) this.mouth = 3;
					}
				}
				if( this.day > 28 ) {
					var y = 100;
					y = Math.floor(this.hp *1.2 + this.pow +Math.abs(this.sex) * 1.3 +  this.inte + this.lack);
					document.getElementById('main').style.display = "none";
					var result = "Sold for " + y + " yen are shipped the next day.";
					var tweetLink = '<a href="https://twitter.com/intent/tweet?text='+ encodeURIComponent(result) + '&hashtags=nasubicchi">tweet</a>';
					document.getElementById('res').innerHTML =  "sold for " + y + " yen <br>are shipped the next day." +  '<br>' + tweetLink;
					drawres();
					document.getElementById('restert').innerHTML ='<input type="button" class="button" value="again" onclick="location.reload();">'
					document.getElementById('clear').style.display = "block";
				}
				if( this.hp <0 | this.hp > 50){
					document.getElementById('main').style.display = "none";
					var result = "Has withered.";
					var tweetLink = '<a href="https://twitter.com/intent/tweet?text='+ encodeURIComponent(result) + '&hashtags=nasubicchi">tweet</a>';
					document.getElementById('res').innerHTML = result +  '<br>' + tweetLink;
					document.getElementById('restert').innerHTML ='<input type="button" class="button" value="agein" onclick="location.reload();">'
					document.getElementById('clear').style.display = "block";
				}
				
				draw();
				setcom();

			};
		};
		

		
		function draw() {
		  /* draw image */
			ctx.drawImage(backimg, 0, 0);
			if( n.lev == 1)
				ctx.drawImage(img, 64 * 3, 0,  64, 64, 128, 64, 64, 64);
			if( n.lev == 2)
				ctx.drawImage(img, 0, 0,  64, 64, 128, 64, 64, 64);
			if( n.lev == 3)
				ctx.drawImage(img, 64 * 1, 0,  64, 64, 128, 64, 64, 64);
			if( n.lev == 4){
				ctx.drawImage(img, 64 * 2, 0,  64, 64, 128, 64, 64, 64);
				ctx.drawImage(img, 64 * 3, 0,  64, 64, 128, 0, 64, 64);
			}
			if( n.lev == 5){
				ctx.drawImage(img, 64 * 2, 0,  64, 64, 128, 64, 64, 64);
				ctx.drawImage(img, 64 * 5, 0,  64, 64, 128, 0, 64, 64);
			}
			if(n.lev ==6){
				ctx.drawImage(img, 64 * 2, 0,  64, 64, 128, 64, 64, 64);
				ctx.drawImage(img, 64 * 6, 0,  64, 64, 128, 0, 64, 64);
				ctx.drawImage(img, 64 * 7, 0,  64, 64, 64, 0, 64, 64);
				ctx.drawImage(img, 64 * 8, 0,  64, 64, 64, 64, 64, 64);
			}
			if(n.lev >=7 ){
				ctx.drawImage(img, 64 * 2, 0,  64, 64, 128, 64, 64, 64);
				ctx.drawImage(img, 64 * 6, 0,  64, 64, 128, 0, 64, 64);
				ctx.drawImage(img, 64 * 7, 0,  64, 64, 64, 0, 64, 64);
				ctx.drawImage(img, 0, 64,  64, 64, 64, 64, 64, 64);
			}
			
			if( n.lev >=8 )
				ctx.drawImage(img, 64 * ( 1 + n.eye) , 64,  64, 64, 64, 64, 64, 64);

			if( n.lev ==9 ){
				if( n.mouth <= 2 ) {
					ctx.drawImage(img, 64 * ( 6 + n.mouth ), 64,  64, 64, 64, 64, 64, 64);
				} else {
					ctx.drawImage(img, 64 *( n.mouth -3) , 128,  64, 64, 64, 64, 64, 64);
				}
			}
			ctx.font = "20pt Arial";			
			ctx.fillText(n.day + 'day', 10,30);
		}		
		
		function drawres() {
			ctx2.drawImage(img, 0, 64,  64, 64, 0, 0, 64, 64);
			ctx2.drawImage(img, 64 * ( 1 + n.eye) , 64,  64, 64, 0, 0, 64, 64);
			if( n.mouth <= 2 ) {
				ctx2.drawImage(img, 64 * ( 6 + n.mouth ), 64,  64, 64, 0, 0, 64, 64);
			} else {
				ctx2.drawImage(img, 64 *( n.mouth -3) , 128,  64, 64, 0, 0, 64, 64);
			}
		}
		
		function setcom(){

			var co = document.getElementById('com');
			co.innerHTML = '<input type="button" class="button" value="' +cv[skset[n.lev][0]]+ '" onclick="setmess('+ n.lev +',0);n.command(' +ch[skset[n.lev][0]]+ ','+cs[skset[n.lev][0]]+','+cp[skset[n.lev][0]]+','+ci[skset[n.lev][0]]+','+cl[skset[n.lev][0]]　+ ');">';
			co.innerHTML += '<input type="button"  class="button" value="' +cv[skset[n.lev][1]]+ '" onclick="setmess('+ n.lev + ',1);n.command(' +ch[skset[n.lev][1]]+ ','+cs[skset[n.lev][1]]+','+cp[skset[n.lev][1]]+','+ci[skset[n.lev][1]]+','+cl[skset[n.lev][1]]　+ ');"><br>';
			co.innerHTML += '<input type="button"  class="button" value="' +cv[skset[n.lev][2]]+ '" onclick="setmess('+ n.lev + ',2);n.command(' +ch[skset[n.lev][2]]+ ','+cs[skset[n.lev][2]]+','+cp[skset[n.lev][2]]+','+ci[skset[n.lev][2]]+','+cl[skset[n.lev][2]]　+ ');">';
			co.innerHTML += '<input type="button"  class="button" value="' +cv[skset[n.lev][3]]+ '" onclick="setmess(' + n.lev + ',3);n.command(' +ch[skset[n.lev][3]]+ ','+cs[skset[n.lev][3]]+','+cp[skset[n.lev][3]]+','+ci[skset[n.lev][3]]+','+cl[skset[n.lev][3]]　+ ');"><br>';
			
		};
		
		function setmess(l, n){
			var mm = document.getElementById('mess');
			mm.innerHTML = cmess[skset[l][n]];	
		};
