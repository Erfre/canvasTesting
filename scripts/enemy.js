// enemyList.push({
//     x: 0,
//     y: 160,
//     width: 28,
//     height: 40,
//     speed: 2,
//     dead: false,
//     draw: function(){
//             enemyRight.draw(this.x,this.y);
//         },
//     brain: function(playerx){
//             var distance = playerx - this.x;
//             if (distance < 0) {
//                 return this.x += (-this.speed);
//             }
//             else
//             {
//                 return this.x += (this.speed);
//             }
//         }
//     });
//
// enemyList.push({
//     x: 1000,
//     y: 160,
//     width: 28,
//     height: 40,
//     speed: 2,
//     dead: false,
//     draw: function(){
//             enemyRight.draw(this.x,this.y);
//         },
//     brain: function(playerx){
//             var distance = playerx - this.x;
//             if (distance < 0) {
//                 return this.x += (-this.speed);
//             }
//             else
//             {
//                 return this.x += (this.speed);
//             }
//         }
//     });
//
// enemyList.push({
//     x: 800,
//     y: 160,
//     width: 28,
//     height: 40,
//     speed: 2,
//     dead: false,
//     draw: function(){
//             enemyRight.draw(this.x,this.y);
//         },
//     brain: function(playerx){
//             var distance = playerx - this.x;
//             if (distance < 0) {
//                 return this.x += (-this.speed);
//             }
//             else
//             {
//                 return this.x += (this.speed);
//             }
//         }
//     });

//draw all the eniemes
// for (var i = 0; i < enemyList.length; i++) {
//     if (enemyList[i].dead === false) {
//         //draws and starts the brain
//         enemyList[i].draw();
//         enemyList[i].brain(player.x);
//
//         var hit = colCheck(player, enemyList[i]);
//
//         if (hit ==='b') {
//             //the monster should die
//             enemyList[i].dead = true;
//         }
//         else if(hit === 't'||
//                 hit === 'l'||
//                 hit === 'r'){
//             //player should die
//             player.dead = true;
//         }
//     }
// };
