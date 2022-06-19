using System;
using System.Device.Gpio;
using System.Threading;
using System.Net;
using System.Collections.Specialized;
using System.Text;



const int GREEN_PIN = 3;
const int RED_PIN = 27;
const int PIR_PIN = 4;
bool occupied = false;
var url ="https://maliniak.azurewebsites.net/api/HttpTrigger_rpi?code=qgILQFmfaUNyHqM3_J0QXK14oX5LO9c-qo2oW7C4OTwxAzFu9w8gAg==";
var data = new NameValueCollection();
var controller = new GpioController();
controller.OpenPin(GREEN_PIN, PinMode.Output);
controller.OpenPin(RED_PIN, PinMode.Output);
controller.OpenPin(PIR_PIN, PinMode.Input);

controller.RegisterCallbackForPinValueChangedEvent(PIR_PIN, PinEventTypes.Rising, (sender, args) =>
{
    occupied = !occupied;
    if(occupied == true){
        data["status"] = "zajete";

        controller.Write(RED_PIN, PinValue.High);
        controller.Write(GREEN_PIN, PinValue.Low);
        Console.WriteLine("zajete");
        
    }
    else{
        data["status"] = "wolne";
        controller.Write(RED_PIN, PinValue.Low);
        controller.Write(GREEN_PIN, PinValue.High);
        Console.WriteLine("wolne");
            
    }

    using (var wb = new WebClient()){
            var response = wb.UploadValues(url, "POST", data);
            string responseInString = Encoding.UTF8.GetString(response);
            Console.WriteLine(responseInString);
        }
});


Console.WriteLine("Awaiting for user action...");
Console.ReadLine();
controller.Write(GREEN_PIN, PinValue.Low);
controller.Write(RED_PIN, PinValue.Low);
controller.Dispose();