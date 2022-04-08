FROM postgres:latest

# Python 3 installation
#RUN apt-get update && apt-get install -y python3 python3-pip
RUN mkdir /BD
WORKDIR /BD
COPY . /BD/
RUN mv create_table.sql ../docker-entrypoint-initdb.d/
#RUN pip3 install -r requirements.txt
#CMD ["python3", "mock_data/create_mock_data.py"]
