import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class Snow extends GrObject {
    constructor() {
        let snow = new T.Group();
        super("snow", snow);

        for (let i = 0; i < 300; i++) {
            let flakeMesh = new T.Mesh(new T.TetrahedronGeometry(0.3, 1), new T.MeshStandardMaterial({ color:"#fffafa", emissive:"white"}));
            flakeMesh.position.set(
                (Math.random() - 0.5) * 100,
                Math.random() * 100,
                (Math.random() - 0.5) * 100
            );
            snow.add(flakeMesh);
        }
        this.snow = snow;
    }

    /**
     * @param {number} delta
     * @param {any} timeOfDay
     */
    stepWorld(delta,timeOfDay) {
        let speed = 0.004;
        this.snow.children.forEach(obj => {
            if (obj.position.y < 0) {
                this.snow.remove(obj);
                let flakeMesh = new T.Mesh(new T.TetrahedronGeometry(0.3, 1), new T.MeshStandardMaterial({ color:"#fffafa", emissive:"white"}));
                flakeMesh.position.set(
                    (Math.random() - 0.5) * 100,
                    Math.random() * 100,
                    (Math.random() - 0.5) * 100
                );
                this.snow.add(flakeMesh);
            } else {
                obj.position.y -= speed * delta;
            }
        });
    }
}