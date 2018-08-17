var controls, mixer, renderer, scene, uniforms;
var clock = new THREE.Clock();
init();
animate();


function init() {
	var avatar = "nicpink.glb";
	renderer = new THREE.WebGLRenderer({ antialias: false });
	renderer.setClearColor( 0xffc9fd );
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
	camera.position.set(0, 0, 7);

	scene = new THREE.Scene();
	controls = new THREE.OrbitControls(camera);
	controls.target = new THREE.Vector3(0, 2, 0);
	mixer = null;
	scene.add(camera);

	var light = new THREE.AmbientLight( 0xffffff, 0.9 ); 
	scene.add( light );

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.2 );
	scene.add( directionalLight );

	document.body.append(renderer.domElement);

	var loader = new THREE.GLTFLoader();
	loader.load(avatar, function (gltf) {
		gltf.scene.traverse(function (child) {

		});

		scene.add(gltf.scene);

		if (gltf.animations && gltf.animations.length) {
			mixer = new THREE.AnimationMixer(gltf.scene);
			for (var i = 0; i < gltf.animations.length; i++) {
				var animation = gltf.animations[i];
				mixer.clipAction(animation).play();
			}
		}
	}, function (xhr) {
		//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	}, function (error) {
		console.log(error);
	});

	uniforms = {
    time:       { value: 1.0 },
    resolution: { value: new THREE.Vector2() },
    mouse: {type: "v2", value: new THREE.Vector2()}
	};

	var material = new THREE.ShaderMaterial( {
	    uniforms: uniforms,
	    vertexShader: document.getElementById( 'vertexShader' ).textContent,
	    fragmentShader: document.getElementById( 'fragment_shader' ).textContent
	} );

	var plane = new THREE.PlaneGeometry( 15, 10 );
	mesh = new THREE.Mesh( plane, material );
	mesh.position.y = 2.5;
	mesh.rotateX(Math.PI/360 * 45);
	scene.add( mesh );
}

function render() {
    uniforms.time.value += 0.01;
    renderer.render( scene, camera );
}

function animate() {
	requestAnimationFrame(animate);
    render();
	controls.update();
	if (mixer) {
		mixer.update(clock.getDelta() * mixer.timeScale);
	}
}

function resize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize);