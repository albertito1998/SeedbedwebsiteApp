// INCLUDE THE LIBRARIES

#include "DHT.h" // DHT22SENSOR
#include "math.h" // OPERATIONS
#include "stdio.h" // FUNCTIONS
#include "LiquidCrystal.h" // LCD
#include "RTClib.h" // CLOCK
#include <Time.h> // Time

// DEFINE THE CONSTANTS
#define COLS 16 // Rows of LCD
#define ROWS 2 // Files of LCD
#define DHTTYPE DHT22   // DHT 22  
#define DHTPin 3     // what digital pin we're connected to
#define Ldr A0 // what digital pin we're connected to
#define MQ135 A2 // what digital pin we're connected to
#define GROUNDHUMIDITYSENSOR A3 // what digital pin we're connected to
#define SensorWaterLevel 2 // what digital pin we're connected to
#define PUMP_RELAY 4 // what digital pin we're connected to
#define VENTILATOR_RELAY 5 // what digital pin we're connected to
#define LEDS_RELAY 6 // what digital pin we're connected to
#define HUMIDIFIER_RELAY 7 // what digital pin we're connected to
#define RL 1000
#define Ro 3600

// INITIALITATION OF THE COMPONENTS
RTC_DS3231 RTC;
const int rs = 8, en = 9, d4 = 10, d5 = 11, d6 = 12, d7 = 13;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);
DHT dht(DHTPin, DHTTYPE);


// DEFINE MESSAGES LCD
String  daysOfTheWeek[7] = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };
String  monthsNames[12] = { "January", "February", "March", "Abril", "May",  "June", "July", "August", "September", "October", "November", "December" };
String StartingSTr = "INITIALIZING....";
String WelcomeName = " ALBERTO GOMEZ";
String WelcomeString = "SEEDBED";
String TemperatureStr;
String HumidityAirStr;
String HumidityGroundStr;
String Co2Str;
String LDRStr;
String ALERTS;

// DEFINE SYMBOLS FOR LCD
byte Bell[] = {
  B00100,
  B01110,
  B01110,
  B01110,
  B11111,
  B00000,
  B00100,
  B00000
};
byte WaterLevel[] = {
  B10001,
  B10001,
  B10001,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111
};
byte Wait[] = {
  B11111,
  B10001,
  B01010,
  B00100,
  B00100,
  B01010,
  B11111,
  B11111
};
// DEFINE STATUS
float humidityground, temperatureair, humidityair, CO2, LDR;
int   SensorWaterValue = 0, lux;
char pump, ventilator, light, humidifier, gasAlert, waterLevel;
String separator[4]; // positions of actuators
bool statusLEDS=false, statusPUMP=false;



// GLOBAL VARIABLES OF ENVIROMENTAL CONTROL
const int LUXACEPTABLE =  20; // Limit of light between day and night
const int GASACEPMAX = 1000 ; // Level of gas High
const int HSMIN = 20; // Minimun Soil moisture
const int HAMIN = 20; // Minimun Air Humidity
const int HAMAX = 80; // Maximun Air Humidity
const int TEMPMIN = 10; // Minimun Air Temperature
const int TEMPMAX = 36; // Maximun Air Temperature


const int MIN_LIGHT = 859;
const int MAX_LIGHT =  79;



//DEFINE FUNCTIONS
void showDateLCD();
void showSensorsLCD ();
void Initializing ();
void readSensors();
void checkRelays();
bool isScheduledONIrrigation(DateTime date);
bool isScheduledONLEDS(DateTime date);
void Enviromental_control (bool LEDS, bool PUMP);




//Initializing
void setup() {
  // DEFINE THE PINS

 // INPUTS
  pinMode(MQ135, INPUT);
  pinMode(Ldr, INPUT);
  pinMode(SensorWaterLevel, INPUT);
  pinMode(GROUNDHUMIDITYSENSOR, INPUT);

  //OUTPUTS
  pinMode(PUMP_RELAY, OUTPUT);
  pinMode(VENTILATOR_RELAY, OUTPUT);
  pinMode(LEDS_RELAY, OUTPUT);
  pinMode(HUMIDIFIER_RELAY, OUTPUT);
  digitalWrite(PUMP_RELAY, HIGH);
  digitalWrite(VENTILATOR_RELAY, HIGH);
   digitalWrite(LEDS_RELAY, HIGH);
  digitalWrite(HUMIDIFIER_RELAY, HIGH);

 
// Run the LCD
  lcd.begin(COLS, ROWS);
  lcd.createChar(0, Wait);
  lcd.createChar(1, WaterLevel);
  lcd.createChar(1, Bell);
  lcd.setCursor(0, 1);
  Initializing (); // Welcome messages

  dht.begin(); // Run the sensor DHT22

  //OPEN THE CLOCK
  if (!RTC.begin()) {
    Serial.println(F("Couldn't find RTC"));
    while (1);
  }

  // If the current is lost, fix the hour and the time
  if (RTC.lostPower()) {
    // Fix the date and time of compilation
   // RTC.adjust(DateTime(2020, 8, 15, 13, 8, 0));
   RTC.adjust(DateTime(F(__DATE__), F(__TIME__)));
  }

  // SWITCH OFF EVERYTHING
  pump = 'L';
  ventilator = 'L';
  light = 'L';
  humidifier = 'L';
  gasAlert = 'L';
  waterLevel = 'L';
  
  Serial.begin(9600);
  delay(3000);
};

// VOID LOOP

void loop() {
  showDateLCD();
  readSensors();
  showSensorsLCD ();
  sendMessage ();
  DateTime now = RTC.now();
  Enviromental_control(isScheduledONLEDS(now), isScheduledONIrrigation(now));
};



void showDateLCD () {
  DateTime now = RTC.now();       // Obtain the current datetime
  char date[20];
  sprintf(date, "%.2d.%.2d.%.4d %.2d:%.2d:%.2d", now.day(), now.month(), now.year(), now.hour(), now.minute(), now.second());
  lcd.clear();
  String  date1 = (" Day: " + daysOfTheWeek[now.dayOfTheWeek()] );
  lcd.setCursor(0, 0);
  lcd.print(date);
  delay(150);
  lcd.setCursor(2, 1);
  lcd.print(date1);
  delay(3000);
  lcd.clear();
};

void showSensorsLCD () {
  HumidityAirStr = ("Humidity:" + String(humidityair) + " %" );
  TemperatureStr = ("Temp:" + String(temperatureair) + " C" );
  HumidityGroundStr = ("Ground:" + String(humidityground) + " %");
  Co2Str = ("Co2:" + String(CO2) + " ppm");
  LDRStr = ("LDR:" + String(LDR) + " lux");
  ALERTS = ("GAS: " + String(gasAlert) + " Water:" + String(waterLevel));
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(HumidityAirStr);
  delay(150);
  lcd.setCursor(0, 1);
  lcd.print(TemperatureStr);
  delay(4000);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(HumidityGroundStr);
  delay(150);
  lcd.setCursor(0, 1);
  lcd.print(Co2Str);
  delay(4000);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(LDRStr);
  delay(150);
  lcd.setCursor(0, 1);
  lcd.print(ALERTS);
  delay(4000);
};

void Initializing () {
  lcd.setCursor(0, 0);
  lcd.print (StartingSTr);
  lcd.setCursor(8, 1);
  lcd.write(byte(0));
  delay(3000);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print (WelcomeString);
  delay(150);
  lcd.setCursor(0, 1);
  lcd.print (WelcomeName);
  delay(150);

};

void sendMessage () {
  //send(humidityair,temperatureair,humidityground,CO2, LDR, pump, ventilator, light, humidifier, gasAlert, waterLevel);
  String SENSOR1 =  String(humidityair, 3);     // converting a constant string into a String object
  String SENSOR2 =  String(temperatureair, 3);     // converting a constant string into a String object
  String SENSOR3 =  String(humidityground, 3);     // converting a constant string into a String object
  String SENSOR4 =  String(CO2, 3);     // converting a constant string into a String object
  String SENSOR5 =  String(LDR, 3);     // converting a constant string into a String object

  String message =  String(SENSOR1 + "," + SENSOR2 + "," + SENSOR3 + "," + SENSOR4 + "," + SENSOR5 + "," + pump + "," + ventilator + "," + light + "," + humidifier + "," + gasAlert + "," + waterLevel +  "\r\n");
  Serial.println(message); // send message
  Serial.println("\n");
  
};

void readSerial() {
  if (Serial.available() > 0) {
    String data = Serial.readStringUntil('\r\n');
    separator[1] = data.substring(0, 1);
    separator[2] = data.substring(2, 3);
    separator[3] = data.substring(4, 5);
    separator[4] = data.substring(6, 7);
  }
};

// CHECK AUTOMATIC IRRIGATING
bool isScheduledONIrrigation(DateTime date)
{
  int weekDay = date.dayOfTheWeek();
  float hours = date.hour() + date.minute() / 60.0;

  // FROM 8.00 to 8.01
  bool hourCondition = (hours > 20.00 && hours < 20.01);
  if (hourCondition ||(humidityground<HSMIN))
  {
    return true;
  }
  return false;
};

// CHECK AUTOMATIC LEDS
bool isScheduledONLEDS(DateTime date)
{
  float hours = date.hour() + date.minute() / 60.0;

  // FROM 21.00 to 7.00
  bool hourCondition = (hours > 22.00 || hours < 7.00);
  if (hourCondition)
  {
    return true;
  }
  return false;
};

// READING OF THE SENSORS
void readSensors()
{
  // Reading sensor DHT22
  humidityair = dht.readHumidity();
  temperatureair = dht.readTemperature();
  if (isnan(humidityair) || isnan(temperatureair)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  // Reading Ldr
  int light_reading = analogRead(Ldr);
  // Convert MIN reading (79) -> MAX reading (859) to a range 0->100.
  LDR = map(light_reading, MIN_LIGHT, MAX_LIGHT, 0, 100);

  // Reading Water Level
  int SensorWaterValue = digitalRead(SensorWaterLevel);
  if (SensorWaterValue == HIGH) {
    waterLevel = 'L';
  }
  else {
    waterLevel = 'H';
  }
  // Reading Ground Humidity sensor
  int x = map(0, 1023, 0, 5, analogRead(GROUNDHUMIDITYSENSOR));
  humidityground = map(x, 700, 300, 0, 100); ;
  //humidityground= (-3.1495)*x+103.83;

  //Reading of CO2
  /*  int Rs= (1023*(RL/analogRead(MQ135))-RL);
    ppm = pow(10,(5.27*(log((Rs/Ro))-0.35)));
  */
  CO2 = analogRead(MQ135) + 150;

   if (CO2>GASACEPMAX) {
      gasAlert = 'H';
  }
  else {
      gasAlert = 'L';
  }
};

// ENVIROMENTAL CONTROL

void Enviromental_control (bool LEDS, bool PUMP){ 

 //TEMPERATURE CO2  HUMIDITY AIR MAX VALUES

if (temperatureair>TEMPMAX||(humidityair>HAMAX)|| (CO2>GASACEPMAX)){
  digitalWrite(VENTILATOR_RELAY,LOW);
  ventilator = 'H';
}else{
  digitalWrite(VENTILATOR_RELAY,HIGH);  
  ventilator = 'L';
}


 //HUMIDITY AIR

 if (humidityair<HAMIN){
  digitalWrite(HUMIDIFIER_RELAY,LOW);
  humidifier = 'H';
}else{
  digitalWrite(HUMIDIFIER_RELAY,HIGH); 
  humidifier = 'L';
}


   // CHECK IF LEDS MUST BE ON
  if ((LEDS==true||LDR<LUXACEPTABLE)&& statusLEDS == false)      //  OFF and it should be on because of night or level of light
  {
    digitalWrite(LEDS_RELAY, LOW);// Activation of the LEDS
  light = 'H';
    statusLEDS = true; //change the status
  }
  else if ((LEDS=false)&& (statusLEDS == true))      //  ON and it should be off because of day or level of light
  {
    digitalWrite(LEDS_RELAY, HIGH); // Desactivation of the leds
      light = 'L';
    statusLEDS = false; //change the status
  } 





 //SOIL MOISTURE
 
   // CHECK IF Irriggation MUST BE ON
  if (PUMP== true && statusPUMP == false)      //  OFF and it should be on because of soil moisture or time
  {
    digitalWrite(PUMP_RELAY, LOW); // Activation of the pump
    statusPUMP = true; //change the status
    pump = 'H';
    Serial.println("Bomba activada");
  }
  else if ((PUMP== false )  && statusPUMP == true)       //  ON and it should be off because of time or level of soil moisture
  {
    digitalWrite(PUMP_RELAY, HIGH); // Desactivation of the pump
     pump='L';
    statusPUMP = false; //change the status
    Serial.println("Bomba desactivada");
  } 



  };
 