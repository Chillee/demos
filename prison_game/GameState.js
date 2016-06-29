var Game = {};

Game.GameState = function (game) {

};

var player;

Game.GameState.prototype = {

    preload: function () {
    	game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.renderer.renderSession.roundPixels = true;
    	Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    	game.camera.roundPx = false;

    	game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    	game.scale.setUserScale(2, 2, 0, 0);

        game.load.spritesheet('player', 'tileset.png', 16, 32);
    },

    create: function () {
    	player = new Player();
    	player.create();
   	},

   	update: function () {
   		player.update();
   	},

   	render: function () {
   		player.render();
   	}
};
