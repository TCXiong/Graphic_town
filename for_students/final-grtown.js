/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";

import {main} from "../examples/main.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrBuilding, GrSimpleHouse1, GrSimpleHouse2, GrSimpleHouse3, GrTree ,towers} from "./buildings.js";
import {GrAvenue,GrBus,GrBus1,GrCar1,GrForkLift,Small_Truck, stopSign} from "./traffic.js";
import { decoration, flySeat, GrCarousel3 , GrPond, Human} from "./playgrounds.js";
import {GrHelicopter, GrHeli} from "./fly.js";
import { Snow } from "./snow.js";

/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world

let snowGround = new T.TextureLoader().load("./images/snow.jpg");
snowGround.wrapS = T.RepeatWrapping;
snowGround.wrapT = T.RepeatWrapping;
let snowMat = new T.MeshStandardMaterial({map:snowGround,roughness:0.4,metalness:0.1});


let world = new GrWorld({
    width: 800,
    height: 600,
    //change
    groundplanesize: 50 // make the ground plane big enough for a world of stuff
});
world.groundplane.mesh.material = snowMat

// put stuff into the world
// this calls the example code (that puts a lot of objects into the world)
// you can look at it for reference, but do not use it in your assignment


// main(world);

//skybox
let loader = new T.CubeTextureLoader();

    world.scene.background = loader.load([
        "./images/91_ft.png",
        "./images/91_bk.png",
        "./images/91_up.png",
        "./images/91_dn.png",
        "./images/91_rt.png", 
        "./images/91_lf.png"
    ]);


//houses for resident
for (let i = -10 ; i < 20 ; i+=10){
    let house1 = new GrSimpleHouse1({ length: 5, width: 6, height: 4, x: i, z: -25, index:1});
    world.add(house1);
}

for (let i = -10 ; i < 20 ; i+=10){
    let house2 = new GrSimpleHouse2({ length: 5, width: 6, height: 4, x: -25, z: i, index:3});
    house2.objects[0].rotateY(-Math.PI/2);
    world.add(house2);
}

for (let i = -10 ; i < 20 ; i+=10){
    let house3 = new GrSimpleHouse3({length: 5, width: 5, height: 4 , x: 25, z: i, index:2});
    house3.objects[0].rotateY(-Math.PI/2);
    world.add(house3);
}

let building = new GrBuilding()
building.setScale(3,3,3);
world.add(building);
building.objects[0].position.x = -4;
building.objects[0].position.z = 30;

//helicopter
let copter = new GrHelicopter();
copter.setScale(3);
copter.setPos(0,20,0);
world.add(copter);
let copter2 = new GrHeli();
copter2.setScale(1.2);
copter2.setPos(20,30,20)
world.add(copter2);


//towers
let tower = new towers();
let tower2 = new towers();
tower.setPos(30,0,-30);
tower2.setPos(-30,0,-30);
tower2.objects[0].rotateY(Math.PI);
world.add(tower);
world.add(tower2);

//road
let road = new GrAvenue();
world.add(road);



let stop1 = new stopSign();
stop1.setPos(17,0,12);
stop1.objects[0].rotateY(-Math.PI/2);
world.add(stop1);

let stop2 = new stopSign();
stop2.setPos(12,0,-14);
world.add(stop2);

let stop3 = new stopSign();
stop3.setPos(-14,0,-12);
stop3.objects[0].rotateY(Math.PI/2);
world.add(stop3);

let stop4 = new stopSign();
stop4.setPos(-12,0,14);
stop4.objects[0].rotateY(Math.PI);
world.add(stop4);

//vehicles 
let truck = new Small_Truck();
truck.setPos(39,0,30);
truck.setScale(0.8);
truck.objects[0].rotateY(Math.PI);
world.add(truck);

let bus = new GrBus();
bus.setPos(-18,0.5,-30);
bus.setScale(2.5)
world.add(bus);

let bus2 = new GrBus1()
bus2.setScale(2);
world.add(bus2)
let lift = new GrForkLift({x: 20, y: 0, z: 30});
world.add(lift);
//snow
let snow = new Snow();
world.add(snow);
    

let car = new GrCar1();
world.add(car);


//play
let fly = new flySeat()
fly.setPos(-8,0,-8);
world.add(fly);
let horse = new GrCarousel3()
horse.setPos(8,0,8);
world.add(horse);

//person
let person = new Human()
person.setPos(23,1,10);
world.add(person);

//pond
let pond = new GrPond();
pond.setPos(11,0,-4);
pond.setScale(0.7);
world.add(pond);

let decor = new decoration();
world.add(decor);


//trees
let i; let j;
for (i =12; i>-21; i=i-5) {
  let tree = new GrTree(i,0,40,20);
  tree.setScale(1,1.6,1)
  world.add(tree);
}

for (i =12; i>-21; i=i-5) {
 let tree = new GrTree(i,0,-42,20);
 tree.setScale(1,1.6,1)
 world.add(tree);
}

for (i=13; i>-21; i=i-5) {
 let tree = new GrTree(-40,0,i,20);
 tree.setScale(1,1.9,1)
 world.add(tree);
}

for (i=-15; i<15; i=i+5) {
 let tree = new GrTree(40,0,i,20);
 tree.setScale(1,1.7,1)
 world.add(tree);
}


// while making your objects, be sure to identify some of them as "highlighted"

///////////////////////////////////////////////////////////////
// because I did not store the objects I want to highlight in variables, I need to look them up by name
// This code is included since it might be useful if you want to highlight your objects here
function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}
// of course, the student should highlight their own objects, not these
// highlight("SimpleHouse-5");
// highlight("Helicopter-0");
// highlight("Track Car");
// highlight("MorphTest");
highlight("towers");
highlight("tree_1");
highlight("SimpleHouse1-1");
highlight("SimpleHouse2-1");
highlight("SimpleHouse3-1");
highlight("Apartment");
highlight("Carousel");
highlight("flySeat");
highlight("pond");
highlight("truck");
highlight("sphere_decoration");
highlight("Blue Bus");
highlight("forkLift");
highlight("person");
highlight("car");
highlight("bus");
highlight("Helicopter");
highlight("Helicopter2");
highlight("person");
highlight("stopSign_1");

///////////////////////////////////////////////////////////////
// build and run the UI
// only after all the objects exist can we build the UI
// @ts-ignore       // we're sticking a new thing into the world
world.ui = new WorldUI(world);
// now make it go!
world.go();
