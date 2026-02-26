import machine
from ws2812 import WS2812
import time

ws = WS2812(machine.Pin(0),8)

while True:
    ws.write_all([255,0,0])  #red
    time.sleep_ms(300)
    ws.write_all([0,255,0])  #green
    time.sleep_ms(300)
    ws.write_all([0,0,255])  #blue
    time.sleep_ms(300)
    ws.write_all([255,255,0]) #Yellow
    time.sleep_ms(300)
    ws.write_all([255,0,255]) #Bright Purple
    time.sleep_ms(300)
    ws.write_all([0,255,255]) #cyan
    time.sleep_ms(300)
    ws.write_all([255,255,255])#White
    time.sleep_ms(300)