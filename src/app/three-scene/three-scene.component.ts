import {
  Component,
  OnDestroy,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  templateUrl: './three-scene.component.html',
  styleUrls: ['./three-scene.component.scss'],
})
export class ThreeSceneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('rendererContainer', { static: false })
  rendererContainer: ElementRef<HTMLDivElement> | null = null;

  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  private scene: THREE.Scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  private orbitControls: OrbitControls = new OrbitControls(
    this.camera,
    this.renderer.domElement
  );
  private mesh: THREE.Mesh | null = null;
  private planeMesh: THREE.Mesh | null = null;
  private frameId: number | null = null;

  constructor() {
    this.camera.position.z = 90;
    this.orbitControls.update();
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (this.rendererContainer === null) {
      throw new Error('Renderer container not found');
    }
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    const geometry = new THREE.OctahedronGeometry(30, 50);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    this.renderer.setAnimationLoop(this.animation.bind(this));
  }

  ngOnDestroy() {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
    this.renderer.dispose();
  }

  animation(): void {
    if (this.camera.position.z > 10) {
      this.camera.position.z = this.camera.position.z - 0.15;
      this.mesh?.rotateX(0.002);
      this.mesh?.rotateY(0.001);
      this.renderer.render(this.scene, this.camera);
    } else {
      this.mesh?.rotateX(0.0001);
      this.mesh?.rotateY(0.00005);
      this.renderer.render(this.scene, this.camera);
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
