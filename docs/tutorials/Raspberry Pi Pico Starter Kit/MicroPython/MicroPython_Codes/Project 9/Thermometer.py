import machine
import time
import math

adc=machine.ADC(26)
while True:
    adcValue = adc.read_u16()
    voltage = adcValue / 65535.0 * 3.3
    Rt = 10 * voltage / (3.3-voltage)
    tempK = (1 / (1 / (273.15+25) + (math.log(Rt/10)) / 3950))
    tempC = int(tempK - 273.15)
    print("ADC value:", adcValue, "  Voltage: %0.2f"%voltage,"  Temperature: " + str(tempC) + "C")
    time.sleep(1)
