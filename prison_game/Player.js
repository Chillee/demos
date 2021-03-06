var Player = function(){

};

var touchingDoor = false;
var movementLocked = false;
var doorTouching;
var parent;
var directionX;
var directionY;

var interactAnimation;

Player.prototype = {

    create: function (state) {
    	parent = state;

    	sprite = game.add.sprite(10 * 16, 7 * 16, 'player');
    	interactAnimation = game.add.sprite(0, 0, 'fxset');
    	interactAnimation.kill();

    	interactAnimation.animations.add('spark', [0, 1, 2, 3, 4, 5], 30, false);

    	game.physics.arcade.enable(sprite);
    	sprite.body.collideWorldBounds = false;
    	sprite.body.setSize(8, 19, 4, 12);

    	var fps = 16;
    	sprite.animations.add('NW', [240, 241, 242, 243, 244, 245, 246, 247], fps, true);
	    sprite.animations.add('N', [192, 193, 194, 195, 196, 197, 198, 199], fps, true);
	    sprite.animations.add('NE', [144, 145, 146, 147, 148, 149, 150, 151], fps, true);
	    sprite.animations.add('E', [96, 97, 98, 99, 100, 101, 102, 103], fps, true);
	    sprite.animations.add('SE', [48, 49, 50, 51, 52, 53, 54, 55], fps, true);
	    sprite.animations.add('S', [0, 1, 2, 3, 4, 5, 6, 7], fps, true);
	    sprite.animations.add('SW', [336, 337, 338, 339, 340, 341, 342, 343], fps, true);
	    sprite.animations.add('W', [288, 289, 290, 291, 292, 293, 294, 295], fps, true);
	    sprite.animations.add('idle', [0], 5, true);

	    sprite.animations.play('S');
	    directionX = 0;
	    directionY = 1;

	    game.camera.onFadeComplete.add(function() {
	    	if(doorTouching.pairMap != currentMapID){
	    		parent.loadMap(doorTouching.pairMap);
	    	}
	    	doors.forEach(function(door){
	    		if(door.ID == doorTouching.pairID){
	    			sprite.position.set(door.body.x, door.body.y);
	    		}
	    	});

	    	game.camera.focusOn(sprite);
	    	sprite.animations.play('S');
	    	directionX = 0;
	    	directionY = 1;
			movementLocked = false;

			game.camera.flash('#000000', 1000);
		});
    },

    update: function () {
    	sprite.body.velocity.set(0, 0);

	    var v = 100;
	    if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
	    	v = 400;
	    }
	    if(!movementLocked){
		    if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
		        sprite.body.velocity.y -= v;
		    }
		    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		        sprite.body.velocity.x -= v;
		    }
		    if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
		        sprite.body.velocity.y += v;
		    }
		    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		        sprite.body.velocity.x += v;
		    }
		    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			    if(touchingDoor && (sprite.animations.name == 'N' || sprite.animations.name == 'NW' || sprite.animations.name == 'NE')){
			    	game.camera.fade(0x000000, 1000, true);
			    	movementLocked = true;
				}
				if(!interactAnimation.alive){
					interactAnimation.revive();
					interactAnimation.x = sprite.x + (directionX * 16);
					interactAnimation.y = sprite.y + 16 + (directionY * 16);
					interactAnimation.animations.play('spark', null, null, true);
				}
			}
		}

		if(sprite.body.velocity.x != 0 || sprite.body.velocity.y != 0){
			directionX = Math.sign(sprite.body.velocity.x);
			directionY = Math.sign(sprite.body.velocity.y);
		}

	    if(sprite.body.velocity.x == -v && sprite.body.velocity.y == -v){
	        sprite.animations.play('NW');
	    }
	    else if(sprite.body.velocity.x == 0 && sprite.body.velocity.y == -v){
	        sprite.animations.play('N');
	    }
	    else if(sprite.body.velocity.x == v && sprite.body.velocity.y == -v){
	        sprite.animations.play('NE');
	    }
	    else if(sprite.body.velocity.x == v && sprite.body.velocity.y == 0){
	        sprite.animations.play('E');
	    }
	    else if(sprite.body.velocity.x == v && sprite.body.velocity.y == v){
	        sprite.animations.play('SE');
	    }
	    else if(sprite.body.velocity.x == 0 && sprite.body.velocity.y == v){
	        sprite.animations.play('S');
	    }
	    else if(sprite.body.velocity.x == -v && sprite.body.velocity.y == v){
	        sprite.animations.play('SW');
	    }
	    else if(sprite.body.velocity.x == -v && sprite.body.velocity.y == 0){
	        sprite.animations.play('W');
	    }
	    else {
	        //  Stand still
	        sprite.animations.stop(null, true);
	    }

	    touchingDoor = false;
    },

    render: function () {
    	
    },

    bringToTop: function () {
    	sprite.bringToTop();
    	interactAnimation.bringToTop();
    },

    touchingDoor: function(sprite, door) {
    	doorTouching = door;
    	touchingDoor = true;
    }
};