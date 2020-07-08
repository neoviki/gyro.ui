/*
 *
 *             	Author	: Viki ( Vignesh Natarajan )
 *				Contact	: www.vikiworks.io
 */

var scene, camera, renderer, cube;
var stats;
var mesh;
var spotLight;
var stl_file="./royalty_free_models/flight_1.stl";
var scale_factor=6;
var fx=0, fy=0, fz=0;
var axes_length=100;
var axes;
var old_gx, old_gy, old_gz;

function init_perspective_camera()
{
	/*Field of View of camera in degrees*/
	fov = 60; 
	
	/*aspect ratio*/
	asp = (window.innerWidth / window.innerHeight); 

	/*Stop Rendering When Camera is nearer than */
	rend_near_limit = 0.1;

	/*Stop Rendering When Camera is farther than */
	rend_far_limit = 1000;

	/*Create camera object*/
	camera = new THREE.PerspectiveCamera( fov, asp, rend_near_limit, rend_far_limit);
}

function init_scene()
{
	var color = 0xc0c0c0;
	scene = new THREE.Scene();
	scene.background = new THREE.Color(color);
}

function init_spotlight()
{
    /* spotlight - for shadow */
    spotLight = new THREE.SpotLight(0xffffff);
}

function init_stats() {

	stats = new Stats();

	/* 
	 * 0: fps
	 * 1: ms 
	 *
	 */
	stats.setMode(0); 

	/* Alignment */
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';

	document.getElementById("stats_display_area").appendChild(stats.domElement);

	return stats;
}

function init_render_scene()
{
	/*render scene*/
	renderer = new THREE.WebGLRenderer();

	/*rendering area*/
	//renderer.setSize( window.innerWidth, window.innerHeight );
	//renderer.setSize( window.innerWidth/2, window.innerHeight/4 );
	//renderer.setSize( 500, 380, false);
	renderer.setSize( 500, 400, false);
        renderer.setClearColor(new THREE.Color(0xffffff, 1.0));
	renderer.shadowMapEnabled = true;

	/*Add render element to HTML Document*/
    container = document.getElementById("3d_file_display_area")
    container.appendChild(renderer.domElement);
}

function set_camera_position()
{
    /* position camera to - center of the scene */
    camera.position.x = 0;
    camera.position.y = 150;
    camera.position.z = 0;
    camera.lookAt(new THREE.Vector3(0, 1, 0));
}

function set_camera_facing_flight_nose()
{
    /* position camera to - center of the scene */
    camera.position.x = 0;
    camera.position.y = 150;
    camera.position.z = 0;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    spotLight.position.set(150, 150, 150);
    scene.add(spotLight);
	pitch(0); roll(180); yaw(0);
}

function set_camera_facing_flight_top()
{
    /* position camera to - center of the scene */
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 150;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    spotLight.position.set(100, 100, 200);
    scene.add(spotLight);
	pitch(0); roll(0); yaw(0);
}

function set_camera_facing_flight_bottom()
{
    /* position camera to - center of the scene */
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = -150;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    spotLight.position.set(0, 0, -200);
    scene.add(spotLight);
	pitch(0); roll(0); yaw(0);
}

function set_camera_facing_flight_right_side()
{
    /* position camera to - center of the scene */
    camera.position.x = 150;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    spotLight.position.set(150, 0, 0);
    scene.add(spotLight);
	pitch(270); roll(0); yaw(0); //right side
}



function set_camera_facing_flight_left_side()
{
    /* position camera to - center of the scene */
    camera.position.x = 150;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    spotLight.position.set(150, 0, 0);
    scene.add(spotLight);
	pitch(270); roll(0); yaw(180); //left side
}


function set_camera_facing_flight_tail()
{
    /* position camera to - center of the scene */
    camera.position.x = 0;
    camera.position.y = -150;
    camera.position.z = 0;
    camera.lookAt(new THREE.Vector3(0, 1, 0));
    spotLight.position.set(0, -200, 0);
    scene.add(spotLight);
	pitch(0); roll(0); yaw(0);
}

function loader_callback(geometry) {
	console.log(geometry);
	var material = new THREE.MeshLambertMaterial({color: 0xfade98, opacity: 1, transparent: true});
	//var material = new THREE.MeshNormalMaterial({color: 0xfade98, opacity: 2, transparent: true});
	mesh1 = new THREE.Mesh(geometry, material);
	mesh1.scale.set(scale_factor, scale_factor, scale_factor);
	mesh = new THREE.Object3D();
	mesh.add(mesh1);
	axes = new THREE.AxesHelper( axes_length);
	mesh.add(axes);
	scene.add(mesh);
}


function load_stl_file()
{
	var gui = new dat.GUI();
	var loader = new THREE.STLLoader();
	loader.load(stl_file, loader_callback);
}

function rotate_x( angle )
{
	fx += angle;

	if (mesh) {
		mesh.rotateX(degree2rad(angle));
	}


}

function rotate_y( angle )
{
	fy += angle;
    
	if (mesh) {
		mesh.rotateY(degree2rad(angle));
	}

}

function rotate_z( angle )
{
	fz += angle;

	if (mesh) {
		mesh.rotateZ(degree2rad(angle));
	}
}



function degree2rad(angle)
{
    var radians = ((Math.PI / 180) * angle);
    return radians;	
}


function update_flight_position_sensor(gx, gy, gz)
{
    var o, n;
    if (mesh) {
         o = old_gx; n = gx;

         for(i=o;i<=n; i++){
		    mesh.rotation.set(degree2rad(i), degree2rad(old_gy), degree2rad(old_gz));
         }

        o = old_gy; n = gy;

         for(i=o;i<=n; i++){
		    mesh.rotation.set(degree2rad(gx), degree2rad(i), degree2rad(old_gz));
         }

        o = old_gz; n = gz;

         for(i=o;i<=n; i++){
		    mesh.rotation.set(degree2rad(gx), degree2rad(gy), degree2rad(i));
         }
        
        old_gx = gx;
        old_gy = gy;
        old_gz = gz;
    }
}


function update_flight_position()
{
    if (mesh) {
		 mesh.rotation.set(degree2rad(fx), degree2rad(fy), degree2rad(fz));
	}
}

function yaw(angle){
    rotate_z(angle);
}


function pitch(angle){
    rotate_x(angle);
}

function roll(angle){
    rotate_y(angle);
}

function pitch_test_env_setup()
{
	//set_camera_facing_flight_left_side();
	set_camera_facing_flight_right_side();
}

function roll_test_env_setup()
{
	set_camera_facing_flight_nose();
}

function yaw_test_env_setup()
{
	set_camera_facing_flight_top();
	//roll(-20);
	//pitch(-15);
}

/*Animation Loop*/
function animate()
{
    //stats.update();
	//update_flight_position();
	//pitch(0.1);
	//roll(0.1);
	//yaw(0.1);
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

function display_3d_model(){
    //init_stats();
    init_perspective_camera();
    init_spotlight();
    init_scene();
    init_render_scene();
    //pitch_test_env_setup();
    //roll_test_env_setup();
    yaw_test_env_setup();
    load_stl_file();
    animate();
}

module.exports.display_3d_model = display_3d_model;
module.exports.update_flight_position_sensor = update_flight_position_sensor;
