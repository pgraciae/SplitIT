
from paddleocr import PaddleOCR,draw_ocr



class OCRHandler:

    def __init__(self,paddle_ocr=True,  detection_model_dir = 'models/ch_ppocr_server_v2.0_det_infer',
                        rec_model_dir='models/ch_ppocr_server_v2.0_rec_infer',
                        cls_model_dir = 'models/ch_ppocr_mobile_v2.0_cls_infer',
                        easy_ocr = False):
        self.easy_ocr = easy_ocr
        if paddle_ocr:
            self.model = PaddleOCR(det_model_dir=detection_model_dir ,rec_model_dir=rec_model_dir, cls_model_dir=cls_model_dir, use_angle_cls=True,)

    def clean_OCR(self, ocr_results):
        if not self.easy_ocr:
            words = {}
            for line in ocr_results:
                bbox, word_conf = line
                word, conf = word_conf
                if word not in words:
                    words[word] = [{
                        'bbox': bbox,
                        'confidence': conf
                    }]
                else:
                    words[word].append(
                    {
                        'bbox': bbox,
                        'confidence': conf
                    }   
                    )
            return words
        else:
            words = {}
            for line in ocr_results:
                bbox, word, conf = line
                if word not in words:
                    words[word] = [{
                        'bbox': bbox,
                        'confidence': conf
                    }]
                else:
                    words[word].append(
                    {
                        'bbox': bbox,
                        'confidence': conf
                    }   
                    )
            return words
    def doOcr(self,img_path):
        return self.clean_OCR(self.model.ocr(img_path)) if not self.easy_ocr else self.clean_OCR(self.model.readtext(img_path))

if __name__ == '__main__':

    ocr = OCRHandler(easy_ocr=True)
    print(ocr.doOcr(img_path))
