import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor() { }
  input=''
  regex = new RegExp('^[0-9:]{1-5}');
  old=''
  ok = true
  ngOnInit(): void {
  }
  change(data:any){
    // if(/^[0-9:]{1,5}$/.test(data.value)) {
    //   console.log("hi");
          
    // } else{
      
    //  data.value = data.value.slice(0,data.value.length-1)
    //  console.log(data.value);
     
    // }
    // if(/^/.test(data.value)){/

    // }
    ///^[0-9]{1,2}(:{1}[0-9]{1,2}){0,3}$/
    ///^(([0-9]{1,2})|([0-9]){1,2}:[0-9]{0,2})$/gm
    ///^[0-9]{1,2}(:{0,1}[0-9]{0,2}){0,3}$/
    if(/^(([0-9]{1,2})|([0-9]){1,2}:[0-9]{0,2})$/.test(data.value)){//for direct hours
      // if user input has numbers only
      //canhandle
      //1-9 hrs
      //10 -16

      //if one char user can enter 0 - 9

      //if second char comes 1st must be 0,1
      //second must me 0-6
     
      
      if(data.value.indexOf(':')>-1){
        console.log("::f ",data.value.indexOf(':'));
      const tmp = data.value.split(':')[1]
      if(tmp.length > 2){
        data.value = data.value.slice(0,data.value.length-1)
      }
      if(data.value.length > 5){
        data.value = data.value.slice(0,data.value.length-1)
      }
      if(tmp.length == 2)
      {
        tmp[0]//range from 0-5
        tmp[1]//range from 0-9
        if(tmp[0] > 5){
          data.value = data.value.slice(0,data.value.length-1)
        }
        console.log("Log : ",tmp[0],'::',tmp[1]);
        
      }
    }
    // else if(data.value.length > 2){
    //   data.value = data.value.slice(0,data.value.length-1)
    //   data.value = data.value + ":"
    // }
    else if(data.value.length == 2){
      console.log("Hii");
      
      data.value[0]//range from 0-1
      data.value[1]//range from 0-6
        if(data.value[0] > 1 || data.value[1] > 6){
          console.log("Yes");
          
          data.value = data.value.slice(0,data.value.length-1)
        }
    }
      console.log("Dirct hours");
      

    }else if (/^:{1}[0-9]{0,2}$/.test(data.value)){//for direct minutes
      //if user directly type : 
      //can handle :
      //:00,:0,:1....
      //:59
      console.log("Direct minutes");
      const tmp = data.value.split(':')[1]
      console.log("tmp : ",tmp);
      
      if(data.value.indexOf(':')>-1){

        if(tmp.length == 2){
          console.log("ppppp");
          
          //tmp[0]//range from 0-1
          //tmp[1]//range from 0-6
            if(tmp[0] > 5){
              console.log("oooo");
              
              data.value = data.value.slice(0,data.value.length-1)
            }
        }
      }
    
      

    }else{
      console.log("delete char");
      data.value = data.value.slice(0,data.value.length-1)
      if(data.value.length == 2 && Number(data.value)){        
        data.value = data.value+':'
      }
    }
  }
  pattern = {
    0 : '/[0-9]/',
    1 : '[0-6]',
    2:':',
    3:'/[0-5]/',
    4:'/[0-9]/'
  }
  // 01234 ,01 ,0 ,02, 012, 234 ,29
  pat(data:any,position:any){

  }

  //final
  
  sec(data:any,position:any){
    

    const remove = (position:any = '')=>{ 
      this.ok = false
      if (position == ''){
        return data.value.slice(0,data.value.length-1)
      }
      return data.value.slice(0,position)
    }//remove last value which is entered value
   // console.log("Event : ",data);
    const valuegt5 = (tmp:any) =>{
      if(tmp.length == 2)
      {
        if(tmp[0] > 5){
          data.value =  remove(position)
        }
        
      }
    }
    if(/^(([0-9]{1,2})|([0-9]){1,2}:[0-9]{0,2})$/.test(data.value)){//for direct hours
      if(data.value.indexOf(':')>-1){
      const tmp = data.value.split(':')[1]
      if(tmp.length > 2){
        data.value = remove(position)
      }
      if(data.value.length > 5){
        data.value = remove(position)
      }
      valuegt5(tmp) 
    }
    else if(data.value.length == 2){
        if(data.value[0] > 1 || data.value[1] > 6){          
          data.value = remove(position)
        }
    }      
    }else if (/^:{1}[0-9]{0,2}$/.test(data.value)){//for direct minutes
      const tmp = data.value.split(':')[1]      
      if(data.value.indexOf(':')>-1){
        valuegt5(tmp)
      }
    }else{
      console.log("ys");
      
      data.value = remove(position)
      if(data.value.length == 2 && Number(data.value)){        
        data.value = data.value+':'
      }
    }
    if(this.ok){
      this.old = data.value
    }
    else{
      this.ok = true
    }
    console.log("old : ",this.old);
    
  }

  key(event:any,data:any){
    const position = event.target.selectionStart
    console.log("Position : ",position);
    // console.log("value : ",data.value.length);
    const deleteKey = ()=>{

    }

    const backspaceKey = ()=>{

    }
    
    if(data.value.length == position){
      //moving forword
      this.sec(data,position-1)
      
    }
    else if(data.value.length > position){
      //check if
      if(data.value.indexOf(':')<=-1){
        this.sec(data,position-1)
      }
      if(event.key == 'Delete'){
          console.log('D');
          
      }
      else if(event.key == 'Backspace'){
        console.log("B : ",this.old[position],this.old[position -1 ]);
        //check for :
        if(this.old[position ] == ':' &&  this.old[position -1 ] !== undefined){
          data.value = this.old
          console.log("u");
        
        }
        
      }
      else{

        console.log("Do nothing");
        
      } 
    }
    
  }


}


// document.getElementById('foobar').addEventListener('keyup', e => {
//   console.log('Caret at: ', e.target.selectionStart)
// })
// <input id="foobar" />