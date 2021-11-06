def predict_data(data):
    df=pd.DataFrame(data)
    df['total_acc']=df[0]**2+df[1]**2+df[2]**2
    cls=joblib.load('model_finale.sav')
    d=testdf.to_numpy()
    x=cls.predict(d)
    x=list(x)
    p=(x.count(1)/len(x))
    time_running=((20*len(x))/1000)*p
    p1=(x.count(0)/len(x))
    time_walking=((20*len(x))/1000)*p1
    print([time_running+time_walking,time_walking,time_running])
    return [time_running+time_walking,time_walking,time_running]
