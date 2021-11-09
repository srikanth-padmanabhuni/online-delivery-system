import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  itemsList: any = {};
  pageNo: number = 0;
  pageSize: number = 50;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.dashboardService.getItems(this.pageNo, this.pageSize).subscribe(
      (items: any) => {
        console.log(items);
        if(items.success) {
          const dataList = items.data.items;
          if(dataList && dataList.length > 0) {
            dataList.forEach((item: any) => {
              let itemObj:any = {};
              itemObj.itemId = item.itemId;
              itemObj.itemName = item.itemName;
              itemObj.itemType = item.itemType;
              itemObj.itemPrice = item.itemPrice;
              itemObj.itemDescription = item.itemDescription;
              itemObj.toggle = false;

              this.itemsList[item.itemId] = itemObj;
            });
          }
        } else {
          console.log(items.data);
        }
      }, (error) => {
        console.log(error);
      }
    )
  }

  loadMoreItems() {
    this.pageNo = this.pageNo + 1;
    this.getItems();
  }

}
