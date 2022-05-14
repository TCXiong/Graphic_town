import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

export class GrHelicopter extends GrObject{
    constructor(){

        let group = new T.Group();
        super("Helicopter",group);
        this.cop = group;
       
        let loader = new T.TextureLoader()
        let text = loader.load("./images/heli.png");

        let mesh = new T.Mesh(new T.SphereBufferGeometry(.6,20,20), 
            new T.MeshStandardMaterial({metalness: 0.8,map:text}));
        this.cop.add(mesh);

        let tailMesh = new T.Mesh(new T.CylinderBufferGeometry(.1,.1,1.2,40), 
            new T.MeshStandardMaterial({map:text,metalness:0.8 }));

        tailMesh.rotateZ(Math.PI/2);
        tailMesh.position.x = tailMesh.position.x-.6;
        this.cop.add(tailMesh);

        let rm = new T.Mesh(new T.CylinderBufferGeometry(.01,.01,.2,15),
        new T.MeshStandardMaterial({color:"black"}));

        rm.position.y = rm.position.y+.45;
       
        let backSupport = new T.Mesh(new T.CylinderBufferGeometry(.01,.09,.5,15), 
        new T.MeshStandardMaterial({color:"black"}));

        backSupport.position.x = tailMesh.position.x-.58;
        backSupport.position.z = tailMesh.position.z-.025;
        backSupport.translateY(0.17);
        backSupport.translateX(0.06);
        backSupport.translateZ(0.02);
        backSupport.rotateY(Math.PI/2);

        this.cop.add(backSupport);
    
        this.backRoter = new T.Mesh(new T.BoxBufferGeometry(.01,.5,.07), 
        new T.MeshStandardMaterial({color:"red", metalness:0.8}));

        this.backRoter.position.x = backSupport.position.x;
        this.backRoter.position.z = backSupport.position.z-.005;
        this.backRoter.translateZ(0.13);
        this.backRoter.rotateY(Math.PI/2);
        this.cop.add(this.backRoter);

        this.rotor2 = new T.BoxBufferGeometry(.008,2,.07);
        this.rotor = new T.BoxBufferGeometry(.008,2,.07);
    
        this.rotor3 = new T.BoxBufferGeometry(.008,2,.07);
        this.rotor4 = new T.BoxBufferGeometry(.008,2,.07);

        this.base = new T.BoxBufferGeometry(0.15,0.15,0.15);

        let rotorMesh = new T.Mesh(this.rotor, 
            new T.MeshStandardMaterial({color:"red", metalness:0.8}));
            
        let roterMesh2 = new T.Mesh(this.rotor2, new T.MeshStandardMaterial({color:"red", metalness:0.8}));
        let roterMesh3 = new T.Mesh(this.rotor2, new T.MeshStandardMaterial({color:"red", metalness:0.8}));

        let roterMesh4 = new T.Mesh(this.rotor2, new T.MeshStandardMaterial({color:"red", metalness:0.8}));

        let baseMesh = new T.Mesh(this.base, new T.MeshStandardMaterial({color:"red", metalness:0.8}));
        roterMesh2.position.y = tailMesh.position.y+.59;
        rotorMesh.position.y = tailMesh.position.y+.59;
        baseMesh.position.y = tailMesh.position.y+.59;
        roterMesh3.position.y = tailMesh.position.y+.59;
        roterMesh4.position.y = tailMesh.position.y+.59;
        rotorMesh.rotateZ(Math.PI/2);
        roterMesh2.rotateZ(-Math.PI/2)
        this.cop.add(rotorMesh, roterMesh2, baseMesh);
        this.cop.position.y = 2

        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(2);
        this.ridePoint.rotateY(Math.PI / 2);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
    }

    stepWorld(delta, timeofday){
      
        this.backRoter.rotateX(3);
        this.cop.position.x = this.id * Math.cos(performance.now() / 1000);
        this.cop.position.z = this.id * Math.sin(performance.now() / 1000);
        this.cop.lookAt(2,1,2);
        
        this.cop.position.y = this.id *Math.abs( Math.sin(performance.now() / 1000))+ 15;
        this.rotor.rotateX(2);
        this.rotor2.rotateX(2);
    };
}



export class GrHeli extends GrObject {
    constructor() {
        let whole = new T.Group();
        let loader = new T.TextureLoader()
        let text = loader.load("./images/heli.png");

        let first = new T.Mesh(new T.BoxGeometry( 1.5, 1.2, 1 ), 
        new T.MeshStandardMaterial({ metalness:0.2, map:text}));

        let second = new T.Mesh(new T.BoxGeometry( 1, 0.7, 1 ), 
            new T.MeshStandardMaterial({ metalness:0.2, map:text}));


        let part3 = new T.Mesh(new T.BoxGeometry( 1.8, 0.5, 1 ), 
            new T.MeshStandardMaterial({ metalness:0.2, map:text}));

        let backRoter = new T.Mesh(new T.TorusGeometry( 0.5, 0.125, 16, 10 ), 
            new T.MeshStandardMaterial({ metalness:0.2, map:text}));

        let wholerear = new T.Group();

        let propeller = new T.Mesh(new T.BoxGeometry( 0.15, 1, 0.15 ), 
            new T.MeshStandardMaterial({ metalness:0.2, color:"yellow"}));

        let propeller2 = new T.Mesh(new T.BoxGeometry( 4, 0.1, 0.3 ), 
            new T.MeshStandardMaterial({ metalness:0.2, color:"yellow"}));

        wholerear.add(backRoter,propeller);
        second.translateX(0.8);
        second.translateY(-0.15);
        part3.translateX(-1.4);
        part3.translateY(-0.1);
        backRoter.translateX(-2.75);
     
        propeller.translateX(-2.75);
        wholerear.translateY(0.1);
        propeller2.translateY(0.6);
    
        propeller.rotateZ(Math.PI/2);
        whole.add(first,second,part3,wholerear,propeller2);
        whole.translateY(15);
   
         
        super("Helicopter2",whole);
        this.chop = whole;
        this.propeller2 = propeller2;
        this.propeller1 = propeller;
        this.timeCumu = 0;
        this.rideable = whole;

    }

    stepWorld(delta,timeOfDay) {
        this.timeCumu += 0.001*delta;
        let theta = this.timeCumu;
        let x = 20 * Math.cos(theta);
        let z = 20 * Math.sin(theta);
        this.propeller1.rotateZ(-5);
        this.propeller1.rotateZ(-5);
        this.propeller2.rotateY(5);
        this.chop.lookAt(new T.Vector3(0, 15, 0));
        this.chop.position.x = x;
        this.chop.position.z = z;
    }
}