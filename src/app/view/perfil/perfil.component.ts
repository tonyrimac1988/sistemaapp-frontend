import { Perfil } from './../../_model/perfil'
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PerfilService } from 'src/app/_service/perfil.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  cantidad: number = 0;
  dataSource: MatTableDataSource<Perfil>;

  displayedColumns: string[] = ['nidperfil', 'snombreperfil', 'nsesiones', 'ntiempoconexion', 'ntiempovida', 'dfechareg', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(

    private perfilService: PerfilService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {

    this.cargarVariablesReactiva();

    this.listarPerfil();

  }

  listarPerfil() {

    this.perfilService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log('dataaaaaa menu');
      console.log(data.content);

    });

  }

  cargarVariablesReactiva() {
    this.perfilService.listaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.perfilService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });
  }

  openDialog(perfil?: Perfil) {
     
  }

  eliminar(perfil?: Perfil) {
     
  }

  filter(x: string) {
    this.dataSource.filter = x.trim().toLowerCase();
  }

  mostrarMas(e: any) {
    //console.log(e);
    this.perfilService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(data.content);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  genereReporte(tiporeporte: string){

    this.perfilService.generarExcel(tiporeporte).subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;')
      a.href = url;
      a.download =  'reporte.'+tiporeporte;
      a.click();
    });
  }

}
