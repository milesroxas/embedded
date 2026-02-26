#define PIN_ADC0   26
void setup() {
  Serial.begin(9600);
}

void loop() {
  int adcValue = analogRead(PIN_ADC0);                            //read ADC pin
  double voltage = (float)adcValue / 1023.0 * 3.3;                // calculate voltage
  double Rt = 10 * voltage / (3.3 - voltage);                     //calculate resistance value of thermistor
  double tempK = 1 / (1 / (273.15 + 25) + log(Rt / 10) / 3950.0); //calculate temperature (Kelvin)
  double tempC = tempK - 273.15;                                  //calculate temperature (Celsius)
  Serial.println("ADC Value: " + String(adcValue) +"\t"  + "Voltage: " + String(voltage) + "V,\t" + "Temperature: " + String(tempC) + "C");
  delay(1000);
}
