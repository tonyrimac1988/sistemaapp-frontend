import { Sede } from './../../_model/sede'
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SedeService } from 'src/app/_service/sede.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {

  cantidad: number = 0;
  dataSource: MatTableDataSource<Sede>;

  displayedColumns: string[] = ['nidsede',  'snombre', 'subigeo', 'sdireccion', 'dfechareg', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(

    private sedeService: SedeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {

    this.cargarVariablesReactiva();

    this.listarSede();

  }

  listarSede() {

    this.sedeService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log('dataaaaaa menu');
      console.log(data.content);

    });

    /*this.sedeService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/
  }

  cargarVariablesReactiva() {
    this.sedeService.listaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.sedeService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });
  }

  openDialog(sede?: Sede) {
     
  }

  eliminar(sede?: Sede) {
     
  }

  filter(x: string) {
    this.dataSource.filter = x.trim().toLowerCase();
  }

  mostrarMas(e: any) {
    //console.log(e);
    this.sedeService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(data.content);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  genereReporte(tiporeporte: string){

    this.sedeService.generarExcel(tiporeporte).subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;')
      a.href = url;
      a.download =  'reporte.'+tiporeporte;
      a.click();
    });
  }

}
