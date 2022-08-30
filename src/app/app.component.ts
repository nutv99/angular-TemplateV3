import {
  Component,
  VERSION,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GeneralService } from './general.service';

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

  isLoading: boolean = false;
  testMode: boolean = true;
  apiURL: string = 'https://lovetoshopmall.com/dataservice/';

  Product_GetAll: Model_Product_GetAll;
  Product_GetByID!: Model_Product_GetById;
  Product_Post!: Model_Product_Post;
  //endpoint:string = '';

  constructor(
    private myhttp: HttpClient,
    private fb: FormBuilder,
    private generalService: GeneralService
  ) {
    // this.productForm = this.fb.group({
    //   itemCode: new FormControl('', Validators.required),
    //   itemName: new FormControl('', Validators.required),
    // });
  }

  ngOnInit() {
    // this.get_EmployeeByID();
    //this.Product_GetAll.
    this.productForm = this.fb.group({
      itemCode: ['Sammy'],
      itemName: [''],
      BalanceStock: [0],
    });

    let data = this.getEmployees();
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

  get_EmployeeByID() {
    const http$ = this.myhttp.get<Model_DepartmentEdit>(
      'https://lovetoshopmall.com/dataservice/categoryTest.php'
    );

    http$.subscribe({
      next: (res) => {
        console.log(res);
        this.Message = 'ค้นคืนข้อมูล สำเร็จ' + res;
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
  }

  getEmployees(): Observable<Model_DepartmentEdit> {
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

  onSubmit() {
    const input = document.querySelector('#message') as HTMLInputElement | null;

    //if (input != null) {
    //console.log('By sss', input.value); // 👉️ "Initial value"

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

  giveEditModel() {
    // https://www.angularjswiki.com/angular/how-to-loop-over-typescript-map-in-angular/
    //this.editPayload.itemName = 'ssss';
    //var mapObject = new Map<string, boolean>();
    // for (let entry of this.editPayload.entries()) {
    //   let mapKey = entry[0];
    //   let mapValue = entry[1];
    //   console.log(`Map key is:${mapKey} and value is:${mapValue}`);
    // }
    var aaa = this.productForm;
    var bbb = this.editPayload;
    var st = '{';

    // alert(this.productForm.get('itemName').value);

    const r = Object.keys(bbb);
    r.forEach(function (value) {
      console.log(value);
      var sKey = value;
      console.log('Data ', aaa.get(sKey).value);
      st = st + '"' + sKey + '" : "' + aaa.get(sKey).value + '",';
    });

    console.log('Step-1', st);
    let st2 = st.slice(0, -1);
    st2 = st2 + '}';

    console.log(st2);
    let obj = JSON.parse(st2);
    alert(obj.itemName);
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
}
