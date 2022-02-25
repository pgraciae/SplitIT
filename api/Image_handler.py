
import imutils
import cv2
import copy
from imutils.perspective import four_point_transform
import time
import os
class ImagePreprocessor:

    def __init__(self,reader_function,  functions_to_preprocess):

        self.functions = functions_to_preprocess
        self.reader_function = reader_function
        self.ratio = 1
    def apply_functions(self, image, function_arguments):
        for function,argument in zip(self.functions, function_arguments):
            if type(argument) == dict:    image = function(image, **argument )
            else:   image = function(image, *argument )
        return image

    def contour_selection(self, img, tolerance = 4e-2):

        ### CURRENTLY NECESSARY TO EXTRACT THE 4 POINTS
        ### THIS MEANS CONTRAS BETWEEN RECEIPT AND BACKGROUND
        cnts = cv2.findContours(img.copy(), cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE)
        cnts = imutils.grab_contours(cnts)
        cnts = sorted(cnts, key=cv2.contourArea, reverse=True)
        for c in cnts:
            peri = cv2.arcLength(c, True)
            approx = cv2.approxPolyDP(c, tolerance * peri, True)
            #if our approximated contour has four points, then we can
            # assume we have found the outline of the receipt
            if len(approx) == 4:
                receiptCnt = approx
                break
        return receiptCnt
    
    def project_img(self, img, cnt, ratio):
        return four_point_transform(img, cnt.reshape(4, 2) * ratio)
    
    def save(self, img, original=False):
        if 'GeneratedImages' not in os.listdir(): os.mkdir("GeneratedImages")
        #print(img)
        cv2.imwrite("GeneratedImages/"+ str(time.time())+ '.png' if not original else 'original.png' ,img[1] )
    def __call__(self, path, function_arguments, tolerance = 4e-2, save_result=False):

        image = self.reader_function(path)
        image_or = copy.deepcopy(image)
        
        ############################
        edged = self.apply_functions(image, function_arguments)
        #contour = self.contour_selection(edged, tolerance)
        #ratio =  image_or.shape[1] / float(edged.shape[1])
        #receipt = self.project_img(image, contour, ratio)
        if save_result: self.save(edged)
        return edged, image_or


if __name__ == '__main__':
    read_func = cv2.imread
    functions = [
        imutils.resize,
        cv2.bilateralFilter,
        
        cv2.cvtColor,
        cv2.threshold,
        #cv2.Canny
    ]

    parameters = [
        {'width':500},
        {'d': 15, 'sigmaSpace': 100 , 'sigmaColor': 205},
        (cv2.COLOR_BGR2GRAY,),
       (170, 255, cv2.THRESH_BINARY_INV),
        #(200,40)
    ]

    preprocessor = ImagePreprocessor(read_func, functions)

    preprocessor("/home/user/SplitIT/DeepLearning/images_test/receipt.jpg", parameters, save_result=True)
             
        


