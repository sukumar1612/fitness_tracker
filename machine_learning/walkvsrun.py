import joblib
import pandas as pd


def predict_data(data):
    # predict_data([[-0.700,0.300,1.000],[-1.600,0.400,1.900],[-7.300,-11.400,0.700]])
    print(type(data[0][0]), "___________sdkjfsd______________")
    data = [list(map(int, i)) for i in data]
    print(type(data[0][0]), "___________new_sdkjfsd______________")

    df = pd.DataFrame(data)
    df['total_acc'] = df[0] ** 2 + df[1] ** 2 + df[2] ** 2
    cls = joblib.load('model_finale.sav')
    d = df.to_numpy()
    x = cls.predict(d)
    x = list(x)
    p = (x.count(1) / len(x))
    time_running = ((20 * len(x)) / 1000) * p
    p1 = (x.count(0) / len(x))
    time_walking = ((20 * len(x)) / 1000) * p1
    print([time_running + time_walking, time_walking, time_running])
    return [time_running + time_walking, time_walking, time_running]
