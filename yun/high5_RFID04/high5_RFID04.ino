#include <SoftwareSerial.h>
#include <Process.h>

#define RFIDEnablePin 2 //Pin that enables reading. Set as OUTPUT and LOW to read an RFID tag
#define RFIDSerialRate 2400 //Parallax RFID Reader Serial Port Speed

#define RxPin 8 //Pin to read data 
#define TxPin 9 //Pin to write data 
SoftwareSerial RFIDReader(RxPin,TxPin);

String RFIDTAG=""; 
String lastTAG = ""; 

const int giantButton = 4;
const int buttonLED = 5;

int buttonState;
int lastButtonState = 0;
boolean gameStarted = false;
String player;

long lastDebounceTime = 0;  // the last time the output pin was toggled
long debounceDelay = 50;


void setup() {
  Bridge.begin();	// Initialize the Bridge
  RFIDReader.begin(RFIDSerialRate);
  Serial.begin(9600);           // set up Serial library at 9600 bps

  pinMode(RFIDEnablePin,OUTPUT); 
  pinMode(giantButton, INPUT_PULLUP);
  pinMode(buttonLED, OUTPUT);

  // Activate the RFID reader
  digitalWrite(RFIDEnablePin, LOW);

  Serial.println("Hello world!");  // prints hello with ending line break 
  while (!Serial);
}


void loop() {
//  buttonState = digitalRead(giantButton);
  int reading = digitalRead(giantButton);
  
  if (reading != lastButtonState){
    lastDebounceTime = millis();
  }
  
  if ((millis() - lastDebounceTime) > debounceDelay) {
    // if the button state has changed:
    if (reading != buttonState) {
      buttonState = reading;

      // only start game if the new button state is HIGH
      if (buttonState == HIGH) {
        RFIDTAG="";
        gameStarted = true;
        digitalWrite (buttonLED, HIGH);
        runScript();
        Serial.println("HiFive Me!");
      }
    }
  }


  if (gameStarted){
    if(RFIDReader.available() > 0) { // If data available from reader     
      ReadSerial(RFIDTAG);  //Read tag # from the reader. returns a 10 digit serial #
    }

    if (RFIDTAG == "410046A88A"){
      player = "Adamo";
      Serial.println("Blamo Adamo!");
    }
    else if (RFIDTAG == "410046D082"){
      player = "Sam";
      Serial.println("Kablam it's Sam!");
    } 
    else if (RFIDTAG == "4100436378"){
      player = "Xuedi";
      Serial.println("Xuedi fruity!");
    } 
    else {
      return;
    }
    
    RFIDTAG = "";
    
    tagScript(player); //send RFID tag to python
    gameStarted =false;
    digitalWrite (buttonLED, LOW);
    Serial.println("HiFive Complete!");
  }
  
  lastButtonState = reading;
  RFIDReader.flush();
}


bool runScript() {

  // Process that launches the python script
  Process p;                
  p.begin("/usr/bin/python");        
  p.addParameter("/root/initiate.py"); 
  p.run();

  // Read data back from the script. 
  while (p.available()>0) {   
    char c = p.read();
  }  
  Serial.flush();
}


bool tagScript(String RFIDTAG) {

  // Process that launches the python script
  Process p;                
  p.begin("/usr/bin/python");        
  p.addParameter("/root/checkID.py"); 
  p.addParameter(String(RFIDTAG));
  p.run();

  // Read data back from the script. 
  while (p.available()>0) {   
    char c = p.read();
  }
  Serial.flush();
}


void ReadSerial(String & ReadTagString) { 
  int bytesread = 0;
  int  val = 0; 
  char code[10];
  String TagCode="";

  if(RFIDReader.available() > 0) {          // If data available from reader 
    if((val = RFIDReader.read()) == 10) {   // Check for header 
      bytesread = 0; 
      while(bytesread<10) {                 // Read 10 digit code 
        if( RFIDReader.available() > 0) { 
          val = RFIDReader.read(); 
          if((val == 10)||(val == 13)) {   // If header or stop bytes before the 10 digit reading 
            break;                         // Stop reading 
          } 
          code[bytesread] = val;           // Add the digit           
          bytesread++;                     // Ready to read next digit  
        } 
      } 

      if(bytesread == 10) {                // If 10 digit read is complete 
        for(int i=0; i<10; i++) {             //Copy the Chars to a String
          TagCode += code[i];
        }     
        ReadTagString = TagCode;          //Update the caller

        while(RFIDReader.available() > 0) { //Burn off any characters still in the buffer
          RFIDReader.read();
        } 

      } 
      bytesread = 0;
      TagCode="";
    } 
  } 
}




