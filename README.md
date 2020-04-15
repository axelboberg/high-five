# High-five
Make virtual high-fives

## Demo  
[https://high-five.boberg.io](https://high-five.boberg.io)

## A note on the model  
This experiment is using the mediapipe-handtrack model for TensorflowJS which is primarily trained to track the motion of individual parts of a hand, however, it does the job for this experiment. In production, consider using a more specialized model for your use-case.

[tfjs-models/handpose](https://github.com/tensorflow/tfjs-models/tree/master/handpose)