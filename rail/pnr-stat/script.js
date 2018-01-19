 var app=angular.module("myapp",[])
        .controller("mycontroller",function($scope,$http){
            $scope.submitreq=function(){ 
            var url="https://api.railwayapi.com/v2/pnr-status/pnr/"+$scope.pnr+"/apikey/dvkr6h08bb/";
            document.getElementById('res').style.display="none";
			$http.get(url).then(function(response)
			{ 
				
				var ob=response.data;
				$scope.res=ob;
				console.log(ob);
				// $scope.date_of_jrny="DD-MM-YYYY";

				if(ob.response_code!=200){

					$scope.ob="Please Enter valid pnr number";
					document.getElementById("invalid").innerHTML="Please Enter valid pnr number";
					

				}
				else
					{document.getElementById('res').style.display="block";
					$scope.date_of_jrny=ob.doj;
					
					if(ob.chart_prepared=="false")
						$scope.chart_stat="NO";
					else
						$scope.chart_stat="YES";


					$scope.from_stn=ob.from_station['name'];
					$scope.to_stn=ob.to_station['name'];
					$scope.train_name=ob.train['name'];
					$scope.train_no=ob.train['number'];
					$scope.classcode=ob.journey_class['code'];	
					n=ob.total_passengers;
					// console.log(date_of_jrny);
					var num,x;var disp=[];
					for(x in ob.passengers)
					{
						num=ob.passengers[x].no;
						curr=ob.passengers[x].current_status;
						book=ob.passengers[x].booking_status;
						disp.push({sno:num,current:curr,booking:book});
						console.log(curr);
					}
					$scope.pass=disp;
					// disp.push({date:date_of_jrny , status:chart_stat , from:from_stn , to:to_stn ,tr_name:train_name , tr_no:train_no });
					// $scope.temp=disp;
					// document.getElementById('res').innerHTML=$scope.ob;
				}
			});
		}
	});
