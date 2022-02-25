from paddleocr import PaddleOCR,draw_ocr
# The path of detection and recognition model must contain model and params files
ocr = PaddleOCR(det_model_dir='/home/user/SplitIT/DeepLearning/models/ch_ppocr_server_v2.0_det_infer', rec_model_dir='/home/user/SplitIT/DeepLearning/models/ch_ppocr_server_v2.0_rec_infer', cls_model_dir='/home/user/SplitIT/DeepLearning/models/ch_ppocr_mobile_v2.0_cls_infer', use_angle_cls=True)
img_path = '/home/user/SplitIT/DeepLearning/images_test/receipt2.jpg'
result = ocr.ocr(img_path, cls=True)
for line in result:
    print(line)
