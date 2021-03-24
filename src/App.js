import React, { Component } from 'react';
import InvoiceDetail from './components/InvoiceDetail';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      invoiceNumber:'',
      date:'23-3-2021',
      billInfo:'',
       invoiceItems:[{
         itemName:'',
         itemsQuantity:'',
         itemRate:''
        //  edit:'false'
       }]
    };
    this.handleOnChange=this.handleOnChange.bind(this);
    
  }
   addNewItem=()=>{
    this.setState({
      invoiceItems:[...this.state.invoiceItems,{itemName:'', itemsQuantity:0, itemRate:0 }]
    });
  }


  
  deleteItem=(ind)=>{
    let item=[...this.state.invoiceItems];
    this.state.invoiceItems.map((invoice, index)=>{
      if(index===ind){
        item.splice(ind, 1); 
      }
    })
    this.setState({
      invoiceItems:[...item ]
     }) 
  }


  // editItem=(ind)=>{
  //   let item=[...this.state.invoiceItems];
  //   this.state.invoiceItems.map((invoice, index)=>{
  //     if(index===ind){
  //       item.splice(ind, 1); 
  //     }
  //   })
  //   this.setState({
  //     invoiceItems:[...item ]
  //    }) 
  // }

  
  convertPdf=()=>{
    var pdfConverter = require('jspdf');
    let totalAmount=0;
    var doc = new pdfConverter.jsPDF();
    
    doc.setLineWidth(12);
    doc.setDrawColor(44, 68, 71);
    doc.line(210, 70, 0, 70);
    doc.setTextColor(256)  
    doc.text(10,72, "Item");
    doc.text(95,72, "Quantity");
    doc.text(135,72, "Rate");
    doc.text(175,72, "Amount");
    doc.setTextColor(0) 
    this.state.invoiceItems.map((item,index)=>{
    totalAmount+=item.itemRate*item.itemsQuantity;
    doc.text(10,82 +index *8, item.itemName);
    doc.text(95,82 +index *8, ""+item.itemsQuantity);
    doc.text(135,82 +index *8, "$."+item.itemRate);
    doc.text(175,82 +index *8, "$."+item.itemRate*item.itemsQuantity);
    })
    doc.text(100,150, "Subtotal:  "+' $.'+totalAmount);
    doc.text(100,160, "TAX (10%):  "+' $.'+totalAmount*10/100);
    doc.text(100,170, "Total:  "+' $.' +((totalAmount*10/100)+ totalAmount) );
    doc.save("test.pdf");

            
  }
  handleOnChange=(event , ind, Name)=>{    
    let item=[...this.state.invoiceItems];       
    this.state.invoiceItems.map((invoice , index)=>{
            if(index==ind ){   
              if(Name=="name")           
               item[index].itemName=event.target.value;
               if(Name=="Quan")           
               item[index].itemsQuantity=event.target.value;
               if(Name=="Rate")           
               item[index].itemRate=event.target.value;              
            }
          });     
         this.setState({
          invoiceItems:[...item ]
         })         
  }

  render() {
    return (
      <div className="container">
        <InvoiceDetail pdf={this.convertPdf} 
          items={this.state.invoiceItems} 
           event={this.addNewItem} 
          ItemName={this.handleItemName}
           del={this.deleteItem} 
          //  edit={this.editItem}
           onChangeHandler={this.handleOnChange} 

           />
       
      </div>
    );
  }
}

export default App;
