const int redPin = 13;  // R petal on RGB LED module connected to digital pin 13 
const int greenPin = 14;  // G petal on RGB LED module connected to digital pin 14 
const int bluePin = 15;  // B petal on RGB LED module connected to digital pin 15 

void setup()
{ 
  pinMode(redPin, OUTPUT); // sets the redPin to be an output 
  pinMode(greenPin, OUTPUT); // sets the greenPin to be an output 
  pinMode(bluePin, OUTPUT); // sets the bluePin to be an output 
}    

void loop()  // run over and over again  
{    
  // Basic colors:  
  color(255, 0, 0); // turn the RGB LED red 
  delay(1000); // delay for 1 second  
  color(0,255, 0); // turn the RGB LED green  
  delay(1000); // delay for 1 second  
  color(0, 0, 255); // turn the RGB LED blue  
  delay(1000); // delay for 1 second  
  color(255,0,255); // turn the RGB LED Purple  
  delay(1000); // delay for 1 second  
}     

void color (unsigned char red, unsigned char green, unsigned char blue)// the color generating function  
{    
  analogWrite(redPin, red);   
  analogWrite(greenPin, green); 
  analogWrite(bluePin, blue); 
}
