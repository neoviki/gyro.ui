int gx, gy, gz;



void setup() {
  Serial.begin(9600);
  gx = random(40, 220); /*generate between 0 to 359*/
  gy = random(40, 220); /*generate between 0 to 359*/
  gz = random(40, 220); /*generate between 0 to 359*/

}

void loop() {
    int i, t;
    String s = "GYRO#";
  
    t = random(gx+10, gx-10);

    if(t < 0){
        t = 10;
    }else if(t > 360){
        t = 340;
    }

    gx = t;

    t = random(gy+10, gy-10);

    if(t < 0){
        t = 10;
    }else if(t > 360){
        t = 340;
    }

    gy = t;

    
    t = random(gz+10, gz-10);

    if(t < 0){
        t = 10;
    }else if(t > 360){
        t = 340;
    }

    gz = t;
    
    s += String(gx);
    s += "#";
    s += String(gy);
    s += "#";
    s += String(gz);
    s += "#";
      
    Serial.println("");
    Serial.println(s);
    Serial.println("");
    delay(1000);
}
