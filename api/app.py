import time
from flask import Flask
from flask import request
from flask import jsonify
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
import os
app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False

if 'test_file.txt' not in os.listdir():
    with open('test_file.txt', 'w') as hdlr:
        hdlr.write("Test: /")
        print(os.getcwd(), flush=True)

def helper_file(*messgae):
    with open('test_file.txt', 'wa') as hdlr:
        messsgaes = "\n".join(messgae)
        [hdlr.write(messsage) for message in messsgaes]

@app.route('/time')
def get_current_time():
    return jsonify({'time': time.time()})


@app.route('/upload', methods = ['POST'])
def upload():
    image=request.files['file']
    pil_image = Image.open(image)
    pix = np.array(pil_image)
    plt.imsave('uploaded/' + str(int(time.time())) + '.jpg', pix)
    helper_file('image has been saved on:', os.getcwd() ,'uploaded/' + str(int(time.time())) + '.jpg', flush=True )
    #infer_img(pix, str(int(time.time())))
    return {'1':None}


if __name__ == '__main__':
        app.run(debug=True,host='0.0.0.0', port = 5000)
