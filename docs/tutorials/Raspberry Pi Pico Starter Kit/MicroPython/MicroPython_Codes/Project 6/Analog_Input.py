import machine
import time

potentiometer = machine.ADC(28)

while True:
    adcValue=potentiometer.read_u16()
    voltage = adcValue / 65535.0 * 3.3
    print("ADC Value:", adcValue, "Voltage:", voltage, "V")
    time.sleep_ms(100)