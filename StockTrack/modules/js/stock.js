/**
****************************************************************
*	Name    : getStockList
*	Author  : Kony 
*	Purpose : This function invokes XML service which uses Google Financial API.
****************************************************************
*/

function getStockList()
{
	var stockList = { serviceID:"getStocks"};
	var getStock = appmiddlewareinvokerasync(stockList, stockListCallback);
	
}

/**
****************************************************************
*	Name    : stockListCallback
*	Author  : Kony 
*	Purpose : This function is service callback function to display the stock list on sucess.
****************************************************************
*/
function stockListCallback(status, stocksList)
{
		if(status == 400){
			 var stockDetailTmp =[];
			 var pri = "";
			 var imgURL="",sym="";
			 if(( stocksList!=null || stocksList!= undefined ) && stocksList["opstatus"]==0){
			 	stockResultTable = stocksList["stocks"];
			 	kony.print("stockResultTable: "+JSON.stringify(stockResultTable));
			 	for(var i=0;i<stocksList["stocks"].length;i++){
					pri = stocksList["stocks"][i]["price"];
					sym=stocksList["stocks"][i]["symbol"];
					if(isMobile)
					imgURL ="http://chart.finance.yahoo.com/z?s="+sym+"&z=s";
					else
					imgURL ="http://chart.finance.yahoo.com/z?s="+sym+"&z=l";
					if( pri == "")
					  pri = "0.00";
						stockDetailTmp.push({
							"lblTicker":stocksList["stocks"][i]["symbol"],
							"lblName":stocksList["stocks"][i]["company"],
							"lblPrice":"$"+pri,
							"imgStock":stocksList["stocks"][i]["symbol"]
								});
				}
					frmStockList.segStock.setData(stockDetailTmp);
					frmStockList.show();		
			 		if(!isMobile){
			 		   frmStockList.segStock.selectedIndex=[0,0];
			 		   getStockDetilsTablet();	 
			 		 }	                 
			 } 
			else{
	            	alert("Please check network connection and try again.");    	
	   			}
		}
}
/**
****************************************************************
*	Name    : segStockPage
*	Author  : Kony 
*	Purpose : This function is to display stock list in page view.
****************************************************************
*/

function segStockPage()
{
	var stockDetailTmp = [];
	var img = "";
	for(var i=0;i<stockResultTable.length;i++){
		stockDetailTmp.push({
		     "lblTicker":stockResultTable[i]["symbol"],
		     "imgStock":  "http://chart.finance.yahoo.com/z?s="+stockResultTable[i]["symbol"]+"&z=s",
		     "lblCompany":stockResultTable[i]["company"],
		     "lblPrice":stockResultTable[i]["price"],
		     "lblUSD":"USD"
		     });
	}
	
  frmStockPage.segstock.setData(stockDetailTmp);
}
/**
****************************************************************
*	Name    : getStockDetails
*	Author  : Kony 
*	Purpose : This function is to get complete stock detils of selceted company in the segment.
****************************************************************
*/

function getStockDetails(eventobject)
{
  var symbol = eventobject.selectedItems[0].lblTicker;
  var stockDetails = null;
  for(var i=0;i<stockResultTable.length;i++){
  if(stockResultTable[i]["symbol"]== symbol){
     stockDetails = stockResultTable[i];
     break;
  }
  }
   frmStockDetails.lblTicker.text = stockDetails["symbol"];
   frmStockDetails.imgStock.src =  "http://chart.finance.yahoo.com/z?s="+stockDetails["symbol"]+"&z=s";
   frmStockDetails.lblCompany.text = stockDetails["company"];
   frmStockDetails.lblExch.text = stockDetails["exchange"];
   frmStockDetails.lblLow.text = stockDetails["low"];
   frmStockDetails.lblHigh.text = stockDetails["high"];
   frmStockDetails.lblLast.text = stockDetails["last"];
   frmStockDetails.lblCurr.text = "USD";
   frmStockDetails.show();

}
/**
****************************************************************
*	Name    : getMoreInfo
*	Author  : Kony 
*	Purpose : This function is to get full detils of paticular Stock.
****************************************************************
*/

function getMoreInfo(sym)
{
	kony.application.openURL("http://in.finance.yahoo.com/q?s="+sym);

}
/**
****************************************************************
*	Name    : getStockDetilsTablet
*	Author  : Kony 
*	Purpose : This function is to display stock detils selected company for tablet channels .
****************************************************************
*/

function getStockDetilsTablet(eventobject)
{
  
  var symbol= null;
  if(eventobject!=null && eventobject!=undefined){
    symbol = eventobject.selectedItems[0].lblTicker;
  }
  else 
  symbol = frmStockList["segStock"]["selectedItems"][0]["lblTicker"];
  
  if(symbol==null || symbol=="")
  	symbol="AAPL";
  var stockDetails = null;
  for(var i=0;i<stockResultTable.length;i++){
  if(stockResultTable[i]["symbol"]== symbol){
     stockDetails = stockResultTable[i];
     break;
  }
  }
  if(stockDetails!=null){
   frmStockList.lblCom.text = stockDetails["company"];
   frmStockList.lblPriceUSD.text = stockDetails["price"]+" USD";
   frmStockList.imgStockChart.src = "http://chart.finance.yahoo.com/z?s="+stockDetails["symbol"]+"&z=l";
   frmStockList.lblCom1.text = stockDetails["company"];  
   frmStockList.lblExc.text = stockDetails["exchange"];
   frmStockList.lblLow.text = stockDetails["low"];
   frmStockList.lblHigh.text = stockDetails["high"];
   frmStockList.lblLast.text = stockDetails["last"];
   frmStockList.lblCurr.text = "USD";   
   symbl=stockDetails["symbol"];
   }
   frmStockList.show();
  

}
