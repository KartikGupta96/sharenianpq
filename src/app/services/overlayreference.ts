import { OverlayRef } from '@angular/cdk/overlay';

export class OverlayReference {
    constructor(private overlayRef: OverlayRef){}

    close(): void{
        this.overlayRef.dispose();
    }
}