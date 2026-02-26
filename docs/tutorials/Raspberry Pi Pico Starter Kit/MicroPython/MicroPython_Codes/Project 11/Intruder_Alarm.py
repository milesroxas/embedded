import machine
import time

pir_sensor = machine.Pin(22, machine.Pin.IN)
buzzer = machine.Pin(15, machine.Pin.OUT)
led = machine.Pin(16, machine.Pin.OUT)

def motion_detected(pin):
    print("Intruder Alarm Start!")
    for i in range(30):
        buzzer.toggle()
        led.toggle()
        time.sleep_ms(100)
    print("Intruder Alarm End!")
pir_sensor.irq(trigger=machine.Pin.IRQ_RISING, handler=motion_detected)
