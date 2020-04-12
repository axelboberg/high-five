# High-five
Make virtual high-fives

## Convert a Keras model to TensorflowJS
```
tensorflowjs_converter \
    --input_format=tf_hub \
    --quantization_bytes=1 \
    --output_format=tfjs_graph_model \
    ./ \
    ./tiny-hand-js
```
