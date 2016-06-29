var Player = function(){

};

var touchingDoor = false;
var movementLocked = false;

Player.prototype = {

    create: function () {
    	sprite = game.add.sprite(32, 32, 'player');

    	game.physics.arcade.enable(sprite);
    	sprite.body.collideWorldBounds = true;
    	sprite.body.setSize(8, 19, 4, 12);

    	var fps = 16;
    	sprite.animations.add('NW', [240, 241, 242, 243, 244, 245, 246], fps, true);
	    sprite.animations.add('N', [192, 193, 194, 195, 196, 197, 198, 199], fps, true);
	    sprite.animations.add('NE', [144, 145, 146, 147, 148, 149, 150, 151], fps, true);
	    sprite.animations.add('E', [96, 97, 98, 99, 100, 101, 102, 103], fps, true);
	    sprite.animations.add('SE', [48, 49, 50, 51, 52, 53, 54, 55], fps, true);
	    sprite.animations.add('S', [0, 1, 2, 3, 4, 5, 6, 7], fps, true);
	    sprite.animations.add('SW', [336, 337, 338, 339, 340, 341, 342, 343], fps, true);
	    sprite.animations.add('W', [288, 289, 290, 291, 292, 293, 294, 295], fps, true);
	    sprite.animations.add('idle', [0], 5, true);

	    sprite.animations.play('S');

	    game.camera.onFadeComplete.add(function() {
			var tileX = Math.floor(sprite.body.x / 16);
			var tileY = Math.floor(sprite.body.y / 16);

			if(tileX == 3 && tileY == 2) sprite.position.set(20 * 16, 26 * 16);
			if(tileX == 25 && tileY == 4) sprite.position.set(3 * 16, 2 * 16);
			if(tileX == 20 && tileY == 26) sprite.position.set(25 * 16, 4 * 16);

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
		    if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
		        sprite.body.velocity.y -= v;
		    }
		    if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
		        sprite.body.velocity.x -= v;
		    }
		    if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
		        sprite.body.velocity.y += v;
		    }
		    if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
		        sprite.body.velocity.x += v;
		    }
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

	    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
		    if(touchingDoor && (sprite.animations.name == 'N' || sprite.animations.name == 'NW' || sprite.animations.name == 'NE')){
		    	game.camera.fade(0x000000, 1000);
		    	movementLocked = true;
			}
		}

	    touchingDoor = false;
    },

    render: function () {
    	
    },

    touchingDoor: function() {
    	console.log("touched door");
    	touchingDoor = true;
    }
};