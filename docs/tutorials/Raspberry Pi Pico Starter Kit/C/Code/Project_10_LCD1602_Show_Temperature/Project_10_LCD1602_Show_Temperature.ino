#include <LiquidCrystal_I2C.h>
#define PIN_ADC0   26
LiquidCrystal_I2C lcd(0x27,16,2); 
void setup() 
{
  lcd.init();                     // LCD driver initialization
  lcd.backlight();                // Open the backlight
  lcd.setCursor(3,0);             // Move the cursor to row 0, column 0
  lcd.print("Temperature");       // The print content is displayed on the LCD
}

void loop() 
{
  int adcValue = analogRead(PIN_ADC0);                            //read ADC pin
  double voltage = (float)adcValue / 1023.0 * 3.3;                // calculate voltage
  double Rt = 10 * voltage / (3.3 - voltage);                     //calculate resistance value of thermistor
  double tempK = 1 / (1 / (273.15 + 25) + log(Rt / 10) / 3950.0); //calculate temperature (Kelvin)
  double tempC = tempK - 273.15;                                  //calculate temperature (Celsius)
  lcd.setCursor(4,1);             // Move the cursor to row 1, column 5
  lcd.print(tempC);
  lcd.setCursor(10,1);
  lcd.print("C");          
  delay(1000);
}
