import { Location } from '@angular/common';
import { Component, OnInit, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
// import { ConfigService } from 'src/app/_config/config.service';
// import { FetchApiService } from 'src/app/_services/fetch-api/fetch-api.service';

/*
สร้าง Model เพื่อไว้แสดงผล และส่งข้อมูล Form  ดังนี้ 
1.Model สำหรับ getAll
2.Model สำหรับ get By ID
3.Model สำหรับ Add หรือ Post
4.Model สำหรับ Edit หรือ Patch
5.Model สำหรับ Delete หรือ Delete // ปกติไม่ค่อยใช้ Model ในการ Delete ใช้แค่ id
วิธีการ 
1.ไปที่  http://json2ts.com/
2.ไปที่  swagger  copy ค่า json ของ getAll ออกมา และไปที่หน้าเวบ json2ts 
Case 1 . getAll--> นำ json ไปวางแล้ว gen TS Model ออกมา แก้ชื่อ Model โดยให้มี Model_ นำหน้า และ  _getALL ต่อท้าย
เพื่อการสื่อความหมาย 
export interface Model_Employee_GetAll {
        name: string;
        salary: number;
        married: boolean;
}

ก็จะ ได้ Model getALL แล้ว ทำต่อไป จนครบ 5 Model โดยแต่ละอัน จะใส่ suffix _ ต่อท้ายดังเช่น _Post _Patch _Delete
เช่น Model สำหรับ Post ก็จะเป็นชื่อ Model ดังเช่น Employee_Post ,Employee_Patch
3.สร้างตัวแปร Model ให้ครบ 5 หมวด
ตัวอย่าง 
Employee_GetAll! : Model_Employee_GetAll ;
Employee_GetByID! : Model_Employee_GetById ;
Employee_Post! : Model_Employee_Post ;
Employee_Patch! : Model_Employee_Patch ;
Employee_Delete! : Model_Employee_Delete ;

4.ไปกำหนด ตัวแปร ใน config.service.api ให้ครบ 5 เส้น โดย Copy ไปแปะใน ไฟล์ Config แล้ว ไล่เปลี่ยนชื่อ 
หรือใช้ Snippet->API
  API_V1_GETALL_???  = ;
  API_V1_GETBYID_??? = ;
  API_V1_POST_??? = ; 
  API_V1_PATCH_??? = ;
  API_V1_DELETE_??? = ;
จากนั้น นำชื่อมากำหนด ให้ครบ 5 ตัวแปร
5.สร้างตัวแปร URL ของ API แต่ละตัว 
// ไปดูเส้น API ใน Swagger แล้วเอามาใส่ ให้ครบ ???
  Url_Get_All : string = ConfigService.API_V1_GETALL_??? ;
  Url_Get_By_ID: string = ConfigService.API_V1_GETBYID_???;
  Url_Post: string = ConfigService.API_V1_POST_???;
  Url_Patch: string = ConfigService.API_V1_PATCH_???;
  Url_Delete : string = ConfigService.API_V1_DELETE_???;

5. กำหนด Constructor() ->
  constructor(
    private location: Location,
    private http: HttpClient,
    private fb: FormBuilder,
    private fetch: FetchApiService,
    private route: ActivatedRoute
  ) {}

 6. ngOnInit() :void  {
    if (this.route.snapshot.params['id']) {
       this.id = this.route.snapshot.params['id'];
       this.dataDisplay();
       this.get_All_Employee()
    }

 }

5. สร้างตัวแปรฟอร์ม สำหรับ Post ข้อมูล 
6. สร้างตัวแปรฟอร์ม สำหรับ Patch ข้อมูล 
7.สร้าง function สำหรับ getAll,getByID,Post,Patch,Delete ใต้ construction  

  get_All_Employee() {
    
  }
  get_EmployeeByID() {

  }
  Post_Form_Employee() {

  }

  Patch_Form_Employee() {

  }

  Delete_Employee() {
    
  }




*/

@Component({
  selector: 'app-prototype',
  templateUrl: './prototype.component.html',
  styleUrls: ['./prototype.component.css'],
})
export class PrototypeComponent implements OnInit {
  //สร้างตัวแปรดังนี้
  // export interface Model_CustomerADD {
  //   id: string;
  //   type: string;
  //   name: string;
  //   ppu: number;
  // }

  constructor() {}

  ngOnInit() {}
}
