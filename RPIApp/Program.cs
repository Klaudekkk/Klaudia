using System;
using Newtonsoft.Json;
using RestSharp;
using System.Device.Gpio;

namespace CCheck{
    
    class Program{
        static void Main(){
            const int GREEN_PIN = 3;
            const int RED_PIN = 27;
            const int PIR_PIN = 4;
            bool occupied = false;
            var controller = new GpioController();
            controller.OpenPin(GREEN_PIN, PinMode.Output);
            controller.OpenPin(RED_PIN, PinMode.Output);
            controller.OpenPin(PIR_PIN, PinMode.Input);
            controller.Write(GREEN_PIN, PinValue.High);

            controller.RegisterCallbackForPinValueChangedEvent(PIR_PIN, PinEventTypes.Rising, (sender, args) =>
            {
                occupied = !occupied;
                if(occupied == true){
                    Post();
                    controller.Write(RED_PIN, PinValue.High);
                    controller.Write(GREEN_PIN, PinValue.Low);
                    Console.WriteLine("zajete");

                }
                else{
                    Post();
                    controller.Write(RED_PIN, PinValue.Low);
                    controller.Write(GREEN_PIN, PinValue.High);
                    Console.WriteLine("wolne");
                }
                
            });
        Console.ReadLine();
        }

        private static void Post(){
            const string uri = "https://rpitoilet.azurewebsites.net/api/AddTime?code=dCcBlx9n8AIn7VufImhzUG152vjqETeDWeSXhW1ZDbLnAzFulQNSVw==";
            var client = new RestClient(uri);
            var request = new RestRequest();
            DateTime now = DateTime.UtcNow;
            now = DateTime.UtcNow;
            now = now.AddHours(2);
            string TimeNow = now.ToString("yyyy-MM-ddTHH\\:mm\\:ss");
            var body = new {time = TimeNow};
            request.AddParameter("text/json", body, ParameterType.RequestBody);
            var response = client.Post(request);
            Console.WriteLine(response.Content);
        }
    }
}