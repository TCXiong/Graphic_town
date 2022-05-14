import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Geom from "../libs/CS559-Three/examples/jsm/deprecated/Geometry.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";

//roads
export class GrAvenue extends GrObject {
    constructor() {
        let avenue = new T.Group();
      
        let mesh1 = new T.Mesh(new T.BoxGeometry( 76,0.02,4 ), 
        new T.MeshStandardMaterial({color:"#a6a6a6", metalness:0.5, roughness:0.8}));
        let mesh2 = new T.Mesh(new T.BoxGeometry( 76,0.02,4 ), 
        new T.MeshStandardMaterial({color:"#a6a6a6", metalness:0.5, roughness:0.8}));
        let mesh3 = new T.Mesh(new T.BoxGeometry( 3,0.05,76 ), 
        new T.MeshStandardMaterial({color:"#a6a6a6", metalness:0.5, roughness:0.8}));
        let mesh4 = new T.Mesh(new T.BoxGeometry( 3,0.05,76 ), 
        new T.MeshStandardMaterial({color:"#a6a6a6", metalness:0.5, roughness:0.8}));
        avenue.add(shift(mesh1 ,0,19));
        avenue.add(shift(mesh2 ,0,-19));
        avenue.add(shift(mesh3 ,19,0));
        avenue.add(shift(mesh4 ,-19,0));
        super("roads",avenue);
    }
}

function shift(obj,x,z,s=1) {
    obj.translateX(x);
    obj.translateZ(z);
    obj.scale.set(s,s,s);
    return obj;
}

//truck from my previous workbook
export class Small_Truck extends GrObject {

    constructor()  {
        let Truck = new T.Group();
        let exSettings = {
                steps: 2,
                depth: 2,
                bevelEnabled: true,
                bevelThickness: 0.4,
                bevelSize: 0.2,
                bevelSegments: 10
        };
        // drawing the truck tire
            let tireGeometry = new T.TorusGeometry(0.4,0.25,30,600);
            let tireMaterial = new T.MeshStandardMaterial({color:"black"});
        let tire = [];
        for(let i=0; i<8; i++){
                tire[i] = new T.Mesh(tireGeometry,tireMaterial); 
        }
        tire[0].position.set(0.4,0.55,2.4);
        tire[1].position.set(0.4,0.55,-0.4);
        tire[2].position.set(2.5,0.55,2.4);
        tire[3].position.set(2.5,0.55,-0.4);
        tire[4].position.set(4.5,0.55,2.4);
        tire[5].position.set(4.5,0.55,-0.4);
        tire[6].position.set(6.5, 0.55, 2.4);
        tire[7].position.set(6.5, 0.55, -0.4);
        
        for(let i=0; i<8; i++) {
          Truck.add(tire[i]);
        }
        let texture = new T.TextureLoader().load("./images/logo.jpg");
        let body = new T.Mesh(new T.BoxGeometry(6,3.5,2.5), new T.MeshStandardMaterial({color: "yellow", map:texture}));
        body.position.set(4.55,1.35,1);
        body.translateY(0.7);
        Truck.add(body);
    
    
        let texture2 = new T.TextureLoader().load("./images/logo2.jpg");
        let block1 = new T.Mesh(new T.BoxGeometry(6,0.005,2.5), new T.MeshStandardMaterial({color: "yellow", map:texture2}));
        block1.position.set(4.55,1.35,1);
        block1.translateY(2.5);
        Truck.add(block1);
    
        let block2 = new T.Mesh(new T.BoxGeometry(3.4,0.005,2.5), new T.MeshStandardMaterial({color: "yellow"}));
        block2.position.set(4.55,1.35,1);
        
        block2.rotateZ(Math.PI/2);
        block2.translateY(-3);
        block2.translateX(0.8);
        Truck.add(block2);
    
        // drawing the head of the truck 
        let truckHead = new T.Shape();
            truckHead.moveTo(0, 0);
            truckHead.lineTo(1.5, 0);
            truckHead.lineTo(1.5, 2.5);
            truckHead.lineTo(0.5, 2.5);
            truckHead.lineTo(-0.5, 1);
            truckHead.lineTo(-0.5, 1);
        truckHead.lineTo(0, 0);
        let head = new T.Mesh(new T.ExtrudeGeometry(truckHead, exSettings), new T.MeshStandardMaterial({color: "grey"}));
        head.translateY(0.5);
        Truck.add(head);
        
        super("truck", Truck);	
        }
      
}

  

  //cars
  export class GrCar1 extends GrObject {
    constructor() {
        let car = new T.Group();

        let mesh = new T.Mesh(new T.BoxGeometry(2.1, 0.3, 0.8), 
        new T.MeshStandardMaterial({ color: "yellow", metalness: 0.1, roughness: 0.2 }));
        let whole = new T.Group();

        let tobj = new Geom.Geometry();
        tobj.vertices = [
            new T.Vector3(-0.3, 0, 0),
            new T.Vector3(1, 0, 0),
            new T.Vector3(1, 0, 0.8),
            new T.Vector3(-0.3, 0, 0.8),
            new T.Vector3(1 / 4 - 0.2, 0.5, 0.8),
            new T.Vector3(3 / 4, 0.5, 0.8),
            new T.Vector3(3 / 4, 0.5, 0),
            new T.Vector3(1 / 4 - 0.2, 0.5, 0),
        ];
        tobj.faces = [
            new Geom.Face3(3, 2, 5),
            new Geom.Face3(3, 5, 4),
            new Geom.Face3(2, 1, 6),
            new Geom.Face3(2, 6, 5),
            new Geom.Face3(4, 5, 6),
            new Geom.Face3(4, 6, 7),
            new Geom.Face3(0, 3, 4),
            new Geom.Face3(0, 4, 7),
            new Geom.Face3(1, 0, 7),
            new Geom.Face3(1, 7, 6)
        ];
      
        //
        let top = new T.Mesh(tobj.toBufferGeometry(), 
        new T.MeshStandardMaterial({ color: "white", metalness: 0.8, roughness: 0.2 }));
        whole.add(top);
        top.translateZ(-0.41);
        whole.translateY(0.31);
        whole.translateX(0.21);

        let wfGeo = new Geom.Geometry();
        wfGeo.vertices = [
            new T.Vector3(-0.3 + 0.35 / 8, 0.5 / 4, 0.1),
            new T.Vector3(-0.3 + 0.35 / 8, 0.5 / 4, 0.7),
            new T.Vector3(1 / 4 - 0.2 - 0.35 / 8, 0.5 * 7 / 8 - 0.01, 0.7),
            new T.Vector3(1 / 4 - 0.2 - 0.35 / 8, 0.5 * 7 / 8 - 0.01, 0.1)
        ];
        wfGeo.faces = [
            new Geom.Face3(0, 1, 2),
            new Geom.Face3(0, 2, 3)
        ];
       
        let front = new T.Mesh(wfGeo.toBufferGeometry(), 
        new T.MeshStandardMaterial({ color: "white", metalness: 0.5, roughness: 0.2 }));
        front.translateX(-0.01);
        front.translateZ(-0.4);

        let wbGeo = new Geom.Geometry();
        wbGeo.vertices = [
            new T.Vector3(1 - (1 / 4) * 1 / 5, 0.1, 0.1),
            new T.Vector3(1 - (1 / 4) * 1 / 5, 0.1, 0.7),
            new T.Vector3(3 / 4 + (1 / 4) * 1 / 5, 0.4, 0.7),
            new T.Vector3(3 / 4 + (1 / 4) * 1 / 5, 0.4, 0.1)
        ];
        wbGeo.faces = [
            new Geom.Face3(1, 0, 3),
            new Geom.Face3(1, 3, 2)
        ];
     
        let back = new T.Mesh(wbGeo.toBufferGeometry(), 
        new T.MeshStandardMaterial({ color: "white", metalness: 0.5, roughness: 0.2 }));

        back.translateX(0.011);
        back.translateZ(-0.41);
  
        let comb = new T.Mesh(new T.BoxGeometry(0.45, 0.3, 0.1), 
            new T.MeshStandardMaterial({ color: "white", metalness: 0.5, roughness: 0.2 }));

        let mesh2 = new T.Mesh(new T.BoxGeometry(0.45, 0.3, 0.1), 
            new T.MeshStandardMaterial({ color: "white", metalness: 0.5, roughness: 0.2 }));

        comb.translateZ(0.351);
        mesh2.translateZ(-0.351);
        comb.translateY(0.25);
        mesh2.translateY(0.25);
        comb.translateX(0.3);
        mesh2.translateX(0.3);
        whole.add(front, back, comb, mesh2);
        car.add(mesh, whole);
        mesh.rotation.y = Math.PI;
        whole.rotation.y = Math.PI;
        mesh.translateY(0.21);
        
        let tire1 = new T.Mesh(new T.CylinderGeometry(0.21, 0.21, 1, 32), 
                new T.MeshStandardMaterial({ color: "silver", metalness: 0.8, roughness: 0.8 }));
        let tire2 = new T.Mesh(new T.CylinderGeometry(0.21, 0.21, 1, 32), 
                new T.MeshStandardMaterial({ color: "silver", metalness: 0.8, roughness: 0.8 }));

        tire1.rotateX(Math.PI / 2);
        tire2.rotateX(Math.PI / 2);
        tire1.translateX(-0.5);
        tire2.translateX(0.5);
        let wgroup = new T.Group();
        wgroup.add(tire1, tire2);
        car.add(wgroup);
        car.translateY(0.21);
        car.scale.set(1.51, 1.51, 1.51);
        super(`car`, car);


        this.carObj = car;
        car.position.x = -80 / 5 + 3.5 / 4;
        car.position.z = 80 / 5 - 3.5 / 4;
        this.state = 0;
        this.x = -80 / 5 + 3.5 / 4;
        this.z = 80 / 5 - 3.5 / 4;
        this.time = 0;
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(2);
        this.ridePoint.rotateY(Math.PI / 2);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;

    }

    stepWorld(delta, timeOfDay) {
        let run = delta / 100;
        switch (this.state) {
            case 0:
                this.carObj.translateX(run);
                this.z -= run;
                if (this.z <= -80 / 4 + 3.5 / 4) {
                    this.state = 4;
                    this.carObj.rotateY(Math.PI / 2);
                }
                break;
            
            case 4:
                    this.time += delta;
                    if (this.time > 2500){   
                        this.time = 0;
                        this.state = 1;
                    }
                break;


            case 1:
                this.carObj.translateX(run);
                this.x += run;
                if (this.x >= 80 / 4 - 3.5 / 4) {
                    this.state = 5;
                    this.carObj.rotateY(Math.PI / 2);
                }
                break;



            case 5:
                    this.time += delta;
                    if (this.time > 1500){
                        
                        this.time = 0;
                        this.state = 2;
                    }
                break;


            case 2:
                this.carObj.translateX(run);
                this.z += run;
                if (this.z >= 80 / 4 - 3.5 / 4) {
                    this.state = 6;
                    this.carObj.rotateY(Math.PI / 2);
                }
                break;

            case 6:
                    this.time += delta;
                    if (this.time > 1500){
                        
                        this.time = 0;
                        this.state = 3;
                    }
                break;

            case 3:
                this.carObj.translateX(run);
                this.x -= run;
                if (this.x <= -80 / 4 + 3.5 / 3) {
                    this.state = 7;
                    this.carObj.rotateY(Math.PI / 2);
                }
                break;

            case 7:
                    this.time += delta;
                    if (this.time > 1500){
                        
                        this.time = 0;
                        this.state = 0;
                    }
                break;
 
        }
    }
}



//from previous workbook
export class GrBus extends GrObject {
    constructor() {
		let bus = new T.Group();
        let body = new T.Group();

        let texture = new T.TextureLoader().load("./images/school.jpg");

        // main body
        let main = new T.Mesh(new T.BoxGeometry( 4.5, 1, 0.8 ), 
                                  new T.MeshStandardMaterial({color:"yellow", metalness:0.6, roughness:0.8, map:texture}));

        let blcok1 = new T.Mesh(new T.BoxGeometry( 4.5, 0.0005, 0.8 ), 
                                new T.MeshStandardMaterial({color:"yellow", metalness:0.6, roughness:0.8}));
        blcok1.translateY(0.5);
        body.add(blcok1);

        let blcok2 = new T.Mesh(new T.BoxGeometry( 1, 0.05, 0.8 ), 
                                new T.MeshStandardMaterial({color:"yellow", metalness:0.6, roughness:0.8}));
        blcok2.rotateZ(Math.PI/2);
        blcok2.translateY(2.27);
        body.add(blcok2);

        
        // front window 
        let front = new T.Mesh(new T.BoxGeometry( 1.2, 0.5, 0.7 ), 
                                        new T.MeshStandardMaterial({color:"white", metalness:0.8, roughness:0.9}));
        // left and right mirror 
        let left = new T.Mesh(new T.BoxGeometry( 0.05, 0.4, 0.35 ), 
                                    new T.MeshStandardMaterial({color:"silver", metalness:0.9, roughness:0.2}));
        let right = new T.Mesh(new T.BoxGeometry( 0.05, 0.4, 0.35 ), 
                                      new T.MeshStandardMaterial({color:"silver", metalness:0.9, roughness:0.2}));
       
        left.translateOnAxis(new T.Vector3(0,0,1),0.4);
        right.translateOnAxis(new T.Vector3(0,0,-1),0.4);
   
        left.translateOnAxis(new T.Vector3(1,0,0),2.15);
        right.translateOnAxis(new T.Vector3(1,0,0),2.15);
      
        left.translateOnAxis(new T.Vector3(0,1,0),0.2);
        right.translateOnAxis(new T.Vector3(0,1,0),0.2);
        
        front.translateX(1.72);
        front.translateY(0.15);
        body.add(main,front,left,right);
        body.translateY(0.4);
        bus.add(body);

        let tire1 = new T.Mesh(new T.CylinderGeometry( 0.25, 0.25, 1, 50), 
                                new T.MeshStandardMaterial({color:"black", metalness:0.9, roughness:0.8}));
        let tire2 = new T.Mesh(new T.CylinderGeometry( 0.25, 0.25, 1, 50), 
                                new T.MeshStandardMaterial({color:"black", metalness:0.9, roughness:0.8}));
        let tire3 = new T.Mesh(new T.CylinderGeometry( 0.25, 0.25, 1, 50), 
                                new T.MeshStandardMaterial({color:"black", metalness:0.9, roughness:0.8}));
        let tire4 = new T.Mesh(new T.CylinderGeometry( 0.25, 0.25, 1, 50), 
                                new T.MeshStandardMaterial({color:"black", metalness:0.9, roughness:0.8}));

        let tires = [tire1,tire2,tire3,tire4];
        tires.forEach(tire=>{
            tire.rotateOnAxis(new T.Vector3(1,0,0), Math.PI/2);
        });
        tire1.translateOnAxis(new T.Vector3(1,0,0),1.2);
        tire2.translateOnAxis(new T.Vector3(1,0,0),-1.2);
        tire3.translateOnAxis(new T.Vector3(1,0,0),1.8);
        tire4.translateOnAxis(new T.Vector3(1,0,0),-1.8);
     
        bus.add(tire1,tire2,tire3,tire4);
        bus.translateY(0.25);
        super(`bus`,bus);

        this.bigBus = bus;
        bus.position.x = -80 / 5 + 3.5 / 4;
        bus.position.z = 80 / 5 - 3.5 / 4;
        this.state = 0;
        this.x = -80 / 5 + 3.5 / 4;
        this.z = 80 / 5 - 3.5 / 4;
        this.time = 0
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(2);
        this.ridePoint.rotateY(Math.PI / 2);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
    }

    stepWorld(delta, timeOfDay) {
        let run = delta / 100;
        switch (this.state) {
            case 0:
                this.bigBus.translateX(run);
                this.z -= run;
                if (this.z <= -80 / 4 + 3.5 / 3) {
                    this.state = 4;
                    this.bigBus.rotateY(Math.PI );
                }
                break;

            case 4:
                    this.time += delta;
                    if (this.time > 2500){
                        
                        this.time = 0;
                        this.state = 1;
                    }
            break;

            
            case 1:
                this.bigBus.translateX(run);
                this.x += run;
                if (this.x >= 80 / 4 - 3.5 / 3) {
                    this.state = 5;
                    this.bigBus.rotateY(Math.PI );
                }
                break;


            case 5:
                    this.time += delta;
                    if (this.time > 2500){
                        
                        this.time = 0;
                        this.state = 2;
                    }
            break;

            case 2:
                this.bigBus.translateX(run);
                this.z += run;
                if (this.z >= 80 / 4 - 3.5 / 3) {
                    this.state = 6;
                    this.bigBus.rotateY(Math.PI );
                }
                break;

            case 6:
                    this.time += delta;
                    if (this.time > 2500){
                        
                        this.time = 0;
                        this.state = 3;
                    }
            break;

            
            case 3:
                this.bigBus.translateX(run);
                this.x -= run;
                if (this.x <= -80 / 4 + 3.5 / 3) {
                    this.state = 7;
                    this.bigBus.rotateY(Math.PI );
                }
                break;


            case 7:
                    this.time += delta;
                    if (this.time > 2500){
                        
                        this.time = 0;
                        this.state = 0;
                    }
            break;
        }
    }
}



export class GrForkLift extends GrObject {
    /**
     * @param {forkLiftProperties} params
     */
    constructor(params = {}) {
        let forkLift = new T.Group(); 

        let base = new T.Mesh(new T.BoxGeometry(2, 1.3, 1), 
                       new T.MeshStandardMaterial({ color: "yellow", metalness: 0.5, roughness: 0.7 }));
        let body = new T.Mesh(new T.BoxGeometry(0.8, 0.8, 1), 
                       new T.MeshStandardMaterial({ color: "grey", metalness: 0.6, roughness: 0.3 }));

        body.translateY(1);
        base.translateY(0.8);
        forkLift.add(base);

        let wheel_obj = new T.TorusGeometry(0.3, 0.25, 16, 16);
        wheel_obj.translate(-0.5, -0.25, 0);
        let smallWheel_obj = new T.TorusGeometry(0.2, 0.15, 16, 16);
        smallWheel_obj.translate(0.6, -0.45, 0);
        let wheel1 = new T.Mesh(wheel_obj, new T.MeshStandardMaterial({ color: "black", roughness: 0.3 }));
        let wheel2 = new T.Mesh(wheel_obj, new T.MeshStandardMaterial({ color: "black", roughness: 0.3 }));
        let wheel3 = new T.Mesh(smallWheel_obj, new T.MeshStandardMaterial({ color: "black", roughness: 0.3 }));
        let wheel4 = new T.Mesh(smallWheel_obj, new T.MeshStandardMaterial({ color: "black", roughness: 0.3 }));
        base.add(body, wheel1, wheel2, wheel3, wheel4);
        wheel1.translateZ(0.7);
        wheel2.translateZ(-0.7);
        wheel3.translateZ(-0.7);
        wheel4.translateZ(0.7);

        let liftTracks = new T.Group();
       
        let track_curve = new T.Shape();
        track_curve.moveTo(-0.5, 0);
        track_curve.lineTo(-0.5, 2);
        track_curve.lineTo(-0.25, 2.25);
        track_curve.lineTo(-0.25, 8);
        track_curve.lineTo(-0.2, 8);
        track_curve.lineTo(-0.2, 9.5);
        track_curve.lineTo(0.2, 9.5);
        track_curve.lineTo(0.2, 8);
        track_curve.lineTo(0.25, 8);
        track_curve.lineTo(0.25, 2.25);
        track_curve.lineTo(0.5, 2);
        track_curve.lineTo(0.5, 0);
        track_curve.lineTo(-0.5, 0);
        let lift_obj = new T.ExtrudeGeometry(track_curve, {
            steps: 1,
            depth: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 2
        });
        lift_obj.rotateY(Math.PI / 2);
        lift_obj.scale(0.3, 0.3, 0.3);
        let liftTrack1 = new T.Mesh(lift_obj, 
            new T.MeshStandardMaterial({ color: "grey", metalness: 0.6, roughness: 0.3 }));
        let liftTrack2 = new T.Mesh(lift_obj, 
            new T.MeshStandardMaterial({ color: "grey", metalness: 0.6, roughness: 0.3 }));
        liftTracks.add(liftTrack1, liftTrack2);
        liftTrack1.translateZ(0.25);

        liftTracks.translateX(1);
        liftTracks.translateY(-0.7);
        base.add(liftTracks);

        let joint = new T.Group();
        
        let lift_curve = new T.Shape();
        lift_curve.moveTo(-0.6, 0);
        lift_curve.lineTo(-0.5, 2);
        lift_curve.lineTo(-0.5, 5);
        lift_curve.lineTo(-0.3, 7);
        lift_curve.lineTo(0.3, 7);
        lift_curve.lineTo(0.5, 5);
        lift_curve.lineTo(0.5, 2);
        lift_curve.lineTo(0.6, 0);
        lift_curve.lineTo(-0.6, 0);
        let lift_Geom = new T.ExtrudeGeometry(lift_curve, {
            steps: 1,
            depth: 0.07,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 2
        });
        lift_Geom.rotateZ(-Math.PI / 2);
        lift_Geom.rotateX(Math.PI / 2);
        lift_Geom.scale(0.25, 0.25, 0.25);
        let lift1 = new T.Mesh(lift_Geom, 
            new T.MeshStandardMaterial({ color: "grey", metalness: 0.2 }));
        let lift2 = new T.Mesh(lift_Geom, 
            new T.MeshStandardMaterial({ color: "grey", metalness: 0.2 }));
            joint.add(lift1, lift2);  
        lift1.translateZ(0.26);
        lift2.translateZ(-0.26);
        liftTracks.add(joint);
        forkLift.rotateY(Math.PI / 2);
        let whole = new T.Group();
        whole.add(forkLift);
        whole.rotateY(-Math.PI / 2);
        whole.position.set(params.x, 0, params.z);
        super(`forkLift`, whole);
        this.whole_ob = whole;
        this.liftArms = joint;
        this.state = 0;
        this.destination = [];
        this.destination.push([params.x, params.z], [params.x + 10, params.z]);
        this.time = 0;
        this.next = 1;
        this.goalangle = Math.PI / 2;
        this.currentangle = 0; 
        this.load = true;
        this.loadspeed = 0.02;

        this.rideable = this.whole_ob;
    }
    stepWorld(delta, timeOfDay) {
        this.time += delta / 1000;
        let deltaslowed = delta / 200;

        switch (this.state) {
            case 0:
                this.state = 1;
                break;
            case 1: // move to Destination
                let dx = this.destination[this.next % 2][0] - this.whole_ob.position.x;
                let dz = this.destination[this.next % 2][1] - this.whole_ob.position.z;
                let dst = Math.sqrt(dx * dx + dz * dz);
                let ds = deltaslowed * 1.5;
                if (dst > 0.1) {
                    this.whole_ob.position.x += dx * ds / dst;
                    this.whole_ob.position.z += dz * ds / dst;
                } else {
                    this.whole_ob.position.x = this.destination[this.next % 2][0];
                    this.whole_ob.position.z = this.destination[this.next % 2][1];
                    this.state = 2; 
                }
                break;
            case 2: // move arms
                if (this.load) {
                    this.liftArms.position.y += this.loadspeed;
                    if (Math.abs(this.liftArms.position.y - 2) <= 0.05) {
                        this.load = false;
                        this.state = 3;
                    }
                } else {
                    this.liftArms.position.y -= this.loadspeed;
                    if (Math.abs(this.liftArms.position.y - 0) <= 0.05) {
                        this.load = true;
                        this.state = 3; 
                    }
                }

                break;
            case 3: // rotate 180 degrees
                let ad = this.goalangle - this.currentangle;
                if (ad > 0.1) {
                    this.currentangle += 0.05;
                } else {
                    this.next++;
                    this.goalangle += Math.PI;
                    this.state = 1 
                }
                this.whole_ob.setRotationFromEuler(new T.Euler(0, this.currentangle, 0));
                break;
        }
    }

}


export class GrBus1 extends GrObject {
    constructor() {
		let bus = new T.Group();
        
        let front_group = new T.Group();
		
        let front = new T.Mesh(new T.BoxGeometry( 3.5, 1, 0.8 ), new T.MeshStandardMaterial({color:"#0077be", metalness:0.5, roughness:0.2}));
       
        let front_window = new T.Mesh(new T.BoxGeometry( 0.1, 0.5, 0.6 ), new T.MeshStandardMaterial({color:"black", metalness:0.5, roughness:0.2}));
       
        let side1_window = new T.Mesh(new T.BoxGeometry( 0.5, 0.4, 0.1 ), new T.MeshStandardMaterial({color:"black", metalness:0.5, roughness:0.2}));
        let side2_window = new T.Mesh(new T.BoxGeometry( 0.5, 0.4, 0.1 ), new T.MeshStandardMaterial({color:"black", metalness:0.5, roughness:0.2}));
        let side3_window = new T.Mesh(new T.BoxGeometry( 0.5, 0.4, 0.1 ), new T.MeshStandardMaterial({color:"black", metalness:0.5, roughness:0.2}));
        let side4_window = new T.Mesh(new T.BoxGeometry( 0.5, 0.4, 0.1 ), new T.MeshStandardMaterial({color:"black", metalness:0.5, roughness:0.2}));
        let side5_window = new T.Mesh(new T.BoxGeometry( 0.5, 0.4, 0.1 ), new T.MeshStandardMaterial({color:"black", metalness:0.5, roughness:0.2}));
        let side6_window = new T.Mesh(new T.BoxGeometry( 0.5, 0.4, 0.1 ), new T.MeshStandardMaterial({color:"black", metalness:0.5, roughness:0.2}));
        let side7_window = new T.Mesh(new T.BoxGeometry( 0.5, 0.4, 0.1 ), new T.MeshStandardMaterial({color:"black", metalness:0.5, roughness:0.2}));
        let side8_window = new T.Mesh(new T.BoxGeometry( 0.5, 0.4, 0.1 ), new T.MeshStandardMaterial({color:"black", metalness:0.5, roughness:0.2}));
      
        let mirror1 = new T.Mesh(new T.BoxGeometry( 0.1, 0.3, 0.2 ), new T.MeshStandardMaterial({color:"white", metalness:0.3, roughness:0.2}));
        let mirror2 = new T.Mesh(new T.BoxGeometry( 0.1, 0.3, 0.2 ), new T.MeshStandardMaterial({color:"white", metalness:0.3, roughness:0.2}));
        let sidewindows = new T.Group();
        side1_window.translateZ(0.36);
        side2_window.translateZ(-0.36);
        side3_window.translateZ(0.36);
        side4_window.translateZ(-0.36);
        side5_window.translateZ(0.36);
        side6_window.translateZ(-0.36);
        side7_window.translateZ(0.36);
        side8_window.translateZ(-0.36);
        side1_window.translateX(-0.2);
        side2_window.translateX(-0.2);
        side3_window.translateX(0.5);
        side4_window.translateX(0.5);
        side5_window.translateX(1.1);
        side6_window.translateX(1.1);
        side7_window.translateX(-0.8);
        side8_window.translateX(-0.8);
        mirror1.translateZ(0.4);
        mirror2.translateZ(-0.4);
        mirror1.translateX(1.6);
        mirror2.translateX(1.6);
        mirror1.translateY(0.1);
        mirror2.translateY(0.1);
        front_window.translateX(1.71);
        front_window.translateY(0.1);
        sidewindows.add(side1_window,side2_window,side3_window,side4_window,side5_window,side6_window,side7_window,side8_window);
        front_group.add(front,front_window,mirror1,mirror2,sidewindows);
        sidewindows.translateY(0.1);
        front_group.translateY(0.4);
        bus.add(front_group);

        let wheel1 = new T.Mesh(new T.CylinderGeometry( 0.2, 0.2, 1, 32 ), new T.MeshStandardMaterial({color:"black", metalness:0.3, roughness:0.8}));
        let wheel2 = new T.Mesh(new T.CylinderGeometry( 0.2, 0.2, 1, 32 ), new T.MeshStandardMaterial({color:"black", metalness:0.3, roughness:0.8}));
        let wheel3 = new T.Mesh(new T.CylinderGeometry( 0.2, 0.2, 1, 32 ), new T.MeshStandardMaterial({color:"black", metalness:0.3, roughness:0.8}));
        let wheel4 = new T.Mesh(new T.CylinderGeometry( 0.2, 0.2, 1, 32 ), new T.MeshStandardMaterial({color:"black", metalness:0.3, roughness:0.8}));
        wheel1.rotateX(Math.PI/2);
        wheel2.rotateX(Math.PI/2);
        wheel3.rotateX(Math.PI/2);
        wheel4.rotateX(Math.PI/2);
        wheel1.translateX(1.2);
        wheel2.translateX(0.5);
        wheel3.translateX(-0.5);
        wheel4.translateX(-1.2);
        bus.add(wheel1,wheel2,wheel3,wheel4);

        bus.translateY(0.2);

        super(`Blue Bus`,bus);
        this.truck = bus;
        bus.scale.set(1.5,1.5,1.5);
        bus.position.x = 70/5 + 3.5/4 ;
        bus.position.z = 70/5 + 3.5/4;
        this.state = 1;
        this.x = 70/5 + 3.5/4;
        this.z = 70/5 + 3.5/4;
        this.countTime = 0;
    }

    stepWorld(delta,timeOfDay) {
        let t = delta/100;
 
        switch(this.state) {
            case 0:  
                this.truck.translateX(t);
                this.z += t;
                if(this.z >= 8 ){
                    this.state = 1;
                    this.truck.rotateY(-Math.PI/2);
                }
                break;
            case 1:
                this.truck.translateX(t);
                this.x -= t;
                if(this.x <= -15 ){
                    this.state = 2;
                    this.truck.rotateY(-Math.PI/2);
                }
                break;
            case 2:
                this.truck.translateX(t);
                this.z -= t;
                if(this.z <= -15 ){
                    this.state = 3;
                    this.truck.rotateY(-Math.PI/2);
                }
                break; 

            case 3:
                this.truck.translateX(t);
                this.x += t;
                if(this.x >= 12 ){
                    this.state = 4;
                    this.truck.rotateY(-Math.PI/2);
                }
                break;   

            case 4:
                this.countTime += delta;
                if (this.countTime > 3500){
                    this.state = 0;
                    this.countTime = 0
                    }
                break;
        }
    }
}


let countStop = 0;
export class stopSign extends GrObject{
    constructor(){
        let stopSignG = new T.Group();
        let obj1 = new Loaders.ObjGrObject({
            obj:"StopSign.obj",
            mtl:"StopSign.mtl",
            mtloptions: {side:T.DoubleSide},
            callback: function (obj) {
                console.log(obj);
                obj1.objects.forEach(ob => console.log(ob));
                
            }
          });
          obj1.objects[0].translateY(3);
        stopSignG.add(obj1.objects[0]);
        countStop++;
        super(`stopSign_${countStop}`, stopSignG)
    }
}
