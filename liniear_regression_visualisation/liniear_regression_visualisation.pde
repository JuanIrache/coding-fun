float learning_rate = 0.000005;
float initial_b = 0;
float initial_m = 0;

// y = mx + b
// m is slope, b is y-intercept

int num_iterations = 110;
int margin = 15;

float compute_error_for_line_given_points(float b, float m, float[][] points) {
    float totalError = 0;
    strokeWeight(1);
    stroke(0,255,0,50);
    for (int i=0; i<points.length;i++) {
        float x = points[i][0];
        float y = points[i][1];
        totalError += pow(y - (m * x + b),2);
        line(x*square_size/(max_x+margin),y*square_size/(max_y+margin),x*square_size/(max_x+margin),(m * x + b)*square_size/(max_y+margin));
    }
    return totalError / float(points.length);
}

float[] step_gradient(float b_current, float m_current, float[][] points, float learningRate) {
    float b_gradient = 0;
    float m_gradient = 0;
    float N = float(points.length);
    for (int i=0;i<points.length;i++) {
        float x = points[i][0];
        float y = points[i][1];
        b_gradient += -(2/N) * (y - ((m_current * x) + b_current));
        m_gradient += -(2/N) * x * (y - ((m_current * x) + b_current));
    }
    float[] new_bm = { b_current - (learningRate * b_gradient) , m_current - (learningRate * m_gradient) };

    return new_bm;
}
    
  
int current = -1;
float[] bm = { initial_b , initial_m };
float[][] points;
float max_x = 0;
float max_y = 0;
float square_size;
float current_error;
float first_error = -1;

void setup() {
  size(1920,640);
  square_size= width/3;
  background(255);
  smooth();
  String[] text = loadStrings("data.csv");
  points = new float[text.length][2];
      
    for (int i=0;i<points.length;i++) {
      String[] pre = split(text[i],",");
      points[i][0] = float(pre[0]);
      points[i][1] = float(pre[1]);
      
      if (points[i][0] > max_x) {
        max_x = points[i][0];
      }
      if (points[i][1] > max_y) {
        max_y = points[i][1];
      }
    }
      
    println("Starting gradient descent at b = "+initial_b+", m = "+initial_m+", error = "+compute_error_for_line_given_points(initial_b, initial_m, points));
    current = 0;                                                                                                                                               
    println("Running...");
    
}

void iteration() {
  bm = step_gradient(bm[0], bm[1], points, learning_rate);
  current_error = compute_error_for_line_given_points(bm[0], bm[1], points);
  if (first_error <0) first_error = current_error;
  
  
}

void draw() {
  smooth();
  
  scale(1, -1);
translate(0, -height);

 
  fill(255);
  noStroke();
  rect(0,0,square_size,square_size);  //draw test data and line
  
  if (current<num_iterations) {
    iteration();
    current++;
  } else {
    println("After "+num_iterations+" iterations b = "+bm[0]+", m = "+bm[1]+", error = "+compute_error_for_line_given_points(bm[0], bm[1],points));
    noLoop();
  }
  
  stroke(0);
  strokeCap(ROUND);
  strokeWeight(2);
  for (int i=0;i<points.length;i++) {

      point(points[i][0]*square_size/(max_x+margin),points[i][1]*square_size/(max_y+margin));

  }
  stroke(255,0,0);
  strokeCap(SQUARE);
  strokeWeight(1);
  PVector lineDestination = new PVector(square_size*square_size/(max_x+margin),(square_size*bm[1]+bm[0])*square_size/(max_y+margin));//not accurate for some reason
  float linePercent = (square_size)/(square_size*square_size/(max_x+margin));
  line(0,bm[0]*square_size/(max_y+margin),lineDestination.x*linePercent,lineDestination.y*linePercent);
  
  fill(255);
  noStroke();
  rect(square_size,square_size,square_size*2,square_size*2);  //draw first info graph
  stroke(0,100,0);
  strokeWeight(1+height/num_iterations);
  line(square_size+current*square_size/(num_iterations),0,square_size+current*square_size/(num_iterations),current_error*square_size/first_error);
  
  
  stroke(55,99,227);
  strokeWeight(10);
  strokeCap(PROJECT);
  pushMatrix();
    translate(2*width/3,0);
    point(map(bm[0]*square_size/(max_y+margin),0,TWO_PI,0,height),map(bm[1],0,TWO_PI,0,height));
  popMatrix();
  //saveFrame("linearregression###.jpg");
}
