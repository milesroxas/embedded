import time
import machine

adc = machine.ADC(machine.Pin(28)) #set GP28 as analog input pin
servoPin = machine.PWM(machine.Pin(16)) #set GP16 as PWM analog output to servo
servoPin.freq(50)

def servo(degrees):
    # limit degrees beteen 0 and 180
    if degrees > 180: degrees=180
    if degrees < 0: degrees=0
    # set max and min duty
    maxDuty=9000
    minDuty=1000
    #use potentiometer to control Servouse potentiometer to control Servouse potentiometer to control Servo
    # new duty is between min and max duty in proportion to its value
    newDuty=minDuty+(maxDuty-minDuty)*(degrees/180)
    # servo PWM value is set
    servoPin.duty_u16(int(newDuty))

while True:
  value=adc.read_u16()
  print(value)
  degree=value*180/65500
  servo(degree)
  time.sleep_ms(3)