import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedores/proveedor';
import { ProveedoresService } from 'src/app/service/proveedores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';



@Component({
  selector: 'app-proveedor-create',
  templateUrl: './proveedor-create.component.html',
  styleUrls: ['./proveedor-create.component.css']
})

export class ProveedorCreateComponent implements OnInit {

  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings: IDropdownSettings = {};
  public nombre = '';
  public descripcion = '';
  public cif = '';
  public correo = '';
  public telefono = '';
  public imagen = '';
  private id: string;

  constructor(private proveedorService: ProveedoresService,
    private router: Router,
    private ruta: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.ruta.snapshot.paramMap.get('id');

    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    if(this.id) {
      this.proveedorService.getProveedor(this.id).then(
        res => {
          this.nombre = res.nombre;
          this.descripcion = res.descripcion;
          this.cif = res.cif;
          this.correo = res.correo;
          this.telefono = res.telefono;
          this.imagen = res.imagen;
        }
      );
    }
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }




  saveAndRedirect = () => {
    this.save(() => this.router.navigate(['proveedor/lista']));
  }

  saveAndStay = () => {
    this.save(() => {
      this.nombre = '';
      this.descripcion = '';
      this.cif = '';
      this.correo = '';
      this.telefono = '';
      this.imagen = '';
    });
  }

  private save = (finish: any) => {
    const newProveedor = new Proveedor();
    newProveedor.nombre = this.nombre;
    newProveedor.descripcion = this.descripcion;
    newProveedor.cif = this.cif;
    newProveedor.correo = this.correo;
    newProveedor.telefono = this.telefono;
    newProveedor.imagen = this.imagen;
    if (this.id) {
      // estamos editando
      this.proveedorService.updateProveedor(this.id, newProveedor).then(
        () => {
          finish();
        }
      );
    } else {
      // estamos creando
      this.proveedorService.saveProveedor(newProveedor).then(
        () => {
          finish();
        }
      );
    }
  }
}
