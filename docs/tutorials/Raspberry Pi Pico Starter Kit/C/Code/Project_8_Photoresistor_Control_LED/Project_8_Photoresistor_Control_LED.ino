#define PIN_ADC0        26
#define PIN_LED         15

void setup() 
{
  pinMode(PIN_LED, OUTPUT);
}
void loop() 
{
  int adcVal = analogRead(PIN_ADC0); 
  //Read the voltage of the photoresistor
  analogWrite(PIN_LED, map(adcVal, 0, 1023, 0, 255));
  delay(10);
}
