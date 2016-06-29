var Game = {};

Game.GameState = function (game) {

};

var player;
var map;
var layer;

Game.GameState.prototype = {

    preload: function () {
    	game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.renderer.renderSession.roundPixels = true;
    	Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    	game.camera.roundPx = false;

    	game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    	game.scale.setUserScale(2, 2, 0, 0);

        game.load.spritesheet('player', 'assets/tileset.png', 16, 32);

        game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/tileset.png');
    },

    create: function () {
		game.stage.backgroundColor = '#1c1824';

		map = game.add.tilemap('map');
    	map.addTilesetImage('tileset', 'tiles');
    	layer = map.createLayer('FirstRoom');
    	layer.resizeWorld();

    	player = new Player();
    	player.create();

    	game.camera.follow(sprite, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
   	},

   	update: function () {
   		player.update();
   	},

   	render: function () {
   		player.render();
   	}
};
