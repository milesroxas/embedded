import machine
import time

NOTE_C6 = 1047   #'do'
NOTE_D6 = 1177   #'re'
NOTE_E6 = 1319   #'mi'
NOTE_F6 = 1397   #'fa'
NOTE_G6 = 1568   #'so'
NOTE_A6 = 1760   #'la'
NOTE_B6 = 1976   #'si'
NOTE_C7 = 2093   #'doh'

note_list =[NOTE_C6,NOTE_D6,NOTE_E6,NOTE_F6,NOTE_G6,NOTE_A6,NOTE_B6,NOTE_C7]
buzzer = machine.PWM(machine.Pin(14))

def tone(pin,frequency,duration):
    pin.freq(frequency)
    pin.duty_u16(30000)
    time.sleep_ms(duration)
    pin.duty_u16(0)

for note in note_list:
    tone(buzzer,note,250)
    time.sleep_ms(15)