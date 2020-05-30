import { Injectable } from '@angular/core';
import { InstructionsComponent } from '../components/instructions/instructions.component'
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayReference } from '../services/overlayreference';

interface dialogConfig{
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;  
}

const DEFAULT_CONFIG: dialogConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
}

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(private overlay: Overlay) { }
  
  open(config: dialogConfig = {}){

    const dialog = { ...DEFAULT_CONFIG, ...config};

    const overlay_ref = this.create_overlay(dialog);
    
    const dialog_ref = new OverlayReference(overlay_ref);

    const filePreviewPortal = new ComponentPortal(InstructionsComponent);

    overlay_ref.attach(filePreviewPortal);

    overlay_ref.backdropClick().subscribe(_ => dialog_ref.close());

    return dialog_ref;
  }

  private create_overlay(config: dialogConfig){
    const overlay_config = this.get_overlay_config(config);
    return this.overlay.create(overlay_config);
  }

  private get_overlay_config(config: dialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

      const overlayConfig = new OverlayConfig({
        hasBackdrop: config.hasBackdrop,
        backdropClass: config.backdropClass,
        panelClass: config.panelClass,
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy
      });

      return overlayConfig;
  }

}
