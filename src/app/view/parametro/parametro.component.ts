import { Component, OnInit, ViewChild } from '@angular/core';
import { Parametro } from 'src/app/_model/parametro';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ParametroService } from 'src/app/_service/parametro.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.css']
})
export class ParametroComponent implements OnInit {

  cantidad: number = 0;
  dataSource: MatTableDataSource<Parametro>;

  displayedColumns: string[] = ['nidparametro',  'sclave', 'svalor', 'sdescripcion', 'dfechareg', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(

    private parametroService: ParametroService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {

    this.listarParametro();
    this.cargarVariablesReactiva();
    
  }

  listarParametro() {

    this.parametroService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log('dataaaaaa menu');
      console.log(data.content);

    });

  }

  cargarVariablesReactiva() {
    this.parametroService.listaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.parametroService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });
  }

  openDialog(parametro?: Parametro) {
     
  }

  eliminar(parametro?: Parametro) {
     
  }

  filter(x: string) {
    this.dataSource.filter = x.trim().toLowerCase();
  }


  mostrarMas(e: any) {
    //console.log(e);
    this.parametroService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(data.content);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  genereReporte(tiporeporte: string){

    this.parametroService.generarExcel(tiporeporte).subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;')
      a.href = url;
      a.download =  'reporte.'+tiporeporte;
      a.click();
    });
 
  }
}
