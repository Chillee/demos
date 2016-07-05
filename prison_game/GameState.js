var Game = {};

Game.GameState = function (game) {

};

var player;
var doors;
var map;
var layer;
var topLayer;

Game.GameState.prototype = {

	preload: function () {
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;

		game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		game.scale.setUserScale(2, 2, 0, 0);

		game.renderer.renderSession.roundPixels = true;
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

		game.load.spritesheet('player', 'assets/tileset.png', 16, 32);

		game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles', 'assets/tileset.png');
		game.load.spritesheet('tileset', 'assets/tileset.png', 16, 16);
	},

	create: function () {
		game.stage.backgroundColor = '#1c1824';

		map = game.add.tilemap('map');
		map.addTilesetImage('tileset', 'tiles');
		layer = map.createLayer('Under');
		layer.resizeWorld();

		map.setCollision(10);
		map.setCollision(11);
		map.setCollision(57);

		game.physics.startSystem(Phaser.Physics.ARCADE);

		doors = game.add.group();
		doors.enableBody = true;
		map.createFromObjects('Doors', 59, 'tileset', 58, true, false, doors);
		doors.forEach(function(door){
			door.body.immovable = true;
		});

		player = new Player();
		player.create();

		topLayer = map.createLayer('Over');

		game.camera.follow(sprite, Phaser.Camera.FOLLOW_LOCKON);
	},

	update: function () {
		game.physics.arcade.overlap(sprite, doors, player.touchingDoor);
		game.physics.arcade.collide(sprite, layer);

		player.update();
	},

	render: function () {
		player.render();
	}
};
