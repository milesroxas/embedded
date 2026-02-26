#define NOTE_C6 1047   //'do'
#define NOTE_D6 1177   //'re'
#define NOTE_E6 1319   //'mi'
#define NOTE_F6 1397   //'fa'
#define NOTE_G6 1568   //'so'
#define NOTE_A6 1760   //'la'
#define NOTE_B6 1976   //'si'
#define NOTE_C7 2093   //'doh'

int note_list[] = {NOTE_C6, NOTE_D6, NOTE_E6, NOTE_F6, NOTE_G6, NOTE_A6, NOTE_B6, NOTE_C7};
//note durations. 4=quarter note / 8=eighth note
int noteDurations[] = {4, 4, 4, 4, 4, 4, 4, 4};

void setup() 
{
  pinMode(buttonPin, INPUT);   //make the button's pin input
}

void loop() 
{
    for (int i = 0; i < 8; i++) 
    {
      // to calculate the note duration, take one second divided by the note type.
      //e.g. quarter note = 1000 / 4, eighth note = 1000/8, etc.
      int noteDuration = 1000 / noteDurations [i];
      tone(14, note_list [i], noteDuration);
      //to distinguish the notes, set a minimum time between them
      //the note's duration +30% seems to work well
      int pauseBetweenNotes = noteDuration * 1.30;
      delay(pauseBetweenNotes);
    }
    delay(2000);
}
