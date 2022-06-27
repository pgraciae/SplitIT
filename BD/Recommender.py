from cv2 import dft
import pandas as pd
from surprise import SVD
from surprise import accuracy
from surprise import Dataset
from surprise.model_selection import train_test_split
from surprise import KNNBasic,  KNNWithMeans, KNNBaseline
from surprise.model_selection import KFold
from surprise import Reader
from sqlalchemy import create_engine


engine = create_engine('postgresql+psycopg2://postgres:FDP@SplitItDB:5432/postgres')

# def get_recommendations(user_id, pred_df):
#     df_recommended = pred_df[pred_df['nickname']==user_id]
#     restaurants = df_recommended[['place','type']]
#     return restaurants

def recommender(userid=None):

    group_df = pd.read_sql_table('group_user', engine)
    tickets_df = pd.read_sql_table('ticket', engine)
    products_df = pd.read_sql_table('product', engine)

    group_ticket_df = group_df.merge(tickets_df)
    ratings_data = group_ticket_df.merge(products_df)

    dtf_users = ratings_data.groupby(['nickname','place_id']).mean().reset_index()
    
    ratings_data = dtf_users.merge(ratings_data, on=['nickname','place_id','rating','food_rating','service_rating']).drop_duplicates()

    
    ratings_data['ratings'] = round((ratings_data['rating']*3+ratings_data['food_rating']*2+ratings_data['service_rating'])/3, 3)
    ratings_data['nickname'] = ratings_data['nickname'].str.replace('U','').astype(int)

    reader = Reader(rating_scale=(0,4))
    data = Dataset.load_from_df(ratings_data[['nickname','place_id','ratings']], reader)

    anti_set = data.build_full_trainset().build_anti_testset()

    sim_options = { 'name': 'cosine' ,'user_based':  True}
    kf = KFold(n_splits=5)
    best_algo = None
    best_rmse = 1000.0
    best_pred = None
    algo = KNNWithMeans(k =8 , sim_options = sim_options)
    for trainset, testset in kf.split(data):
        # train and test algorithm.
        algo.fit(trainset)
        predictions = algo.test(testset)
        # Compute and print Root Mean Squared Error
        rmse = accuracy.rmse(predictions, verbose=False)
        if rmse < best_rmse:
            best_rmse= rmse
            best_algo = algo
            best_pred = predictions
    pred_df = pd.DataFrame(best_pred).merge(ratings_data , left_on = ['uid', 'iid'], right_on = ['nickname', 'place_id'])

    pred_df[['uid','iid','nickname','place_id','place','type','rating','food_rating','service_rating','ratings','est']]

    restaurants = ratings_data[['place_id','place','type']].drop_duplicates()
    users = ratings_data[['nickname']].drop_duplicates()


    anti_pre = best_algo.test(anti_set)

    pred_df = pd.DataFrame(anti_pre).merge(restaurants , left_on = ['iid'], right_on = ['place_id'])
    pred_df = pd.DataFrame(pred_df).merge(users, left_on = ['uid'], right_on = ['nickname'])
    
    pred_df.reset_index(inplace=True)
    pred_df = pred_df.rename(columns={"index": "recommendation_id", "est":"estimation"})
    pred_df = pred_df[['recommendation_id', 'nickname', 'place', 'type', 'estimation']]
    
    pred_df.to_sql('recommendations', engine, if_exists="replace", index=False)
    with engine.connect() as con:
        con.execute('ALTER TABLE recommendations ADD PRIMARY KEY ("recommendation_id");')

    #userid = int(userid.replace('U', ''))
    #recommendations = get_recommendations(userid, pred_df)
    #print(recommendations[:5], flush=True)
    #return recommendations [:5]


if __name__ == '__main__':
    recommender()
