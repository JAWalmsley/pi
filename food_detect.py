# -*- coding: utf-8 -*-
"""food_detect.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1rVPiJAwwC64o6_CGLhzFDmRo1-nAy-2H
"""

!pip show tensorflow

# Import required Libraries
import tensorflow as tf
import tensorflow_datasets as tfds
from tensorflow import keras
import cv2
import numpy as np

# Ensure it is not run locally
print(tf.test.gpu_device_name())

# Load food dataset from tfds
data = tfds.load("food101", split="train[:75%]", as_supervised=True) #Training 75% 
data = data.map(lambda x, y: (x, tf.one_hot(y, depth=101)))
data = data.shuffle(1024).batch(32).prefetch(tf.data.AUTOTUNE)

# Create training model
model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(101, activation='softmax')
])

# Compile and train model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(data, epochs=10)
#model.summary()

# Load item1
img = cv2.imread('food_images/item1.jpg') 

# Resize the image to align with model's parameters 
img = cv2.resize(img, (224, 224))

# Convert type, normalize and add batch size
img = img.astype('float32')
img /= 255
img = np.expand_dims(img, axis=0)

# Get the prediction 
preds = model.predict(img)
class_idx = np.argmax(preds[0])
print(class_idx)

# Use class names from dataset to output specific name of food