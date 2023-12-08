import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentHeaderComponent } from './shipment-header.component';

describe('ShipmentHeaderComponent', () => {
  let component: ShipmentHeaderComponent;
  let fixture: ComponentFixture<ShipmentHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShipmentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
