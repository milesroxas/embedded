import machine
import time
button = machine.Pin(16, machine.Pin.IN)
led_onboard = machine.Pin(15, machine.Pin.OUT)
while True:
    if button.value() == 0:
        led_onboard.value(1)
    else :
        led_onboard.value(0)