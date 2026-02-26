import machine
import time

adc = machine.ADC(26)
pwm = machine.PWM(machine.Pin(15))
pwm.freq(10000)
while True:
    pwm.duty_u16(adc.read_u16())
    time.sleep_ms(100)
