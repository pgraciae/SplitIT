<<<<<<< HEAD
FROM python:3.8-bullseye
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y software-properties-common
RUN apt-get update && apt-get install gcc-4.9 --yes
RUN apt-get update &&  apt-get upgrade libstdc++6 --yes
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y
RUN pip3 install -r requirements.txt
=======
FROM python:3-onbuild
COPY . /usr/src/app
WORKDIR /usr/src/app
>>>>>>> 71c335c105afa6552b3bd3256f5712feb8f9c175
CMD ["python", "app.py"]