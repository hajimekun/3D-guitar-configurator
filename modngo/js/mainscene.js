var scene, camera, renderer;
var controls;
var SCREEN_WIDTH, SCREEN_HEIGHT;
var loader, model;
var group = new THREE.Object3D();
var mscale = 2;

var manager = new THREE.LoadingManager();

//LOADING A TEXTURE
var rbotTextures = {
    'bot1': 'json/bottombody_mahogany.png',
    'bot2': 'json/lowerbodyTexture/bottombody_maple.png',
}
currentBotMaterial = rbotTextures['bot2'];

var rtopTextures = {
  'top1': 'json/topbody_swampash.png',
  'top2': 'json/upperbodyTexture/topbody_flamedmaple.png',
  'top3': 'json/upperbodyTexture/topbody_poplarburl.png',
}
currentTopMaterial = rtopTextures['top2'];

var rneckTextures = {
  'neck1': 'json/neck_maple.png',
  'neck2': 'json/neck/neck_swampash.png',
}
currentNeckMaterial = rneckTextures['neck2'];

var rfretTextures = {
  'fret1': 'json/fretboard_ebony.png',
  'fret2': 'json/fretboard/fretboard_maple.png',
  'fret3': 'json/fretboard/fretboard_rosewood.png',
}
currentFretMaterial = rfretTextures['fret3'];

manager.onLoad = function () {
    scene.add(group);
}

var loader = new THREE.JSONLoader(manager);




function init() {
  // Scene Setting
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 500);
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setClearColor( 0x000000, 0 ); // the default
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 25;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 1;
    controls.addEventListener('change', render);

    camera.position.x = 15;
    camera.position.y = 10;
    camera.position.z = 15;
    camera.lookAt(scene.position);

    h1 = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.3);
    h1.position.set(-300,200, -3000);
    scene.add(h1);

    var s1 = new THREE.SpotLight(0xffffff);
    s1.position.set(300, 300, -1000);
    scene.add(s1);

    var s2 = new THREE.SpotLight(0xffffff);
    s2.position.set(-300, 300, 1000);
    scene.add(s2);
    //Scene Setting end

    //Load 3d model
    protoTop = new THREE.TextureLoader().load( currentTopMaterial, function (){
      var mat = new THREE.MeshPhongMaterial({
        map: protoTop,
        shininess: 0,
        reflectivity: 0,
        bumpScale: .0001,
        combine: THREE.MultiplyOperation
      });

    loader.load('json/rtopbody.json',function (geo) {
            var top = new THREE.Mesh( geo, mat );
            top.material.needsUpdate = true;
            top.scale.set(mscale, mscale, mscale);
            top.position.set(5, -5, 0);
            group.add( top );
        });
    });

    protoBot = new THREE.TextureLoader().load( currentBotMaterial, function (){
      var mat = new THREE.MeshPhongMaterial({
        map: protoBot,
        shininess: 0,
        reflectivity: 0,
        bumpScale: .0001,
        combine: THREE.MultiplyOperation
      });
    loader.load(
        'json/rbottombody.json',
        function ( geo ) {
            var bot = new THREE.Mesh( geo, mat );
            bot.material.needsUpdate = true;
            bot.scale.set(mscale, mscale, mscale);
            bot.position.set(5, -5, 0);
            group.add( bot );
        }
    );
    });

    protoNeck = new THREE.TextureLoader().load( currentNeckMaterial, function (){
      var mat = new THREE.MeshPhongMaterial({
        map: protoNeck,
        shininess: 0,
        reflectivity: 0,
        bumpScale: .0001,
        combine: THREE.MultiplyOperation
      });

    loader.load(
        'json/rneck.json',
        function ( geo ) {
            var neck = new THREE.Mesh( geo, mat );
            neck.material.needsUpdate = true;
            neck.scale.set(mscale, mscale, mscale);
            neck.position.set(5, -5, 0);
            group.add( neck );
        }
    );
    });

    protoFret = new THREE.TextureLoader().load( currentFretMaterial, function (){
      var mat = new THREE.MeshPhongMaterial({
        map: protoFret,
        shininess: 0,
        reflectivity: 0,
        bumpScale: .0001,
        combine: THREE.MultiplyOperation
      });

    loader.load(
        'json/rfretboard.json',
        function ( geo ) {
            var fret = new THREE.Mesh( geo, mat );
            fret.material.needsUpdate = true;
            fret.scale.set(mscale, mscale, mscale);
            fret.position.set(5, -5, 0);
            group.add( fret );
        }
    );
    });


    loader.load(
        'json/rpickup.json',
        function ( geometry, materials ) {
            var material = new THREE.MultiMaterial( materials );
            var object = new THREE.Mesh( geometry, material );
            object.scale.set(mscale, mscale, mscale);
            object.position.set(5, -5, 0);
            group.add( object );
        }
    );
    loader.load(
        'json/rbridge.json',
        function ( geometry, materials ) {
            var material = new THREE.MultiMaterial( materials );
            var object = new THREE.Mesh( geometry, material );
            object.scale.set(mscale, mscale, mscale);
            object.position.set(5, -5, 0);
            group.add( object );
        }
    );
    loader.load(
        'json/rtuner.json',
        function ( geometry, materials ) {
            var material = new THREE.MultiMaterial( materials );
            var object = new THREE.Mesh( geometry, material );
            object.scale.set(mscale, mscale, mscale);
            object.position.set(5, -5, 0);
            group.add( object );
        }
    );

    $("#container").append(renderer.domElement);
}

function render() {
    //group.rotation.y += 0.0005;
}

function animate() {
    requestAnimationFrame(animate);
    render();
    renderer.render(scene, camera);
}
init();
animate();

//FUNCTION UNTUK PILIH TEXTURE
$('.botbody').on('click', function () {

    textureTarget = $(this).attr("alt");
    group.remove(protoBot);

    protoBot = new THREE.TextureLoader().load( rbotTextures[textureTarget], function (){
      var mat = new THREE.MeshPhongMaterial({
        map: protoBot,
        shininess: 0,
        reflectivity: 0,
        bumpScale: .0001,
        combine: THREE.MultiplyOperation
      });
    loader.load(
        'json/rbottombody.json',
        function ( geo ) {
            var bot = new THREE.Mesh( geo, mat );
            bot.material.needsUpdate = true;
            bot.scale.set(mscale, mscale, mscale);
            bot.position.set(5, -5, 0);
            group.add( bot );
        }
    );
    });

	currentBotMaterial = textureTarget;
});

$('.topbody').on('click', function () {

    textureTarget = $(this).attr("alt");
    group.remove(protoTop);

    protoTop = new THREE.TextureLoader().load( rtopTextures[textureTarget], function (){
      var mat = new THREE.MeshPhongMaterial({
        map: protoTop,
        shininess: 0,
        reflectivity: 0,
        bumpScale: .0001,
        combine: THREE.MultiplyOperation
      });

    loader.load('json/rtopbody.json',function (geo) {
            var top = new THREE.Mesh( geo, mat );
            top.material.needsUpdate = true;
            top.scale.set(mscale, mscale, mscale);
            top.position.set(5, -5, 0);
            group.add( top );
        });
    });
	currentTopMaterial = textureTarget;
});

$('.fretboard').on('click', function () {

    textureTarget = $(this).attr("alt");
    group.remove(protoFret);

    protoFret = new THREE.TextureLoader().load( rfretTextures[textureTarget], function (){
      var mat = new THREE.MeshPhongMaterial({
        map: protoFret,
        shininess: 0,
        reflectivity: 0,
        bumpScale: .0001,
        combine: THREE.MultiplyOperation
      });

    loader.load(
        'json/rfretboard.json',
        function ( geo ) {
            var fret = new THREE.Mesh( geo, mat );
            fret.material.needsUpdate = true;
            fret.scale.set(mscale, mscale, mscale);
            fret.position.set(5, -5, 0);
            group.add( fret );
        }
    );
    });
	currentFretMaterial = textureTarget;
});


$('.neck').on('click', function () {

    textureTarget = $(this).attr("alt");
    group.remove(protoNeck);

    protoNeck = new THREE.TextureLoader().load( rneckTextures[textureTarget], function (){
      var mat = new THREE.MeshPhongMaterial({
        map: protoNeck,
        shininess: 0,
        reflectivity: 0,
        bumpScale: .0001,
        combine: THREE.MultiplyOperation
      });

    loader.load(
        'json/rneck.json',
        function ( geo ) {
            var neck = new THREE.Mesh( geo, mat );
            neck.material.needsUpdate = true;
            neck.scale.set(mscale, mscale, mscale);
            neck.position.set(5, -5, 0);
            group.add( neck );
        }
    );
    });
	currentNeckMaterial = textureTarget;
});





$(window).resize(function () {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    camera.updateProjectionMatrix();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
});
