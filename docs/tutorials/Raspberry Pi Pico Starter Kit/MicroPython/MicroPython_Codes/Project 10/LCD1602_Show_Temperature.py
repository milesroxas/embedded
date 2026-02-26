from LCD1602 import LCD
import machine
import time
import math

adc=machine.ADC(26)
lcd = LCD()
while True:
    adcValue = adc.read_u16()
    voltage = adcValue / 65535.0 * 3.3
    Rt = 10 * voltage / (3.3-voltage)
    tempK = (1 / (1 / (273.15+25) + (math.log(Rt/10)) / 3950))
    tempC = int(tempK - 273.15)
    #tempF = tempC * 1.8 + 32
    #print ('Celsius: %.2f C  Fahrenheit: %.2f F' % (tempC, tempF))
    #time.sleep(0.2)
    string = "  Temperature  \n    " + str('{:.2f}'.format(tempC))+ " C"
    lcd.message(string)
    time.sleep(1)
    lcd.clear()