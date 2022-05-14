import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";
import { MeshBasicMaterial } from "../libs/CS559-THREE/build/three.module.js";


// A Carousel.
/**
 * @typedef flySeatProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class flySeat extends GrObject {
  /**
   * @param {flySeatProperties} params
   */
  constructor(params = {}) {
    let width = 3;
    let fly = new T.Group();

    //base part
    let base_geom = new T.CylinderGeometry(width, width, 1, 32);
    let base_mat = new T.MeshStandardMaterial({
      color: "lightblue",
      metalness: 0.3,
      roughness: 0.8
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.5);
    fly.add(base);

    let platform_group = new T.Group();
    base.add(platform_group);
    platform_group.translateY(0.5);

    let platform_geom = new T.CylinderGeometry(
      0 * width,
      0 * width,
      0.2,
      32
    );
    let platform_mat = new T.MeshStandardMaterial({
      color: "gold",
      metalness: 0.3,
      roughness: 0.8
    });
    let platform = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(platform);

    let cpole_geom = new T.CylinderGeometry(0.3 * width, 0.8 * width, 10, 16);
    let cpole_mat = new T.MeshStandardMaterial({
      color: "gold",
      metalness: 0.8,
      roughness: 0.5
    });
    let cpole = new T.Mesh(cpole_geom, cpole_mat);
    platform_group.add(cpole);
    cpole.translateY(1.5);

    let top_trim = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(top_trim);
    top_trim.translateY(3);

    //line
    let opole_geom = new T.CylinderGeometry(0.03 * width, 0.03 * width, 8, 16);
    let opole_mat = new T.MeshStandardMaterial({
      color: "#aaaaaa",
      metalness: 0.8,
      roughness: 0.5
    });
    let opole;
    let num_poles = 10;
    let poles = [];
    let arr = [];

    for (let i = 0; i < num_poles; i++) {
      opole = new T.Mesh(opole_geom, opole_mat);
      platform_group.add(opole);
      opole.translateY(4.5);
      opole.rotateY((2 * i * Math.PI) / num_poles);
      opole.translateX(0.8 * width);
      opole.rotateZ(Math.PI/4)
      poles.push(opole);
      
      let geo = new T.BoxGeometry(0.2*width, 0.2*width, 0.2*width)
		  let mt = new T.MeshStandardMaterial({color:"yellow", metalness:0.8, roughness:0.3});
      let fly_obj = new T.Mesh(geo, mt);
			platform_group.add(fly_obj);
      fly_obj.translateY(2.1);
      fly_obj.rotateY(2*i*Math.PI/num_poles);
			fly_obj.translateX(1.7*width);
    
			arr.push(fly_obj);
    }

    let roof_geom = new T.ConeGeometry(width, 0.5 * width, 32, 4);
    let roof = new T.Mesh(roof_geom, base_mat);
    fly.add(roof);
    roof.translateY(7.8);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`flySeat`, fly);
    this.whole_ob = fly;
    this.platform = platform_group;
    this.poles = poles;
    this.horses = arr;
    
    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    fly.scale.set(scale, scale, scale);

  }
  /**
   * StepWorld method
   * @param {*} delta 
   * @param {*} timeOfDay 
   */

   stepWorld(delta, timeOfDay) {
    this.platform.rotateY(-0.003 * delta);
  }
}




//from workbook solution made by professor

// A Carousel, made by Gia-Phong Nguyen
/**
 * @typedef CarouselProperties3
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCarousel3 extends GrObject {
  /**
   * @param {CarouselProperties3} params
   */
  constructor(params = {}) {
    let width = 3;
    let carousel = new T.Group();

    let base_geom = new T.CylinderGeometry(width, width, 1, 32);
    let base_mat = new T.MeshStandardMaterial({
      color: "lightblue",
      metalness: 0.3,
      roughness: 0.8
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.5);
    carousel.add(base);

    let platform_group = new T.Group();
    base.add(platform_group);
    platform_group.translateY(0.5);

    let platform_geom = new T.CylinderGeometry(
      0.95 * width,
      0.95 * width,
      0.2,
      32
    );
    let platform_mat = new T.MeshStandardMaterial({
      color: "gold",
      metalness: 0.3,
      roughness: 0.8
    });
    let platform = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(platform);

    let cpole_geom = new T.CylinderGeometry(0.3 * width, 0.3 * width, 3, 16);
    let cpole_mat = new T.MeshStandardMaterial({
      color: "gold",
      metalness: 0.8,
      roughness: 0.5
    });
    let cpole = new T.Mesh(cpole_geom, cpole_mat);
    platform_group.add(cpole);
    cpole.translateY(1.5);

    let top_trim = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(top_trim);
    top_trim.translateY(3);

    let opole_geom = new T.CylinderGeometry(0.03 * width, 0.03 * width, 3, 16);
    let opole_mat = new T.MeshStandardMaterial({
      color: "#aaaaaa",
      metalness: 0.8,
      roughness: 0.5
    });
    let opole;
    let num_poles = 8;
    let poles = [];
    for (let i = 0; i < num_poles; i++) {
      opole = new T.Mesh(opole_geom, opole_mat);
      platform_group.add(opole);
      opole.translateY(1.5);
      opole.rotateY((2 * i * Math.PI) / num_poles);
      opole.translateX(0.8 * width);
      poles.push(opole);
    }

    // Returns a Group for the horse with a given color
    let createHorse = (color) => {
      let horse = new T.Group();
      let horseMat = new T.MeshStandardMaterial({
        color: color,
        metalness: .3,
        roughness: .4
      });

      // horse body
      let bodyShape = new T.Shape();
      bodyShape.moveTo(-3, -1); // CS559 Sample Code
      bodyShape.lineTo(-3, .5);
      bodyShape.lineTo(-2, 1);
      bodyShape.lineTo(3, 1);
      bodyShape.lineTo(3, 0);
      bodyShape.lineTo(2.5, -1);

      let exSettingsBody = {
        steps: 2,
        depth: 1.2,
        bevelEnabled: true,
        bevelThickness: .6,
        bevelSize: .6,
        bevelSegments: 1
      };

      let bodyGeom = new T.ExtrudeGeometry(bodyShape, exSettingsBody);
      let bodyMesh = new T.Mesh(bodyGeom, horseMat);
      bodyMesh.rotation.y = Math.PI / 2;
      bodyMesh.position.x = -.6;

      horse.add(bodyMesh);

      // horse head
      let headShape = new T.Shape();
      headShape.moveTo(1, .5); // CS559 Sample Code
      headShape.lineTo(4, 3.5);
      headShape.lineTo(5.5, 3);
      headShape.lineTo(5, 2.5);
      headShape.lineTo(4, 2.5);
      headShape.lineTo(3, .5);

      let exSettingsHead = {
        steps: 2,
        depth: .6,
        bevelEnabled: true,
        bevelThickness: .5,
        bevelSize: .5,
        bevelSegments: 1
      };

      let headGeom = new T.ExtrudeGeometry(headShape, exSettingsHead);
      let headMesh = new T.Mesh(headGeom, horseMat);
      headMesh.rotation.y = Math.PI / 2;
      headMesh.position.x = -.3;

      horse.add(headMesh);

      // horse legs
      let legShape = new T.Shape();
      legShape.moveTo(-2, 0); // CS559 Sample Code
      legShape.lineTo(2, 0);
      legShape.lineTo(2.5, -1);
      legShape.lineTo(3, -2);
      legShape.lineTo(2.5, -2.5);
      legShape.lineTo(1.5, -2.5);
      legShape.lineTo(2, -2);
      legShape.lineTo(1.5, -1);
      legShape.lineTo(1.5, -.5);
      legShape.lineTo(-1.5, -.5);
      legShape.lineTo(-1.5, -1);
      legShape.lineTo(-2, -2);
      legShape.lineTo(-3, -2.5);
      legShape.lineTo(-3.5, -2);
      legShape.lineTo(-2.5, -1.5);
      legShape.lineTo(-2.5, 0);

      let exSettingsLegs = {
        steps: 2,
        depth: .2,
        bevelEnabled: true,
        bevelThickness: .2,
        bevelSize: .2,
        bevelSegments: 1
      };

      let legGeom = new T.ExtrudeGeometry(legShape, exSettingsLegs);
      let legMesh1 = new T.Mesh(legGeom, horseMat);
      let legMesh2 = new T.Mesh(legGeom, horseMat);

      legMesh1.position.y = -.8; // CS559 Sample Code
      legMesh1.rotation.y = Math.PI / 2;
      legMesh1.position.x = -.1 - .6;

      legMesh2.position.y = -.8; // CS559 Sample Code
      legMesh2.rotation.y = Math.PI / 2;
      legMesh2.position.x = -.1 + .6;

      horse.add(legMesh1);
      horse.add(legMesh2);

      horse.scale.set(.2, .2, .15);
      return horse;
    };

    // add a horse to each pole
    let horses = [];
    for (let i = 0; i < num_poles; i++) {
      // generate color for horse
      let color = "#" + (Math.floor(50 + Math.random() * 100 - 50)).toString(16) +
        (Math.floor(170 + Math.random() * 100 - 50)).toString(16) +
        (Math.floor(220 + Math.random() * 50 - 25)).toString(16); // CS559 Sample Code
      let horse = createHorse(color);
      // add horse to main group
      platform_group.add(horse);
      horse.translateY(1.5);
      // rotate horse to be perpendicular to carousel
      horse.rotateY((2 * i * Math.PI) / num_poles);
      horse.translateX(0.8 * width);
      horses.push(horse);
    }

    let roof_geom = new T.ConeGeometry(width, 0.5 * width, 32, 4);
    let roof = new T.Mesh(roof_geom, base_mat);
    carousel.add(roof);
    roof.translateY(4.8);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`Carousel`, carousel);
    this.whole_ob = carousel;
    this.platform = platform_group;
    this.poles = poles;
    this.horses = horses;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    carousel.scale.set(scale, scale, scale);

    this.time = 0;
  }
  stepWorld(delta, timeOfDay) {
    this.time += delta / 500;
    this.platform.rotation.y = this.time;
    // make the horses go up and down using sin function
    for (let i = 0; i < this.horses.length; i++) {
      this.horses[i].position.y = Math.sin(this.time + (i * this.horses.length) / (Math.PI * 2)) / 2 + 1.5;
    }
  }
}


export class GrPond extends GrObject{
    constructor(){
      let pond = new T.Group();
      let shaderMat = shaderMaterial("./Shaders/pond.vs", "./Shaders/pond.fs", {
        side: T.DoubleSide,
        uniforms: {
          time:{value:0}
        },
      });
      let tex = new T.TextureLoader().load("./images/pattern.png");

      let baseTexture = new T.MeshBasicMaterial({color:"grey",map:tex})
  
      let side1 = new T.Mesh(new T.BoxGeometry(6,2.5,1), baseTexture);
      side1.translateY(1);
      side1.translateZ(4);
      pond.add(side1);

      let side2 = new T.Mesh(new T.BoxGeometry(6,2.5,1), baseTexture);
      side2.translateY(1);
      side2.translateZ(-4);
      pond.add(side2);

      let side3 = new T.Mesh(new T.BoxGeometry(1,2.5,9), baseTexture);
      side3.translateY(1);
      side3.translateX(3);
      pond.add(side3);

      let side4 = new T.Mesh(new T.BoxGeometry(1,2.5,9), baseTexture);
      side4.translateY(1);
      side4.translateX(-3);
      pond.add(side4);

      let obj = new T.BoxGeometry(6,1,8);
      let me = new T.Mesh(obj, shaderMat)
      me.translateY(1);

      pond.add(me);
    
      super("pond",pond);
      this.time = 0;
      this.shaderMat = shaderMat;
    }

    stepWorld(delta, timeOfDay){
      this.time += 0.01 * delta;
      this.shaderMat.uniforms.time.value = this.time*1;
    }
}


export class decoration extends GrObject{
    constructor(){
      let SphereObj = new T.Group();
      let shaderMat = shaderMaterial("./Shaders/sphere.vs", "./Shaders/sphere.fs", {
        side: T.DoubleSide,
        uniforms: {
              time:{value:0}
        },
      });
      let obj = new T.Mesh(new T.SphereBufferGeometry(3, 200, 200), shaderMat);
      SphereObj.add(obj);

      let support = new T.Mesh(new T.CylinderBufferGeometry(0.4,0.4,9),new MeshBasicMaterial({color:"grey"}))
      SphereObj.add(support);

      obj.translateY(5);

      super("sphere_decoration", SphereObj);
      this.time = 0;
      this.shaderMat = shaderMat;
      this.bigobj = obj;
      
    }

    stepWorld(delta, timeOfDay){
      this.time += 0.01 * delta;
      this.shaderMat.uniforms.time.value = this.time*1;
      this.bigobj.position.y = Math.abs( Math.sin(this.time)+5)
    }

}


/**
 * @property {number} x
 * @property {number} z
 */
export class Human extends GrObject {
    constructor(x = 0, z = 0, center = 0, move=true) {
        let human = new T.Group();
      
        let head = new T.Mesh(new T.BoxGeometry(1.5, 1.5, 1), 
                              new T.MeshStandardMaterial({ color: "pink" }));
     
        let body = new T.Mesh(new T.BoxGeometry(2.5, 3, 1.6), 
                              new T.MeshStandardMaterial({ color: "green" }));
        body.add(head);
        head.translateY(2);
        human.add(body);

        let arm_obj = new T.BoxGeometry(0.5, 2.5, 0.5);
        arm_obj.translate(0, -1.1, 0);
        let arm_Material = new T.MeshStandardMaterial({ color: "pink" });
        let armLeft = new T.Mesh(arm_obj, 
                    arm_Material);
        let armRight = new T.Mesh(arm_obj, 
                    arm_Material);

        body.add(armLeft, armRight);
        armLeft.translateX(1.5);
        armLeft.translateY(0.5);
        armRight.translateX(-1.5);
        armRight.translateY(0.5);

        let leg_Geom = new T.BoxGeometry(0.7, 2, 0.7);
        leg_Geom.translate(0, -0.9, 0);
   
        let legLeft = new T.Mesh(leg_Geom, 
          new T.MeshStandardMaterial({ color: "brown" }));
        let legRight = new T.Mesh(leg_Geom, 
          new T.MeshStandardMaterial({ color: "brown" }));

        body.add(legLeft, legRight);
        legLeft.translateX(0.6);
        legLeft.translateY(-1.6);
        legRight.translateX(-0.6);
        legRight.translateY(-1.6);

        let armAndLegs = [];
        armAndLegs.push(armLeft, armRight, legRight, legLeft);
        human.scale.set(0.3, 0.3, 0.3);
        human.rotateY(Math.PI / 2);
        let wrapper = new T.Group();
        wrapper.add(human);
        super(`person`, wrapper);
        wrapper.translateY(0.9);
        wrapper.translateX(x);
        wrapper.translateZ(z);
        this.time = 0;
        this.whole_ob = wrapper;
        this.state = move ? 0 : 3;
        this.distanceCount = 0;
        this.forward = 0;
        this.currentAngle = 0;
        this.goalAngle = Math.PI;
        this.check = true;
        this.stepWorld = function (delta, timeOfDay) {
            this.time += delta / 1000;
            let t = this.time % 1;

            armAndLegs.forEach(function (part, index) {
            
              if (index % 2 == 0 ) {
                part.rotateX(0.02 * Math.cos(Math.PI * 2 * t + Math.PI));
            } else {
                part.rotateX(0.02 * Math.cos(Math.PI * 2 * t));
            }
            
        });
            switch(this.state){

              case 0:
                this.state = 1;
                break;
              case 1:
                if (wrapper.position.x - center > 11){
                  wrapper.position.x -= 0.01;
                  
                }else{
                  this.state = 2;
                }
                
                break;
              case 2:
                if (this.goalAngle - this.currentAngle > 0.01) {
                  this.currentAngle += 0.1;
              } else {
                  this.goalAngle -= Math.PI;
                  this.state = 3 // moving to next destination
              }
              wrapper.setRotationFromEuler(new T.Euler(0, this.currentAngle, 0));
              break;

              case 3:
                if (wrapper.position.x - center < 23){
                  wrapper.position.x += 0.01;
                  
                }else{
                  this.state = 1;
                }

            }
        }
    }
}

