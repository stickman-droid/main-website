declare module "three" {
  export class BufferAttribute {
    count: number
    getX(index: number): number
    getY(index: number): number
    getZ(index: number): number
  }

  export class Float32BufferAttribute extends BufferAttribute {
    constructor(array: ArrayLike<number>, itemSize: number)
  }

  export class BufferGeometry {
    attributes: {
      position?: BufferAttribute
      [key: string]: BufferAttribute | undefined
    }
    setAttribute(name: string, attribute: BufferAttribute): this
    dispose(): void
  }

  export class Material {
    dispose(): void
  }

  export class PointsMaterial extends Material {
    constructor(parameters?: {
      color?: string | number
      size?: number
      sizeAttenuation?: boolean
      transparent?: boolean
      opacity?: number
    })
  }

  export class Object3D {
    rotation: {
      x: number
      y: number
      z: number
    }
    traverse(callback: (child: Object3D) => void): void
  }

  export class Group extends Object3D {}

  export class Mesh extends Object3D {
    isMesh: true
    geometry: BufferGeometry
  }

  export class Points<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends PointsMaterial = PointsMaterial,
  > extends Object3D {
    geometry: TGeometry
    material: TMaterial
    constructor(geometry: TGeometry, material: TMaterial)
  }

  export class AmbientLight extends Object3D {
    constructor(color?: string | number, intensity?: number)
  }
}

declare module "three/examples/jsm/loaders/MTLLoader.js" {
  export namespace MTLLoader {
    interface MaterialCreator {}
  }
}

declare module "three/examples/jsm/loaders/OBJLoader.js" {
  import { Group } from "three"

  export class OBJLoader {
    load(
      url: string,
      onLoad: (group: Group) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: unknown) => void
    ): void
  }
}
