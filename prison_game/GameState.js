var Game = {};

Game.GameState = function (game) {

};

var player;
var doors;
var map;
var layer;
var topLayer;

var currentMapID;

Game.GameState.prototype = {

	preload: function () {
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;

		game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		game.scale.setUserScale(2, 2, 0, 0);

		game.renderer.renderSession.roundPixels = true;
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

		game.load.spritesheet('player', 'assets/mobset.png', 16, 32);

		game.load.tilemap('room0', 'assets/room0.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('room1', 'assets/room1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles', 'assets/tileset.png');
		game.load.spritesheet('tileset', 'assets/tileset.png', 16, 16);
		game.load.spritesheet('fxset', 'assets/fxset.png', 16, 16);
	},

	loadMap: function(mapID) {
		if(map) map.destroy();

		map = game.add.tilemap('room' + mapID);
		map.addTilesetImage('tileset', 'tiles');
		layer = map.createLayer('Under');
		layer.resizeWorld();
		currentMapID = mapID;

		map.setCollision(2);
		map.setCollision(3);
		map.setCollision(49);
		map.setCollisionBetween(4, 7);
		map.setCollisionBetween(52, 54);
		map.setCollisionBetween(100, 103);

		doors = game.add.group();
		doors.enableBody = true;
		map.createFromObjects('Doors', 51, 'tileset', 50, true, false, doors);
		doors.forEach(function(door){
			door.body.immovable = true;
		});

		player.bringToTop();

		topLayer = map.createLayer('Over');
	},

	create: function () {
		game.stage.backgroundColor = '#1c1824';

		player = new Player();
		player.create(this);

		this.loadMap(0);

		game.physics.startSystem(Phaser.Physics.ARCADE);
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