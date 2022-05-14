/*jshint esversion: 6 */
// @ts-check


import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import * as Geom from "../libs/CS559-Three/examples/jsm/deprecated/Geometry.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

let imageFolder = "./images/";


export class GrBuilding extends GrObject{
  constructor () {
    let building = new T.Group();

    let houseObj = new Geom.Geometry();
    houseObj.vertices.push(new T.Vector3(-1,1,0)); 
    houseObj.vertices.push(new T.Vector3( 0,0,0)); 
    houseObj.vertices.push(new T.Vector3( -1,0,0)); 
    houseObj.vertices.push(new T.Vector3( 0,1,0)); 

    houseObj.faceVertexUvs = [[]];
    houseObj.faces.push(new Geom.Face3(1,0,2));
    houseObj.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(0,1), new T.Vector2(0,0)]);
    houseObj.faces.push(new Geom.Face3(1,3,0));
    houseObj.faceVertexUvs[0].push([new T.Vector2(1,0), new T.Vector2(1,1), new T.Vector2(0,1)]);
    
    houseObj.computeFaceNormals();
    houseObj.uvsNeedUpdate=true;

    let t = new T.TextureLoader().load("./images/window.png");
    let mat = new T.MeshStandardMaterial({map:t, bumpMap: t, roughness:0.75});

    for(let i=0; i<5; i++){
        for(let j=0; j<3; j++){
            let block = new T.Mesh(houseObj.toBufferGeometry(),mat);
            block.position.set(j,i,0);
            building.add(block);
        }
    }
    for(let i=0; i<5; i++){
        for(let j=0; j<3; j++){
            let block = new T.Mesh(houseObj.toBufferGeometry(),mat);
            block.position.set(j-1,i,-2);
            block.rotation.set(0,Math.PI,0);
            building.add(block);
        }
    }
    
    let left = new T.Group();
    for(let i=0; i<5; i++){
        for(let k=0; k<2; k++){
            let block = new T.Mesh(houseObj.toBufferGeometry(),mat);
            block.position.set(k,i,-2);
            left.add(block);
        }
    }
    left.rotation.set(0,-Math.PI/2,0);
    left.position.set(-3,0,-1);
    building.add(left);

    let right = new T.Group();
    for(let i=0; i<5; i++){
        for(let j=0; j<2; j++){
            let block = new T.Mesh(houseObj.toBufferGeometry(),mat);
            block.position.set(j,i,-2);
            right.add(block);
        }
    }
    right.rotation.set(0,Math.PI/2,0);
    right.position.set(4,0,-1);
    building.add(left);
    building.add(right);


    let texture = new T.TextureLoader().load("./images/roof.jpg")
    let roof = new T.Mesh(new T.PlaneGeometry(3,2), 
    new T.MeshStandardMaterial({map: texture, bumpMap: texture, roughnessMap: texture, metalnessMap: texture}))
    roof.position.set(0.5,5,-1);
    roof.rotation.set(-Math.PI/2, 0,0);
    building.add(roof);


    let loader = new OBJLoader();
        loader.load("dish.obj", function(obj){
            obj.scale.set(0.3,0.3,0.3);
            obj.translateY(5);
            obj.translateX(1);
            obj.translateZ(-1);
            obj.rotateY(Math.PI/4);
            building.add(obj);
        })

    super("Apartment", building);
}
}



let count = 0;
export class GrTree extends GrObject {
    constructor(x, y, z, num=10) {
 
    let pointsConstruct = [new T.Vector2(0.5, 0), new T.Vector2(0.2, 8)];
    let treeStem = new T.LatheGeometry(pointsConstruct, 20);
    treeStem.computeVertexNormals();
  
    let treeBranch = new T.LatheGeometry(pointsConstruct, 20);
    treeBranch.computeVertexNormals()
   
    treeBranch.rotateX(Math.PI/2);

    let treebase = new T.Mesh(new T.LatheGeometry(pointsConstruct, 20), 
    new T.MeshStandardMaterial({color: "brown", roughness: 1}));


    for (let i = 0; i < num; i++) {
    
        let y = Math.random()*6;
        let leaf = new T.Mesh(new T.LatheGeometry(pointsConstruct, 20), 
            new T.MeshStandardMaterial({color: "brown", roughness: 1}));


            leaf.lookAt(new T.Vector3(Math.cos(Math.random()*Math.PI*2)*Math.sin(Math.PI/2 - Math.random()*Math.PI/4), 
                                  Math.cos(Math.PI/2 - Math.random()*Math.PI/4), 
                                  Math.sin(Math.PI/2 - Math.random()*Math.PI/4)*Math.sin(Math.random()*Math.PI*2)));
                                  leaf.position.y = y + 2;
        let scale = 2/leaf.position.y; 
      
        leaf.scale.set((2/leaf.position.y + 1)*0.25, (2/leaf.position.y + 1)*0.25, (2/leaf.position.y + 1)*0.25);
        treebase.add(leaf);
        let chunk = new T.SphereGeometry((scale + 6)/2, 6, 3);
        chunk.computeVertexNormals();
        // chunk.computeFlatVertexNormals();
        let mat = new T.MeshStandardMaterial({color: "#009933", roughness: 1, metalness: 0})
        let chunkMesh = new T.Mesh(chunk, mat);
        leaf.add(chunkMesh);
        chunkMesh.position.z = 8;
    }
    treebase.position.set(x, y, z);
    treebase.scale.set(0.2, 0.2, 0.2);
    count++;
    super(`tree_${count}`, treebase);
    }
}


//from sample solution in the workbook 

/** @type {number} */ let simpleHouse1Count = 0;
/** @type {T.BoxBufferGeometry} */ const boxGeometry = new T.BoxBufferGeometry();
/** @type {T.Shape} */ const triangle = new T.Shape();
triangle.moveTo(0, 1);
triangle.lineTo(-0.5, 0);
triangle.lineTo(0.5, 0);
triangle.lineTo(0, 1);
/** @type {T.ExtrudeBufferGeometry} */ const triangleGeometry = new T.ExtrudeBufferGeometry(triangle, { depth: 1, bevelEnabled: false });
/** @type {String[]} */ const houseColors = ["rgb(240, 240, 240)", "rgb(180, 175, 100)", "rgb(200, 100, 100)", "rgb(147, 144, 244)", "rgb(250, 249, 157)", "rgb(199, 144, 186)"];
/** @type {T.TextureLoader} */ const textureLoader = new T.TextureLoader();
/** @type {T.Texture} */ const simpleHouse1Texture = textureLoader.load(imageFolder + "simpleHouse1-front.png");
/** @type {T.MeshPhongMaterial[]} */ const simpleHouseMaterials = houseColors.map(c => new T.MeshPhongMaterial({ color: c }));
/** @type {T.MeshPhongMaterial[]} */ const simpleHouse1TextureMaterials = houseColors.map(c => new T.MeshPhongMaterial({ color: c, map: simpleHouse1Texture }));
export class GrSimpleHouse1 extends GrObject {
  /**
   * The constructor
   * @param {Object} params Parameters
   */
  constructor(params = {}) {
    // Set up an empty group and call the GrObject constructor
    /** @type {T.Group} */ const houseGroup = new T.Group();
    super(`SimpleHouse1-${++simpleHouse1Count}`, houseGroup);
    // Copy all the parameters with defaults
    /** @type {number} */ const length = params.length || 1; // The length
    /** @type {number} */ const width = params.width || 1; // The width
    /** @type {number} */ const height = params.height || 1; // The height
    /** @type {number} */ const x = params.x || 0; // Position x
    /** @type {number} */ const y = params.y || 0; // Position y
    /** @type {number} */ const z = params.z || 0; // Position z
    /** @type {number} */ const scale = params.scale || 1; // Scale
    /** @type {number} */ const color = params.index || 0; // Color
    /** @type {T.MeshPhongMaterial} */ const door = simpleHouse1TextureMaterials[color];
    /** @type {T.MeshPhongMaterial} */ const wall = simpleHouseMaterials[color];
    /** @type {T.Mesh} */ const base = new T.Mesh(boxGeometry, [wall, wall, wall, wall, door, door]);
    /** @type {T.Mesh} */ const roof = new T.Mesh(triangleGeometry, wall);
    // Set the transformations for the base
    base.scale.set(length, height, width);
    base.translateY(height * 0.5); // CS559 Sample Code
    // Set the transformations for the roof
    roof.scale.set(length, height * 0.5, width);
    roof.position.set(0, height, -width * 0.5); // CS559 Sample Code
    // Put everything into the group and transform the group
    houseGroup.add(base, roof);
    houseGroup.position.set(x, y, z); // CS559 Sample Code
    houseGroup.scale.set(scale, scale, scale);
  }
}

/** @type {number} */ let simpleHouse2Count = 0;
/** @type {T.Texture} */ const simpleHouse2Texture = textureLoader.load(imageFolder + "simpleHouse2-front.png");
/** @type {T.Texture} */ const simpleRoof2Texture = textureLoader.load(imageFolder + "roof3.png");
simpleRoof2Texture.rotation = Math.PI * 1.5;
simpleRoof2Texture.center.set(0.5, 0.5);
/** @type {T.MeshPhongMaterial[]} */ const simpleHouse2TextureMaterials = houseColors.map(c => new T.MeshPhongMaterial({ color: c, map: simpleHouse2Texture }));
/** @type {T.MeshPhongMaterial[]} */ const simpleRoof2Materials = houseColors.map(c => new T.MeshPhongMaterial({ color: c, map: simpleRoof2Texture }));
export class GrSimpleHouse2 extends GrObject {
  /**
   * The constructor
   * @param {Object} params Parameters
   */
  constructor(params = {}) {
    // Set up an empty group and call the GrObject constructor
    /** @type {T.Group} */ const houseGroup = new T.Group();
    super(`SimpleHouse2-${++simpleHouse2Count}`, houseGroup);
    // Copy all the parameters with defaults
    /** @type {number} */ const length = params.length || 1; // The length
    /** @type {number} */ const width = params.width || 1; // The width
    /** @type {number} */ const height = params.height || 1; // The height
    /** @type {number} */ const x = params.x || 0; // Position x
    /** @type {number} */ const y = params.y || 0; // Position y
    /** @type {number} */ const z = params.z || 0; // Position z
    /** @type {number} */ const scale = params.scale || 1; // Scale
    /** @type {number} */ const color = params.index || 0; // Color
    /** @type {T.MeshPhongMaterial} */ const door = simpleHouse2TextureMaterials[color];
    /** @type {T.MeshPhongMaterial} */ const wall = simpleHouseMaterials[color];
    /** @type {T.MeshPhongMaterial} */ const top = simpleRoof2Materials[color];
    /** @type {T.Mesh} */ const base = new T.Mesh(boxGeometry, [wall, wall, wall, wall, door, door]);
    /** @type {T.Mesh} */ const roof = new T.Mesh(triangleGeometry, [wall, top]);
    // Set the transformations for the base
    base.scale.set(length, height, width);
    base.translateY(height * 0.5); // CS559 Sample Code
    // Set the transformations for the roof
    roof.scale.set(width, height * 0.5, length);
    roof.position.set(-length * 0.5, height, 0); // CS559 Sample Code
    roof.rotateY(Math.PI * 0.5);
    // Put everything into the group and transform the group
    houseGroup.add(base, roof);
    houseGroup.position.set(x, y, z); // CS559 Sample Code
    houseGroup.scale.set(scale, scale, scale);
  }
}


//from workbook solution

/** @type {number} */ let simpleHouse3Count = 0;
/** @type {T.ConeBufferGeometry} */ const pyramidGeometry = new T.ConeBufferGeometry(1, 1, 4);
/** @type {T.Texture} */ const simpleHouse3Texture = textureLoader.load(imageFolder + "simpleHouse3-side.png");
/** @type {T.Texture} */ const simpleRoof3Texture = textureLoader.load(imageFolder + "roof3.png");
simpleRoof3Texture.wrapS = T.RepeatWrapping;
simpleRoof3Texture.repeat.set(4, 1);
/** @type {T.MeshPhongMaterial[]} */ const simpleHouse3TextureMaterials = houseColors.map(c => new T.MeshPhongMaterial({ color: c, map: simpleHouse3Texture }));
/** @type {T.MeshPhongMaterial[]} */ const simpleRoof3Materials = houseColors.map(c => new T.MeshPhongMaterial({ color: c, map: simpleRoof3Texture }));
export class GrSimpleHouse3 extends GrObject {
  /**
   * The constructor
   * @param {Object} params Parameters
   */
  constructor(params = {}) {
    // Set up an empty group and call the GrObject constructor
    /** @type {T.Group} */ const houseGroup = new T.Group();
    super(`SimpleHouse3-${++simpleHouse3Count}`, houseGroup);
    // Copy all the parameters with defaults
    /** @type {number} */ const length = params.length || 1; // The length
    /** @type {number} */ const width = params.width || 1; // The width
    /** @type {number} */ const height = params.height || 1; // The height
    /** @type {number} */ const x = params.x || 0; // Position x
    /** @type {number} */ const y = params.y || 0; // Position y
    /** @type {number} */ const z = params.z || 0; // Position z
    /** @type {number} */ const scale = params.scale || 1; // Scale
    /** @type {number} */ const color = params.index || 0; // Color
    /** @type {T.MeshPhongMaterial} */ const door = simpleHouse2TextureMaterials[color];
    /** @type {T.MeshPhongMaterial} */ const window = simpleHouse3TextureMaterials[color];
    /** @type {T.MeshPhongMaterial} */ const wall = simpleHouseMaterials[color];
    /** @type {T.MeshPhongMaterial} */ const top = simpleRoof3Materials[color];
    /** @type {T.Mesh} */ const base = new T.Mesh(boxGeometry, [window, window, wall, wall, door, door]);
    /** @type {T.Mesh} */ const roof = new T.Mesh(pyramidGeometry, top);
    // Set the transformations for the base
    base.scale.set(length, height, width);
    base.translateY(height * 0.5); // CS559 Sample Code
    // Set the transformations for the roof
    roof.scale.set(width * 0.5 * Math.SQRT2, height * 0.5, length * 0.5 * Math.SQRT2);
    roof.position.set(0, height * 1.25, 0); // CS559 Sample Code
    roof.rotateY(Math.PI * 0.25);
    // Put everything into the group and transform the group
    houseGroup.add(base, roof);
    houseGroup.position.set(x, y, z); // CS559 Sample Code
    houseGroup.scale.set(scale, scale, scale);
  }
}

/** @type {number} */ let churchCount = 0;
/** @type {T.Texture} */ const churchFrontTexture = textureLoader.load(imageFolder + "church-front.png");
/** @type {T.Texture} */ const churchSideTexture = textureLoader.load(imageFolder + "church-side.png");
/** @type {T.MeshPhongMaterial} */ const churchMaterial = new T.MeshPhongMaterial({ color: "rgb(60%, 70%, 80%)", flatShading: true });
/** @type {T.MeshPhongMaterial} */ const churchFrontMaterial = new T.MeshPhongMaterial({ color: "rgb(60%, 70%, 80%)", map: churchFrontTexture });
/** @type {T.MeshPhongMaterial} */ const churchSideMaterial = new T.MeshPhongMaterial({ color: "rgb(60%, 70%, 80%)", map: churchSideTexture });
export class GrChurch extends GrObject {
  /**
   * The constructor
   * @param {Object} params Parameters
   */
  constructor(params = {}) {
    // Set up an empty group and call the GrObject constructor
    /** @type {T.Group} */ const churchGroup = new T.Group();
    super(`Church-${++churchCount}`, churchGroup);
    // Copy all the parameters with defaults
    /** @type {number} */ const length = params.length || 1; // The length
    /** @type {number} */ const width = params.width || 1; // The width
    /** @type {number} */ const height = params.height || 1; // The height
    /** @type {number} */ const x = params.x || 0; // Position x
    /** @type {number} */ const y = params.y || 0; // Position y
    /** @type {number} */ const z = params.z || 0; // Position z
    /** @type {number} */ const scale = params.scale || 1; // Scale
    /** @type {T.MeshPhongMaterial} */ const door = churchFrontMaterial;
    /** @type {T.MeshPhongMaterial} */ const window = churchSideMaterial;
    /** @type {T.MeshPhongMaterial} */ const wall = churchMaterial;
    /** @type {T.Mesh} */ const base = new T.Mesh(boxGeometry, [window, window, wall, wall, door, door]);
    /** @type {T.Mesh} */ const roof = new T.Mesh(triangleGeometry, wall);
    /** @type {T.Mesh} */ const steeple = new T.Mesh(boxGeometry, wall);
    /** @type {T.Mesh} */ const top = new T.Mesh(pyramidGeometry, wall);
    // Set the transformations for the base
    base.scale.set(length, height, width);
    base.translateY(height * 0.5); // CS559 Sample Code
    // Set the transformations for the roof
    roof.scale.set(length, length * 0.25, width);
    roof.position.set(0, height, -0.5 * width); // CS559 Sample Code
    // Set the transformations for the steeple
    steeple.scale.set(width * 0.25, length, width * 0.25);
    steeple.position.set(0, length * 0.5, width * 0.5); // CS559 Sample Code
    // Set the transformations for the top
    top.scale.set(width * 0.125 * Math.SQRT2, length, width * 0.125 * Math.SQRT2);
    top.position.set(0, length * 1.5, width * 0.5); // CS559 Sample Code
    top.rotateY(Math.PI * 0.25);
    // Put everything into the group and transform the group
    churchGroup.add(base, roof, steeple, top);
    churchGroup.position.set(x, y, z); // CS559 Sample Code
    churchGroup.scale.set(scale, scale, scale);
  }
}

// using loader
export class towers extends GrObject{
    constructor(){
        let group = new T.Group();

        let obj1 = new Loaders.ObjGrObject({
            obj:"tower.obj",
            mtl:"tower.mtl",
            mtloptions: {side:T.DoubleSide},
            callback: function (obj) {
                console.log(obj);
                obj1.objects.forEach(ob => console.log(ob));
                
            }
          });
          obj1.objects[0].rotateX(-Math.PI/2);
          
          obj1.objects[0].translateZ(33);
          
          obj1.objects[0].scale.set(0.001,0.001,0.001);
          group.add(obj1.objects[0]);
        super("towers",group);
    }
}






