#------------------- AI STUFF -------------------
from joblib import load
import pickle

#------------------------------------------------

def calculateSalaryEstimation(jobDescription):
    labels = ['Below $50,000', '$50,000-$70,000', '$70,000-$90,000', '$90,000-$120,000', '$120,000-$150,000', '$150,000 and Above']
    model = load('./AiModels/finalized_model_2.joblib')
    tfidf_vectorizer = pickle.load(open('./AiModels/fitted_vectorizer.pickle', 'rb')) 
    result_probabilities = model.predict_proba(tfidf_vectorizer.transform([jobDescription]))[0]

    # Calculate min and max salary estimates
    min_salary = sum(prob * salary for prob, salary in zip(result_probabilities, [0, 50000, 70000, 90000, 120000, 150000]))
    max_salary = sum(prob * salary for prob, salary in zip(result_probabilities, [50000, 70000, 90000, 120000, 150000, 200000]))

    return {'min_salary': min_salary, 'max_salary': max_salary}

def calculateSalaryEstimationV2(jobDescription):
    labels=['30000-50000','50000-70000','70000-90000','90000-120000','120000-150000','150000-200000']
    model = load('./AiModels/finalized_model_2.joblib')
    tfidf_vectorizer = pickle.load(open('./AiModels/fitted_vectorizer.pickle', 'rb')) 
    result = model.predict(tfidf_vectorizer.transform([jobDescription]))

    # Split the label into two values using the hyphen "-"
    min_salary, max_salary = map(int, labels[result[0]].split('-'))

    return {'min_salary': min_salary, 'max_salary': max_salary}



