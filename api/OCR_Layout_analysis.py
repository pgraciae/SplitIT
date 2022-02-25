
from OCR_handler import OCRHandler
import numpy as np
from Image_handler import ImagePreprocessor
import imutils
import cv2
import copy
from imutils.perspective import four_point_transform
import time
import os
class ItemsIdentifier:

    def __init__(self, results_to_analize):

        self.data = results_to_analize

    def sort_item_by_top(self,):
        word = {}
        for element in self.data:
            for sub in self.data[element]:
                    min_top = sub['bbox'][1][1]
                    if element not in word:
                        word[element] = [min_top]
                    else:
                        word[element].append(min_top)
        
        return word
    
    def longest_subchar_length(self, string1, string2):
        level = 0
        
        for i in range(1,len(string2)):
            if string2.upper()[:i] in string1.upper():
                level+=1
            else:
                break
        
        return level

    def find_NN_line(self, word,indx):
        coord_x = self.data[word][indx]['bbox'][-1][1]
        current_min_dif = np.inf
        current_nn = ''
        elements = []
        difss = []
        for element in self.data:
            for subelemnt in self.data[element]:
                #print(element, subelemnt['bbox'], coord_x, abs(subelemnt['bbox'][-1][1] - coord_x))
                    if element == word: continue
                    elements.append(element)
                    difss.append( abs(subelemnt['bbox'][-1][1] - coord_x))
        indexes = np.argsort(difss)
        return (elements[indexes[0]], elements[indexes[1]])
    def detect_hours(self,string):
        nums = '0123456789'
        for i in range(len(string)-5):
            substr =  string[i:i+5]
            if substr[0] in nums and substr[1] in nums and substr[2] == ':' and substr[3] in nums and substr[4] in nums:
                return substr
        return False
    def detect_dates(self, str_):
        format = 'DD/MM/YYYY' 
        nums = '0123456789'
        for i in range(len(str_) - len(format)):
            substr = str_[i:i+len(format)]
            numerical = substr[0] in nums and substr[1] in nums and substr[3] in nums and substr[4] in nums \
                        and substr[6] in nums and substr[7] in nums and substr[8] in nums and substr[9] in nums
            separators = substr[2] in ':/-' and substr[5] in ':/-' and substr[-5] in ':/-'
            if numerical and separators:
                return substr
        return False
    def priorKnowladge_layoutAnalysis(self):

        top_sorted = self.sort_item_by_top()
        ### TITLE DETECTION ###
        filter_minimum_height = {x: min ([self.data[x][y]['bbox'][2][1] for y in range(len(self.data[x]))])
                                         for x in top_sorted if any([self.data[x][y]['bbox'][2][1] - self.data[x][y]['bbox'][0][1] > 15 for y in range(len(self.data[x]))])}
        title = min(filter_minimum_height, key = lambda x: (filter_minimum_height[x]))


        ### TOTAL DETECTION ###
        words = [x for x in self.data]
        indx =  [self.longest_subchar_length(x, 'TOTAL') for x in words]
        pssible_totals = [y for x,y in zip(indx,words) if max(indx) == x]
        
        down_top_words = [y for y in top_sorted][::-1]
        posibilities = []
        for element in down_top_words:
            if element in pssible_totals:
                posibilities.append((element, self.find_NN_line(element,0)))
        

        ### DATE / TIME Extraction ####
        pssible_hors = [t for t in [self.detect_hours(x) for x in words] if t]
        pssible_time = [t for t in [self.detect_dates(x) for x in words] if t]
        print(words)
        print('Possible Hours' , pssible_hors)
        print('Possible Times' , pssible_time)
        print('Posible Totals' , posibilities)
        print('Posible Title', title)
        return title
if __name__ == '__main__':
    '''read_func = cv2.imread
    functions = [
        imutils.resize,
        cv2.bilateralFilter,
        cv2.cvtColor,
        #cv2.Canny
    ]

    parameters = [
        {'width':500},
        {'d': 15, 'sigmaSpace': 100 , 'sigmaColor': 205},
        (cv2.COLOR_BGR2GRAY,),
        #(200,40)
    ]

    preprocessor = ImagePreprocessor(read_func, functions)

    preprocessor("/home/user/SplitIT/DeepLearning/images_test/img2.jpeg", parameters, save_result=True)'''
    ocr = OCRHandler()
    img_path = '/home/user/SplitIT/DeepLearning/images_test/receipt.jpg'

    res = (ocr.doOcr(img_path))

    ids = ItemsIdentifier(res)
    print(ids.priorKnowladge_layoutAnalysis())

