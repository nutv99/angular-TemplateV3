import {
  Component,
  VERSION,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { delay, map, tap, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GeneralServiceByNoom } from './general.service';
import { WaitscreenComponent } from './waitscreen/waitscreen.component';

// Step-2 ประกาศ Model
interface Model_CustomerADD {
  id: string;
  type: string;
  name: string;
  ppu: number;
}

interface Model_DepartmentEdit {
  departmentID: number;
  departmentDesc: string;
}

interface Model_productEdit {
  itemName: string;
  BalanceStock: number;
}

// Model Product Section ให้ไปที่ swagger แล้ว Copy ส่วน Body มา ใส่ให้ครบ //
interface Model_Product_GetAll {
  id: string;
  type: string;
}
interface Model_Product_GetById {
  id: string;
  type: string;
}
interface Model_Product_Post {
  itemCode: string;
  itemName: string;
}

// ประกาศตัวแปร

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('myNameElem') myNameElem: ElementRef;

  // Copy ด้านล่างไปใส่ใน ts ของ Component ตรง  var section (ใต้  Export เลย)

  //********** ตัวแปร url สำหรับ  Method ต่าง ๆ  ****************
  Product_getAll_url: string = '';
  Product_getByID_url: string = '';
  Product_POST_url: string = '';
  Product_PATCH_url: string = '';
  Product_DELETE_url: string = '';

  waitScreenShow: boolean = false;
  Message: string = 'idle';
  MessageErr!: any;
  productForm!: FormGroup;
  sForm!: FormGroup;
  editPayload = {
    itemName: '',
    BalanceStock: 0,
  } as Model_productEdit;

  productPost = {} as Model_Product_Post;

  CustomerADD: Model_CustomerADD = {
    id: '001',
    type: 'GradeA',
    name: 'Pubate',
    ppu: 111,
  };

  DataFromBackEnd: Model_DepartmentEdit = {
    departmentID: 0,
    departmentDesc: '',
  };

  i999: string = '';

  isLoading: boolean = false;
  testMode: boolean = true;
  apiURL: string = 'https://lovetoshopmall.com/dataservice/';

  Product_GetAll: Model_Product_GetAll;
  Product_GetByID!: Model_Product_GetById;
  Product_Post!: Model_Product_Post; 
  responseValue:any ;
  //endpoint:string = '';

  constructor(
    private myhttp: HttpClient,
    private fb: FormBuilder,
    private generalService: GeneralServiceByNoom
  ) {}

  ngOnInit() {
    // this.get_EmployeeByID();
    //this.Product_GetAll.
    //this.get_EmployeeByID();
    this.productForm = this.fb.group({
      itemCode: ['Sammy'],
      itemName: [''],
      BalanceStock: [0],
    });

    this.myhttp.get(this.Product_getByID_url);

    let data = this.getAllEmployees();
    data.subscribe({
      next: (res) => {
        console.log(res);
        this.Message = 'ค้นคืนข้อมูล สำเร็จ' + JSON.stringify(res);
        this.DataFromBackEnd = res;

        console.log('All Key', Object.keys(res));
      },
      error: (err: Error) => {
        err: err ? err : 'เกิดข้อผิดพลาด ไม่สามารถ ค้นคืนข้อมูล' + err.message;
        this.Message =
          'เกิดข้อผิดพลาด ไม่สามารถ ค้นคืนข้อมูล ::: ' + err.message;
        console.error(err);
      },
      complete: () => {
        console.info('complete'); // Stop & Destroy Observable
      },
    });
    console.log('Data ', data);
  }

  ngAfterViewInit() {
    //console.log(this.myNameElem.nativeElement.value);
    console.log('Key--After ViewInit', Object.keys(this.DataFromBackEnd));
  }

  // GET DATA BY ID
  get_EmployeeByID() {
    this.waitScreenShow = true;
    const http$ = this.myhttp.get<Model_DepartmentEdit>(
      'https://lovetoshopmall.com/dataservice/categoryTest999.php'
    );
    http$
      .pipe(
        tap((data) => {
          console.log('Success', data);
        }),
        delay(4000)
      )
      .subscribe({
        next: (res) => {
          console.log('By Next ', res);
          this.Message = 'ค้นคืนข้อมูล สำเร็จ' + res;
          this.hideWaitScreen();
        },
        error: (err:HttpErrorResponse ) => {
           // กรณี error
          if (err.error instanceof Error) {
            // กรณี error ฝั่งผู้ใช้งาน หรือ การเชื่อมต่อเกิด error ขึ้น
            console.log('An error occurred:', err.error.message);
          }else{ // กรณี error ฝั่ง server ไม่พบไฟล์ ,server error 
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }     
        },
        complete: () => {
          console.info('complete'); // Stop & Destroy Observable
          this.hideWaitScreen();
        },
      });
  }

  // GET ALL DATA
  getAllEmployees(): Observable<Model_DepartmentEdit> {
    return this.myhttp
      .get<Model_DepartmentEdit>(this.apiURL + '/categoryTest.php')
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);

    return throwError(() => {
      return errorMessage;
    });
  }

  seti999() {
    this.i999 = 'ddddd';
  }

  onSubmit() {
    const input = document.querySelector('#message') as HTMLInputElement | null;

    const refs = document.querySelectorAll(`[modepatch*="y"]`);
    alert(refs.length);
    for (let i = 0; i <= refs.length; i++) {
      console.log(refs[i].id);
      var cc = document.getElementById(refs[i].id) as HTMLInputElement;
      console.log('By QALL ', cc.value);
    }

    //}

    const myParagraph = document.querySelector('.example');
    //You can do many this with is

    console.clear();
    // alert(this.productForm.value.itemCode);
    let ddd = this.productForm.value.itemCode;
    console.log(ddd);
    this.productPost.itemCode = this.productForm.value.itemCode;
    // this.productPost.itemDesc = this.productForm.value.itemDesc;

    this.productForm.get('itemName').setValue('88888888');
    //console.log(this.productPost);
  }

  setVar2() {
    this.productForm.get('itemName').setValue('sssss');
  }

  getVar2() {
    alert(this.productForm.get('itemName').value);
    console.clear();
    console.log(this.productForm.value.itemName);
  }

  showWaitScreen() {
    this.waitScreenShow = true;
  }
  hideWaitScreen() {
    this.waitScreenShow = false;
  }

  giveEditModel() {
    // https://www.angularjswiki.com/angular/how-to-loop-over-typescript-map-in-angular/
    //this.editPayload.itemName = 'ssss';
    //var mapObject = new Map<string, boolean>();
    // for (let entry of this.editPayload.entries()) {
    //   let mapKey = entry[0];
    //   let mapValue = entry[1];
    //   console.log(`Map key is:${mapKey} and value is:${mapValue}`);
    // }

    this.editPayload = this.generalService.takeDataPatchByAttribute();
    console.log('Payload By Elem ', this.editPayload);
    return;

    var aaa = this.productForm;
    var bbb = this.editPayload;
    var st = '{';

    this.editPayload = this.generalService.takeDataPatchByModel(
      this.productForm,
      this.editPayload
    );
    //alert(bbb.itemName)
    console.log('Payload ', this.editPayload);

    // alert(this.productForm.get('itemName').value);

    // const r = Object.keys(bbb);
    // r.forEach(function (value) {
    //   console.log(value);
    //   var sKey = value;
    //   console.log('Data ', aaa.get(sKey).value);
    //   st = st + '"' + sKey + '" : "' + aaa.get(sKey).value + '",';
    // });

    // console.log('Step-1', st);
    // let st2 = st.slice(0, -1);
    // st2 = st2 + '}';

    // console.log(st2);
    // let obj = JSON.parse(st2);
    // alert(obj.itemName) ;
  }
  // submit2() {

  //     let data2: any = this.sForm;
  //     data2.id = this.BrandData.id;
  //     // console.log('Show payload', data2);
  //     this.fetch
  //       .patchById(this.UrlPatch, this.sForm.value, this.id)
  //       .subscribe(
  //          next: (res) => {
  //           console.log(res);
  //           this.Message = 'ค้นคืนข้อมูล สำเร็จ' + res;
  //         },
  //         error: (err: Error) => {
  //           err: err ? err : 'เกิดข้อผิดพลาด ไม่สามารถ ค้นคืนข้อมูล' + err.message;
  //           this.Message =
  //             'เกิดข้อผิดพลาด ไม่สามารถ ค้นคืนข้อมูล ::: ' + err.message;
  //           console.error(err);
  //         },
  //         complete: () => {
  //           console.info('complete'); // Stop  & Destroy Observable Var
  //         },

  //       );

  // }

  //********************  Process Function Product ********************
  get_Product_ALL() {
    // สำหรับ Get ALL Product
  }
  get_Product_ByID() {
    // สำหรับ Get ByID Product
    // 1.รับค่า id จาก url
    // 2.สร้าง  url string -->
    // 3.เรียก httpget โดย พิมพ์ NoomHttp_GET
  }
  POST_Product() {
    // สำหรับ POST Product
  }
  PATCH_Product() {
    // สำหรับ PATCH Product
  }
  DELETE_Product() {
    // สำหรับ Delete Product
  }

  onSubmit99(f:any){
    
    let urlApi = 'https://lovetoshopmall.com/dataservice/' ;
    let data = f.value;
    this.myhttp.post(urlApi+'show_data.php',data)    
    .subscribe(
     result =>{
       this.responseValue = result;
       console.log(result);
     },
    ( err:HttpErrorResponse ) => {
      // กรณี error
      if (err.error instanceof Error) {
        // กรณี error ฝั่งผู้ใช้งาน หรือ การเชื่อมต่อเกิด error ขึ้น
        console.log('An error occurred:', err.error.message);
      }else{ // กรณี error ฝั่ง server ไม่พบไฟล์ ,server error 
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }       
    });
  }
}
