from matplotlib.pyplot import get, tick_params
import pandas as pd
import numpy as np
import pickle
import unicodedata, re
from sqlalchemy import column, create_engine
from nltk.tokenize import word_tokenize
from nltk.stem import LancasterStemmer
from classificador.Scrapper import get_data
from scipy import sparse
import nltk
nltk.download('punkt')


def classify(ticket_items):
    engine = create_engine('postgresql+psycopg2://postgres:FDP@SplitItDB:5432/postgres')

    cvec_place = pickle.load(open("classificador/my_count_vec_place.pkl", "rb"))
    cvec_product = pickle.load(open("classificador/my_count_vec_product.pkl", "rb"))
    cvec_ingredients = pickle.load(open("classificador/my_count_vec_ingredients.pkl", "rb"))

    #ticket_items = llegirem les dades del ticket

    
    ticket_items = pd.DataFrame(ticket_items)

    with open('classificador/Model_classificador.pickle', "rb") as file:
        model_classificador = pickle.load(file)

    ingredients_bd = pd.read_sql_query(f"select * from product", engine)

    #veure si hi ha plats a la base de dades
    bd = pd.DataFrame(set(ingredients_bd['item']).intersection(set(ticket_items['Item'])), columns=['Item'])
    internet = set(ticket_items['Item']) - set(bd['Item'])
    id = ingredients_bd[ingredients_bd['item'].values == bd['Item'].values][['ticket_id','item']].groupby('item').first().values[0]
    if len(id) <= 1:
        restaurant = pd.read_sql_query(f"select distinct(place) from ticket where ticket_id='{id[0]}'", engine)
    else:
        restaurant = pd.read_sql_query(f"select distinct(place) from ticket where ticket_id in {tuple(id)}", engine)


    X = pd.DataFrame(ingredients_bd[ingredients_bd['item'].values == bd['Item'].values][['ingredients','item']].drop_duplicates())
    X.insert(2,'place', restaurant['place'].values)

    #sino buscar a internet i afegir a la bbdd
    for i in internet:
        new = pd.DataFrame({'ingredients':[get_data(i)], 'item':i, 'place':restaurant['place']})
        X = pd.concat([X, new])

    # Replace specific characters
    replace_dict = {
        '\r':' ',
        '\n':' '
    }

    for key,value in replace_dict.items():
        X['item'] = [text.replace(key,value) for text in X['item']]
        X['place'] = [text.replace(key,value) for text in X['place']]
        X['ingredients'] = [text.replace(key,value) for text in X['ingredients']]
        
    # Tokenise
    X['item'] = [word_tokenize(text) for text in X['item']]
    X['place'] = [word_tokenize(text) for text in X['place']]
    X['ingredients'] = [word_tokenize(text) for text in X['ingredients']]


    def remove_non_ascii(words):
        """Remove non-ASCII characters from list of tokenized words"""
        new_words = []
        for word in words:
            new_word = unicodedata.normalize('NFKD', word).encode('ascii', 'ignore').decode('utf-8', 'ignore')
            new_words.append(new_word)
        return new_words

    def to_lowercase(words):
        """Convert all characters to lowercase from list of tokenized words"""
        new_words = []
        for word in words:
            new_word = word.lower()
            new_words.append(new_word)
        return new_words

    def remove_punctuation(words):
        """Remove punctuation from list of tokenized words"""
        new_words = []
        for word in words:
            new_word = re.sub(r'[^\w\s]', '', word)
            if new_word != '':
                new_words.append(new_word)
        return new_words

    def stem_words(words):
        """Stem words in list of tokenized words"""
        stemmer = LancasterStemmer()
        stems = []
        for word in words:
            stem = stemmer.stem(word)
            stems.append(stem)
        return stems

    # Run functions above to remove non-ascii characters, 
    # convert to lowercase, remove punctuation and obtain the word stems

    X['item'] = [remove_non_ascii(text) for text in X['item']]

    X['item'] = [to_lowercase(text) for text in X['item']]

    X['item'] = [remove_punctuation(text) for text in X['item']]

    X['item'] = [stem_words(text) for text in X['item']]


    X['ingredients'] = [remove_non_ascii(text) for text in X['ingredients']]

    X['ingredients'] = [to_lowercase(text) for text in X['ingredients']]

    X['ingredients'] = [remove_punctuation(text) for text in X['ingredients']]

    X['ingredients'] = [stem_words(text) for text in X['ingredients']]


    X['place'] = [remove_non_ascii(text) for text in X['place']]

    X['place'] = [to_lowercase(text) for text in X['place']]

    X['place'] = [remove_punctuation(text) for text in X['place']]

    X['place'] = [stem_words(text) for text in X['place']]

    # Reconstruct description after tokenisation for use in CountVectorizer
    X['item'] = [' '.join(text) for text in X['item']]
    X['place'] = [' '.join(text) for text in X['place']]
    X['ingredients'] = [' '.join(text) for text in X['ingredients']]


    place_nlp = X['place']
    product_nlp = X['item']
    ingredients_nlp = X['ingredients']

    place_sparse_matrix = cvec_place.transform(place_nlp)
    product_sparse_matrix = cvec_product.transform(product_nlp)
    ingredient_sparse_matrix = cvec_ingredients.transform(ingredients_nlp)



    sparse_matrices = [
        place_sparse_matrix,
        product_sparse_matrix,
        ingredient_sparse_matrix,
    ]

    X_sparse = sparse.hstack(sparse_matrices)


    model_predictions = model_classificador.predict(X_sparse)

    print(max(model_predictions))
    return(max(model_predictions))
