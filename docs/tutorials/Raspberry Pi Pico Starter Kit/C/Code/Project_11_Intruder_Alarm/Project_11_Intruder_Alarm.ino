int buzzerPin =  15;      // the number of the buzzer pin
int ledPin =  16;        // the number of the led pin
int motionSensor = 22;  // the number of the motionSensor pin

void setup() 
{
   Serial.begin(9600);            // initialize serial
  pinMode(buzzerPin, OUTPUT);
  pinMode(motionSensor, INPUT);
}

void loop() 
{
  int reading = digitalRead(motionSensor);
  if (reading == HIGH)
  {
   Serial.println("Motion detected!Buzzer alarm!");
   for(int i=0;i<15;i++)
   {digitalWrite(buzzerPin,HIGH);
    digitalWrite(ledPin,HIGH);
    delay(100);
    digitalWrite(buzzerPin, LOW);
    digitalWrite(ledPin, LOW);
    delay(100);
    }
  }
  else
  {
    digitalWrite(buzzerPin, LOW);
    digitalWrite(ledPin, LOW);
    Serial.println("Motion detected!Buzzer stop alarm!");

  }
}
