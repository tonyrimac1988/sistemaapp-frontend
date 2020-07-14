import { Usuario } from './../../_model/usuario'
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  cantidad: number = 0;
  dataSource: MatTableDataSource<Usuario>;

  displayedColumns: string[] = ['nidusuario',  'operador', 'slogin', 'spassword', 'dfechareg', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(

    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {

    this.cargarVariablesReactiva();
    this.listarUsuario();
  }

  listarUsuario() {

    this.usuarioService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log('dataaaaaa menu');
      console.log(data.content);

    });

    /*this.generoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/
  }

  cargarVariablesReactiva() {
    this.usuarioService.listaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.usuarioService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });
  }

  openDialog(usuario?: Usuario) {
     
  }

  eliminar(usuario?: Usuario) {
     
  }

  filter(x: string) {
    this.dataSource.filter = x.trim().toLowerCase();
  }


  mostrarMas(e: any) {
    //console.log(e);
    this.usuarioService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(data.content);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  genereReporte(tiporeporte: string){

    this.usuarioService.generarExcel(tiporeporte).subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;')
      a.href = url;
      a.download =  'reporte.'+tiporeporte;
      a.click();
    });
 
  }

}
