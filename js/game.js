
/**
 * The class defining the menu scene
 */

class menuScene extends Phaser.Scene {
    constructor(){
        super("menu");
    }
    preload(){
        console.log("menu preload");
        this.load.image("sky", "assets/city_bg.png");
        this.load.image("play", "assets/play_button.png");
        this.load.image("title", "assets/Gravity_games.png");
        this.load.image("how_to_play", "assets/instructions.png");
        this.load.image("intructions_bg", "assets/instructions_bg.png");
        this.load.image("easy_btn", "assets/easy_btn.png");
        this.load.image("hard_btn", "assets/hard_btn.png");
        this.load.audio("audio_game" , "assets/sound/twoTone1.ogg");
        
    }
    create(){
      

        
        this.audioGame = this.sound.add("audio_game");
        this.audioGame.play();
        this.audioGame.loop=true;
        this.skyTile = this.add.tileSprite(0, 0, boundsX, 704, 'sky');
        this.skyTile.setOrigin(0,0);    
        var newGame =   this.add.sprite(512, 320, "play");
        var instructions =   this.add.sprite(512, 400, "how_to_play");
        this.add.image(512, 200, "title");
        var easyMode =   this.add.sprite(512, 480, "easy_btn");
        

       var hardMode =   this.add.sprite(512, 480, "hard_btn");
       hardMode.visible = false;



        newGame.setInteractive({ useHandCursor: true });
        instructions.setInteractive({ useHandCursor: true });
        easyMode.setInteractive({ useHandCursor: true });
        hardMode.setInteractive({ useHandCursor: true });

        easyMode.on('pointerdown', function(){
            easyMode.visible= false;
            hardMode.visible=true;
            gameOne();
        }, this);

        hardMode.on('pointerdown', function(){
            hardMode.visible= false;
            easyMode.visible=true;
            gameZero();
        }, this);


        newGame.on('pointerdown', function(){
            this.audioGame.stop();
            this.scene.switch("level1");
            
        }, this);

        instructions.on('pointerdown', function(){
            this.audioGame.stop();
            this.scene.switch("subMenu");
            
        }, this);
    
    }
    update(){
        
    }
}


class subMenuScene extends Phaser.Scene {
    constructor(){
        super("subMenu");
    }
    preload(){
        console.log("menu preload");
        this.load.image("intructions_bg", "assets/instructions_bg.png");
        this.load.image("back_btn", "assets/back_btn.png");
        
    }
    create(){
        this.bg_howto = this.add.tileSprite(0, 0, boundsX, 704, 'intructions_bg');
        this.bg_howto.setOrigin(0,0);   
        var backbtn = this.add.sprite(35, 35, "back_btn");
        backbtn.setInteractive({ useHandCursor: true });
        
        backbtn.on('pointerdown', function(){
            console.log("moving to the game scene");
            this.scene.switch("menu");
            
        }, this);
    
    }
    update(){
        
    }
}
/**
 * The class defining the game scene
 */
var player;
var platforms;
var ledge;
var jumpButton;
var score = 0;
var keyscore= 0;
var gravityText;
var camera;
var boundsX =1050 ;
var boundsY = 600;
var stars;
var ground ;
var goals ;
var timer;
var bombs;
var powerUp;
var powerTimer;
var keys;
var bombcnt = -1 ;
var spdjump = -200;
var initialX;
var roof;
var door;
var moveText;
var gravityScore;
var coins;
var coinCount;
var newCoins;
var highScore = 0;
var spike1;
var spike2;
var spike3;
var spike4;
var spike5;
var spike6;
var bombCount;
var coinFlip;
var button;
var clickCount  ;
var gameMode =0;
var mode = "EASY";
var powerups;
var powerUpScore;
var scoreBanner;
var nextbtn;

class level1Scene extends Phaser.Scene {
    constructor(){
        super("level1");
    }
    preload(){
    console.log("game preload");
    this.load.image("tilesheet_final", "assets/tilesheet_final.png")
    this.load.tilemapTiledJSON("level", "assets/tilemap_final.json")
    this.load.image("mp1", "assets/city_bg.png");
    this.load.image("mp2", "assets/city_bg2.png");
    this.load.image("mp3", "assets/city_bg3.png");
    this.load.image("ground", "assets/platform1.png");
    //this.load.image("bob", "assets/bob.png");
    this.load.image("ledge", "assets/ledge.png");
    this.load.image("powerup", "assets/stars.png");
    this.load.image("goal", "assets/finish.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.image("stars", "assets/powerup.png");
    this.load.image("scoreBoard", "assets/scoreBoard.png");
    this.load.image("key", "assets/key.png");
    this.load.image("door", "assets/door.png");
    this.load.audio("audio_game" , "assets/sound/twoTone1.ogg");
   
    this.load.audio("audio_powerup" , "assets/sound/powerUp12.ogg");
    this.load.audio("audio_coin" , "assets/sound/coin.mp3");
    this.load.audio("audio_gravity" , "assets/sound/gravity_sound.mp3");
    this.load.image("back_btn", "assets/back_btn.png");
    this.load.image("scoreBanner", "assets/score_banner.png")
    this.load.image("next_btn", "assets/next_button.png");
    this.load.spritesheet("coins", "assets/coins.png",
    { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("dude", "assets/BODY_male.png",
    { frameWidth: 64, frameHeight: 64 });
    }

    
    create(){
     
        //sound effects
    this.audioGame = this.sound.add("audio_game");
    this.audioGravity = this.sound.add("audio_gravity");
    this.audioPowerUp = this.sound.add("audio_powerup")
    
    this.audioCoin= this.sound.add("audio_coin");
    

    this.audioGame.loop=true;
    this.audioGame.play();

    var mapPick = Phaser.Math.Between(1,6);
    if (mapPick===1 || mapPick===4) {
        this.skyTile = this.add.tileSprite(0, 0, boundsX, 704, 'mp1');
    } else if (mapPick===2 ||mapPick===5){
        this.skyTile = this.add.tileSprite(0, 0, boundsX, 704, 'mp2');
    } else if (mapPick===3||mapPick===6 ){
        this.skyTile = this.add.tileSprite(0, 0, boundsX, 704, 'mp3');
    }

    //init variables
    gravityScore=6;
    powerUpScore=0;
    score = 0;
    bombCount=0;
    coinCount= 0;
    coinFlip=0;


    
    //world bounds
    this.physics.world.setBounds(0, 0, boundsX, 704);
    this.cameras.main.setBounds(0, 0, boundsX, 176);
    
    //loading tileset
    
    this.skyTile.setOrigin(0,0);

    var map=this.make.tilemap({key: "level"});
    var tileset =map.addTilesetImage("tilesheet_final");

    scoreBanner = this.add.sprite( 512,380,"scoreBanner")
    scoreBanner.visible=false;
    this.bannerText = this.add.text(380,325, "", 

    
    {
         fontSize: '30px',
          fill: '#efefef',
          fontStyle: 'bold'

        
    });

     nextbtn = this.add.sprite(512, 450, "next_btn");
    

    nextbtn.setInteractive({ useHandCursor: true });
    
    nextbtn.on('pointerdown', function(){
        
        this.scene.restart();
        
        
    }, this);

    nextbtn.visible=false;
    this.bannerText.visible=false;
   
    var platformLayer = map.createStaticLayer("platforms", tileset, 0 ,0 );
    //door = this.physics.add.sprite(800, 400,"door");
   
    platformLayer.setCollisionByProperty({collidable:true});
    this.scoreBoard= this.add.image(925,32,"scoreBoard");
    this.scoreBoard.scaleX=1.5;
    this.scoreBoard.scaleY=1.5;

   
    var backbtn = this.add.sprite(32, 32, "back_btn");
    backbtn.scaleX=.7;
    backbtn.scaleY=.7;

    backbtn.setInteractive({ useHandCursor: true });
    
    backbtn.on('pointerdown', function(){
        this.audioGame.stop();
        this.scene.restart();
        this.scene.switch("menu");
        
    }, this);
    //coin animations
    this.anims.create({
        key: 'coinsanims',
        frames: this.anims.generateFrameNumbers('coins', { start: 0, end: 5 }),
        frameRate: 4,
        repeat: -1
    });
    
    //inital coin spawn of 9 coins
    coins = this.physics.add.group({
        key: 'coin',
        repeat: 9  ,
        setXY: 
        { 
            x: 100,
            y: 150,
            stepX: 90 
        }
    });

    coins.children.iterate(coin => {
        coin.play('coinsanims')
      });

    coins.children.iterate(function (child) {
        
        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.5));
        
    });

//spawning in spikes and disabling Body for later use
 var spikes = this.add.group();
 spike1 = this.physics.add.sprite(512, 500, 'bomb').setSize(5);
 spike2 = this.physics.add.sprite(200, 500, 'bomb').setSize(5);
 spike3 = this.physics.add.sprite(700, 500, 'bomb').setSize(5);
 spike4 = this.physics.add.sprite(250, 300, 'bomb').setSize(5);
 spike5 = this.physics.add.sprite(800, 300, 'bomb').setSize(5);
 spike6 = this.physics.add.sprite(512, 100, 'bomb').setSize(5);


spikes.add(spike1);
spikes.add(spike2);
spikes.add(spike3);
spikes.add(spike4);
spikes.add(spike5);
spikes.add(spike6);

spike1.disableBody(true, true);
spike2.disableBody(true, true);
spike3.disableBody(true, true);
spike4.disableBody(true, true);
spike5.disableBody(true, true);
spike6.disableBody(true, true);

    //score text 
    this.scoreText = this.add.text(918,24, '0', 
    {
         fontSize: '16px',
          fill: '#efefef' 
        
    });

   

    //timer event used to spawn bombs every 8secs
   timer=  this.time.addEvent({
    delay: 8000,                // ms
    callback: spanwBomb,
    //args: [],
    callbackScope: this,
    repeat: -1
});

//power up spawn using timer event for game mode EASY
if (gameMode===0){
timer=  this.time.addEvent({
    delay: 8000,                // ms
    callback: spawnPowerUp,
    //args: [],
    callbackScope: this,
    repeat: false
});

////power up spawn using timer event for game mode EASY
} else if (gameMode===1){
    timer=  this.time.addEvent({
        delay: 10000,                // ms
        callback: spawnPowerUp,
        //args: [],
        callbackScope: this,
        repeat: false
    });
}
    //playere spawn
    player = this.physics.add.sprite(225, 500, 'dude').setSize(30);

   

    //player animations right flipX used for left
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 27, end: 35 }),
        frameRate: 12,
        repeat: -1
    });

    //standing still
    this.anims.create({
        key: 'still',
        frames: this.anims.generateFrameNumbers('dude', {start: 18, end:18}),
        frameRate: 12,
        repeat: -1
    });
    
    //creating groups for various objects
    keys = this.physics.add.group();
    bombs = this.physics.add.group();
    powerups = this.physics.add.group();

    this.physics.add.overlap(player, coins, collectStar, null, this);
  
    this.physics.add.overlap(player, spikes, lose, null, this);
    this.physics.add.overlap(player, powerups, powerUpfnc, null, this);
    
    
 
    this.physics.add.collider(coins , platformLayer);
    this.physics.add.collider(player, ground);
    this.physics.add.collider(player, roof);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player,platformLayer);
   
    this.physics.add.collider(bombs ,platformLayer );
    this.physics.add.collider(spikes ,platformLayer );
   
    this.physics.add.collider(powerups ,platformLayer );
    
   

    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D );
    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
   
    }

    update(){
        
        //move left
        if (this.left.isDown  ){
            player.setVelocityX(-160);
            player.anims.play('right', true);
            player.flipX= true;
           
           //move right
        }else if (this.right.isDown ){
            player.setVelocityX(160)
            player.anims.play('right', true);
            player.flipX= false;
            
        }
        else{
            //standing still
            player.setVelocityX(0);
            player.anims.play('still', true);
          
    
        }
        if (Phaser.Input.Keyboard.JustDown(this.up))  {

            //Gravity mechanic for HARD mode 
            { if (gameMode===1){
                this.audioGravity.play();
                if (player.flipY == false){
                this.physics.world.gravity.set(0, -500)
                player.flipY=true;
               
                //gravityScore -=1;
                //this.gravityText.setText('Gravity ' + gravityScore);
                
            
                
                } else if(player.flipY == true ){
                    this.audioGravity.play();
                    this.physics.world.gravity.set(0, 500)
                    player.flipY=false;
                   
                   // gravityScore -=1;
                    //this.gravityText.setText('Gravity ' + gravityScore);
                }
                //Gravity mechanic for EASY mode
                } else if (gameMode===0){
                    this.audioGravity.play();
                    if (player.flipY == false){
                    player.setGravityY(-500);
                    player.flipY=true;
                
                    //gravityScore -=1;
                    //this.gravityText.setText('Gravity ' + gravityScore);
                    
                
                    
                    } else if(player.flipY == true ){
                        this.audioGravity.play();
                        player.setGravityY(500);
                        player.flipY=false;

                }
                }        
                
            }
            
        }
    }
}
///powerup spawn
function spawnPowerUp() {
    var powerX =  Phaser.Math.Between(100,1000);
    powerups.create(powerX, 150, "powerup").setBounceY(Phaser.Math.FloatBetween(0.5, 0.8));;
}

///spikes enable body
function spanwBomb(){
    if (bombCount===0){
        console.log("bombs awayyy!")
        spike6.enableBody(true, spike6.x,spike6.y , true, true);
        bombCount= 2;

    } else if (bombCount === 2){
        spike3.enableBody(true, spike3.x,spike3.y , true, true);
        bombCount=3;
   

    } else if (bombCount === 3){
        spike4.enableBody(true, spike4.x,spike4.y , true, true);
        bombCount=5;


    }else if (bombCount === 5){
        spike1.enableBody(true, spike1.x,spike1.y , true, true);
        bombCount=6;

    }else {
        console.log("no bombs");
        return
    }
   
    
}

///coin collect and spawning next batch of coins when all are collected 
function collectStar (player, coin)
{
    this.audioCoin.play();
    coin.disableBody(true, true);
    score+=10;
    coinCount ++;
    this.scoreText.setText(score);

    if (coinCount === 10){
        coinCount = 0;
       if (gameMode===0){
        coins.children.iterate(coin => {
            console.log("spawn more coins!!!");
                  //coin.play('coinsanims')
                  coin.enableBody(true, coin.x,150 , true, true)
                  coin.setGravityY(300);
                  coin.flipY=true;
                });
       }
       else if (gameMode===1){
    
            coins.children.iterate(coin => {
                console.log("spawn more coins!!!");
                      //coin.play('coinsanims')
                      coin.enableBody(true, coin.x,350 , true, true)
                      coin.setGravityY(300);
                      coin.flipY=true;
                    });
                    

          } 
        
       
            
        
    } if (score ===500 ){
        scoreBanner.visible=true;
        this.bannerText.visible=true;
        nextbtn.visible=true;
        this.bannerText.setText("Congrats you \nbeat the game:" + score);
        highScore = 0;
        this.audioGame.stop();
        player.visible=false;
      
    }  
}

function gameZero(){
   
    gameMode=0;
   
    

}
function gameOne(){
    
    gameMode=1;
    
   
}
//power up ativation 
function powerUpfnc(player , powerUp){
    if (powerUpScore===0){
        this.audioPowerUp.play();
        powerUp.disableBody(true, true);
        powerUpScore= 1 ;
        this.tweens.add({
            targets: player,
            alpha: 0.3,
            ease: 'none',  
            duration: 2000,
            repeat: false,
            yoyo: true
          })
        timedEvent = this.time.delayedCall(3000, powerUpfnc, [], this ); 
    } else if (powerUpScore===1){
        powerUpScore= 0 ;
        this.tweens.add({
            targets: player,
            alpha: 1,
            ease: 'none',  
            duration: 10,
            repeat: false,
            yoyo: true
          })
          this.audioPowerUp.play();
          timedEvent= this.time.delayedCall(8000, spawnPowerUp, [], this ); 
    }
}

//lose function when you hit the bomb also checks if powerup is active
function lose(){
    if (powerUpScore!==1){
       
       
           // alert("NEW HIGHSCORE: " + "not");
            scoreBanner.visible=true;
            nextbtn.visible=true;
            this.bannerText.visible=true;
            this.bannerText.setText("Score: " + score + "\nHighscore: " + highScore);
            if (score > highScore){
            highScore = score;
            }
            this.audioGame.stop();
            player.visible=false;
            return
        
    }
}
/**
 * The game config 
 */
var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 640,
    physics: {
        default: 'arcade',
       
        arcade: {
            gravity: { y: 200 }
        },
    },
    scene: [menuScene,subMenuScene, level1Scene]
};

var game = new Phaser.Game(config);